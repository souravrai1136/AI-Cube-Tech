# Learnora — Online Learning Platform

> A modern, responsive EdTech platform built with React, Vite, TypeScript, and Tailwind CSS. Learnora enables selling recorded video courses and conducting live mentor-led interactive workshops for students worldwide.

---

## 🚀 Key Highlights & Features

### 1. 🎓 Recorded Course Catalog & Curriculum Player
- **Browse & Filter:** Search by keywords, filter by category and price (Free vs Paid), and sort by popularity, rating, or price.
- **Deep Course Details:** Comprehensive syllabus breakdowns, lecture durations, prerequisites, learning outcomes, instructor bios, and verified student reviews.
- **Dedicated Video Learning Studio (`/learn/:id`):** 
  - Seamless lecture player with custom playback controls.
  - Interactive collapsible curriculum sidebar with lesson completion checkmarks.
  - Previous and Next lecture navigation with progress tracking percentage bar.
  - "Mark as Complete" toggle with instant celebratory toast feedback.

### 2. 🔴 Interactive Live Workshops & Studios (`/live-classes`)
- **Real-time Status Tracking:** Filter sessions by *Live Now*, *Upcoming*, and *Recorded Replays*.
- **Interactive Live Classroom Simulator:**
  - Live stage screen-share simulator with presenter PIP stream.
  - Interactive student chat where you can type and send real messages.
  - Participant attendance list with microphone and speaker status.
  - Studio controls: Mic toggle, camera toggle, hand-raising, and screen sharing.
  - Ready for WebRTC providers (LiveKit, Daily.co, Zoom Video SDK).

### 3. 💳 Simulated Checkout & Enrollment Flow
- Clear, safe simulated purchase flow with simulated latency and transaction IDs.
- Instant enrollment upon completion without charging real funds.
- Automatic wishlist bookmarking and registration toggles.

### 4. 👨‍🎓 Student Learning Dashboard (`/dashboard`)
- Personalized welcome banner and progress stats (Enrolled Courses, Completed Certificates, Registered Live Classes, Wishlist).
- Enrolled course cards with visual progress bars and "Continue Learning" one-click resume buttons.
- My Live Workshops schedule tab.
- Saved wishlist grid.
- Account profile settings editor.

### 5. 🛡️ Platform Admin Dashboard (`/admin`)
- Administrative metrics overview (Illustrative revenue, active students, course count, live sessions).
- **Course Management:** Add new courses with a rich dialog, edit course metadata and pricing, and delete courses with a confirmation dialog.
- **Live Session Coordinator:** One-click status cycling between *Upcoming*, *Live Now*, and *Completed*.
- **Student Cohort Directory:** Inspect enrolled student profiles and course counts.
- **Real-Time Platform Activity Feed:** Audit log of recent registrations, completions, and reviews.

### 6. 🔄 One-Click Demo Role Switcher
- The top header banner features an instant toggle between **Student Demo** and **Admin Demo** modes, allowing immediate exploration of both perspectives without manual re-login.

---

## 🛠️ Tech Stack & Architecture

- **Core:** React 18, Vite 5, TypeScript 5
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Routing:** React Router DOM v6 with route protection and automatic scroll-to-top
- **Icons:** Lucide React
- **Context State Architecture:**
  - `AuthContext`: Manages active user session and demo accounts
  - `EnrollmentContext`: Tracks course enrollments, lesson progress, wishlists, and live class registrations
  - `ToastContext`: Global notification system for instant action feedback
- **Service Layer (Backend-Ready):**
  - `authService.ts`: Mock authentication interface, ready for Supabase / Firebase / Auth0
  - `courseService.ts`: Course catalog, filtering, sorting, and admin CRUD
  - `liveClassService.ts`: Live workshop management and WebRTC integration hooks
  - `enrollmentService.ts`: Progress tracking and wishlist persistence
  - `paymentService.ts`: Simulated checkout service, ready for Stripe Elements or PayPal SDK

---

## 📁 Project Structure

```
Tutorialapp/
├── public/
├── src/
│   ├── assets/              # Static media & assets
│   ├── components/
│   │   ├── common/          # Navbar, Footer, Breadcrumbs, Modal, Badge, StarRating
│   │   ├── layout/          # MainLayout (Header, Outlet, Footer)
│   │   ├── courses/         # CourseCard, CourseFilters, CurriculumAccordion, VideoPlayerModal, PurchaseModal
│   │   ├── live-classes/    # LiveClassCard, LiveClassRoomModal (Interactive Studio)
│   │   └── dashboard/       # EnrolledCourseCard, StatsCard
│   ├── context/             # AuthContext, EnrollmentContext, ToastContext
│   ├── data/                # Realistic mock courses, live classes, categories, stats, testimonials
│   ├── pages/
│   │   ├── HomePage.tsx             # Hero, categories, featured courses, live section, testimonials
│   │   ├── CoursesPage.tsx          # Full course catalog with filters & sorting
│   │   ├── CourseDetailsPage.tsx    # Course overview, syllabus, video preview, checkout
│   │   ├── LiveClassesPage.tsx      # Live workshops directory with tabs & filter
│   │   ├── VideoLearningPage.tsx    # Immersive lesson player with sidebar curriculum
│   │   ├── StudentDashboardPage.tsx # Student portal (courses, progress, wishlist, settings)
│   │   ├── AdminDashboardPage.tsx   # Platform owner portal (CRUD, live classes, metrics)
│   │   ├── LoginPage.tsx            # Login form with quick demo switcher
│   │   ├── SignUpPage.tsx           # Registration form with validation
│   │   ├── ForgotPasswordPage.tsx   # Password reset request flow
│   │   ├── AboutPage.tsx            # Mission, vision, core values, mentor profiles
│   │   ├── ContactPage.tsx          # Contact form with validation & FAQ accordion
│   │   └── NotFoundPage.tsx         # Custom 404 page
│   ├── routes/
│   │   └── AppRoutes.tsx            # Router definitions, scroll restoration, protected routes
│   ├── services/                    # Clean service interfaces for future backend integration
│   ├── types/                       # TypeScript interfaces (Course, Lesson, Instructor, LiveClass, etc.)
│   ├── utils/                       # Utility helpers (formatters, cn)
│   ├── App.tsx                      # Root application with provider tree
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Tailwind directives & custom animations
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💻 Getting Started & Local Development

### 1. Prerequisites
- Node.js (v18.0 or higher recommended; verified on Node v22)
- npm (v9.0 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🔒 Demo Architecture & Production Integration Notes

1. **Authentication:**
   - **Current:** Mock authentication session with pre-configured `Student Demo` and `Admin Demo` accounts.
   - **Production Integration:** Wire `src/services/authService.ts` to Supabase Auth, Firebase Auth, Clerk, or custom JWT authentication endpoints. No passwords or tokens are stored in plain client storage.

2. **Video Streaming & Hosting:**
   - **Current:** Uses standard HTML5 open-source video samples for lecture player demonstrations.
   - **Production Integration:** Wire `previewVideoUrl` and lesson `videoUrl` to Cloudflare Stream, Mux Video, or AWS CloudFront with signed HLS tokens (`.m3u8`).

3. **Live Classrooms:**
   - **Current:** Interactive classroom modal simulation with functional client-side chat, participant lists, and presenter PIP.
   - **Production Integration:** Connect the classroom container to WebRTC conferencing SDKs such as LiveKit, Daily.co, Agora, or Zoom Video SDK.

4. **Payments:**
   - **Current:** Simulated checkout modal confirming orders without processing real cards.
   - **Production Integration:** Connect `src/services/paymentService.ts` to Stripe Checkout Sessions or Stripe Elements with a server-side webhook handler for enrollment verification.

5. **Data Persistence:**
   - **Current:** Non-sensitive preferences, demo enrollments, wishlist items, and admin-added courses persist locally in the browser (`localStorage`).
   - **Production Integration:** Connect `src/services/courseService.ts` and `src/services/enrollmentService.ts` to a PostgreSQL, Supabase, or MongoDB database.

---

## 📄 License
This project is licensed under the MIT License.
