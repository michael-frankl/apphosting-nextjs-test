import { headers, cookies } from "next/headers";
import TestStatus from "@/app/components/TestStatus";

export const dynamic = "force-dynamic";

export default async function MiddlewareTest() {
  const headersList = await headers();
  const cookieStore = await cookies();

  // Get middleware-added headers
  const middlewareHeader = headersList.get("x-middleware-test");
  const requestTime = headersList.get("x-request-time");
  const requestPath = headersList.get("x-request-path");

  // Get middleware-set cookie
  const middlewareCookie = cookieStore.get("middleware-visited");

  const middlewareWorking = !!middlewareHeader;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Middleware Test
        </h1>
        <TestStatus status={middlewareWorking ? "pass" : "fail"} />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Middleware runs before a request is completed. It can modify
            request/response headers, rewrite URLs, redirect, and set cookies.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Middleware Headers:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                x-middleware-test:
              </span>
              <span
                className={`font-mono ${
                  middlewareHeader
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {middlewareHeader || "(not set)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                x-request-time:
              </span>
              <span className="font-mono text-xs">
                {requestTime || "(not set)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                x-request-path:
              </span>
              <span className="font-mono text-xs">
                {requestPath || "(not set)"}
              </span>
            </div>
          </div>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Middleware Cookies:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                middleware-visited:
              </span>
              <span
                className={`font-mono ${
                  middlewareCookie
                    ? "text-green-600 dark:text-green-400"
                    : "text-zinc-400"
                }`}
              >
                {middlewareCookie?.value || "(not set - first visit)"}
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Cookie is set on first visit. Refresh to see it.
            </p>
          </div>
        </section>

        <section
          className={`p-4 rounded-lg border ${
            middlewareWorking
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          }`}
        >
          <h2
            className={`font-semibold mb-2 ${
              middlewareWorking
                ? "text-green-800 dark:text-green-200"
                : "text-red-800 dark:text-red-200"
            }`}
          >
            {middlewareWorking ? "Verification:" : "Middleware Not Detected:"}
          </h2>
          <ul
            className={`text-sm space-y-1 ${
              middlewareWorking
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            }`}
          >
            {middlewareWorking ? (
              <>
                <li>- Custom headers are being added by middleware</li>
                <li>- Middleware is executing before this page renders</li>
                <li>- Cookie setting should work after first visit</li>
              </>
            ) : (
              <>
                <li>- Ensure middleware.ts exists in the project root</li>
                <li>- Check that the middleware matcher includes this path</li>
                <li>- Restart the dev server after adding middleware</li>
              </>
            )}
          </ul>
        </section>

        <section className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-2">Middleware Location:</h2>
          <pre className="text-xs overflow-x-auto">
            <code>{`// middleware.ts (project root)
export function middleware(request) { ... }
export const config = { matcher: [...] }`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
