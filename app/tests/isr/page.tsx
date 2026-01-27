import TestStatus from "@/app/components/TestStatus";

// Revalidate every 30 seconds
export const revalidate = 30;

async function getTimedData() {
  const generatedAt = new Date();

  return {
    generatedAt: generatedAt.toISOString(),
    generatedAtUnix: generatedAt.getTime(),
    expiresAt: new Date(generatedAt.getTime() + 30000).toISOString(),
    randomId: Math.random().toString(36).substring(7),
  };
}

export default async function ISRTest() {
  const data = await getTimedData();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Incremental Static Regeneration (ISR) Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            ISR allows static pages to be regenerated after a specified time
            interval. The page is served from cache, then regenerated in the
            background when the revalidation period expires.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Cache Information:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Revalidate Interval:
              </span>
              <span className="font-mono font-bold">30 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Page Generated At:
              </span>
              <span className="font-mono text-xs">{data.generatedAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Cache Expires At:
              </span>
              <span className="font-mono text-xs">{data.expiresAt}</span>
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
            How to Test ISR:
          </h2>
          <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2 list-decimal list-inside">
            <li>Note the &quot;Generated At&quot; timestamp and Cache ID</li>
            <li>Refresh immediately - values should stay the same (cached)</li>
            <li>Wait 30+ seconds, then refresh</li>
            <li>First refresh after 30s triggers background regeneration</li>
            <li>Second refresh shows new values (regenerated page)</li>
          </ol>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- If values stay same within 30s: caching works</li>
            <li>- If values change after 30s: revalidation works</li>
            <li>
              - Note: Dev mode always re-renders, test in production for true
              ISR
            </li>
          </ul>
        </section>

        <section className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-2">Code Used:</h2>
          <pre className="text-xs overflow-x-auto">
            <code>{`export const revalidate = 30; // seconds`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
