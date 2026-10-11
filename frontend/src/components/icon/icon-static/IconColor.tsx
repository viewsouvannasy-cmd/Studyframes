import type { Icon } from "../../../types/icon";

export function IconColor({ size = 24, ...props }: Icon) {
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
      {/* palette body */}
      <path d="M24 6C14 6 6 14 6 24s8 18 18 18c3 0 4-2 4-4 0-1.500-1-2.500-1-4 0-2 1.500-3 3.500-3H35c4 0 7-3 7-7C42 12.500 34 6 24 6z" />
      {/* paint dots */}
      <circle cx="16" cy="23" r="2" fill="currentColor" stroke="none" />
      <circle cx="22" cy="14" r="2" fill="currentColor" stroke="none" />
      <circle cx="32" cy="16" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
