import Link from "next/link";
import TestStatus from "@/app/components/TestStatus";

// This page demonstrates SSG with generateStaticParams
const staticPages = [
  { id: "page-1", title: "First Static Page" },
  { id: "page-2", title: "Second Static Page" },
  { id: "page-3", title: "Third Static Page" },
];

export default function StaticGenerationTest() {
  const buildTime = new Date().toISOString();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Static Generation (SSG) Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Static Generation pre-renders pages at build time using
            generateStaticParams. These pages are served as static HTML with no
            server computation on each request.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Build Information:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Page Generated At:
              </span>
              <span className="font-mono text-xs">{buildTime}</span>
            </div>
            <p className="text-xs text-zinc-500">
              Note: In production with SSG, this timestamp would be fixed at
              build time. In dev mode, it updates on each request.
            </p>
          </div>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Static Pages (via generateStaticParams):</h2>
          <div className="space-y-2">
            {staticPages.map(({ id, title }) => (
              <Link
                key={id}
                href={`/tests/static-generation/${id}`}
                className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div>
                  <span className="font-medium">{title}</span>
                  <p className="text-xs text-zinc-500 font-mono">
                    /tests/static-generation/{id}
                  </p>
                </div>
                <span className="text-zinc-400">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- Click each static page link</li>
            <li>- In production: timestamp should be same across refreshes</li>
            <li>- Run `npm run build` to see pages pre-generated</li>
            <li>- Check build output for &quot;Generating static pages&quot;</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
