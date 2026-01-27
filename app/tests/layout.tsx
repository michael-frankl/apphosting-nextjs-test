import Link from "next/link";

const navItems = [
  { href: "/tests/server-components", label: "Server Components" },
  { href: "/tests/client-components", label: "Client Components" },
  { href: "/tests/server-actions", label: "Server Actions" },
  { href: "/tests/api-routes", label: "API Routes" },
  { href: "/tests/dynamic-routes", label: "Dynamic Routes" },
  { href: "/tests/image-optimization", label: "Image Optimization" },
  { href: "/tests/static-generation", label: "Static Generation (SSG)" },
  { href: "/tests/ssr", label: "Server-Side Rendering" },
  { href: "/tests/isr", label: "ISR" },
  { href: "/tests/streaming", label: "Streaming/Suspense" },
  { href: "/tests/middleware", label: "Middleware" },
  { href: "/tests/env-vars", label: "Environment Variables" },
];

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4 shrink-0">
        <Link
          href="/"
          className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6 block"
        >
          &larr; Dashboard
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
