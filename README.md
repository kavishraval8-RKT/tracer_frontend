# Tracer - Frontend Application

A complete, multi-page Next.js application for Tracer, an AI-powered KiCad plugin for PCB design.

## Tech Stack

- **Framework**: Next.js 16.3.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 13.2.0
- **Fonts**: Geist Sans & Geist Mono

## Design Language

**Stealth AI / Cluely Aesthetic (Brutalist, minimalist)**

- Background: `#000000` (Pitch black)
- Primary Text: `#FFFFFF` (Pure white)
- Secondary Text: `#888888` (Slate gray)
- Borders: `#222222` (Dark gray, 1px solid)
- Border radius: Max 4px (sharp edges)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Pages Implemented (14 Total)

✅ **Home** (`/`) - Hero, interactive console, AI models, capabilities
✅ **About** (`/about`) - Company story, values, timeline
✅ **Blog** (`/blog`) - Article listings
✅ **Pricing** (`/pricing`) - 4-tier pricing with Monthly/Yearly toggle
✅ **Download** (`/download`) - OS-specific downloads (Windows, macOS, Linux)
✅ **Instructions** (`/instructions`) - Installation guide
✅ **Contact** (`/contact`) - Contact form
✅ **KiCad AI** (`/kicad-ai`) - Product details
✅ **Billing** (`/billing`) - Subscription management
✅ **Login** (`/login`) - User authentication
✅ **Register** (`/register`) - Account creation
✅ **Terms** (`/terms`) - Terms of Service
✅ **Privacy** (`/privacy`) - Privacy Policy
✅ **Refund** (`/refund`) - Refund Policy

## Components

- `Header.tsx` - Global navigation with mobile menu
- `Footer.tsx` - Footer with Product, Company, Connect sections
- `InteractiveConsole.tsx` - Terminal-style AI console
- `ModelGrid.tsx` - AI model cards (Claude 4, GPT-5, Gemini 3, Ohm)
- `CapabilitiesGrid.tsx` - Feature showcase

## Key Features

- **Zero Broken Links**: Every href points to a real, implemented page
- **Exact Data Match**: All content uses exact specifications
- **Mobile Responsive**: Works on all screen sizes
- **Brutalist Design**: Clean, minimal, high-contrast UI
- **21st.dev Ready**: Built for easy integration of advanced animations

## AI Models Supported

1. **Claude 4** (ANTHROPIC)
2. **GPT-5** (OPENAI)
3. **Gemini 3** (GOOGLE)
4. **Ohm** - formerly Electrode 1.0 (TRACER / OUR MODEL)

---

**© 2024 - 2026 Tracer. All rights reserved.**
