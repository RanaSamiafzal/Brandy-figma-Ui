# Brandly - Influencer Marketing Platform

Brandly is a premium influencer marketing platform designed to connect brands with the perfect creators. This project features a robust, visually stunning UI restored from original Figma designs, integrated with a modern React-based refactored architecture.

## 🚀 Features

### Public Pages
- **Interactive Landing Page**: High-conversion landing page with smooth animations.
- **Features Showcase**: Detailed breakdown of platform capabilities.
- **Resource Center**: Blog, Case Studies, and Help Center pages for user education.
- **Company Info**: About Us and Contact pages for brand transparency.

### Authentication Flow
- **Flexible Registration**: Support for both Brand and Influencer account types.
- **Secure Login**: Responsive authentication interface.
- **Password Recovery**: Complete flow including Forgot Password, 6-digit OTP verification, and Password Reset.

### Dashboard & Core Tools
- **Influencer Dashboard**: Overview of recent activity and notifications.
- **Campaign Management**: Tools to track and manage active collaborations.
- **Advanced Matchmaking**: Powerful filtering to find influencers by niche and reach.
- **Analytics**: Data-driven insights for campaign performance.

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **UI Components**: Radix UI & Custom Design System
- **Routing**: React Router v7

## 📂 Project Structure

```bash
src/
├── app/            # Original source files (for reference)
├── components/     # Reusable UI components
│   ├── common/     # Buttons, Inputs, Form elements
│   ├── layout/     # Navbars, Sidebars, Layout wrappers
│   └── ui/         # Specialized Shadcn-based components (OTP, etc.)
├── pages/          # Page-level components
│   ├── auth/       # Login, Register, Forgot Password
│   ├── dashboard/  # Dashboard and Notifications
│   └── features/   # Analytics, Campaign Management, etc.
├── redux/          # Global state management
├── services/       # API integration layer
├── utils/          # Helper functions and styling utilities
└── routes/         # Application routing configuration
```

## 🏁 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🗺️ Application Map

| Route | Description |
|-------|-------------|
| `/` | Landing Page |
| `/login` | User Authentication |
| `/register` | Account Creation |
| `/dashboard` | Main User Dashboard |
| `/features/analytics` | Campaign ROI Tracking |
| `/features/campaigns` | Management Tools |
| `/blog` | News and Updates |
| `/case-studies` | Success Stories |

---

*This project is built with a focus on visual excellence and premium user experience.*