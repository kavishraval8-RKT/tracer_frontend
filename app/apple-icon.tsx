import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.svg, as a PNG (iOS home-screen icons don't support SVG).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #4A86FA 0%, #2F66EE 100%)",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64">
          <path
            d="M17 19h30M32 19v17l-5 5"
            fill="none"
            stroke="#fff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24.5" cy="45.5" r="4.5" fill="#2F66EE" stroke="#fff" strokeWidth="3.5" />
        </svg>
      </div>
    ),
    size,
  );
}
