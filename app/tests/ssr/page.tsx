import TestStatus from "@/app/components/TestStatus";

// Force dynamic rendering - no caching
export const dynamic = "force-dynamic";

async function getServerData() {
  const start = Date.now();

  // Simulate database/API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    timestamp: new Date().toISOString(),
    randomValue: Math.floor(Math.random() * 10000),
    processingTime: Date.now() - start,
    serverInfo: {
      nodeVersion: process.version,
      platform: process.platform,
    },
  };
}

export default async function SSRTest() {
  const data = await getServerData();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Server-Side Rendering (SSR) Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Server-Side Rendering with <code>dynamic = &apos;force-dynamic&apos;</code> ensures
            the page is rendered fresh on every request. No caching or static
            generation occurs.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Server-Generated Data:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Server Timestamp:
              </span>
              <span className="font-mono text-xs">{data.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Random Value:
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {data.randomValue}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Processing Time:
              </span>
              <span className="font-mono">{data.processingTime}ms</span>
            </div>
          </div>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Server Environment:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Node Version:
              </span>
              <span className="font-mono">{data.serverInfo.nodeVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Platform:</span>
              <span className="font-mono">{data.serverInfo.platform}</span>
            </div>
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>
              - Refresh the page multiple times - timestamp and random value
              should change
            </li>
            <li>- This proves the page is rendered fresh each time (no cache)</li>
            <li>
              - Server environment info shows this runs on the server, not
              client
            </li>
          </ul>
        </section>

        <section className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-2">Code Used:</h2>
          <pre className="text-xs overflow-x-auto">
            <code>{`export const dynamic = "force-dynamic";`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
