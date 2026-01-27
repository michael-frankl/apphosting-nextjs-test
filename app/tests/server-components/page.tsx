import TestStatus from "@/app/components/TestStatus";

async function fetchData() {
  // Simulate server-side data fetching
  const startTime = performance.now();
  await new Promise((resolve) => setTimeout(resolve, 100));
  const endTime = performance.now();

  return {
    message: "Data fetched on the server!",
    fetchTime: Math.round(endTime - startTime),
    serverTimestamp: new Date().toISOString(),
    randomNumber: Math.floor(Math.random() * 1000),
    renderTime: Math.round(endTime - startTime),
  };
}

export default async function ServerComponentsTest() {
  const data = await fetchData();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Server Components Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Server Components render on the server by default in Next.js App
            Router. This page fetches data during server render without
            &quot;use client&quot;.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Results:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Server Timestamp:
              </span>
              <span className="font-mono">{data.serverTimestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Random Number (changes on refresh):
              </span>
              <span className="font-mono">{data.randomNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Data Fetch Time:
              </span>
              <span className="font-mono">{data.fetchTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Total Render Time:
              </span>
              <span className="font-mono">{data.renderTime}ms</span>
            </div>
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>
              - If you see a timestamp and random number above, server
              components work
            </li>
            <li>- Refresh the page to see the values change (SSR behavior)</li>
            <li>- No JavaScript is sent to the client for this component</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
