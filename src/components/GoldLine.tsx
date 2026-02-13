import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const GoldLine: React.FC<{
  delay?: number;
  width?: string;
  style?: React.CSSProperties;
}> = ({ delay = 0, width = "60%", style }) => {
  const frame = useCurrentFrame();

  const scaleX = interpolate(frame - delay, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        ...style,
      }}
    >
      <div
        style={{
          width,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #c4a265, #d4b87a, #c4a265, transparent)",
          opacity,
          transform: `scaleX(${scaleX})`,
        }}
      />
    </div>
  );
};
