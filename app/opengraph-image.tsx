import { ImageResponse } from "next/og";

export const alt = "Tracer: the AI copilot for KiCad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared-link preview in the same sky style as the home hero.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #1F78D4 0%, #3590E0 35%, #8BC9F3 75%, #EAF4FC 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, #4A86FA 0%, #2F66EE 100%)",
              border: "2px solid rgba(255,255,255,0.35)",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 64 64">
              <path d="M17 19h30M32 19v17l-5 5" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="24.5" cy="45.5" r="4.5" fill="#2F66EE" stroke="#fff" strokeWidth="3.5" />
            </svg>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Tracer</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>Design circuits with AI</div>
          <div style={{ marginTop: 24, fontSize: 34, color: "rgba(255,255,255,0.92)" }}>
            The AI copilot for KiCad. Describe your board in plain language.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
