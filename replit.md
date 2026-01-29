# Nathaniel Production House

## Overview

Nathaniel Production House is a technology resource website for Nathaniel School of Music, a music school based in Bangalore, India. The platform serves as a comprehensive hub for music students, offering recording studio services, instrument buying guides, online lesson setup tutorials, a peer-to-peer gear marketplace, and affiliate partner deals.

The application is a full-stack TypeScript project using React on the frontend and Express on the backend, with PostgreSQL as the database. It follows a monorepo structure with shared types and schemas between client and server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Build Tool**: Vite with React plugin

The frontend follows a page-based architecture with reusable components. Pages include Home, Instruments (buying guides), OBS Guide (Zoom setup tutorials), Marketplace (used gear), Partners (affiliate deals), and Contact.

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **API Pattern**: RESTful endpoints under `/api/*`
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod for type-safe validation

The server handles API routes for CRUD operations on studio images, videos, gear listings, affiliate partners, and contact messages. In development, Vite middleware serves the frontend with HMR support. In production, static files are served from the built `dist/public` directory.

### Data Storage
- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` contains all Drizzle table definitions
- **Migrations**: Drizzle Kit manages migrations in the `migrations` folder
- **Current Storage**: In-memory storage implementation exists as fallback in `server/storage.ts`

Key data models include:
- Users (authentication with admin flag)
- Studio Images (gallery with captions and features)
- Videos (YouTube embeds categorized by type)
- Gear Listings (marketplace items with price comparisons)
- Affiliate Partners (software/hardware deals)
- Contact Messages (inquiry form submissions)

### Theming
The site uses a dark theme (black/orange/white color scheme) implemented through CSS custom properties. The theme is defined in `client/src/index.css` and configured in `tailwind.config.ts`.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection string via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management
- **connect-pg-simple**: Session storage (available but sessions not currently implemented)

### Frontend Libraries
- **@tanstack/react-query**: Async state management and API caching
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Embla Carousel**: Image/content carousels
- **react-day-picker**: Calendar component
- **react-hook-form**: Form state management
- **wouter**: Client-side routing
- **react-icons**: Icon library (includes brand icons for Spotify, YouTube, etc.)

### Build & Development
- **Vite**: Development server and frontend bundling
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type checking across the entire codebase

### Third-Party Integrations (Planned/Referenced)
- **YouTube**: Video embeds for tutorials and guides
- **Amazon/Bajaao/SoundGlitz**: Price comparison links for gear marketplace
- **Affiliate Programs**: Pianoteq (Modartt), Slate Digital, Native Instruments