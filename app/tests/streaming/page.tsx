import { Suspense } from "react";
import TestStatus from "@/app/components/TestStatus";

// Simulate slow data loading
async function loadSlowData(delay: number) {
  const start = performance.now();
  await new Promise((resolve) => setTimeout(resolve, delay));
  return {
    loadTime: Math.round(performance.now() - start),
    loadedAt: new Date().toISOString(),
  };
}

// Slow component that takes time to load
async function SlowComponent({ delay, label }: { delay: number; label: string }) {
  const data = await loadSlowData(delay);

  return (
    <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-green-500 font-bold">Loaded!</span>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {label}
        </span>
      </div>
      <div className="text-sm space-y-1">
        <p>
          <span className="text-zinc-500">Simulated delay:</span>{" "}
          <span className="font-mono">{delay}ms</span>
        </p>
        <p>
          <span className="text-zinc-500">Actual load time:</span>{" "}
          <span className="font-mono">{data.loadTime}ms</span>
        </p>
        <p>
          <span className="text-zinc-500">Loaded at:</span>{" "}
          <span className="font-mono text-xs">{data.loadedAt}</span>
        </p>
      </div>
    </div>
  );
}

function LoadingFallback({ label }: { label: string }) {
  return (
    <div className="p-4 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-lg animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-600 dark:text-zinc-400">
          Loading {label}...
        </span>
      </div>
    </div>
  );
}

export default function StreamingTest() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Streaming / Suspense Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            React Suspense with streaming allows parts of the page to load
            progressively. Components wrapped in Suspense show a fallback while
            loading, then stream in when ready.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Streaming Components:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Watch these components load progressively with different delays:
          </p>

          <div className="space-y-4">
            <Suspense fallback={<LoadingFallback label="Fast Component" />}>
              <SlowComponent delay={500} label="Fast Component (500ms)" />
            </Suspense>

            <Suspense fallback={<LoadingFallback label="Medium Component" />}>
              <SlowComponent delay={1500} label="Medium Component (1500ms)" />
            </Suspense>

            <Suspense fallback={<LoadingFallback label="Slow Component" />}>
              <SlowComponent delay={3000} label="Slow Component (3000ms)" />
            </Suspense>
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- If you see loading spinners that transition to content: streaming works</li>
            <li>- Components should load in order: Fast → Medium → Slow</li>
            <li>- Page shell loads immediately, content streams in</li>
            <li>- Refresh to see the loading sequence again</li>
          </ul>
        </section>

        <section className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-2">Code Pattern:</h2>
          <pre className="text-xs overflow-x-auto">
            <code>{`<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
