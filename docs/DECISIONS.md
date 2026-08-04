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

Use **OpenAI** for repository analysis.

### Why

GitGlow's core value comes from providing intelligent, actionable feedback rather than static metrics.

### Alternatives Considered

- Local LLMs
- Rule-based scoring
- Anthropic Claude
- Google Gemini

### Status

Accepted

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