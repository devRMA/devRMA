import { ImageResponse } from "next/og";

export const alt = "Rafael Martins Alves - Tech Lead & Systems Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "#090b10",
        color: "#f1f5f9",
      }}
    >
      <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#0ea5e9" }}>
        <span>dev</span>
        <span style={{ color: "#f1f5f9" }}>RMA</span>
      </div>
      <div style={{ fontSize: 84, fontWeight: 700, marginTop: 32, letterSpacing: -2 }}>
        Rafael Martins Alves
      </div>
      <div style={{ fontSize: 48, marginTop: 16, color: "#0ea5e9" }}>
        Tech Lead & Systems Architect
      </div>
      <div
        style={{ display: "flex", marginTop: 48, height: 8, width: 220, background: "#0ea5e9" }}
      />
    </div>,
    size,
  );
}
