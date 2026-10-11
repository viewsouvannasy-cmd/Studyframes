import type { Icon } from "../../../types/icon";

export function IconPencil({ size = 22, ...props }: Icon) {
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
      {/* outline: tip, body, end cap */}
      <path d="M6 42 L9 32 L33 8 L40 15 L16 39 Z" />
      {/* line where the tip meets the body */}
      <path d="M9 32 L16 39" />
      {/* line near the end of the pencil */}
      <path d="M28 13 L35 20" />
    </svg>
  );
}
