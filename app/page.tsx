import Link from "next/link";
import TestCard from "@/app/components/TestCard";
import type { Status } from "@/app/components/TestStatus";

interface FeatureTest {
  title: string;
  description: string;
  href: string;
  status: Status;
  category: "core" | "rendering" | "infrastructure";
}

const featureTests: FeatureTest[] = [
  // Priority 1 - Core Features
  {
    title: "Server Components",
    description: "Default rendering with server-side data fetching",
    href: "/tests/server-components",
    status: "pass",
    category: "core",
  },
  {
    title: "Client Components",
    description: '"use client" directive with React hooks',
    href: "/tests/client-components",
    status: "pass",
    category: "core",
  },
  {
    title: "Server Actions",
    description: '"use server" mutations without API routes',
    href: "/tests/server-actions",
    status: "pass",
    category: "core",
  },
  {
    title: "API Routes",
    description: "Route Handlers with GET/POST methods",
    href: "/tests/api-routes",
    status: "pass",
    category: "core",
  },
  {
    title: "Dynamic Routes",
    description: "[slug] parameter capturing from URLs",
    href: "/tests/dynamic-routes",
    status: "pass",
    category: "core",
  },
  {
    title: "Image Optimization",
    description: "next/image with automatic optimization",
    href: "/tests/image-optimization",
    status: "pass",
    category: "core",
  },
  // Priority 2 - Advanced Rendering
  {
    title: "Static Generation (SSG)",
    description: "generateStaticParams for build-time rendering",
    href: "/tests/static-generation",
    status: "pass",
    category: "rendering",
  },
  {
    title: "Server-Side Rendering",
    description: 'dynamic = "force-dynamic" for fresh renders',
    href: "/tests/ssr",
    status: "pass",
    category: "rendering",
  },
  {
    title: "ISR (Incremental Static Regeneration)",
    description: "revalidate option for timed cache refresh",
    href: "/tests/isr",
    status: "pass",
    category: "rendering",
  },
  {
    title: "use cache (File-Level)",
    description: "'use cache' directive for component caching",
    href: "/tests/use-cache",
    status: "pass",
    category: "rendering",
  },
  {
    title: "Streaming / Suspense",
    description: "React Suspense with progressive loading",
    href: "/tests/streaming",
    status: "pass",
    category: "rendering",
  },
  // Priority 3 - Infrastructure
  {
    title: "Middleware",
    description: "Request/response modification before render",
    href: "/tests/middleware",
    status: "pass",
    category: "infrastructure",
  },
  {
    title: "Environment Variables",
    description: "Build-time and runtime env configuration",
    href: "/tests/env-vars",
    status: "pass",
    category: "infrastructure",
  },
];

const categoryLabels = {
  core: "Core Features",
  rendering: "Advanced Rendering",
  infrastructure: "Infrastructure",
};

export default function Dashboard() {
  const categories = ["core", "rendering", "infrastructure"] as const;

  const totalTests = featureTests.length;
  const passedTests = featureTests.filter((t) => t.status === "pass").length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Next.js Feature Test Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Testing Next.js features on Firebase App Hosting
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {passedTests}
              </span>
              <span className="text-zinc-500">/ {totalTests} tests ready</span>
            </div>
            <Link
              href="/tests/server-components"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              Start Testing &rarr;
            </Link>
          </div>
        </header>

        {categories.map((category) => {
          const tests = featureTests.filter((t) => t.category === category);
          return (
            <section key={category} className="mb-10">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
                {categoryLabels[category]}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {tests.map((test) => (
                  <TestCard
                    key={test.href}
                    title={test.title}
                    description={test.description}
                    status={test.status}
                    href={test.href}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <footer className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-sm text-zinc-500 dark:text-zinc-500">
            <p className="mb-2">
              <strong>How to use:</strong> Click each test card to view detailed
              test results. Run <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">npm run build</code> and
              deploy to Firebase App Hosting to test production behavior.
            </p>
            <p>
              <strong>Note:</strong> Some features (ISR, SSG) behave differently
              in development vs production mode.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
