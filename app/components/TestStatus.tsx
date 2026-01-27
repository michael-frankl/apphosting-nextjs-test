export type Status = "pass" | "fail" | "partial" | "pending";

interface TestStatusProps {
  status: Status;
  label?: string;
}

const statusConfig = {
  pass: {
    color: "bg-green-500",
    text: "Pass",
    icon: "✓",
  },
  fail: {
    color: "bg-red-500",
    text: "Fail",
    icon: "✗",
  },
  partial: {
    color: "bg-yellow-500",
    text: "Partial",
    icon: "~",
  },
  pending: {
    color: "bg-gray-400",
    text: "Pending",
    icon: "?",
  },
};

export default function TestStatus({ status, label }: TestStatusProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <span
        className={`${config.color} text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center`}
      >
        {config.icon}
      </span>
      <span className="text-sm font-medium">{label ?? config.text}</span>
    </div>
  );
}
