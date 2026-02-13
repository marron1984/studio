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

// ─── White flash transition ──────────────────────────────
const Flash: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 3, at + 6], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#ffffff", opacity, pointerEvents: "none" }}
    />
  );
};

// ─── Bold text overlay (trendy Reel style) ───────────────
const BoldOverlay: React.FC<{
  text: string;
  subText?: string;
  fontSize?: number;
  delay?: number;
  color?: string;
  strokeColor?: string;
  yPosition?: string;
}> = ({
  text,
  subText,
  fontSize = 72,
  delay = 0,
  color = "#ffffff",
  strokeColor = "rgba(0,0,0,0.7)",
  yPosition = "50%",
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame - delay, [0, 6], [1.3, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const opacity = interpolate(frame - delay, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame - delay, [8, 14], [0, 1], {
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
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize,
          color,
          fontFamily,
          fontWeight: 900,
          textAlign: "center",
          letterSpacing: 4,
          textShadow: `
            3px 3px 0 ${strokeColor},
            -3px -3px 0 ${strokeColor},
            3px -3px 0 ${strokeColor},
            -3px 3px 0 ${strokeColor},
            0 4px 12px rgba(0,0,0,0.5)
          `,
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
      {subText && (
        <div
          style={{
            fontSize: fontSize * 0.45,
            color: "#FFE566",
            fontFamily,
            fontWeight: 700,
            textAlign: "center",
            letterSpacing: 3,
            opacity: subOpacity,
            textShadow: `
              2px 2px 0 rgba(0,0,0,0.7),
              -2px -2px 0 rgba(0,0,0,0.7),
              2px -2px 0 rgba(0,0,0,0.7),
              -2px 2px 0 rgba(0,0,0,0.7)
            `,
          }}
        >
          {subText}
        </div>
      )}
    </div>
  );
};

// ─── Photo slide (fast cut with Ken Burns) ───────────────
const PhotoSlide: React.FC<{
  src: string;
  zoomDirection?: "in" | "out";
  panX?: number;
  panY?: number;
}> = ({ src, zoomDirection = "in", panX = 0, panY = 0 }) => {
  const frame = useCurrentFrame();

  const scale =
    zoomDirection === "in"
      ? interpolate(frame, [0, 60], [1.0, 1.15], {
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [0, 60], [1.15, 1.0], {
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

// ─── Hook scene ──────────────────────────────────────────
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Background: dark warm
  const bgOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // First line: "梅田で見つけた"
  const line1Scale = interpolate(frame, [3, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const line1Opacity = interpolate(frame, [3, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Second line: "映えおでん酒場"
  const line2Scale = interpolate(frame, [16, 23], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const line2Opacity = interpolate(frame, [16, 21], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Emoji bounce
  const emojiScale = interpolate(frame, [26, 33], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(3)),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #1a0f00 0%, #2d1800 50%, #1a0f00 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: bgOpacity,
      }}
    >
      {/* Warm glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,165,0,0.15) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 42,
            color: "#FFE566",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 6,
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: "0 2px 10px rgba(255,165,0,0.3)",
          }}
        >
          梅田で見つけた
        </div>

        <div
          style={{
            fontSize: 82,
            color: "#ffffff",
            fontFamily,
            fontWeight: 900,
            letterSpacing: 6,
            opacity: line2Opacity,
            transform: `scale(${line2Scale})`,
            textShadow:
              "4px 4px 0 rgba(180,80,0,0.8), 0 0 30px rgba(255,165,0,0.3)",
          }}
        >
          映えおでん酒場
        </div>

        <div
          style={{
            fontSize: 60,
            opacity: line2Opacity,
            transform: `scale(${emojiScale})`,
          }}
        >
          🍢✨
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Info card scene ─────────────────────────────────────
const InfoScene: React.FC = () => {
  const frame = useCurrentFrame();

  const cardOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardSlide = interpolate(frame, [0, 12], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const detailsOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [40, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [40, 52], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  // Pulsing save reminder
  const pulseScale =
    1 + 0.05 * Math.sin(((frame - 55) / 30) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #1a0f00 0%, #2d1800 40%, #1a0f00 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Warm ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: cardOpacity,
          transform: `translateY(${cardSlide}px)`,
        }}
      >
        {/* Store name */}
        <div
          style={{
            fontSize: 64,
            color: "#ffffff",
            fontFamily,
            fontWeight: 900,
            letterSpacing: 4,
            textShadow: "3px 3px 0 rgba(180,80,0,0.6)",
          }}
        >
          おでん×スタンド
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 200,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #FF9500, #FFE566, #FF9500, transparent)",
            borderRadius: 2,
          }}
        />

        {/* Details */}
        <div
          style={{
            opacity: detailsOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
              fontFamily,
              fontWeight: 500,
              letterSpacing: 2,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            📍 大阪市北区角田町3-25
            <br />
            EST 1F
          </div>

          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
              fontFamily,
              fontWeight: 500,
              letterSpacing: 2,
            }}
          >
            📞 06-6743-4501
          </div>

          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.7)",
              fontFamily,
              fontWeight: 400,
              letterSpacing: 2,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            🕐 11:00〜23:00（L.O. 22:30）
            <br />
            不定休（施設に準ずる）
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #FF9500, #FF6B00)",
              borderRadius: 50,
              padding: "16px 48px",
              fontSize: 32,
              color: "#ffffff",
              fontFamily,
              fontWeight: 800,
              letterSpacing: 4,
              boxShadow: "0 4px 20px rgba(255,149,0,0.4)",
              transform: `scale(${frame > 55 ? pulseScale : 1})`,
            }}
          >
            保存して行こう🍢
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ────────────────────────────────────
export const OdenStandReel: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene definitions: [startFrame, durationFrames, image, zoomDir, panX, panY]
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
  }> = [
    // Scene 2: Exterior night (img17 - noren entrance)
    { from: 42, dur: 45, img: "oden/img17.jpg", zoom: "out", px: 0, py: -8,
      text: "EST FOODHALL", subText: "梅田駅すぐ", textY: "75%", fontSize: 56 },
    // Scene 3: Interior - cool teal bar (img12)
    { from: 82, dur: 42, img: "oden/img12.jpg", zoom: "in", px: 5, py: 0,
      text: "おしゃれ店内", textY: "78%", fontSize: 60 },
    // Scene 4: Oden pot overhead (img03 - the showstopper)
    { from: 119, dur: 48, img: "oden/img03.jpg", zoom: "out", px: 0, py: 0,
      text: "名物おでん鍋", subText: "かわいすぎ🐱", textY: "80%", fontSize: 64 },
    // Scene 5: Oden ladle with steam (img10 - steaming vertical)
    { from: 162, dur: 42, img: "oden/img10.jpg", zoom: "in", px: 0, py: -10,
      text: "とろとろ出汁", textY: "82%", fontSize: 64 },
    // Scene 6: Character oden picked up (img02)
    { from: 199, dur: 42, img: "oden/img02.jpg", zoom: "out", px: 0, py: -5,
      text: "キャラおでん", subText: "ぜんぶカワイイ", textY: "18%", fontSize: 60 },
    // Scene 7: Plated oden bowl with sake (img01)
    { from: 236, dur: 42, img: "oden/img01.jpg", zoom: "in", px: -5, py: 0,
      text: "日本酒と一緒に", textY: "80%", fontSize: 56 },
    // Scene 8: Side dishes spread (img09 - flat lay)
    { from: 273, dur: 42, img: "oden/img09.jpg", zoom: "out", px: 0, py: 0,
      text: "一品料理も充実", textY: "15%", fontSize: 56 },
    // Scene 9: Hot stew close-up (img08)
    { from: 310, dur: 38, img: "oden/img08.jpg", zoom: "in", px: 3, py: 0,
      text: "ぐつぐつ牛すじ煮", textY: "18%", fontSize: 52 },
    // Scene 10: Fruit sour drinks (img04 - 3 colorful glasses)
    { from: 343, dur: 42, img: "oden/img04.jpg", zoom: "out", px: 0, py: -5,
      text: "映えサワー🍹", subText: "フルーツたっぷり", textY: "82%", fontSize: 64 },
    // Scene 11: Cheers (img07)
    { from: 380, dur: 40, img: "oden/img07.jpg", zoom: "in", px: 0, py: 0,
      text: "かんぱーい🍻", textY: "80%", fontSize: 72 },
  ];

  // Flash timings at scene transitions
  const flashFrames = [40, 80, 117, 160, 197, 234, 271, 308, 341, 378, 415];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0500" }}>
      {/* Scene 1: Hook text (0-45) */}
      <Sequence from={0} durationInFrames={47}>
        <HookScene />
      </Sequence>

      {/* Photo scenes */}
      {scenes.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          <PhotoSlide
            src={s.img}
            zoomDirection={s.zoom}
            panX={s.px}
            panY={s.py}
          />
          {/* Dark overlay for text contrast */}
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)",
            }}
          />
          {s.text && (
            <BoldOverlay
              text={s.text}
              subText={s.subText}
              fontSize={s.fontSize || 64}
              delay={4}
              yPosition={s.textY || "50%"}
            />
          )}
        </Sequence>
      ))}

      {/* Scene 12: Info card (418-570, ~5s) */}
      <Sequence from={418} durationInFrames={152}>
        <InfoScene />
      </Sequence>

      {/* White flash transitions */}
      {flashFrames.map((f, i) => (
        <Flash key={i} at={f} />
      ))}
    </AbsoluteFill>
  );
};
