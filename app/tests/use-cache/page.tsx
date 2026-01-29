'use cache'

import TestStatus from "@/app/components/TestStatus";

async function getCachedData() {
  const generatedAt = new Date();

  return {
    generatedAt: generatedAt.toISOString(),
    randomId: Math.random().toString(36).substring(7),
  };
}

export default async function UseCacheTest() {
  const data = await getCachedData();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          File-Level &apos;use cache&apos; Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            The <code className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">&apos;use cache&apos;</code> directive
            at the file level marks all exports in the file as cacheable. Default cache profile:
            5 min client-side stale time, 15 min server-side revalidation.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Cache Information:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Cache Type:
              </span>
              <span className="font-mono font-bold">File-level &apos;use cache&apos;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Page Generated At:
              </span>
              <span className="font-mono text-xs">{data.generatedAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Cache ID:
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                {data.randomId}
              </span>
            </div>
          </div>
        </section>

        <section className="p-4 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h2 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            How to Test:
          </h2>
          <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2 list-decimal list-inside">
            <li>Note the &quot;Generated At&quot; timestamp and Cache ID</li>
            <li>Refresh the page multiple times</li>
            <li>In production: values should remain cached for ~5 min (client)</li>
            <li>The entire page output is cached due to file-level directive</li>
          </ol>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- If values stay the same on refresh: caching works</li>
            <li>- Dev mode may not cache; test in production for true behavior</li>
            <li>- Requires <code className="bg-green-200 dark:bg-green-800 px-1 rounded">cacheComponents: true</code> in next.config</li>
          </ul>
        </section>

        <section className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-2">Code Used:</h2>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
            <code>{`// At the top of the file:
'use cache'

// next.config.ts:
cacheComponents: true`}</code>
          </pre>
        </section>

        <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h2 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Related APIs:
          </h2>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>- <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">cacheLife()</code> - Define cache duration profile</li>
            <li>- <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">cacheTag()</code> - Tag for on-demand revalidation</li>
            <li>- Can also be used at function/component level</li>
          </ul>
        </section>
      </div>
    </div>
  );
}