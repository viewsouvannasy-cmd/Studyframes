import type { Icon } from "../../../types/icon";

export function IconArrow({
  size = 24,
  color = "currentColor",
  ...props
}: Icon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 19V5M12 5L5 12M12 5L19 12"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const IconChevronArrow = ({
  size = 24,
  color = "currentColor",
  ...props
}: Icon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M32 8 L15 25 L32 42" />
    </svg>
  );
};
