import assert from "node:assert/strict";
import test from "node:test";

import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://demo.supabase.co";

// supabase-js 2.119.2 validates that storage object requests stay inside the
// intended bucket endpoint. Before that release a path such as
// "../private/secret.txt" was sent to the network and escaped the bucket.
test("storage download keeps object paths inside the bucket endpoint", async (t) => {
  const requestedUrls = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (input) => {
    requestedUrls.push(String(input));
    return new Response("{}", {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const client = createClient(PROJECT_URL, "sb_secret_test_key", {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const safePath = await client.storage.from("reports").download("2026/summary.txt");
  assert.equal(safePath.error, null);
  assert.deepEqual(requestedUrls, [
    `${PROJECT_URL}/storage/v1/object/reports/2026/summary.txt`,
  ]);

  const escapedPath = await client.storage.from("reports").download("../private/secret.txt");
  assert.ok(
    escapedPath.error,
    "a path traversal must be rejected instead of requested from the storage API",
  );
  assert.equal(
    requestedUrls.length,
    1,
    "the rejected path must not reach the network",
  );
});
