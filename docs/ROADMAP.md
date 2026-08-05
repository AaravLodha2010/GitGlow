# GitGlow Roadmap

Version: 0.3  
Status: Active Development  
Owner: Aarav Lodha

---

# Vision

Build GitGlow into the leading AI-powered platform that helps developers create recruiter-ready GitHub portfolios.

---

# Release Timeline

## v0.1 — MVP Foundation (Completed)

**Goal:** Build the first usable version of GitGlow.

### Features
- GitHub OAuth authentication via Supabase
- Portfolio dashboard with saved reports
- Repository analysis and portfolio scoring
- AI recommendations with metrics breakdown
- Responsive UI with dark theme
- Recharts integration for score trends
- Supabase persistence with RLS

### Success Criteria
- User can sign in with GitHub
- User can analyze repositories
- User receives AI-powered feedback with score
- Dashboard loads reports and history
- Analysis completes in under one minute

**Completed:** August 2026

---

## v0.2 — Portfolio Coach (Completed)

**Goal:** Expand beyond basic portfolio analysis to deeper career alignment.

### Features
- Resume analysis with PDF/text upload and paste
- Resume vs GitHub comparison
- Skill gap analysis (present, missing, partial)
- Project alignment feedback
- Experience gap detection
- Score trend visualization over time

### Success Criteria
- User can upload or paste a resume
- User receives skill gap breakdown
- User sees project alignment scores
- User can track portfolio improvement over time

**Completed:** August 2026

---

## v0.3 — Career Toolkit (In Progress)

**Goal:** Help developers prepare for specific companies and interviews.

### Features
- Company readiness reports with company selector
- Interview question generator based on GitHub projects
- Question categorization by type and difficulty
- Dashboard consolidation across all report types
- Unified report history for portfolio, resume, company, and interview reports

### Success Criteria
- User can select a target company
- User receives company-specific readiness score and gap analysis
- User can generate personalized interview questions
- Dashboard shows all report types in one place

**Target:** August 2026

---

## v1.0 — Public Launch (Planned)

### Features
- Production-ready UI polish
- Performance optimization
- Complete documentation
- Stable deployment
- Public portfolio pages
- README assistant
- Learning recommendations

### Success Criteria
- Live on Vercel
- Complete documentation
- Ready for internship applications
- Public beta release

**Target:** September 2026

---

# Weekly Development Plan

## Week 1
- Project planning
- Documentation
- GitHub repository setup
- UI wireframes

## Week 2
- Next.js setup
- Authentication
- Landing page
- Dashboard layout

## Week 3
- GitHub API integration
- Repository import
- Portfolio analysis

## Week 4
- AI integration
- Portfolio scoring
- Recommendations
- Testing

## Week 5
- Resume analysis feature
- PDF parsing
- Resume vs GitHub comparison

## Week 6
- Company readiness feature
- Interview question generation
- Dashboard consolidation

---

# Development Workflow

Every feature should follow this process:

1. Create a GitHub Issue
2. Design the feature
3. Implement the feature
4. Test locally
5. Commit using Conventional Commits
6. Push to GitHub
7. Open a Pull Request (if using branches)
8. Merge after review
9. Close the issue

---

# Future Ideas (Icebox)

- VS Code extension
- Browser extension
- GitHub Action
- Open-source contribution tracker
- Portfolio analytics over time
- AI project idea generator
- Team dashboards
- Recruiter view
- README auto-generation
- Learning path recommendations
- Public portfolio profiles
- Career roadmap generator

---

# Current Focus

- Complete v0.3 Career Toolkit features
- Polish UI/UX across all report types
- Write comprehensive documentation
- Prepare for v1.0 public launch