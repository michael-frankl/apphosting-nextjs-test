"use client";

import { useState, useSyncExternalStore } from "react";
import TestStatus from "@/app/components/TestStatus";

// Hydration check using useSyncExternalStore (React 18+ pattern)
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function ClientComponentsTest() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState<number[]>([]);
  const hydrated = useHydrated();

  const handleClick = () => {
    const start = performance.now();
    setCount((c) => c + 1);
    const end = performance.now();
    setClicks((prev) => [...prev.slice(-4), Math.round((end - start) * 100) / 100]);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Client Components Test
        </h1>
        <TestStatus status={hydrated ? "pass" : "pending"} />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Client Components use &quot;use client&quot; directive and enable
            interactivity with React hooks like useState and useEffect.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Interactive Test:</h2>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Click Me
            </button>
            <div className="text-4xl font-bold font-mono">{count}</div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Hydration Status:
              </span>
              <span className={hydrated ? "text-green-500" : "text-yellow-500"}>
                {hydrated ? "Hydrated" : "Pending..."}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Click Count:
              </span>
              <span className="font-mono">{count}</span>
            </div>
            {clicks.length > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Last 5 Click Times:
                </span>
                <span className="font-mono">
                  {clicks.map((t) => `${t}ms`).join(", ")}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- If the button responds to clicks, client components work</li>
            <li>- Hydration status shows client-side JavaScript executed</li>
            <li>- Counter state persists across clicks</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
