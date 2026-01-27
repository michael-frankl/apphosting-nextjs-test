"use client";

import { useState } from "react";
import TestStatus from "@/app/components/TestStatus";
import { testServerAction } from "./actions";

export default function ServerActionsTest() {
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    serverTimestamp: string;
    receivedData: string;
    processingTime: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const start = performance.now();

    try {
      const res = await testServerAction(formData);
      const end = performance.now();
      setResponseTime(Math.round(end - start));
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Server Actions Test
        </h1>
        <TestStatus status={result ? "pass" : "pending"} />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Server Actions use &quot;use server&quot; directive and allow form
            submissions and mutations to run on the server without API routes.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Test Form:</h2>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Test Message:
              </label>
              <input
                type="text"
                name="message"
                defaultValue="Hello from client!"
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors"
            >
              {loading ? "Processing..." : "Submit Server Action"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
              Error: {error}
            </div>
          )}

          {result && (
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Success:
                </span>
                <span className="font-mono">
                  {result.success ? "true" : "false"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Server Timestamp:
                </span>
                <span className="font-mono">{result.serverTimestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Received Data:
                </span>
                <span className="font-mono">{result.receivedData}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Server Processing:
                </span>
                <span className="font-mono">{result.processingTime}ms</span>
              </div>
              {responseTime && (
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Round Trip Time:
                  </span>
                  <span className="font-mono">{responseTime}ms</span>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- If form submission returns server data, server actions work</li>
            <li>- The server timestamp proves execution happened on server</li>
            <li>- No manual API route needed for this form</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
