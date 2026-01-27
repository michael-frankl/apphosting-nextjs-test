import Link from "next/link";
import TestStatus from "@/app/components/TestStatus";

const testSlugs = [
  { slug: "hello-world", description: "Basic slug" },
  { slug: "test-123", description: "Alphanumeric slug" },
  { slug: "special-chars-test", description: "Hyphenated slug" },
  { slug: "UPPERCASE", description: "Uppercase slug" },
];

export default function DynamicRoutesTest() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Dynamic Routes Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Dynamic routes use [slug] folder naming to capture URL parameters.
            The parameter value is passed to the page component as props.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Test Dynamic Pages:</h2>
          <div className="space-y-2">
            {testSlugs.map(({ slug, description }) => (
              <Link
                key={slug}
                href={`/tests/dynamic-routes/${slug}`}
                className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    /tests/dynamic-routes/{slug}
                  </span>
                  <p className="text-xs text-zinc-500 mt-1">{description}</p>
                </div>
                <span className="text-zinc-400">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- Click each link to test dynamic route handling</li>
            <li>- Each page should display the slug from the URL</li>
            <li>- All slugs should work, including special characters</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
