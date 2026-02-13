import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const FadeText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  letterSpacing?: number;
  style?: React.CSSProperties;
  slideUp?: boolean;
}> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = "#ffffff",
  fontFamily = "serif",
  fontWeight = 400,
  letterSpacing = 0,
  style,
  slideUp = true,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = slideUp
    ? interpolate(frame - delay, [0, 20], [30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize,
        color,
        fontFamily,
        fontWeight,
        letterSpacing,
        textAlign: "center",
        lineHeight: 1.6,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
