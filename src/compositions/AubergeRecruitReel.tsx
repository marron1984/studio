import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  Img,
  staticFile,
} from "remotion";

const fontFamily = "'Noto Serif CJK JP', 'Noto Serif JP', serif";
const sansFamily = "'Noto Sans JP', 'Noto Sans CJK JP', sans-serif";
const gold = "#c4a265";
const darkGold = "#a6894e";
const warmBg = "#0c0906";

// ─── Shared Components ───────────────────────────────────

const KenBurnsImage: React.FC<{
  src: string;
  direction?: "in" | "out" | "left" | "right";
  intensity?: number;
}> = ({ src, direction = "in", intensity = 1.12 }) => {
  const frame = useCurrentFrame();
  const progress = frame / 150;

  let transform: string;
  switch (direction) {
    case "out":
      transform = `scale(${intensity - (intensity - 1) * progress})`;
      break;
    case "left":
      transform = `scale(${1 + 0.08 * progress}) translateX(${-2 * progress}%)`;
      break;
    case "right":
      transform = `scale(${1 + 0.08 * progress}) translateX(${2 * progress}%)`;
      break;
    default:
      transform = `scale(${1 + (intensity - 1) * progress})`;
  }

  return (
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform,
      }}
    />
  );
};

const DarkOverlay: React.FC<{
  opacity?: number;
  gradient?: "bottom" | "center" | "full" | "top";
}> = ({ opacity = 0.5, gradient = "full" }) => {
  let bg: string;
  switch (gradient) {
    case "bottom":
      bg = `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity * 0.6}) 40%, transparent 80%)`;
      break;
    case "top":
      bg = `linear-gradient(to bottom, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity * 0.5}) 40%, transparent 80%)`;
      break;
    case "center":
      bg = `radial-gradient(ellipse at center, rgba(0,0,0,${opacity * 0.3}) 0%, rgba(0,0,0,${opacity}) 100%)`;
      break;
    default:
      bg = `rgba(0,0,0,${opacity})`;
  }
  return (
    <div style={{ position: "absolute", inset: 0, background: bg }} />
  );
};

const GoldLine: React.FC<{ width?: number; frame: number; delay?: number }> = ({
  width = 80,
  frame,
  delay = 0,
}) => {
  const lineWidth = interpolate(frame, [delay, delay + 30], [0, width], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: lineWidth,
        height: 1.5,
        background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
        margin: "0 auto",
      }}
    />
  );
};

// ─── Scene 1: Opening Hook ──────────────────────────────
const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();

  const circles = Array.from({ length: 10 }, (_, i) => ({
    x: 10 + ((i * 89) % 80),
    y: 15 + ((i * 67) % 70),
    size: 2 + (i % 4) * 1.5,
    delay: i * 6,
    speed: 0.2 + (i % 3) * 0.1,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg, justifyContent: "center", alignItems: "center" }}>
      {/* Warm ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,162,101,0.08) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Gold particles */}
      {circles.map((c, i) => {
        const appear = interpolate(frame, [c.delay, c.delay + 20], [0, 0.4], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = c.y - frame * c.speed;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${y}%`,
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              background: gold,
              opacity: appear,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}

      {/* Main text */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, zIndex: 1 }}>
        {/* Small top label */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            fontFamily: sansFamily,
            fontWeight: 300,
            letterSpacing: 8,
            opacity: interpolate(frame, [15, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [15, 40], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          PREMIUM AUBERGE
        </div>

        <GoldLine frame={frame} delay={25} width={120} />

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 12,
            opacity: interpolate(frame, [30, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [30, 55], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          Staff募集
        </div>

        <GoldLine frame={frame} delay={40} width={120} />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.65)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 4,
            lineHeight: 2,
            textAlign: "center",
            opacity: interpolate(frame, [50, 75], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [50, 75], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          奈良の特別な場所で
          <br />
          あなたの力を
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Brand Introduction ────────────────────────
const BrandScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Two images crossfade: sign (img34) -> L'Artisan sign (img17)
  const showSecond = frame > 60;
  const firstOpacity = showSecond
    ? interpolate(frame, [60, 80], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const secondOpacity = showSecond
    ? interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg }}>
      {/* Image 1: KANOYA sign */}
      <div style={{ position: "absolute", inset: 0, opacity: firstOpacity }}>
        <KenBurnsImage src="auberge/img34.jpg" direction="in" />
      </div>
      {/* Image 2: L'Artisan illuminated sign */}
      <div style={{ position: "absolute", inset: 0, opacity: secondOpacity }}>
        <KenBurnsImage src="auberge/img17.jpg" direction="out" intensity={1.1} />
      </div>
      <DarkOverlay opacity={0.45} gradient="bottom" />

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: gold,
            fontFamily: sansFamily,
            fontWeight: 400,
            letterSpacing: 6,
            opacity: interpolate(frame, [20, 45], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          NARA KASUGA
        </div>
        <div
          style={{
            fontSize: 56,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 10,
            opacity: interpolate(frame, [30, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [30, 55], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          鹿のや
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.55)",
            fontFamily: sansFamily,
            fontWeight: 300,
            letterSpacing: 8,
            opacity: interpolate(frame, [45, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          L&apos;ARTISAN KANOYA
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Dining Spaces ─────────────────────────────
const DiningScene: React.FC = () => {
  const frame = useCurrentFrame();

  const images = [
    { src: "auberge/img18.jpg", dir: "right" as const },
    { src: "auberge/img07.jpg", dir: "left" as const },
    { src: "auberge/img08.jpg", dir: "in" as const },
    { src: "auberge/img11.jpg", dir: "out" as const },
  ];

  const segmentLength = 45;

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg }}>
      {images.map((img, i) => {
        const start = i * segmentLength;
        const end = start + segmentLength;
        const fadeIn = interpolate(frame, [start, start + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 8, end], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = Math.min(fadeIn, i === images.length - 1 ? fadeIn : fadeOut);
        return (
          <div key={i} style={{ position: "absolute", inset: 0, opacity }}>
            <Sequence from={start} durationInFrames={segmentLength + 10}>
              <KenBurnsImage src={img.src} direction={img.dir} />
            </Sequence>
          </div>
        );
      })}
      <DarkOverlay opacity={0.35} gradient="bottom" />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: gold,
            fontFamily: sansFamily,
            letterSpacing: 6,
            fontWeight: 400,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          DINING SPACE
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 6,
            opacity: interpolate(frame, [18, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [18, 40], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          洗練された空間
        </div>
        <GoldLine frame={frame} delay={30} width={60} />
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 2,
            lineHeight: 1.9,
            textAlign: "center",
            opacity: interpolate(frame, [35, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          カウンター8席と個室で
          <br />
          極上のひとときを演出
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Cuisine Showcase ──────────────────────────
const CuisineScene: React.FC = () => {
  const frame = useCurrentFrame();

  const images = [
    { src: "auberge/img03.jpg", dir: "in" as const },
    { src: "auberge/img01.jpg", dir: "left" as const },
    { src: "auberge/img31.jpg", dir: "right" as const },
    { src: "auberge/img05.jpg", dir: "out" as const },
  ];

  const segmentLength = 40;

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg }}>
      {images.map((img, i) => {
        const start = i * segmentLength;
        const end = start + segmentLength;
        const fadeIn = interpolate(frame, [start, start + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 8, end], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = Math.min(fadeIn, i === images.length - 1 ? fadeIn : fadeOut);
        return (
          <div key={i} style={{ position: "absolute", inset: 0, opacity }}>
            <Sequence from={start} durationInFrames={segmentLength + 10}>
              <KenBurnsImage src={img.src} direction={img.dir} />
            </Sequence>
          </div>
        );
      })}
      <DarkOverlay opacity={0.35} gradient="bottom" />

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: gold,
            fontFamily: sansFamily,
            letterSpacing: 6,
            fontWeight: 400,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          CUISINE
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 6,
            opacity: interpolate(frame, [18, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [18, 40], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          至高の一皿
        </div>
        <GoldLine frame={frame} delay={30} width={60} />
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 2,
            lineHeight: 1.9,
            textAlign: "center",
            opacity: interpolate(frame, [35, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          和とフレンチの融合が
          <br />
          新たな感動を生み出す
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: Kitchen / Chef ────────────────────────────
const KitchenScene: React.FC = () => {
  const frame = useCurrentFrame();

  const showSecond = frame > 55;
  const firstOpacity = showSecond
    ? interpolate(frame, [55, 70], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const secondOpacity = showSecond
    ? interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg }}>
      <div style={{ position: "absolute", inset: 0, opacity: firstOpacity }}>
        <KenBurnsImage src="auberge/img09.jpg" direction="in" />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: secondOpacity }}>
        <KenBurnsImage src="auberge/img10.jpg" direction="left" />
      </div>
      <DarkOverlay opacity={0.4} gradient="bottom" />

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: gold,
            fontFamily: sansFamily,
            letterSpacing: 6,
            fontWeight: 400,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          KITCHEN
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 6,
            opacity: interpolate(frame, [18, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [18, 40], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          情熱が輝く厨房
        </div>
        <GoldLine frame={frame} delay={30} width={60} />
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 2,
            lineHeight: 1.9,
            textAlign: "center",
            opacity: interpolate(frame, [35, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          一流のシェフとともに
          <br />
          技術を磨く環境
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6: Accommodation ─────────────────────────────
const AccommodationScene: React.FC = () => {
  const frame = useCurrentFrame();

  const images = [
    { src: "auberge/img28.jpg", dir: "in" as const },
    { src: "auberge/img23.jpg", dir: "right" as const },
    { src: "auberge/img25.jpg", dir: "left" as const },
    { src: "auberge/img19.jpg", dir: "out" as const },
  ];

  const segmentLength = 38;

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg }}>
      {images.map((img, i) => {
        const start = i * segmentLength;
        const end = start + segmentLength;
        const fadeIn = interpolate(frame, [start, start + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 8, end], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = Math.min(fadeIn, i === images.length - 1 ? fadeIn : fadeOut);
        return (
          <div key={i} style={{ position: "absolute", inset: 0, opacity }}>
            <Sequence from={start} durationInFrames={segmentLength + 10}>
              <KenBurnsImage src={img.src} direction={img.dir} />
            </Sequence>
          </div>
        );
      })}
      <DarkOverlay opacity={0.35} gradient="bottom" />

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: gold,
            fontFamily: sansFamily,
            letterSpacing: 6,
            fontWeight: 400,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ACCOMMODATION
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 6,
            opacity: interpolate(frame, [18, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [18, 40], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          最上級のおもてなし
        </div>
        <GoldLine frame={frame} delay={30} width={60} />
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 2,
            lineHeight: 1.9,
            textAlign: "center",
            opacity: interpolate(frame, [35, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ゲストの記憶に残る
          <br />
          特別な滞在を届ける
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7: Nara Charm ────────────────────────────────
const NaraScene: React.FC = () => {
  const frame = useCurrentFrame();

  const showSecond = frame > 45;
  const showThird = frame > 80;

  const firstOp = showSecond
    ? interpolate(frame, [45, 60], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const secondOp = showThird
    ? interpolate(frame, [80, 95], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : showSecond
      ? interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 0;
  const thirdOp = showThird
    ? interpolate(frame, [80, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg }}>
      <div style={{ position: "absolute", inset: 0, opacity: firstOp }}>
        <KenBurnsImage src="auberge/img30.jpg" direction="in" />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: secondOp }}>
        <KenBurnsImage src="auberge/img16.jpg" direction="left" />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: thirdOp }}>
        <KenBurnsImage src="auberge/img37.jpg" direction="right" />
      </div>
      <DarkOverlay opacity={0.35} gradient="bottom" />

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: gold,
            fontFamily: sansFamily,
            letterSpacing: 6,
            fontWeight: 400,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          NARA
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 6,
            opacity: interpolate(frame, [18, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [18, 40], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          奈良の自然と共に
        </div>
        <GoldLine frame={frame} delay={30} width={60} />
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 2,
            lineHeight: 1.9,
            textAlign: "center",
            opacity: interpolate(frame, [35, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          春日大社のほとり
          <br />
          鹿と紅葉に囲まれた職場
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 8: Recruitment Details ───────────────────────
const RecruitScene: React.FC = () => {
  const frame = useCurrentFrame();

  const positions = [
    { title: "調理スタッフ", desc: "和食・フレンチの経験者歓迎" },
    { title: "サービススタッフ", desc: "接客・ソムリエ経験者歓迎" },
    { title: "フロントスタッフ", desc: "ホテル業務経験者歓迎" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg, justifyContent: "center", alignItems: "center" }}>
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,162,101,0.06) 0%, transparent 70%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, zIndex: 1, padding: "0 60px" }}>
        {/* Header */}
        <div
          style={{
            fontSize: 20,
            color: gold,
            fontFamily: sansFamily,
            letterSpacing: 8,
            fontWeight: 400,
            opacity: interpolate(frame, [5, 25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          RECRUIT
        </div>

        <div
          style={{
            fontSize: 48,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 8,
            opacity: interpolate(frame, [10, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [10, 35], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          募集職種
        </div>

        <GoldLine frame={frame} delay={25} width={100} />

        {/* Position cards */}
        {positions.map((pos, i) => {
          const delay = 35 + i * 18;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const translateX = interpolate(frame, [delay, delay + 20], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "24px 0",
                borderBottom: i < positions.length - 1 ? "1px solid rgba(196,162,101,0.15)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  color: "#fff",
                  fontFamily,
                  fontWeight: 600,
                  letterSpacing: 4,
                }}
              >
                {pos.title}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: sansFamily,
                  fontWeight: 300,
                  letterSpacing: 2,
                }}
              >
                {pos.desc}
              </div>
            </div>
          );
        })}

        {/* Benefits hint */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            opacity: interpolate(frame, [90, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.4)",
              fontFamily: sansFamily,
              fontWeight: 300,
              letterSpacing: 2,
              lineHeight: 2,
              textAlign: "center",
            }}
          >
            社員寮完備 / 食事補助あり / 研修制度充実
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 9: Closing CTA ───────────────────────────────
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBg, justifyContent: "center", alignItems: "center" }}>
      {/* Warm glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,162,101,0.1) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, zIndex: 1 }}>
        {/* Brand name */}
        <div
          style={{
            fontSize: 22,
            color: gold,
            fontFamily: sansFamily,
            fontWeight: 400,
            letterSpacing: 8,
            opacity: interpolate(frame, [10, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          PREMIUM AUBERGE
        </div>

        <div
          style={{
            fontSize: 60,
            color: "#fff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 10,
            opacity: interpolate(frame, [20, 45], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [20, 45], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          鹿のや
        </div>

        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            fontFamily: sansFamily,
            fontWeight: 300,
            letterSpacing: 6,
            opacity: interpolate(frame, [30, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          L&apos;ARTISAN KANOYA
        </div>

        <GoldLine frame={frame} delay={40} width={120} />

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: interpolate(frame, [55, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [55, 80], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: "#fff",
              fontFamily,
              fontWeight: 600,
              letterSpacing: 4,
            }}
          >
            お気軽にDMください
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.4)",
              fontFamily: sansFamily,
              fontWeight: 300,
              letterSpacing: 2,
              lineHeight: 2,
              textAlign: "center",
            }}
          >
            ご質問・ご応募お待ちしております
          </div>
        </div>

        {/* Location */}
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(frame, [70, 95], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.35)",
              fontFamily: sansFamily,
              fontWeight: 300,
              letterSpacing: 2,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            奈良市春日野町16
            <br />
            奈良公園内
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ─────────────────────────────────────
export const AubergeRecruitReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: warmBg }}>
      {/* Scene 1: Opening hook (0-120, 4s) */}
      <Sequence from={0} durationInFrames={120}>
        <OpeningScene />
      </Sequence>

      {/* Scene 2: Brand introduction (120-270, 5s) */}
      <Sequence from={120} durationInFrames={150}>
        <BrandScene />
      </Sequence>

      {/* Scene 3: Dining spaces (270-450, 6s) */}
      <Sequence from={270} durationInFrames={180}>
        <DiningScene />
      </Sequence>

      {/* Scene 4: Cuisine showcase (450-610, 5.3s) */}
      <Sequence from={450} durationInFrames={160}>
        <CuisineScene />
      </Sequence>

      {/* Scene 5: Kitchen / Chef (610-730, 4s) */}
      <Sequence from={610} durationInFrames={120}>
        <KitchenScene />
      </Sequence>

      {/* Scene 6: Accommodation (730-880, 5s) */}
      <Sequence from={730} durationInFrames={150}>
        <AccommodationScene />
      </Sequence>

      {/* Scene 7: Nara charm (880-1000, 4s) */}
      <Sequence from={880} durationInFrames={120}>
        <NaraScene />
      </Sequence>

      {/* Scene 8: Recruitment details (1000-1140, 4.7s) */}
      <Sequence from={1000} durationInFrames={140}>
        <RecruitScene />
      </Sequence>

      {/* Scene 9: Closing CTA (1140-1290, 5s) */}
      <Sequence from={1140} durationInFrames={150}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
