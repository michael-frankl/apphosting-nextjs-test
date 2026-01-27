import TestStatus from "@/app/components/TestStatus";

export const dynamic = "force-dynamic";

export default function EnvVarsTest() {
  // Server-side environment variables
  const serverEnvVars = {
    NODE_ENV: process.env.NODE_ENV,
    // Public env vars (available on client too)
    NEXT_PUBLIC_TEST_VAR: process.env.NEXT_PUBLIC_TEST_VAR,
    // Private env vars (server only)
    TEST_SECRET: process.env.TEST_SECRET,
    // Common deployment vars
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    // Firebase specific
    FIREBASE_CONFIG: process.env.FIREBASE_CONFIG ? "(set)" : undefined,
    K_SERVICE: process.env.K_SERVICE, // Cloud Run service name
    K_REVISION: process.env.K_REVISION, // Cloud Run revision
  };

  const definedVars = Object.entries(serverEnvVars).filter(([, v]) => v !== undefined);
  const hasEnvVars = definedVars.length > 1; // More than just NODE_ENV

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Environment Variables Test
        </h1>
        <TestStatus status={hasEnvVars ? "pass" : "partial"} />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Environment variables can be accessed at build time and runtime.
            Variables prefixed with NEXT_PUBLIC_ are exposed to the browser.
            Server-only variables are only accessible in Server Components and
            API routes.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Server Environment Variables:</h2>
          <div className="space-y-3 text-sm">
            {Object.entries(serverEnvVars).map(([key, value]) => (
              <div key={key} className="flex justify-between items-start">
                <span className="text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                  {key}:
                </span>
                <span
                  className={`font-mono text-xs max-w-[300px] truncate ${
                    value
                      ? "text-green-600 dark:text-green-400"
                      : "text-zinc-400"
                  }`}
                >
                  {value || "(not set)"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Firebase App Hosting Variables:</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                K_SERVICE (Cloud Run):
              </span>
              <span
                className={`font-mono text-xs ${
                  serverEnvVars.K_SERVICE
                    ? "text-green-600 dark:text-green-400"
                    : "text-zinc-400"
                }`}
              >
                {serverEnvVars.K_SERVICE || "(not on Cloud Run)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                K_REVISION:
              </span>
              <span
                className={`font-mono text-xs ${
                  serverEnvVars.K_REVISION
                    ? "text-green-600 dark:text-green-400"
                    : "text-zinc-400"
                }`}
              >
                {serverEnvVars.K_REVISION || "(not on Cloud Run)"}
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            These are automatically set when running on Firebase App Hosting
            (Cloud Run).
          </p>
        </section>

        <section className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h2 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            How to Test Custom Variables:
          </h2>
          <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2 list-decimal list-inside">
            <li>
              Create a <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">.env.local</code> file
            </li>
            <li>
              Add: <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">NEXT_PUBLIC_TEST_VAR=hello</code>
            </li>
            <li>
              Add: <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">TEST_SECRET=secret123</code>
            </li>
            <li>Restart the dev server</li>
            <li>Refresh this page to see the values</li>
          </ol>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- NODE_ENV should always be set</li>
            <li>- K_SERVICE/K_REVISION appear on Firebase App Hosting</li>
            <li>- Custom vars appear when .env.local is configured</li>
            <li>- Server-only vars (TEST_SECRET) should NOT be in page source</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
