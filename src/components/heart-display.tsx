"use client";

interface HeartDisplayProps {
  hearts: number;
  maxHearts?: number;
  showCount?: boolean;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`transition-all duration-300 ${
        filled ? "text-rose-500 drop-shadow-sm" : "text-gray-300"
      }`}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? "0" : "2"}
      />
    </svg>
  );
}

export function HeartDisplay({
  hearts,
  maxHearts = 5,
  showCount = true,
}: HeartDisplayProps) {
  return (
    <div className="flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100">
      <HeartIcon filled={hearts > 0} />
      {showCount && (
        <span
          className={`font-semibold text-sm min-w-[1.25rem] text-center ${
            hearts > 0 ? "text-rose-600" : "text-gray-400"
          }`}
        >
          {hearts}
        </span>
      )}
    </div>
  );
}

// Compact version for lesson header
export function HeartDisplayCompact({
  hearts,
  maxHearts = 5,
}: HeartDisplayProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <HeartIcon key={i} filled={i < hearts} />
      ))}
    </div>
  );
}
