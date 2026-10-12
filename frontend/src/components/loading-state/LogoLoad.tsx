import type { SVGProps } from "react";

export interface LoadingIconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height"
> {
  /** Width and height in px. */
  size?: number;
  /** Seconds per animation loop. */
  duration?: number;
}

const SPLINES = "0.45 0 0.55 1; 0.45 0 0.55 1; 0 0 1 1";
const KEY_TIMES = "0; 0.4; 0.8; 1";

export function LogoLoad({
  size = 36,
  duration = 1.6,
  ...props
}: LoadingIconProps) {
  const dur = `${duration}s`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label="Loading"
      {...props}
    >
      {/* Back layer */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; -5.04 -5.01; 0 0; 0 0"
          keyTimes={KEY_TIMES}
          dur={dur}
          begin="0s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines={SPLINES}
        />
        <path
          d="M29.52 5.01355H11.52C7.94123 5.01355 5.04004 7.89948 5.04004 11.4594V29.3647C5.04004 32.9247 7.94123 35.8106 11.52 35.8106H29.52C33.0988 35.8106 36 32.9247 36 29.3647V11.4594C36 7.89948 33.0988 5.01355 29.52 5.01355Z"
          fill="#BCD8FF"
        />
      </g>

      {/* Middle layer */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; -2.52 -2.5; 0 0; 0 0"
          keyTimes={KEY_TIMES}
          dur={dur}
          begin="0.12s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines={SPLINES}
        />
        <path
          d="M27 2.50671H9.00002C5.42121 2.50671 2.52002 5.39264 2.52002 8.95261V26.8579C2.52002 30.4178 5.42121 33.3038 9.00002 33.3038H27C30.5788 33.3038 33.48 30.4178 33.48 26.8579V8.95261C33.48 5.39264 30.5788 2.50671 27 2.50671Z"
          fill="#7AAEFF"
        />
      </g>

      {/* Front layer */}
      <path
        d="M24.48 0H6.48C2.90119 0 0 2.88593 0 6.44589V24.3512C0 27.9111 2.90119 30.7971 6.48 30.7971H24.48C28.0588 30.7971 30.96 27.9111 30.96 24.3512V6.44589C30.96 2.88593 28.0588 0 24.48 0Z"
        fill="#2C7AFF"
      />

      {/* Play triangle, pulsing around its center */}
      <g transform="translate(16.92 15.4)">
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1; 0.82; 1; 1"
            keyTimes={KEY_TIMES}
            dur={dur}
            begin="0.2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines={SPLINES}
          />
          <path
            d="M-6.12 -7.6217V7.4187L6.1201 -0.1015L-6.12 -7.6217Z"
            fill="white"
          />
        </g>
      </g>
    </svg>
  );
}
