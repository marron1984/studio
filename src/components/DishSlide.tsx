import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  staticFile,
} from "remotion";

export const DishSlide: React.FC<{
  imageSrc: string;
  categoryJa: string;
  descriptionLines: string[];
  delay?: number;
  duration?: number;
}> = ({ imageSrc, categoryJa, descriptionLines, delay = 0, duration = 105 }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  // Image entrance: scale from 1.1 to 1.0 (Ken Burns style)
  const imageScale = interpolate(localFrame, [0, duration], [1.15, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overall slide fade in
  const fadeIn = interpolate(localFrame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overall slide fade out
  const fadeOut = interpolate(
    localFrame,
    [duration - 15, duration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Text overlay fade in
  const textOpacity = interpolate(localFrame, [10, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textSlideUp = interpolate(localFrame, [10, 28], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Category label animation
  const categoryOpacity = interpolate(localFrame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const categorySlide = interpolate(localFrame, [5, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold line under category
  const lineScale = interpolate(localFrame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (localFrame < 0 || localFrame > duration) return null;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Full-bleed dish photo */}
      <AbsoluteFill>
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imageScale})`,
          }}
        />
      </AbsoluteFill>

      {/* Dark gradient overlay for text readability */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Top subtle vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Category label - top area */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: categoryOpacity,
          transform: `translateY(${categorySlide}px)`,
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: "#c4a265",
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 300,
            letterSpacing: 12,
            textTransform: "uppercase",
          }}
        >
          {categoryJa}
        </div>
        <div
          style={{
            marginTop: 12,
            width: 60,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #c4a265, transparent)",
            transform: `scaleX(${lineScale})`,
          }}
        />
      </div>

      {/* Description text - bottom area */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 60,
          right: 60,
          opacity: textOpacity,
          transform: `translateY(${textSlideUp}px)`,
        }}
      >
        {descriptionLines.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: 32,
              color: "#ffffff",
              fontFamily: "'Noto Serif JP', serif",
              fontWeight: 300,
              lineHeight: 2.0,
              textAlign: "center",
              letterSpacing: 3,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
