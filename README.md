# PulseLink — Emergency Blood Coordination Platform

PulseLink is a real-time emergency coordination platform that connects hospital trauma units directly with verified nearby blood donors. Designed for high-urgency emergency dispatch, the platform replaces slow phone chains with geofenced alert broadcasts, live routing telemetry, and a clinic verification system.

The project features a role-tailored web interface built with Next.js (App Router), Tailwind CSS, and Zustand. It includes a desktop-optimized hospital command center, a responsive mobile frame for donors, live tracking with check-in validation, campus gamification dashboards, and an NDPR-compliant system control portal.

---

## Key Features & User Portals

### 🏥 Hospital Command Center (`/hospital`)

- **Emergency Dispatcher**: Form controls to select blood type, required units, urgency level (`CRITICAL` / `HIGH`), and geofence radius (3 km, 5 km, 10 km).
- **Dynamic Radar Display**: Visual scanning radar that animates active donor matching within the selected radius.
- **Audit & Dispatch Records**: Real-time fulfillment logs and historical transaction tracking.

### 📱 Donor Mobile Experience (`/donor`)

- **Responsive Mobile Framing**: Displays inside a centered phone frame on desktop monitors and expands full-screen on mobile devices.
- **Universal Donor Profile**: Features John Doe's profile, O- Universal Donor status, and Tier 2 ID Verification badge.
- **Emergency Dispatch Modal**: High-urgency alert banner with a 3-minute acceptance window and dynamic proximity metrics (1.8 km, 3.2 km, 7.4 km) mapped to the hospital geofence.

### ⏱️ Live Fulfillment & Tracking (`/tracking/[dispatchId]`)

- **Coordination Feed**: Shared tracking hub for both hospital triage staff and navigating donors.
- **Progress Tracker & Timer**: 4-stage pipeline (*Broadcasted* → *Accepted* → *En Route* → *Checked In*) accompanied by a live 12-minute ETA countdown.
- **Clinic Verification**: Unique check-in token (`PL-8890`) display with interactive check-in validation that updates global state to `FULFILLED`.

### 🏆 Campus Impact & Gamification (`/donor/impact`)

- **Department Leaderboard**: Live rankings across university faculties (e.g., FUTO Computer Science).
- **Personal Impact Wallet**: Tracks lifetime units donated, lives saved, impact points, and unlocked achievement badges.

### ⚙️ System Telemetry & Control Engine (`/dev`)

- **Real-time Event Bus**: Monitored dispatch log stream tracking emergency events and status transitions in real time.
- **Verification Queue**: Administrative review panel for validating uploaded student matric IDs and national identity documents.
- **NDPR Privacy Shield**: Anonymized distance vectors protecting donor PII and raw location coordinates.

---

## Tech Stack & Architecture

- **Framework**: Next.js (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Design Tokens**: Dark Clinical Theme (Base: `#0B0F19`, Crimson Accent: `#FF2A4B`, Success: `#10B981`, Amber: `#F59E0B`, Cyan: `#06B6D4`)
- **State Management**: Centralized Zustand store (`useEmergencyStore`) handling cross-portal dispatch synchronization

---

## Getting Started Locally

### Prerequisites

- Node.js 18.x or later installed on your machine
- npm, pnpm, or yarn package manager

## Application Route Structure

app/
├── page.tsx                  # Public Landing Page & Portal Launcher
├── hospital/
│   └── page.tsx              # Hospital Command Center & Dispatch Form
├── donor/
│   ├── page.tsx              # Donor Mobile Portal & Alert Modal
│   └── impact/
│       └── page.tsx          # Campus Leaderboard & Impact Wallet
├── tracking/
│   └── [dispatchId]/
│       └── page.tsx          # Live Fulfillment Tracking & Token Verification
└── dev/
    └── page.tsx              # System Telemetry, Verification Queue & Audit Logs
