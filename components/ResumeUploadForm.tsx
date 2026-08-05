"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PDFParse } from "pdf-parse";

const loadingMessages = [
  "Reading your resume...",
  "Analyzing skills and experience...",
  "Comparing with GitHub projects...",
  "Generating alignment report...",
];

function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      resolve(text);
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsText(file);
  });
}

async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const parser = new PDFParse({ data: arrayBuffer });
  const result = await parser.getText();
  await parser.destroy();
  return result.text.trim();
}

export default function ResumeUploadForm() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    const timer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % loadingMessages.length);
    }, 800);

    return () => window.clearInterval(timer);
  }, [isLoading]);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setIsParsing(true);
    setFileName(file.name);

    try {
      let text = "";
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        text = await extractPdfText(file);
      } else {
        text = await extractTextFromFile(file);
      }

      if (!text || text.trim().length < 50) {
        setError("Could not extract enough text from this file. Please try another file or paste your resume text directly.");
        setFileName(null);
        setResumeText("");
      } else {
        setResumeText(text);
      }
    } catch {
      setError("Failed to parse this file. Try pasting your resume text instead.");
      setFileName(null);
      setResumeText("");
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!resumeText.trim() || resumeText.trim().length < 50) {
      setError("Please paste your resume text or upload a file to analyze.");
      return;
    }

    setIsLoading(true);
    setMessageIndex(0);

    const startedAt = Date.now();
    try {
      const response = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: resumeText.trim() }),
      });

      const payload = (await response.json()) as { error?: string; reportId?: string };

      if (!response.ok || !payload.reportId) {
        throw new Error(payload.error ?? "Unable to analyze your resume.");
      }

      const remainingDelay = Math.max(0, 1500 - (Date.now() - startedAt));
      if (remainingDelay) {
        await new Promise((resolve) => window.setTimeout(resolve, remainingDelay));
      }

      router.push(`/resume/${payload.reportId}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to analyze your resume.");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 text-center" role="status" aria-live="polite">
        <div className="relative mx-auto grid size-12 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-[#d7ff54]/20 border-t-[#d7ff54]" />
          <svg viewBox="0 0 24 24" className="size-4 text-[#d7ff54]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 3v12a4 4 0 0 0 8 0V7M7 7h8" strokeLinecap="round" /></svg>
        </div>
        <p className="mt-6 text-lg font-medium tracking-[-0.02em] text-zinc-100">{loadingMessages[messageIndex]}</p>
        <p className="mt-2 text-sm text-zinc-500">Building your personalized resume-to-portfolio report.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="resume-file">
          Upload resume
        </label>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            className="hidden"
            id="resume-file"
            name="resume-file"
            accept=".txt,.pdf"
            type="file"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-4" aria-hidden="true"><path d="M4 16v2h12v-2M12 4v8m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Choose file
          </button>
          {fileName && (
            <span className="text-sm text-zinc-400">
              {isParsing ? "Parsing..." : `Loaded: ${fileName}`}
            </span>
          )}
        </div>
        <p className="mt-2 text-xs text-zinc-600">Supports .txt and .pdf files. Text is processed only for this analysis.</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="resume-text">
          Or paste your resume
        </label>
        <textarea
          id="resume-text"
          name="resume-text"
          rows={8}
          className="h-40 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 outline-none"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(event) => setResumeText(event.target.value)}
        />
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <button
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d7ff54] px-5 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_30px_rgba(215,255,84,0.17)]"
        type="submit"
      >
        Compare Resume to GitHub
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </form>
  );
}
