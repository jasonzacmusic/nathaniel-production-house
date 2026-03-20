# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nathaniel Production House is a full-stack TypeScript web application for Nathaniel School of Music (Bangalore, India). It provides recording studio services, instrument buying guides, online lesson setup tutorials, a peer-to-peer gear marketplace, and affiliate partner deals.

## Tech Stack

- **Frontend**: React 18 + TypeScript, Wouter routing, TanStack React Query, Tailwind CSS + shadcn/ui
- **Backend**: Express 5, Drizzle ORM, PostgreSQL
- **Build**: Vite (frontend), esbuild (server)

## Commands

```bash
npm run dev        # Start dev server (Express + Vite HMR on port 5000)
npm run build      # Production build
npm start          # Run production build
npm run check      # TypeScript type checking
npm run db:push    # Push Drizzle schema changes to database
```

## Architecture

```
client/src/
├── pages/          # Page components (Home, Instruments, OBSGuide, Marketplace, Partners, Contact, etc.)
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utilities (queryClient, etc.)
└── config/         # Site configuration

server/
├── index.ts        # Server entry, middleware setup
├── routes.ts       # API route handlers
├── storage.ts      # Data layer abstraction
└── vite.ts         # Vite dev middleware

shared/
└── schema.ts       # Drizzle ORM schemas + Zod validation (single source of truth for types)
```

## Key Patterns

- **Type Safety**: Shared schema in `shared/schema.ts` provides Drizzle tables and Zod validators used by both frontend and backend
- **API Routes**: RESTful endpoints at `/api/*` for resources (studio-images, videos, gear-listings, affiliate-partners, contact-messages, instruments, obs-guide-content)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` to `shared/`, `@assets/` to `attached_assets/`
- **Theming**: Dark theme (black/orange/white) via CSS variables in `client/src/index.css`, configured in `tailwind.config.ts`
- **Admin Auth**: Token-based Bearer authentication for admin endpoints

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required)
- `PORT` - Server port (default: 5000)
