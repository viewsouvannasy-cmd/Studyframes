import type { Icon } from "../../../types/icon";

export function IconTrash({
  size = 22,
  color = "currentColor",
  strokeWidth = 2,
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
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 10h32" />

      <path d="M12 10v26a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V10" />
    </svg>
  );
}
