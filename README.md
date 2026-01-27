# Next.js Feature Test Dashboard for Firebase App Hosting

A comprehensive test dashboard to verify Next.js features work correctly on Firebase App Hosting as an alternative to Vercel deployment.

## Features Tested

### Core Features
- **Server Components** - Default rendering with server-side data fetching
- **Client Components** - `"use client"` directive with React hooks
- **Server Actions** - `"use server"` mutations without API routes
- **API Routes** - Route Handlers with GET/POST methods
- **Dynamic Routes** - `[slug]` parameter capturing from URLs
- **Image Optimization** - `next/image` with automatic optimization

### Advanced Rendering
- **Static Generation (SSG)** - `generateStaticParams` for build-time rendering
- **Server-Side Rendering (SSR)** - `dynamic = "force-dynamic"` for fresh renders
- **ISR** - Incremental Static Regeneration with `revalidate` option
- **Streaming/Suspense** - React Suspense with progressive loading

### Infrastructure
- **Middleware** - Request/response modification before render
- **Environment Variables** - Build-time and runtime configuration

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- Firebase App Hosting

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the test dashboard.

## Project Structure

```
app/
├── page.tsx                    # Main dashboard
├── components/                 # Shared UI components
│   ├── TestCard.tsx
│   └── TestStatus.tsx
├── tests/                      # Feature test pages
│   ├── server-components/
│   ├── client-components/
│   ├── server-actions/
│   ├── api-routes/
│   ├── dynamic-routes/
│   ├── image-optimization/
│   ├── static-generation/
│   ├── ssr/
│   ├── isr/
│   ├── streaming/
│   ├── middleware/
│   └── env-vars/
└── api/                        # API route handlers
    ├── test/
    └── time/
middleware.ts                   # Middleware configuration
```

## Deployment

This project is configured for Firebase App Hosting. Deploy using:

```bash
firebase deploy
```

## Notes

- Some features (ISR, SSG) behave differently in development vs production mode
- Next.js 16 shows a deprecation warning for middleware in favor of "proxy", but it still functions
- ISR revalidation is set to 30 seconds for testing purposes

## License


MIT License - see [LICENSE](LICENSE) file for details.
