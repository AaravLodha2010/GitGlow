# GitGlow Engineering Decision Log

Version: 0.1
Status: Active

---

# Purpose

This document records important technical and product decisions made throughout the development of GitGlow.

Each decision includes:
- The decision itself
- Why it was made
- Alternatives considered
- Status

This helps keep development consistent and documents the reasoning behind the architecture.

---

# ADR-001

## Decision

Use **Next.js** instead of React with Vite.

### Why

- Excellent developer experience
- Built-in routing
- Server-side rendering support
- Easy deployment to Vercel
- Industry-standard framework for modern web applications

### Alternatives Considered

- React + Vite
- Angular
- Vue

### Status

Accepted

---

# ADR-002

## Decision

Use **Supabase** as the backend.

### Why

- Simple authentication
- PostgreSQL database
- Easy API integration
- Generous free tier
- Good developer experience

### Alternatives Considered

- Firebase
- Appwrite
- PocketBase

### Status

Accepted

---

# ADR-003

## Decision

Use **GitHub OAuth** as the primary authentication method.

### Why

GitGlow revolves around GitHub repositories, so users should be able to connect their accounts with a single click.

### Alternatives Considered

- Email and password
- Google OAuth

### Status

Accepted

---

# ADR-004

## Decision

Use a **provider-agnostic AI client** with Gemini as primary and Groq as fallback.

### Why

- Fast inference speeds suitable for real-time portfolio analysis
- Supports JSON schema structured outputs for reliable data parsing
- Generous free tiers from both providers
- Automatic fallback ensures reliability when one provider is out of credits or rate-limited
- Easy to switch providers via environment variable without code changes

### Alternatives Considered

- OpenAI API only
- Anthropic Claude only
- Google Gemini only
- Groq API only
- Local LLMs
- Rule-based scoring

### Status

Accepted

## Configuration

Set `AI_PROVIDER` in `.env.local`:
- `gemini` - Use Gemini API (default)
- `groq` - Use Groq API

Requires corresponding API keys:
- `GEMINI_API_KEY` for Gemini
- `GROQ_API_KEY` for Groq

If primary provider fails, the client automatically falls back to the other provider.

---

# ADR-005

## Decision

Focus on **career readiness** rather than code quality.

### Why

Many existing tools analyze code.

Very few evaluate GitHub portfolios from the perspective of recruiters and hiring managers.

This makes GitGlow different.

### Alternatives Considered

- Static code analyzer
- Security scanner
- Performance analyzer

### Status

Accepted

---

# Future Decisions

Future architecture decisions will be documented here as the project evolves.

---

# ADR-006

## Decision

Use **pdf-parse** for client-side PDF text extraction in the resume analysis feature.

### Why

- Lightweight library with no external worker dependencies
- Works reliably in browser environments
- Simple API for extracting text from PDF files
- Better client-side compatibility than pdfjs-dist

### Alternatives Considered

- pdfjs-dist (requires separate worker setup)
- Server-side PDF parsing
- Manual text extraction

### Status

Accepted

---

# ADR-007

## Decision

Use **Recharts** for data visualization in the dashboard.

### Why

- Composable chart components that work well with React
- Good TypeScript support
- Responsive by default
- Integrates well with Tailwind CSS styling
- Appropriate for score trends and metrics breakdowns

### Alternatives Considered

- Chart.js
- Victory
- Nivo
- D3.js

### Status

Accepted