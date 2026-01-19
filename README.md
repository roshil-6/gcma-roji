# GCMA & Social Welfare Website

A modern, high-trust, social-service focused website built with Next.js, featuring a black & gold luxury design with glassmorphism effects and animated hexagonal backgrounds.

## Features

- **Hero Section**: Organization branding with call-to-action buttons
- **Immigration Fraud Complaint Portal**: Secure form for reporting fraudulent immigration agencies
- **Humanitarian Aid & Welfare Programs**: 
  - Medical Assistance for the Underprivileged
  - Educational Support for Girl Students
- **Break the Silence**: English communication skills initiative with Student and Tutor applications

## Design Highlights

- **Theme**: Black & Gold (luxury + authority + justice)
- **Background**: Glassy deep black with animated hexagonal particles
- **UI Style**: Advanced tech + social trust + seriousness
- **Effects**: Parallax mouse interactions, hover glows, smooth transitions
- **Responsive**: Fully optimized for desktop and mobile devices

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── HexagonBackground.tsx      # Animated hexagonal background
│   ├── Hero.tsx                   # Hero section
│   ├── ImmigrationFraudSection.tsx
│   ├── HumanitarianAidSection.tsx
│   └── BreakTheSilenceSection.tsx
└── package.json
```

## Key Components

- **HexagonBackground**: Canvas-based animated hexagonal particles with mouse parallax effects
- **Glassmorphism Cards**: Transparent cards with backdrop blur and gold borders
- **Form Components**: Professional, validated forms for all service applications
- **Smooth Scrolling**: Section navigation with smooth scroll behavior

## Customization

- Colors: Edit `tailwind.config.ts` for gold color variations
- Styles: Modify `app/globals.css` for glassmorphism and animation effects
- Content: Update component files to modify text and form fields

## License

This project is created for GCMA & Social Welfare organization.
