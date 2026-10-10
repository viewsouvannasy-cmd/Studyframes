import type { Icon } from "../../../types/icon";

export function IconThumbnail({ size = 22, ...props }: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* frame */}
      <rect x="6" y="8" width="36" height="32" rx="4" />
      {/* sun */}
      <circle cx="17" cy="19" r="3.5" />
      {/* mountains */}
      <path d="M6 34l11-10 8 7 6-6 11 10" />
    </svg>
  );
}
