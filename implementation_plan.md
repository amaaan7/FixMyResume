# FixMyResume Frontend — Implementation Plan

## Goal

Build a premium, polished React + Tailwind CSS frontend that connects to the existing Django backend. The app should feature dark/light mode, smooth animations, and an intuitive UX — matching the quality described in the project description.

## User Review Required

> [!IMPORTANT]
> **Tailwind CSS Version**: I recommend **Tailwind CSS v3** (stable, excellent docs, huge ecosystem). Tailwind v4 exists but is newer and has breaking changes. Which version do you want?

> [!IMPORTANT]
> **Step-by-step approach**: Each phase below is designed as a learning milestone. We'll build one phase at a time, you can review and understand the code, and then we move to the next.

---

## Proposed Changes — Phase by Phase

### Phase 1: Project Scaffolding
> **What you'll learn**: Vite setup, Tailwind config, project structure, React Router basics

Set up the React project foundation:

- Initialize Vite + React project in `frontend/`
- Install and configure Tailwind CSS
- Install dependencies: `react-router-dom`, `axios`, `lucide-react`, `framer-motion`
- Set up folder structure:

```
frontend/
├── src/
│   ├── api/            # Axios instance + API service functions
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Buttons, inputs, cards, etc.
│   │   └── layout/     # Navbar, Footer, ThemeToggle
│   ├── context/        # AuthContext, ThemeContext
│   ├── hooks/          # Custom hooks (useAuth, useTheme)
│   ├── pages/          # Page components
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Router + layout
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind directives + custom styles
├── tailwind.config.js
├── package.json
└── index.html
```

---

### Phase 2: Design System & Layout
> **What you'll learn**: Tailwind theming, CSS variables for dark/light mode, component composition

Build the core design pieces:

| Component | Description |
|-----------|-------------|
| **`ThemeContext`** | React context for dark/light mode toggle, persisted to localStorage |
| **`Navbar`** | Logo, nav links (Analyze, Dashboard), theme toggle, auth buttons |
| **`Footer`** | Simple branded footer |
| **`Layout`** | Wraps all pages with Navbar + Footer |
| **UI components** | Button, Card, Input, Badge — all theme-aware |

**Design tokens** (Tailwind config):
- **Primary**: Indigo/violet gradient (`#6366f1` → `#8b5cf6`)
- **Dark mode**: Slate-900/950 backgrounds with subtle glass effects
- **Light mode**: Clean whites/grays with colored accents
- **Typography**: Inter font from Google Fonts
- **Border radius**: Rounded-xl for cards, rounded-lg for inputs
- **Animations**: Smooth fade-in, slide-up on page load

---

### Phase 3: Landing Page (`/`)
> **What you'll learn**: Responsive layout, gradient text, animated sections, CTA design

| Section | Content |
|---------|---------|
| **Hero** | Big gradient headline "Fix Your Resume with AI", subtitle, animated CTA button → `/analyze` |
| **Stats bar** | "35% avg improvement", "5s analysis time", "ATS optimized" |
| **Features grid** | 3 cards: AI Analysis, Keyword Matching, Smart Rewriting — with icons |
| **How it works** | 3-step visual: Upload → Analyze → Improve |
| **CTA bottom** | "Ready to fix your resume?" button |

---

### Phase 4: Auth Pages (`/login`, `/register`)
> **What you'll learn**: Form handling, JWT storage, auth context, protected routes

| Page | Fields | Behavior |
|------|--------|----------|
| **Register** | Name, Email, Password | POST `/api/auth/register/` → store tokens → redirect to `/analyze` |
| **Login** | Email, Password | POST `/api/auth/login/` → store tokens → redirect to `/dashboard` |

**Auth architecture:**
- `AuthContext` stores user + tokens in state
- Tokens saved to `localStorage`
- Axios interceptor auto-attaches `Authorization: Bearer <token>` header
- Axios interceptor auto-refreshes expired tokens via `/api/auth/refresh/`
- `ProtectedRoute` component redirects to `/login` if not authenticated

---

### Phase 5: Analyze Page (`/analyze`) ⭐ Core Feature
> **What you'll learn**: File upload, multipart form data, loading states, error handling

| Element | Description |
|---------|-------------|
| **Resume upload zone** | Drag-and-drop area with file icon, accepts PDF/DOCX, shows selected file name |
| **Job description textarea** | Large textarea with character count, placeholder with example |
| **Analyze button** | Gradient button, disabled until both inputs provided |
| **Loading state** | Full-screen overlay with animated spinner + "Analyzing your resume..." text |
| **Error handling** | Toast notifications for validation errors |

POST to `/api/analyzer/analyze/` with `multipart/form-data` → on success, redirect to `/results/:id`

---

### Phase 6: Results Page (`/results/:id`) ⭐ Most Complex
> **What you'll learn**: Data visualization, conditional rendering, dynamic UI, API integration

| Section | Visualization |
|---------|---------------|
| **Score overview** | Two large circular gauge charts — Match Score & ATS Score |
| **Section scores** | Horizontal progress bars for Summary, Skills, Experience, Education |
| **Keywords** | Two columns: ✅ Found Keywords (green chips) / ❌ Missing Keywords (red chips) |
| **Feedback** | Expandable accordion cards per section with AI feedback text |
| **Weak bullets** | List of weak bullet points with "🔄 Rewrite with AI" button next to each |
| **Rewrite modal** | Click rewrite → loading → show original vs. rewritten side-by-side |

---

### Phase 7: Dashboard (`/dashboard`) + Profile (`/profile`)
> **What you'll learn**: Charts, data fetching, list rendering, user data display

**Dashboard:**
- Score history line chart (match + ATS scores over time) using **Recharts**
- List of past analyses as cards (score, date, link to full results)
- Delete analysis with confirmation modal

**Profile:**
- User info (name, email, join date)
- Total analyses count
- Logout button

---

## Open Questions

1. **Tailwind v3 or v4?** (I recommend v3 for stability)
2. **Color scheme**: The indigo/violet gradient I proposed — good? Or do you prefer another palette?
3. **Should we start with Phase 1 now?** I'll scaffold the project and explain each part as we go.

## Verification Plan

### After each phase:
- Run `npm run dev` and verify the UI in the browser
- Test responsiveness (mobile/tablet/desktop)
- Verify dark/light mode toggle works

### After all phases:
- Full end-to-end test: Register → Login → Analyze resume → View results → Rewrite bullet → Check dashboard
- Verify all API calls work with the Django backend running
- Test JWT token refresh flow
- Responsive design check on all pages
