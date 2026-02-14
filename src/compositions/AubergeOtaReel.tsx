import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  Img,
  staticFile,
  Easing,
  Audio,
} from "remotion";

const serifFont = "'Noto Serif CJK JP', 'Noto Serif JP', serif";
const sansFont = "'Noto Sans JP', 'Noto Sans CJK JP', sans-serif";
const warmGold = "#d4a853";
const warmBrown = "#0d0a07";

// ─── Ken Burns with gentle movement ─────────────────────
const KenBurns: React.FC<{
  src: string;
  move?: "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp";
  speed?: number;
}> = ({ src, move = "zoomIn", speed = 0.08 }) => {
  const frame = useCurrentFrame();
  const p = frame / 150;

  const transforms: Record<string, string> = {
    zoomIn: `scale(${1 + speed * p})`,
    zoomOut: `scale(${1.12 - speed * p})`,
    panLeft: `scale(${1 + 0.05 * p}) translateX(${-3 * p}%)`,
    panRight: `scale(${1 + 0.05 * p}) translateX(${3 * p}%)`,
    panUp: `scale(${1 + 0.05 * p}) translateY(${-2 * p}%)`,
  };

  return (
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: transforms[move],
      }}
    />
  );
};

// ─── Dark overlay for text readability ──────────────────
const Overlay: React.FC<{
  style?: "bottom" | "gentle" | "top";
  opacity?: number;
}> = ({ style = "bottom", opacity = 0.4 }) => {
  const styles: Record<string, string> = {
    bottom: `linear-gradient(to top, rgba(13,10,7,${opacity * 1.2}) 0%, rgba(13,10,7,${opacity * 0.5}) 35%, transparent 70%)`,
    gentle: `rgba(13,10,7,${opacity * 0.4})`,
    top: `linear-gradient(to bottom, rgba(13,10,7,${opacity * 0.6}) 0%, transparent 50%, rgba(13,10,7,${opacity * 0.3}) 100%)`,
  };
  return <div style={{ position: "absolute", inset: 0, background: styles[style] }} />;
};

// ─── Fade text ──────────────────────────────────────────
const FadeText: React.FC<{
  children: React.ReactNode;
  frame: number;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, frame, delay = 0, duration = 25, style }) => {
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const y = interpolate(frame, [delay, delay + duration], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, ...style }}>
      {children}
    </div>
  );
};

// ─── Single photo slide with crossfade ──────────────────
const PhotoSlide: React.FC<{
  src: string;
  move?: "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp";
  durationFrames: number;
  label?: string;
}> = ({ src, move = "zoomIn", durationFrames, label }) => {
  const frame = useCurrentFrame();

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Fade out to black
  const fadeOut = interpolate(
    frame,
    [durationFrames - 12, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <div style={{ position: "absolute", inset: 0, opacity }}>
        <KenBurns src={src} move={move} speed={0.06} />
      </div>
      <Overlay style="bottom" opacity={0.3} />

      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FadeText frame={frame} delay={10} style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            fontFamily: sansFont,
            fontWeight: 300,
            letterSpacing: 4,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}>
            {label}
          </FadeText>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─── Cuisine scene with 3-image slide ───────────────────
const CuisineSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const images = [
    { src: "auberge/img03.jpg", move: "zoomIn" as const },
    { src: "auberge/img33.jpg", move: "panRight" as const },
    { src: "auberge/img02.jpg", move: "zoomOut" as const },
  ];
  const seg = 20; // ~0.67s per image within 2s total

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      {images.map((img, i) => {
        const start = i * seg;
        const end = start + seg;
        const fadeIn = interpolate(frame, [start, start + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 6, end], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const op = Math.min(fadeIn, i === images.length - 1 ? fadeIn : fadeOut);
        return (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: op }}>
            <Sequence from={start} durationInFrames={seg + 8}>
              <KenBurns src={img.src} move={img.move} speed={0.06} />
            </Sequence>
          </div>
        );
      })}
      <Overlay style="bottom" opacity={0.3} />
    </AbsoluteFill>
  );
};

// ─── Opening scene: Hotel Exterior with branding ────────
const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <div style={{ position: "absolute", inset: 0, opacity }}>
        <KenBurns src="auberge/img34.jpg" move="zoomIn" speed={0.05} />
      </div>
      <Overlay style="bottom" opacity={0.45} />

      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <FadeText frame={frame} delay={15} style={{
          fontSize: 26,
          color: warmGold,
          fontFamily: sansFont,
          fontWeight: 400,
          letterSpacing: 6,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          NARA KASUGA
        </FadeText>

        {/* Gold line */}
        <div
          style={{
            width: interpolate(frame, [25, 50], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 1.5,
            background: `linear-gradient(90deg, transparent, ${warmGold}, transparent)`,
          }}
        />

        <FadeText frame={frame} delay={30} style={{
          fontSize: 56,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 700,
          letterSpacing: 10,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          奈良春日 鹿のや
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Closing scene: Hotel name + location ───────────────
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <div style={{ position: "absolute", inset: 0, opacity: fadeIn }}>
        <KenBurns src="auberge/img16.jpg" move="panLeft" speed={0.04} />
      </div>
      <Overlay style="bottom" opacity={0.55} />
      <Overlay style="top" opacity={0.3} />

      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <FadeText frame={frame} delay={10} style={{
          fontSize: 24,
          color: warmGold,
          fontFamily: sansFont,
          fontWeight: 400,
          letterSpacing: 6,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          PREMIUM AUBERGE
        </FadeText>

        <div
          style={{
            width: interpolate(frame, [20, 45], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 1.5,
            background: `linear-gradient(90deg, transparent, ${warmGold}, transparent)`,
          }}
        />

        <FadeText frame={frame} delay={25} style={{
          fontSize: 52,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 700,
          letterSpacing: 8,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          奈良春日 鹿のや
        </FadeText>

        <FadeText frame={frame} delay={40} style={{
          fontSize: 22,
          color: "rgba(255,255,255,0.5)",
          fontFamily: sansFont,
          fontWeight: 300,
          letterSpacing: 3,
          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          textAlign: "center",
          lineHeight: "1.8",
        }}>
          奈良市春日野町16 奈良公園内
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ─────────────────────────────────────
export const AubergeOtaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      {/* BGM */}
      <Audio src={staticFile("auberge/bgm.mp3")} volume={0.3} />

      {/* === HOTEL SECTION (~15s) === */}

      {/* Scene 1: Hotel Exterior / Sign (0-90, 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <OpeningScene />
      </Sequence>

      {/* Scene 2: Hotel Front / Entrance (90-180, 3s) */}
      <Sequence from={90} durationInFrames={90}>
        <PhotoSlide
          src="auberge/img35.jpg"
          move="panRight"
          durationFrames={90}
        />
      </Sequence>

      {/* Scene 3: Courtyard / Garden (180-270, 3s) */}
      <Sequence from={180} durationInFrames={90}>
        <PhotoSlide
          src="auberge/img36.jpg"
          move="panUp"
          durationFrames={90}
        />
      </Sequence>

      {/* Scene 4: Lounge (270-360, 3s) */}
      <Sequence from={270} durationInFrames={90}>
        <PhotoSlide
          src="auberge/img38.jpg"
          move="panLeft"
          durationFrames={90}
        />
      </Sequence>

      {/* Scene 5: Guest Room (360-450, 3s) */}
      <Sequence from={360} durationInFrames={90}>
        <PhotoSlide
          src="auberge/img29.jpg"
          move="zoomIn"
          durationFrames={90}
        />
      </Sequence>

      {/* === RESTAURANT SECTION (~6s) === */}

      {/* Scene 6: Restaurant Red Sign (450-510, 2s) */}
      <Sequence from={450} durationInFrames={60}>
        <PhotoSlide
          src="auberge/img17.jpg"
          move="zoomIn"
          durationFrames={60}
        />
      </Sequence>

      {/* Scene 7: Restaurant Interior (510-570, 2s) */}
      <Sequence from={510} durationInFrames={60}>
        <PhotoSlide
          src="auberge/img18.jpg"
          move="panRight"
          durationFrames={60}
        />
      </Sequence>

      {/* Scene 8: Cuisine (570-630, 2s) */}
      <Sequence from={570} durationInFrames={60}>
        <CuisineSlide />
      </Sequence>

      {/* === TOURIST SECTION (~4s) === */}

      {/* Scene 9: Nearby - Deer (630-690, 2s) */}
      <Sequence from={630} durationInFrames={60}>
        <PhotoSlide
          src="auberge/img30.jpg"
          move="zoomOut"
          durationFrames={60}
        />
      </Sequence>

      {/* Scene 10: Nearby - Autumn / Closing (690-750, 2s) */}
      <Sequence from={690} durationInFrames={60}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
