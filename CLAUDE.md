# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

This is a Next.js 16 application using the App Router with Firebase App Hosting deployment configuration. The app serves as a test dashboard for verifying Next.js feature compatibility on Firebase App Hosting.

### Tech Stack
- Next.js 16 with App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4

### Project Structure
- `app/` - Next.js App Router pages and components
  - `app/page.tsx` - Main dashboard showing all feature tests
  - `app/components/` - Shared test UI components (TestCard, TestStatus)
  - `app/tests/` - Feature test pages organized by category
  - `app/api/` - API route handlers
- `middleware.ts` - Middleware for request/response modification
- `apphosting.yaml` - Firebase App Hosting backend configuration (Cloud Run settings)
- `firebase.json` - Firebase project configuration

### Path Aliases
- `@/*` maps to the project root (configured in tsconfig.json)

## Feature Test Dashboard

The app tests the following Next.js features for Firebase App Hosting compatibility:

### Core Features (Priority 1)
| Feature | Route | Status |
|---------|-------|--------|
| Server Components | `/tests/server-components` | Ready |
| Client Components | `/tests/client-components` | Ready |
| Server Actions | `/tests/server-actions` | Ready |
| API Routes | `/tests/api-routes` | Ready |
| Dynamic Routes | `/tests/dynamic-routes` | Ready |
| Image Optimization | `/tests/image-optimization` | Ready |

### Advanced Rendering (Priority 2)
| Feature | Route | Status |
|---------|-------|--------|
| Static Generation (SSG) | `/tests/static-generation` | Ready |
| Server-Side Rendering | `/tests/ssr` | Ready |
| ISR (revalidate: 30s) | `/tests/isr` | Ready |
| use cache (File-Level) | `/tests/use-cache` | Ready |
| Streaming/Suspense | `/tests/streaming` | Ready |

### Infrastructure (Priority 3)
| Feature | Route | Status |
|---------|-------|--------|
| Middleware | `/tests/middleware` | Ready |
| Environment Variables | `/tests/env-vars` | Ready |

### Notes
- **Dev vs Production**: SSG, ISR, and caching behavior differs between `npm run dev` and production builds
- **Middleware**: Next.js 16 shows deprecation warning for middleware in favor of "proxy", but it still functions
- **ISR**: Revalidation set to 30 seconds; verify by checking timestamp changes in production
- **use cache**: Requires `cacheComponents: true` in next.config.ts; default profile: 5 min client stale, 15 min server revalidation
