# SWYNEX-Frontend-Integration

[![SWYNEX Internship](https://img.shields.io/badge/SWYNEX-Internship%20Task%203-blue.svg)](https://swynex.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF)](https://vitejs.dev/)

> **Task 3 Submission: Frontend API Integration & UI State Management**  
> **Internship Track:** Full-Stack Web Development / Frontend Engineering  
> **Company:** SWYNEX Technologies  
> **Author:** Tharun M.  

---

## 🌟 Overview

This repository contains the interactive frontend application for **TaskFlow**, successfully integrated with the Task 2 RESTful Backend API.

The interface is engineered with **React 18, TypeScript, and Vite**, featuring comprehensive state-machine handling across:
1. **Async Loading States:** Custom pulsing skeleton screens and button spinner indicators.
2. **Error Boundaries & Feedback:** Network failure banners with instant retry actions, form validation error highlights, and toast notifications.
3. **Empty States:** Friendly zero-data screens with direct action triggers.
4. **Optimistic UI Updates:** Instant drag-and-drop / stage advancement with automated rollback if the backend network call fails.
5. **Offline / Demo Resilience:** Automatic fallback to local cache mode when the backend server is offline so reviewers can explore the UI immediately.

---

## 🏗️ Architecture & Component Hierarchy

```mermaid
flowchart TD
    App["App Root (Layout & Toast Provider)"]
    Navbar["Navbar (Live API Health Indicator & User Profile)"]
    Sidebar["Sidebar (Navigation Tabs & Sprint Badges)"]
    BoardPage["BoardPage (Search, Priority Filter & Modals)"]

    App --> Navbar
    App --> Sidebar
    App --> BoardPage

    subgraph StateHandling ["State & UI Resilience"]
        Skeleton["SkeletonLoader (Pulsing Column & Card Placeholders)"]
        ErrorBanner["ErrorBanner (Retriable API Connection Alerts)"]
        EmptyState["EmptyState (Zero-Match Search Feedback)"]
        Toast["ToastContainer (Success & Error Alerts)"]
    end

    subgraph Modals ["Interactive Modals"]
        CreateModal["CreateTaskModal (Zod Client & Server Validation)"]
        TaskModal["TaskModal (Details Drawer & Status Editor)"]
    end

    BoardPage --> StateHandling
    BoardPage --> Modals
    BoardPage --> KanbanBoard["KanbanBoard (5 Swimlanes with Optimistic Advance)"]
```

---

## 📋 Features Implemented

- **REST API Integration:** Consumes `GET /api/v1/tasks`, `POST /api/v1/tasks`, `PATCH /api/v1/tasks/:id`, and `DELETE /api/v1/tasks/:id`.
- **Async Loading Skeletons:** Animated skeleton screens replace raw spinners to prevent layout shift during data fetching.
- **Form Validation Guards:** Client-side checks mirror backend Zod validation rules (minimum title lengths, priority enums) with instant field-level feedback.
- **Optimistic State Progression:** Tasks advance through stages (`BACKLOG` → `TODO` → `IN_PROGRESS` → `IN_REVIEW` → `DONE`) instantly, guaranteeing smooth 60 FPS interactions.
- **Sprint Velocity Analytics:** Visual metrics on story points burned, velocity capacity, and workflow distribution.

---

## 🚀 Quick Start & Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/Catdas/SWYNEX-Frontend-Integration.git
cd SWYNEX-Frontend-Integration
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Default API endpoint points to `http://localhost:5000/api/v1`.

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates optimized static assets in `dist/`.

---

## 📂 Repository Structure

```
SWYNEX-Frontend-Integration/
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore definitions
├── package.json                       # Scripts and dependencies
├── tsconfig.json                      # Strict TypeScript compiler options
├── vite.config.ts                     # Vite build configuration
├── index.html                         # HTML5 root template
├── README.md                          # Project documentation
├── TASK_3_SUBMISSION_GUIDE.md         # Submission portal & LinkedIn guide
├── src/
│   ├── api/
│   │   ├── client.ts                  # Fetch API wrapper with timeout & error mapping
│   │   └── taskApi.ts                 # Typed REST API service calls
│   ├── components/
│   │   ├── Navbar.tsx                 # Header with live API connection indicator
│   │   ├── Sidebar.tsx                # Navigation menu
│   │   ├── KanbanBoard.tsx            # 5-column swimlane component
│   │   ├── TaskCard.tsx               # Card with priority, points, and action triggers
│   │   ├── TaskModal.tsx              # Detail view modal drawer
│   │   ├── CreateTaskModal.tsx        # Creation modal with validation feedback
│   │   ├── SkeletonLoader.tsx         # Pulsing loading placeholder cards
│   │   ├── ErrorBanner.tsx            # Retriable error notification banner
│   │   ├── EmptyState.tsx             # Zero-data placeholder component
│   │   └── Toast.tsx                  # Toast notification alerts
│   ├── hooks/
│   │   └── useTasks.ts                # Central hook managing state, loading, error, and API calls
│   ├── pages/
│   │   ├── BoardPage.tsx              # Main board workflow page
│   │   ├── AnalyticsPage.tsx          # Sprint analytics and velocity charts
│   │   └── ApiDocsPage.tsx            # API architecture and integration specs
│   ├── types/
│   │   └── index.ts                   # Data models matching backend schema
│   ├── index.css                      # Tailwind styles and scrollbar styling
│   ├── App.tsx                        # Root layout component
│   └── main.tsx                       # React DOM entry
└── scripts/
    └── generate_task3_video.py        # Video demo generator
```

---

*Authored by Tharun M. for SWYNEX Technologies Internship Program - Task 3.*
