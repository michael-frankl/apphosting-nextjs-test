"use client";

import { useState } from "react";
import TestStatus from "@/app/components/TestStatus";

interface ApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  method: string;
  receivedData?: Record<string, unknown>;
}

export default function ApiRoutesTest() {
  const [getResult, setGetResult] = useState<ApiResponse | null>(null);
  const [postResult, setPostResult] = useState<ApiResponse | null>(null);
  const [getTime, setGetTime] = useState<number | null>(null);
  const [postTime, setPostTime] = useState<number | null>(null);
  const [loading, setLoading] = useState({ get: false, post: false });

  async function testGet() {
    setLoading((l) => ({ ...l, get: true }));
    const start = performance.now();

    try {
      const res = await fetch("/api/test");
      const data = await res.json();
      setGetResult(data);
      setGetTime(Math.round(performance.now() - start));
    } catch {
      setGetResult({
        success: false,
        message: "Failed to fetch",
        timestamp: new Date().toISOString(),
        method: "GET",
      });
    } finally {
      setLoading((l) => ({ ...l, get: false }));
    }
  }

  async function testPost() {
    setLoading((l) => ({ ...l, post: true }));
    const start = performance.now();

    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testData: "Hello from client", timestamp: Date.now() }),
      });
      const data = await res.json();
      setPostResult(data);
      setPostTime(Math.round(performance.now() - start));
    } catch {
      setPostResult({
        success: false,
        message: "Failed to fetch",
        timestamp: new Date().toISOString(),
        method: "POST",
      });
    } finally {
      setLoading((l) => ({ ...l, post: false }));
    }
  }

  const status = getResult?.success && postResult?.success ? "pass" :
                 getResult?.success || postResult?.success ? "partial" : "pending";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          API Routes Test
        </h1>
        <TestStatus status={status} />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Route Handlers in App Router allow you to create API endpoints using
            route.ts files with HTTP method exports (GET, POST, etc.).
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">GET /api/test</h2>

          <button
            onClick={testGet}
            disabled={loading.get}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors mb-4"
          >
            {loading.get ? "Loading..." : "Test GET"}
          </button>

          {getResult && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Success:</span>
                <span className={getResult.success ? "text-green-500" : "text-red-500"}>
                  {getResult.success ? "true" : "false"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Message:</span>
                <span className="font-mono text-xs">{getResult.message}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Response Time:</span>
                <span className="font-mono">{getTime}ms</span>
              </div>
            </div>
          )}
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">POST /api/test</h2>

          <button
            onClick={testPost}
            disabled={loading.post}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium rounded-md transition-colors mb-4"
          >
            {loading.post ? "Loading..." : "Test POST"}
          </button>

          {postResult && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Success:</span>
                <span className={postResult.success ? "text-green-500" : "text-red-500"}>
                  {postResult.success ? "true" : "false"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Message:</span>
                <span className="font-mono text-xs">{postResult.message}</span>
              </div>
              {postResult.receivedData && (
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Echo:</span>
                  <span className="font-mono text-xs truncate max-w-[200px]">
                    {JSON.stringify(postResult.receivedData)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Response Time:</span>
                <span className="font-mono">{postTime}ms</span>
              </div>
            </div>
          )}
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- If both buttons return success, API routes work</li>
            <li>- POST should echo back the sent data</li>
            <li>- Timestamps prove server-side execution</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
