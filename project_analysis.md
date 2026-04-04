# FixMyResume — Project Analysis

## Backend Status: ✅ Solid Foundation

Your backend is well-structured and covers all the core functionality. Here's what you have:

---

### 📦 Apps & Architecture

| Component | Status | Notes |
|-----------|--------|-------|
| **Django project config** | ✅ Done | Settings, CORS, JWT, WhiteNoise, media handling |
| **`accounts` app** | ✅ Done | Custom User model (email auth), register/login/profile |
| **`analyzer` app** | ✅ Done | Resume analysis, rewrite suggestions, dashboard |
| **Gemini AI integration** | ✅ Done | `analyze_resume()` + `rewrite_bullet()` using `google-genai` SDK |
| **Text extraction** | ✅ Done | PDF (PyPDF2) + DOCX (python-docx) support |

---

### 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register/` | Public | Create account → returns JWT tokens |
| `POST` | `/api/auth/login/` | Public | Login → returns JWT tokens |
| `POST` | `/api/auth/refresh/` | Public | Refresh expired access token |
| `GET` | `/api/auth/profile/` | 🔒 JWT | Get current user profile |
| `POST` | `/api/analyzer/analyze/` | Public | Upload resume + job desc → AI analysis |
| `GET` | `/api/analyzer/analyses/` | 🔒 JWT | List user's past analyses |
| `GET` | `/api/analyzer/analyses/<id>/` | 🔒 JWT | Full detail of one analysis |
| `DELETE` | `/api/analyzer/analyses/<id>/` | 🔒 JWT | Delete an analysis |
| `POST` | `/api/analyzer/rewrite/` | Public | Rewrite a weak bullet point |
| `GET` | `/api/analyzer/dashboard/` | 🔒 JWT | Score history for charts |

---

### 🧠 AI Response Structure

The Gemini integration returns:
```json
{
    "match_score": 72,
    "ats_score": 85,
    "missing_keywords": ["kubernetes", "CI/CD"],
    "found_keywords": ["Python", "Django", "REST API"],
    "section_scores": { "summary": 70, "skills": 85, "experience": 60, "education": 90 },
    "feedback": { "summary": "...", "skills": "...", "experience": "...", "education": "...", "overall": "..." },
    "weak_bullets": [{ "original": "...", "issue": "..." }]
}
```

---

### ⚠️ Minor Backend Things to Address

1. **Typo** in `extract_text.py` line 17: `"scammed image"` → should be `"scanned image"`
2. **`analysis_detail_view`** uses `AllowAny` but checks `request.user` — guest analyses (no user) are accessible to anyone which is fine, but logged-in user analyses have a permission check. This is correct logic but the decorator could be `IsAuthenticatedOrReadOnly` for clarity.
3. **No logout endpoint** — consider adding a token blacklist endpoint if needed.

---

## Frontend Status: 🔴 Empty

The `frontend/` directory only has an `eg.txt` placeholder — nothing built yet.

---

## 🎯 Frontend Roadmap (React + Vite)

Based on your backend API, here are the pages/features the frontend needs:

### Pages to Build

| Page | Route | Description |
|------|-------|-------------|
| **Landing Page** | `/` | Hero section, features showcase, CTA to analyze |
| **Analyze Page** | `/analyze` | Upload resume + paste job description form |
| **Results Page** | `/results/:id` | Full analysis display with scores, keywords, feedback, weak bullets |
| **Login Page** | `/login` | Email + password login form |
| **Register Page** | `/register` | Name + email + password signup form |
| **Dashboard** | `/dashboard` | Score history chart + list of past analyses |
| **Profile** | `/profile` | User info + analysis count |

### Key Frontend Features

- **File upload** with drag-and-drop for resume (PDF/DOCX)
- **Score visualization** — circular gauges for match & ATS scores, bar charts for section scores
- **Keyword chips** — green for found, red for missing
- **Section feedback cards** — expandable cards per resume section
- **Weak bullets + rewrite** — click-to-rewrite with AI integration
- **Score history chart** — line/area chart on dashboard showing improvement over time
- **JWT auth flow** — store tokens, auto-refresh, protected routes
- **Responsive design** — mobile-friendly layout

### Suggested Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite + React** | Fast dev server, modern tooling |
| **React Router** | Client-side routing |
| **Axios** | HTTP client with JWT interceptor |
| **Recharts** or **Chart.js** | Score history visualization |
| **React Dropzone** | Drag-and-drop file upload |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Modern icon set |

---

## Questions for You

1. **Ready to start the frontend?** I can scaffold the entire React + Vite project with a premium dark-themed design.
2. **Design preference?** Dark mode / light mode / both? Any color preferences?
3. **Should we use any CSS framework?** I'd recommend vanilla CSS for full control, but happy to use Tailwind if you prefer.
4. **Priority?** Should I build all pages at once, or start with the core flow (Landing → Analyze → Results)?
