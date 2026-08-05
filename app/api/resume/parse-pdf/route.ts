import PDFParser from "pdf2json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided." }, { status: 400 });
    }

    const fileName = typeof file.name === "string" ? file.name : "";
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      return Response.json({ error: "Please upload a PDF file." }, { status: 400 });
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      console.log("PDF buffer size:", buffer.length);

      const pdfParser = new PDFParser();

      const textPromise = new Promise<string>((resolve, reject) => {
        pdfParser.on("pdfParser_dataReady", () => {
          try {
            const pdfData = pdfParser.data as {
              Pages?: Array<{
                Texts?: Array<{
                  R?: Array<{ T?: string }>;
                }>;
              }>;
            } | null;

            if (!pdfData?.Pages) {
              console.log("No pages found in PDF");
              resolve("");
              return;
            }

            const textParts: string[] = [];
            for (const page of pdfData.Pages) {
              if (page.Texts) {
                for (const textBlock of page.Texts) {
                  if (textBlock.R) {
                    for (const run of textBlock.R) {
                      if (run.T) {
                        textParts.push(run.T);
                      }
                    }
                  }
                }
              }
            }

            const text = textParts.join(" ").trim();
            console.log("PDF parsed successfully, text length:", text.length);
            resolve(text);
          } catch (parseErr) {
            console.error("Text extraction error:", parseErr);
            reject(new Error("Failed to extract text from PDF."));
          }
        });

        pdfParser.on("pdfParser_dataError", (err) => {
          console.error("PDF parsing error:", err);
          const message = err && typeof err === "object" && "parserError" in err
            ? (err as { parserError: Error }).parserError.message
            : "PDF parsing failed.";
          reject(new Error(message));
        });

        pdfParser.parseBuffer(buffer);
      });

      const text = (await textPromise).trim();

      if (!text || text.length < 50) {
        return Response.json({ error: "Could not extract enough text from this PDF. The file may be scanned or image-based." }, { status: 400 });
      }

      return Response.json({ text });
    } catch (parseError) {
      console.error("PDF processing error:", parseError);
      return Response.json({ error: `Failed to process PDF: ${parseError instanceof Error ? parseError.message : "Unknown error"}` }, { status: 500 });
    }
  } catch (error) {
    console.error("PDF route error:", error);
    return Response.json({ error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` }, { status: 500 });
  }
}
