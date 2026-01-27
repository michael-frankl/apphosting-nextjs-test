import Link from "next/link";
import TestStatus from "@/app/components/TestStatus";

// Generate static paths at build time
export function generateStaticParams() {
  return [{ id: "page-1" }, { id: "page-2" }, { id: "page-3" }];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StaticPage({ params }: Props) {
  const { id } = await params;
  const generatedAt = new Date().toISOString();

  const pageData: Record<string, { title: string; content: string }> = {
    "page-1": {
      title: "First Static Page",
      content: "This is the first statically generated page.",
    },
    "page-2": {
      title: "Second Static Page",
      content: "This is the second statically generated page.",
    },
    "page-3": {
      title: "Third Static Page",
      content: "This is the third statically generated page.",
    },
  };

  const data = pageData[id] || {
    title: "Unknown Page",
    content: "This page was not pre-generated.",
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {data.title}
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Static Page Data:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Page ID:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Title:</span>
              <span>{data.title}</span>
            </div>
            <div>
              <span className="text-zinc-600 dark:text-zinc-400">Content:</span>
              <p className="mt-1 text-zinc-800 dark:text-zinc-200">
                {data.content}
              </p>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Generated At:
              </span>
              <span className="font-mono text-xs">{generatedAt}</span>
            </div>
          </div>
        </section>

        <section className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h2 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            SSG Verification:
          </h2>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>
              - In production: this timestamp should be the same on every
              refresh
            </li>
            <li>- In dev mode: timestamp changes (pages rendered on-demand)</li>
            <li>
              - Check build logs for &quot;├ /tests/static-generation/[id]&quot;
            </li>
          </ul>
        </section>

        <Link
          href="/tests/static-generation"
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          &larr; Back to SSG Test
        </Link>
      </div>
    </div>
  );
}
