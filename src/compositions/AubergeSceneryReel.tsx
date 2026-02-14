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

const serifFont = "'Noto Serif CJK JP', 'Noto Serif JP', serif";
const sansFont = "'Noto Sans JP', 'Noto Sans CJK JP', sans-serif";
const warmGold = "#d4a853";
const softCream = "#f5efe3";
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

// ─── Warm vignette overlay ──────────────────────────────
const WarmOverlay: React.FC<{
  style?: "vignette" | "bottomFade" | "gentle" | "topFade";
  opacity?: number;
}> = ({ style = "vignette", opacity = 0.4 }) => {
  const styles: Record<string, string> = {
    vignette: `radial-gradient(ellipse at center, transparent 30%, rgba(13,10,7,${opacity}) 100%)`,
    bottomFade: `linear-gradient(to top, rgba(13,10,7,${opacity * 1.2}) 0%, rgba(13,10,7,${opacity * 0.5}) 35%, transparent 70%)`,
    gentle: `rgba(13,10,7,${opacity * 0.5})`,
    topFade: `linear-gradient(to bottom, rgba(13,10,7,${opacity * 0.8}) 0%, transparent 50%, rgba(13,10,7,${opacity * 0.3}) 100%)`,
  };
  return <div style={{ position: "absolute", inset: 0, background: styles[style] }} />;
};

// ─── Soft text appearance ───────────────────────────────
const SoftText: React.FC<{
  children: React.ReactNode;
  frame: number;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, frame, delay = 0, duration = 30, style }) => {
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const y = interpolate(frame, [delay, delay + duration], [12, 0], {
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

// ─── Crossfade between two images ───────────────────────
const CrossfadeImages: React.FC<{
  img1: string;
  img2: string;
  move1?: "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp";
  move2?: "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp";
  switchAt?: number;
  fadeDuration?: number;
  totalFrames: number;
}> = ({
  img1,
  img2,
  move1 = "zoomIn",
  move2 = "panRight",
  switchAt = 60,
  fadeDuration = 20,
  totalFrames,
}) => {
  const frame = useCurrentFrame();
  const secondVisible = frame > switchAt;
  const op1 = secondVisible
    ? interpolate(frame, [switchAt, switchAt + fadeDuration], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const op2 = secondVisible
    ? interpolate(frame, [switchAt, switchAt + fadeDuration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: op1 }}>
        <Sequence from={0} durationInFrames={switchAt + fadeDuration + 10}>
          <KenBurns src={img1} move={move1} />
        </Sequence>
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: op2 }}>
        <Sequence from={switchAt} durationInFrames={totalFrames - switchAt}>
          <KenBurns src={img2} move={move2} />
        </Sequence>
      </div>
    </>
  );
};

// ─── Scene 1: Deer Encounter (Hook) ─────────────────────
const DeerScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <KenBurns src="auberge/img30.jpg" move="zoomIn" speed={0.06} />
      <WarmOverlay style="bottomFade" opacity={0.5} />

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
        <SoftText frame={frame} delay={20} style={{
          fontSize: 58,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 600,
          letterSpacing: 8,
          textShadow: "0 3px 24px rgba(0,0,0,0.6)",
        }}>
          ようこそ、鹿のやへ
        </SoftText>
        <SoftText frame={frame} delay={40} style={{
          fontSize: 30,
          color: "rgba(255,255,255,0.7)",
          fontFamily: sansFont,
          fontWeight: 400,
          letterSpacing: 4,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          奈良公園に佇むオーベルジュ
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Autumn Avenue ─────────────────────────────
const AutumnScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <KenBurns src="auberge/img16.jpg" move="panLeft" speed={0.06} />
      <WarmOverlay style="bottomFade" opacity={0.45} />

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
        <SoftText frame={frame} delay={15} style={{
          fontSize: 28,
          color: warmGold,
          fontFamily: sansFont,
          letterSpacing: 6,
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          AUTUMN IN NARA
        </SoftText>
        <SoftText frame={frame} delay={25} style={{
          fontSize: 52,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 600,
          letterSpacing: 6,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          紅葉の参道を歩けば
        </SoftText>
        <SoftText frame={frame} delay={40} style={{
          fontSize: 34,
          color: "rgba(255,255,255,0.7)",
          fontFamily: serifFont,
          fontWeight: 400,
          letterSpacing: 3,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          鹿がそっと出迎えてくれます
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Hotel Entrance / Sign ─────────────────────
const EntranceScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <CrossfadeImages
        img1="auberge/img34.jpg"
        img2="auberge/img17.jpg"
        move1="zoomIn"
        move2="zoomOut"
        switchAt={55}
        fadeDuration={20}
        totalFrames={120}
      />
      <WarmOverlay style="bottomFade" opacity={0.45} />

      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <SoftText frame={frame} delay={15} style={{
          fontSize: 64,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 700,
          letterSpacing: 10,
          textShadow: "0 3px 24px rgba(0,0,0,0.6)",
        }}>
          鹿のや
        </SoftText>
        <SoftText frame={frame} delay={30} style={{
          fontSize: 28,
          color: "rgba(255,255,255,0.6)",
          fontFamily: sansFont,
          fontWeight: 300,
          letterSpacing: 6,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          L&apos;ARTISAN KANOYA
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Garden & Nature ───────────────────────────
const GardenScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <CrossfadeImages
        img1="auberge/img36.jpg"
        img2="auberge/img23.jpg"
        move1="panUp"
        move2="zoomIn"
        switchAt={55}
        fadeDuration={18}
        totalFrames={120}
      />
      <WarmOverlay style="bottomFade" opacity={0.4} />

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
        <SoftText frame={frame} delay={15} style={{
          fontSize: 28,
          color: warmGold,
          fontFamily: sansFont,
          letterSpacing: 6,
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          JAPANESE GARDEN
        </SoftText>
        <SoftText frame={frame} delay={25} style={{
          fontSize: 52,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 600,
          letterSpacing: 6,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          四季の移ろいを感じて
        </SoftText>
        <SoftText frame={frame} delay={40} style={{
          fontSize: 32,
          color: "rgba(255,255,255,0.7)",
          fontFamily: serifFont,
          fontWeight: 400,
          letterSpacing: 2,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          竹垣の庭と障子越しの緑
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: Warm Interior ─────────────────────────────
const InteriorScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <CrossfadeImages
        img1="auberge/img38.jpg"
        img2="auberge/img13.jpg"
        move1="panRight"
        move2="panLeft"
        switchAt={50}
        fadeDuration={18}
        totalFrames={110}
      />
      <WarmOverlay style="bottomFade" opacity={0.4} />

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
        <SoftText frame={frame} delay={15} style={{
          fontSize: 28,
          color: warmGold,
          fontFamily: sansFont,
          letterSpacing: 6,
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          INTERIOR
        </SoftText>
        <SoftText frame={frame} delay={25} style={{
          fontSize: 52,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 600,
          letterSpacing: 6,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          温もりに満ちた空間
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6: Dining with a View ────────────────────────
const DiningViewScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <CrossfadeImages
        img1="auberge/img12.jpg"
        img2="auberge/img08.jpg"
        move1="zoomIn"
        move2="panRight"
        switchAt={55}
        fadeDuration={18}
        totalFrames={120}
      />
      <WarmOverlay style="bottomFade" opacity={0.4} />

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
        <SoftText frame={frame} delay={15} style={{
          fontSize: 28,
          color: warmGold,
          fontFamily: sansFont,
          letterSpacing: 6,
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          DINING
        </SoftText>
        <SoftText frame={frame} delay={25} style={{
          fontSize: 52,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 600,
          letterSpacing: 6,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          森を望む食卓
        </SoftText>
        <SoftText frame={frame} delay={40} style={{
          fontSize: 32,
          color: "rgba(255,255,255,0.7)",
          fontFamily: serifFont,
          fontWeight: 400,
          letterSpacing: 2,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          窓の向こうに広がる奈良の森
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7: Cuisine Moments ───────────────────────────
const CuisineMoments: React.FC = () => {
  const frame = useCurrentFrame();

  const images = [
    { src: "auberge/img01.jpg", move: "zoomIn" as const },
    { src: "auberge/img03.jpg", move: "panRight" as const },
    { src: "auberge/img32.jpg", move: "zoomOut" as const },
  ];
  const seg = 37;

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      {images.map((img, i) => {
        const start = i * seg;
        const end = start + seg;
        const fadeIn = interpolate(frame, [start, start + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 8, end], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const op = Math.min(fadeIn, i === images.length - 1 ? fadeIn : fadeOut);
        return (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: op }}>
            <Sequence from={start} durationInFrames={seg + 10}>
              <KenBurns src={img.src} move={img.move} speed={0.06} />
            </Sequence>
          </div>
        );
      })}
      <WarmOverlay style="bottomFade" opacity={0.35} />

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
        <SoftText frame={frame} delay={10} style={{
          fontSize: 28,
          color: warmGold,
          fontFamily: sansFont,
          letterSpacing: 6,
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          CUISINE
        </SoftText>
        <SoftText frame={frame} delay={20} style={{
          fontSize: 52,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 600,
          letterSpacing: 6,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          旬を纏う一皿
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 8: Room & Comfort ────────────────────────────
const RoomScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <CrossfadeImages
        img1="auberge/img28.jpg"
        img2="auberge/img15.jpg"
        move1="panLeft"
        move2="zoomIn"
        switchAt={50}
        fadeDuration={18}
        totalFrames={100}
      />
      <WarmOverlay style="bottomFade" opacity={0.4} />

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
        <SoftText frame={frame} delay={15} style={{
          fontSize: 28,
          color: warmGold,
          fontFamily: sansFont,
          letterSpacing: 6,
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          ROOM
        </SoftText>
        <SoftText frame={frame} delay={25} style={{
          fontSize: 52,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 600,
          letterSpacing: 6,
          textShadow: "0 3px 20px rgba(0,0,0,0.6)",
        }}>
          心やすらぐひととき
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 9: Closing ───────────────────────────────────
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Full-scene fade in from black
  const sceneIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      <div style={{ position: "absolute", inset: 0, opacity: sceneIn }}>
        <KenBurns src="auberge/img37.jpg" move="zoomIn" speed={0.04} />
      </div>
      <WarmOverlay style="bottomFade" opacity={0.55} />
      <WarmOverlay style="topFade" opacity={0.3} />

      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <SoftText frame={frame} delay={20} style={{
          fontSize: 38,
          color: "rgba(255,255,255,0.7)",
          fontFamily: serifFont,
          fontWeight: 400,
          letterSpacing: 4,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          また会いに来てください
        </SoftText>

        {/* Thin gold line */}
        <div
          style={{
            width: interpolate(frame, [35, 60], [0, 120], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 1.5,
            background: `linear-gradient(90deg, transparent, ${warmGold}, transparent)`,
          }}
        />

        <SoftText frame={frame} delay={40} style={{
          fontSize: 72,
          color: "#fff",
          fontFamily: serifFont,
          fontWeight: 700,
          letterSpacing: 10,
          textShadow: "0 3px 24px rgba(0,0,0,0.6)",
        }}>
          鹿のや
        </SoftText>

        <SoftText frame={frame} delay={55} style={{
          fontSize: 28,
          color: "rgba(255,255,255,0.6)",
          fontFamily: sansFont,
          fontWeight: 300,
          letterSpacing: 6,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          L&apos;ARTISAN KANOYA
        </SoftText>

        <SoftText frame={frame} delay={70} style={{
          marginTop: 20,
          fontSize: 24,
          color: "rgba(255,255,255,0.45)",
          fontFamily: sansFont,
          fontWeight: 300,
          letterSpacing: 2,
          textAlign: "center",
          lineHeight: "1.8",
          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}>
          奈良市春日野町16 奈良公園内
        </SoftText>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ─────────────────────────────────────
export const AubergeSceneryReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: warmBrown }}>
      {/* Scene 1: Deer encounter - hook (0-120, 4s) */}
      <Sequence from={0} durationInFrames={120}>
        <DeerScene />
      </Sequence>

      {/* Scene 2: Autumn avenue (120-240, 4s) */}
      <Sequence from={120} durationInFrames={120}>
        <AutumnScene />
      </Sequence>

      {/* Scene 3: Hotel entrance / sign (240-360, 4s) */}
      <Sequence from={240} durationInFrames={120}>
        <EntranceScene />
      </Sequence>

      {/* Scene 4: Garden & nature (360-480, 4s) */}
      <Sequence from={360} durationInFrames={120}>
        <GardenScene />
      </Sequence>

      {/* Scene 5: Warm interior / lounge (480-590, 3.7s) */}
      <Sequence from={480} durationInFrames={110}>
        <InteriorScene />
      </Sequence>

      {/* Scene 6: Dining with a view (590-710, 4s) */}
      <Sequence from={590} durationInFrames={120}>
        <DiningViewScene />
      </Sequence>

      {/* Scene 7: Cuisine moments (710-820, 3.7s) */}
      <Sequence from={710} durationInFrames={110}>
        <CuisineMoments />
      </Sequence>

      {/* Scene 8: Room comfort (820-920, 3.3s) */}
      <Sequence from={820} durationInFrames={100}>
        <RoomScene />
      </Sequence>

      {/* Scene 9: Closing with deer (920-1080, 5.3s) */}
      <Sequence from={920} durationInFrames={160}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
