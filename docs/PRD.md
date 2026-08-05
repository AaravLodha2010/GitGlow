# GitGlow Product Requirements Document (PRD)

Version: 0.3  
Status: Active Development  
Author: Aarav Lodha  
Last Updated: August 2026

---

# 1. Overview

GitGlow is an AI-powered software engineering coach designed to help developers build stronger GitHub portfolios.

Instead of only analyzing source code, GitGlow evaluates a developer's entire portfolio from the perspective of recruiters and hiring managers. It provides actionable recommendations that improve documentation, project quality, technical presentation, and career readiness.

The goal is to help developers better showcase their skills and increase their chances of securing internships and software engineering roles.

---

# 2. Problem Statement

Developers invest significant time building projects but often receive little feedback on how their GitHub portfolio appears to recruiters.

Existing tools primarily focus on:

- Code quality
- Security
- Static analysis
- Repository metrics

Very few evaluate:

- Portfolio presentation
- README quality
- Project diversity
- Documentation
- Recruiter readiness
- Resume consistency
- Career progression
- Company-specific alignment
- Interview preparedness

GitGlow aims to solve this problem.

---

# 3. Target Users

## Primary Users

- High school students interested in software engineering
- University students applying for internships
- Self-taught developers
- Junior software engineers

## Secondary Users

- Career coaches
- Coding bootcamps
- University career centers

---

# 4. Vision

To become the AI career coach every developer uses before applying for software engineering internships or jobs.

---

# 5. Goals

## Primary Goals

- Improve GitHub portfolio quality
- Provide personalized AI recommendations
- Help developers understand recruiter expectations
- Encourage best engineering practices
- Bridge resume and portfolio gaps
- Prepare developers for company-specific interviews

## Success Metrics

- Users receive actionable feedback in under one minute.
- Portfolio score updates after repository improvements.
- Users return to analyze new projects.
- Positive feedback on recommendation usefulness.
- Resume alignment insights help users identify skill gaps.
- Company readiness reports guide targeted improvements.
- Interview prep generates relevant, project-specific questions.

---

# 6. Non-Goals (v0.1-v0.3)

The current releases do **not** include:

- Full static code analysis
- IDE plugins
- Mobile application
- Social networking
- Team collaboration
- Enterprise features
- README generation (planned for v0.4+)
- Public portfolio pages (planned for v1.0)

---

# 7. Implemented Features

## GitHub Authentication

Users sign in securely using GitHub OAuth via Supabase.

## Portfolio Dashboard

Display:
- Portfolio Score
- Repository Count
- Programming Languages
- Documentation Score
- Project Diversity
- Score trends over time
- Quick access to all report types

## Repository Analysis

Analyze each repository for:
- README quality
- Description quality
- Repository topics
- License
- Documentation
- Project structure

## AI Recommendations

Provide personalized suggestions such as:
- Improve README
- Add screenshots
- Add installation guide
- Improve repository description
- Add architecture diagrams
- Improve documentation

## Portfolio Score

Generate a score out of 100 based on:
- Documentation
- Professionalism
- Repository Health
- Technical Complexity
- Presentation
- Project Diversity

## Resume Analysis

- Upload resume as PDF or text
- Paste resume text directly
- Compare resume against GitHub projects
- Identify skill gaps (present, missing, partial)
- Project alignment analysis
- Experience gap detection

## Company Readiness

- Select from preset companies or enter custom target
- Evaluate portfolio alignment with company-specific expectations
- Relevant skills with proficiency levels
- Missing skills identification
- Project fit assessment with reasoning

## Interview Preparation

- Generate personalized interview questions based on GitHub projects
- Question types: Technical, Behavioral, System Design, Project
- Difficulty levels: Easy, Medium, Hard
- Focus areas for preparation
- Actionable hints for each question

---

# 8. Future Features

- README Assistant (auto-generate professional READMEs)
- Public Portfolio Pages
- Learning Recommendations
- Career Roadmap
- AI Project Idea Generator
- Portfolio analytics over time
- Team dashboards
- Recruiter view

---

# 9. User Flow

Landing Page

↓

GitHub Sign In

↓

Dashboard

↓

Choose Analysis Type:
- Portfolio Analysis
- Resume Analysis
- Company Readiness
- Interview Prep

↓

View Report

↓

Implement Recommendations

↓

Re-analyze

---

# 10. Technical Stack

## Frontend

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Recharts

## Backend

- Supabase (PostgreSQL + Auth + RLS)

## Authentication

- GitHub OAuth

## AI

- Groq API (JSON schema structured outputs)

## PDF Processing

- pdf-parse

## Deployment

- Vercel

---

# 11. Database Schema

## portfolio_reports
- id, user_id, username, score, strengths, recommendations, metrics, repositories, created_at

## resume_reports
- id, user_id, username, score, strengths, recommendations, skill_gaps, project_alignment, experience_gaps, created_at

## company_reports
- id, user_id, username, company, score, strengths, recommendations, relevant_skills, missing_skills, project_fit, created_at

## interview_reports
- id, user_id, username, score, strengths, recommendations, questions, focus_areas, created_at

All tables have Row Level Security (RLS) enabled with policies restricting access to the report owner.

---

# 12. Success Criteria

The current release is successful if users can:

- Connect their GitHub account
- Analyze repositories and receive a Portfolio Score
- Get AI-generated recommendations
- Upload/paste a resume and compare it to their GitHub
- Evaluate portfolio readiness for specific companies
- Generate personalized interview questions
- Access all reports from a unified dashboard

---

# 13. Risks

- GitHub API rate limits
- AI API costs and rate limits
- Large repositories increasing analysis time
- PDF parsing reliability across different resume formats
- User expectations exceeding current scope
- Groq API schema validation strictness

---

# 14. Future Vision

GitGlow should evolve into an AI-powered software engineering career platform that helps developers improve their portfolios, prepare for interviews, and become more competitive internship and job candidates.

---

# 15. Design Principles

## 1. Actionable Over Informational

Every recommendation should give users a clear next step.

## 2. Transparent AI

Recommendations should explain why they were generated.

## 3. Fast Feedback

Portfolio analysis should complete in under one minute whenever possible.

## 4. Developer First

Every feature should solve a real problem developers face.

## 5. Professional by Default

Every screen, recommendation, and interaction should feel polished and trustworthy.