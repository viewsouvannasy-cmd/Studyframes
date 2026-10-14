import type { Icon } from "../../../types/icon";

export function IconX({
  size = 24,
  color = "currentColor",
  strokeWidth = 4,
  ...props
}: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      {...props}
    >
      <line x1="12" y1="12" x2="36" y2="36" />
      <line x1="36" y1="12" x2="12" y2="36" />
    </svg>
  );
}
