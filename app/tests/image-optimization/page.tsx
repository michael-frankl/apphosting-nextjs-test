import Image from "next/image";
import TestStatus from "@/app/components/TestStatus";

export default function ImageOptimizationTest() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Image Optimization Test
        </h1>
        <TestStatus status="pass" />
      </div>

      <div className="space-y-6">
        <section className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h2 className="font-semibold mb-2">What this tests:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Next.js Image component provides automatic image optimization,
            lazy loading, and responsive sizing. Images are optimized on-demand.
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Local Image (next.svg):</h2>
          <div className="flex items-center justify-center p-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={200}
              height={40}
              className="dark:invert"
              priority
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Priority loaded, 200x40, from /public/next.svg
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Responsive Image:</h2>
          <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              fill
              className="object-contain p-8 dark:invert"
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Fill mode with object-contain, responsive to container
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">External Image (placeholder):</h2>
          <div className="flex items-center justify-center">
            <Image
              src="https://picsum.photos/seed/nextjs/400/200"
              alt="Random placeholder image"
              width={400}
              height={200}
              className="rounded-lg"
              unoptimized
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            External image from picsum.photos (unoptimized to bypass domain config)
          </p>
        </section>

        <section className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold mb-4">Lazy Loaded Images:</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Scroll down to see lazy loading in action (check Network tab):
          </p>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Image
                  src={`https://picsum.photos/seed/test${i}/100/100`}
                  alt={`Lazy image ${i}`}
                  width={100}
                  height={100}
                  className="rounded"
                  unoptimized
                />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Image {i} - Should lazy load
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h2 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Verification:
          </h2>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>- If images display, basic Image component works</li>
            <li>- Check Network tab to verify image optimization (WebP format)</li>
            <li>- Resize browser to test responsive behavior</li>
            <li>- Lazy images should load as you scroll</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
