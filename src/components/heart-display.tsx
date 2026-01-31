"use client";

interface HeartDisplayProps {
  hearts: number;
  maxHearts?: number;
}

export function HeartDisplay({ hearts, maxHearts = 5 }: HeartDisplayProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <span
          key={i}
          className={`text-xl transition-all ${
            i < hearts ? "opacity-100" : "opacity-30 grayscale"
          }`}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
