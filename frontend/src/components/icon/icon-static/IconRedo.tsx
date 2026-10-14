import type { Icon } from "../../../types/icon";

export function IconRedo({
  size = 18,
  color = "currentColor",
  ...props
}: Icon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5" />
    </svg>
  );
}
