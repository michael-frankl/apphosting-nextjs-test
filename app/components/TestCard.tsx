import Link from "next/link";
import TestStatus, { type Status } from "./TestStatus";

interface TestCardProps {
  title: string;
  description: string;
  status: Status;
  href: string;
  responseTime?: number;
  details?: string;
}

export default function TestCard({
  title,
  description,
  status,
  href,
  responseTime,
  details,
}: TestCardProps) {
  return (
    <Link
      href={href}
      className="block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <TestStatus status={status} />
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
        {description}
      </p>
      {(responseTime !== undefined || details) && (
        <div className="text-xs text-zinc-500 dark:text-zinc-500 space-y-1">
          {responseTime !== undefined && (
            <p>Response time: {responseTime}ms</p>
          )}
          {details && <p>{details}</p>}
        </div>
      )}
    </Link>
  );
}
