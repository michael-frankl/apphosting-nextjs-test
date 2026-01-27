export default function Loading() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Loading Streaming Test...
        </h1>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
        </div>

        <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
