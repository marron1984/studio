import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansJP";

const { fontFamily: notoSansJP } = loadFont();

const sansSerif = `${notoSansJP}, 'Hiragino Kaku Gothic Pro', sans-serif`;
const latinSans = "'Helvetica Neue', 'Arial', sans-serif";

// ─── Box drawing: rectangular frame animates from corners ───
const FrameBox: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  stroke: number;
  progress: number;
}> = ({ x, y, w, h, stroke, progress }) => {
  const hw = (w / 2) * progress;
  const hh = (h / 2) * progress;
  const cx = x + w / 2;
  const cy = y + h / 2;

  return (
    <>
      {/* Top */}
      <div
        style={{
          position: "absolute",
          left: cx - hw,
          top: y,
          width: hw * 2,
          height: stroke,
          backgroundColor: "#000000",
        }}
      />
      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          left: cx - hw,
          top: y + h - stroke,
          width: hw * 2,
          height: stroke,
          backgroundColor: "#000000",
        }}
      />
      {/* Left */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: cy - hh,
          width: stroke,
          height: hh * 2,
          backgroundColor: "#000000",
        }}
      />
      {/* Right */}
      <div
        style={{
          position: "absolute",
          left: x + w - stroke,
          top: cy - hh,
          width: stroke,
          height: hh * 2,
          backgroundColor: "#000000",
        }}
      />
    </>
  );
};

// ─── Main Composition ────────────────────────────────────────
export const JapaneseLogotype: React.FC = () => {
  const frame = useCurrentFrame();

  // Layout constants (1080 x 1920 canvas)
  const canvasW = 1080;
  const canvasH = 1920;
  const boxW = 880;
  const boxH = 440;
  const boxX = (canvasW - boxW) / 2;
  const boxY = (canvasH - boxH) / 2;

  // ── Animations ──

  // Rectangular frame draws in from center
  const frameProgress = interpolate(frame, [12, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main kanji logotype
  const kanjiClip = interpolate(frame, [32, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kanjiY = interpolate(frame, [32, 58], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Thin separator line
  const lineScale = interpolate(frame, [48, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Romaji subtitle
  const romajiOpacity = interpolate(frame, [58, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const romajiY = interpolate(frame, [58, 78], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {/* Rectangular bounding box */}
      <FrameBox
        x={boxX}
        y={boxY}
        w={boxW}
        h={boxH}
        stroke={3}
        progress={frameProgress}
      />

      {/* Main kanji logotype: 黒鋼重工 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: boxY + 96,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: kanjiClip,
          transform: `translateY(${kanjiY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: sansSerif,
            fontWeight: 900,
            fontSize: 128,
            color: "#000000",
            letterSpacing: "-0.06em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          黒鋼重工
        </div>
      </div>

      {/* Thin separator line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: boxY + 268,
          width: 340,
          height: 2,
          backgroundColor: "#000000",
          transform: `translateX(-50%) scaleX(${lineScale})`,
          transformOrigin: "center",
        }}
      />

      {/* Romaji subtitle */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: boxY + 304,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: romajiOpacity,
          transform: `translateY(${romajiY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: latinSans,
            fontWeight: 700,
            fontSize: 22,
            color: "#000000",
            letterSpacing: "0.38em",
            whiteSpace: "nowrap",
          }}
        >
          KUROGANE HEAVY INDUSTRIES
        </div>
      </div>
    </AbsoluteFill>
  );
};
