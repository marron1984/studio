import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  Img,
  staticFile,
  Easing,
} from "remotion";

const fontFamily = "'Noto Sans CJK JP', 'Noto Sans JP', sans-serif";

/* ─── Red flash transition (fire-like) ─────────────────── */
const FireFlash: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 2, at + 5], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(255,80,20,0.9) 0%, rgba(180,20,0,0.7) 50%, rgba(0,0,0,0.6) 100%)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

/* ─── Cinematic letterbox bars ─────────────────────────── */
const Letterbox: React.FC = () => {
  const frame = useCurrentFrame();
  const barH = interpolate(frame, [0, 15], [0, 80], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: barH,
          background: "linear-gradient(to bottom, #000000 60%, transparent)",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: barH,
          background: "linear-gradient(to top, #000000 60%, transparent)",
          zIndex: 10,
        }}
      />
    </>
  );
};

/* ─── Bold impact text (Reel trend style) ──────────────── */
const ImpactText: React.FC<{
  text: string;
  subText?: string;
  fontSize?: number;
  delay?: number;
  yPosition?: string;
  color?: string;
  accentColor?: string;
}> = ({
  text,
  subText,
  fontSize = 68,
  delay = 0,
  yPosition = "50%",
  color = "#ffffff",
  accentColor = "#FF4444",
}) => {
  const frame = useCurrentFrame();
  const d = frame - delay;

  const scale = interpolate(d, [0, 5], [1.4, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });
  const opacity = interpolate(d, [0, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(d, [6, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: yPosition,
        transform: `translateY(-50%) scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        zIndex: 5,
      }}
    >
      <div
        style={{
          fontSize,
          color,
          fontFamily,
          fontWeight: 900,
          textAlign: "center",
          letterSpacing: 5,
          textShadow: `
            3px 3px 0 rgba(0,0,0,0.85),
            -2px -2px 0 rgba(0,0,0,0.85),
            2px -2px 0 rgba(0,0,0,0.85),
            -2px 2px 0 rgba(0,0,0,0.85),
            0 0 20px rgba(200,50,0,0.4),
            0 4px 15px rgba(0,0,0,0.7)
          `,
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
      {subText && (
        <div
          style={{
            fontSize: fontSize * 0.4,
            color: accentColor,
            fontFamily,
            fontWeight: 700,
            textAlign: "center",
            letterSpacing: 3,
            opacity: subOpacity,
            textShadow: `
              2px 2px 0 rgba(0,0,0,0.9),
              -2px -2px 0 rgba(0,0,0,0.9),
              2px -2px 0 rgba(0,0,0,0.9),
              -2px 2px 0 rgba(0,0,0,0.9)
            `,
          }}
        >
          {subText}
        </div>
      )}
    </div>
  );
};

/* ─── Photo slide with Ken Burns ───────────────────────── */
const PhotoSlide: React.FC<{
  src: string;
  zoomDir?: "in" | "out";
  panX?: number;
  panY?: number;
}> = ({ src, zoomDir = "in", panX = 0, panY = 0 }) => {
  const frame = useCurrentFrame();
  const scale =
    zoomDir === "in"
      ? interpolate(frame, [0, 60], [1.0, 1.18], { extrapolateRight: "clamp" })
      : interpolate(frame, [0, 60], [1.18, 1.0], {
          extrapolateRight: "clamp",
        });
  const x = interpolate(frame, [0, 60], [0, panX], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 60], [0, panY], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ─── Vignette overlay ─────────────────────────────────── */
const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
      pointerEvents: "none",
    }}
  />
);

/* ─── Hook scene ───────────────────────────────────────── */
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOp = interpolate(frame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Line 1: "京橋の" - small top label
  const l1Op = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l1Y = interpolate(frame, [4, 10], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Line 2: "隠れ家焼肉" - big impact
  const l2Scale = interpolate(frame, [12, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.5)),
  });
  const l2Op = interpolate(frame, [12, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 3: "知る人ぞ知る名店"
  const l3Op = interpolate(frame, [24, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l3Y = interpolate(frame, [24, 32], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Fire glow pulse
  const glowIntensity = 0.08 + 0.04 * Math.sin((frame / 20) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0000 0%, #1a0500 50%, #0a0000 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: bgOp,
      }}
    >
      {/* Fire glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(200,50,0,${glowIntensity}) 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Top label */}
        <div
          style={{
            fontSize: 36,
            color: "#FF6B4A",
            fontFamily,
            fontWeight: 600,
            letterSpacing: 8,
            opacity: l1Op,
            transform: `translateY(${l1Y}px)`,
          }}
        >
          京橋の
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 92,
            color: "#ffffff",
            fontFamily,
            fontWeight: 900,
            letterSpacing: 8,
            opacity: l2Op,
            transform: `scale(${l2Scale})`,
            textShadow:
              "4px 4px 0 rgba(150,20,0,0.8), 0 0 40px rgba(255,60,0,0.25)",
          }}
        >
          隠れ家焼肉
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
            fontFamily,
            fontWeight: 500,
            letterSpacing: 6,
            opacity: l3Op,
            transform: `translateY(${l3Y}px)`,
          }}
        >
          知る人ぞ知る名店
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─── Info card scene ──────────────────────────────────── */
const InfoScene: React.FC = () => {
  const frame = useCurrentFrame();

  const cardOp = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardY = interpolate(frame, [0, 12], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const detailOp = interpolate(frame, [16, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOp = interpolate(frame, [36, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [36, 48], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const pulse = 1 + 0.04 * Math.sin(((frame - 50) / 25) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0000 0%, #1a0500 40%, #0a0000 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Warm glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,50,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          opacity: cardOp,
          transform: `translateY(${cardY}px)`,
        }}
      >
        {/* Store name */}
        <div
          style={{
            fontSize: 72,
            color: "#ffffff",
            fontFamily,
            fontWeight: 900,
            letterSpacing: 6,
            textShadow: "3px 3px 0 rgba(150,20,0,0.6), 0 0 30px rgba(255,60,0,0.15)",
          }}
        >
          やきにく 新
        </div>
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.5)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 10,
            marginTop: -8,
          }}
        >
          A R A T A
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 180,
            height: 2,
            background: "linear-gradient(90deg, transparent, #C83200, #FF6B4A, #C83200, transparent)",
            borderRadius: 2,
            marginTop: 8,
          }}
        />

        {/* Details */}
        <div
          style={{
            opacity: detailOp,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontSize: 27,
              color: "rgba(255,255,255,0.85)",
              fontFamily,
              fontWeight: 500,
              letterSpacing: 2,
              textAlign: "center",
              lineHeight: 1.9,
            }}
          >
            <span style={{ color: "#FF6B4A" }}>📍</span>{" "}
            大阪市都島区東野田町1-20-16
          </div>

          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.7)",
              fontFamily,
              fontWeight: 400,
              letterSpacing: 2,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            京橋駅 徒歩5分 / 大阪城北詰駅 徒歩3分
          </div>

          <div
            style={{
              fontSize: 27,
              color: "rgba(255,255,255,0.85)",
              fontFamily,
              fontWeight: 500,
              letterSpacing: 2,
            }}
          >
            <span style={{ color: "#FF6B4A" }}>📞</span>{" "}
            06-6809-7829
          </div>

          <div
            style={{
              fontSize: 25,
              color: "rgba(255,255,255,0.7)",
              fontFamily,
              fontWeight: 400,
              letterSpacing: 2,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            🕐 17:00〜23:00（L.O 22:30）
            <br />
            定休日：水曜日
          </div>

          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
              fontFamily,
              fontWeight: 400,
              letterSpacing: 2,
              marginTop: 4,
            }}
          >
            全38席｜貸切可能
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 32,
            opacity: ctaOp,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #C83200, #FF4444)",
              borderRadius: 50,
              padding: "16px 48px",
              fontSize: 32,
              color: "#ffffff",
              fontFamily,
              fontWeight: 800,
              letterSpacing: 4,
              boxShadow: "0 4px 24px rgba(200,50,0,0.4)",
              transform: `scale(${frame > 50 ? pulse : 1})`,
            }}
          >
            保存して行ってみて🔥
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─── Main Composition ─────────────────────────────────── */
export const YakinikuArataReel: React.FC = () => {
  // Scene definitions
  const scenes: Array<{
    from: number;
    dur: number;
    img: string;
    zoom: "in" | "out";
    px: number;
    py: number;
    text?: string;
    subText?: string;
    textY?: string;
    fontSize?: number;
    accentColor?: string;
  }> = [
    // Scene 2: Interior overview - counter + partitions (img02)
    {
      from: 44, dur: 42, img: "yakiniku/img02.jpg", zoom: "in", px: -5, py: 0,
      text: "落ち着く店内", subText: "目線が気にならない席", textY: "78%", fontSize: 56,
    },
    // Scene 3: Private horigotatsu room (img03)
    {
      from: 82, dur: 40, img: "yakiniku/img03.jpg", zoom: "out", px: 0, py: -5,
      text: "掘りごたつ個室", textY: "80%", fontSize: 58,
    },
    // Scene 4: Big spread - meat + yukhoe (img05) — money shot
    {
      from: 118, dur: 48, img: "yakiniku/img05.jpg", zoom: "in", px: 0, py: -8,
      text: "極上の\nお肉たち", textY: "18%", fontSize: 72,
    },
    // Scene 5: Giant round platter assorted (img06)
    {
      from: 161, dur: 42, img: "yakiniku/img06.jpg", zoom: "out", px: 0, py: 0,
      text: "盛り合わせ", subText: "このボリューム…！", textY: "15%", fontSize: 64,
    },
    // Scene 6: Marbled cuts plate (img07)
    {
      from: 198, dur: 40, img: "yakiniku/img07.jpg", zoom: "in", px: 3, py: 0,
      text: "サシの入り方\nえぐい…", textY: "16%", fontSize: 64,
    },
    // Scene 7: Tongue flower arrangement (img11)
    {
      from: 233, dur: 42, img: "yakiniku/img11.jpg", zoom: "out", px: 0, py: 0,
      text: "華タン", subText: "美しすぎる盛り付け", textY: "14%", fontSize: 72,
    },
    // Scene 8: Green onion tongue close-up (img08)
    {
      from: 270, dur: 40, img: "yakiniku/img08.jpg", zoom: "in", px: -3, py: 0,
      text: "ねぎタン塩", textY: "16%", fontSize: 64,
    },
    // Scene 9: Yukhoe tartare (img09) — eye-catching egg yolk
    {
      from: 305, dur: 44, img: "yakiniku/img09.jpg", zoom: "out", px: 0, py: -5,
      text: "極上ユッケ", subText: "トロける旨さ", textY: "15%", fontSize: 68,
    },
    // Scene 10: Horumon platter with chili (img10)
    {
      from: 344, dur: 40, img: "yakiniku/img10.jpg", zoom: "in", px: 0, py: 0,
      text: "ホルモン盛り", textY: "14%", fontSize: 64,
    },
    // Scene 11: Private table room (img04) — pull out
    {
      from: 379, dur: 40, img: "yakiniku/img04.jpg", zoom: "out", px: 0, py: 0,
      text: "貸切もOK", subText: "デート・記念日に", textY: "78%", fontSize: 60,
      accentColor: "#FFB899",
    },
  ];

  const flashFrames = [42, 80, 116, 159, 196, 231, 268, 303, 342, 377, 416];

  return (
    <AbsoluteFill style={{ backgroundColor: "#050000" }}>
      {/* Scene 1: Hook (0-46) */}
      <Sequence from={0} durationInFrames={46}>
        <HookScene />
      </Sequence>

      {/* Photo scenes */}
      {scenes.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          <PhotoSlide
            src={s.img}
            zoomDir={s.zoom}
            panX={s.px}
            panY={s.py}
          />
          {/* Gradient overlay for text */}
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          <Vignette />
          {s.text && (
            <ImpactText
              text={s.text}
              subText={s.subText}
              fontSize={s.fontSize || 64}
              delay={3}
              yPosition={s.textY || "50%"}
              accentColor={s.accentColor || "#FF6B4A"}
            />
          )}
        </Sequence>
      ))}

      {/* Scene 12: Info card (417-570, ~5s) */}
      <Sequence from={417} durationInFrames={153}>
        <InfoScene />
      </Sequence>

      {/* Cinematic letterbox */}
      <Letterbox />

      {/* Fire flash transitions */}
      {flashFrames.map((f, i) => (
        <FireFlash key={i} at={f} />
      ))}
    </AbsoluteFill>
  );
};
