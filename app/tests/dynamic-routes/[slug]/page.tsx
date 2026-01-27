import Link from "next/link";
import TestStatus from "@/app/components/TestStatus";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const timestamp = new Date().toISOString();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Dynamic Route: {slug}
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Route Parameters:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Captured Slug:
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {slug}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Full Path:
              </span>
              <span className="font-mono">/tests/dynamic-routes/{slug}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Render Timestamp:
              </span>
              <span className="font-mono text-xs">{timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Slug Length:
              </span>
              <span className="font-mono">{slug.length} chars</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                URL Decoded:
              </span>
              <span className="font-mono">{decodeURIComponent(slug)}</span>
            </div>
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Test Passed!
          </h2>
          <p className="text-sm text-green-700 dark:text-green-300">
            The dynamic route successfully captured the slug parameter from the
            URL and rendered this page.
          </p>
        </section>

        <Link
          href="/tests/dynamic-routes"
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          &larr; Back to Dynamic Routes Test
        </Link>
      </div>
    </div>
  );
}
