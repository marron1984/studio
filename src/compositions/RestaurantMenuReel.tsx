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

// ─── Scene 1: Opening ────────────────────────────────────
const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle particle / bokeh circles
  const circles = Array.from({ length: 8 }, (_, i) => ({
    x: 15 + (i * 97) % 80,
    y: 20 + (i * 53) % 70,
    size: 3 + (i % 4) * 2,
    delay: i * 8,
    speed: 0.3 + (i % 3) * 0.15,
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle red ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,30,30,0.15) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 40], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      />

      {/* Floating gold particles */}
      {circles.map((c, i) => {
        const particleOpacity = interpolate(
          frame - c.delay,
          [0, 20, 70, 90],
          [0, 0.3, 0.3, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const yOffset = -frame * c.speed;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              backgroundColor: "#c4a265",
              opacity: particleOpacity,
              transform: `translateY(${yOffset}px)`,
            }}
          />
        );
      })}

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* 祥瑞グループ */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 8,
            opacity: interpolate(frame, [8, 28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [8, 28], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          祥瑞グループ
        </div>

        {/* 二月の懐石 */}
        <div
          style={{
            fontSize: 34,
            color: "#c4a265",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 14,
            opacity: interpolate(frame, [18, 38], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [18, 38], [25, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          二月の懐石
        </div>

        {/* Gold decorative line */}
        <div
          style={{
            width: 120,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #c4a265, transparent)",
            transform: `scaleX(${interpolate(frame, [33, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        />

        {/* Course name */}
        <div
          style={{
            fontSize: 72,
            color: "#ffffff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 16,
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [40, 60], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          宗伝唐茶
        </div>

        <div
          style={{
            fontSize: 36,
            color: "#d4d0c8",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 8,
            opacity: interpolate(frame, [50, 68], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [50, 68], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          so denkaracha コース
        </div>

        {/* Price */}
        <div
          style={{
            marginTop: 20,
            fontSize: 44,
            color: "#c4a265",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 6,
            opacity: interpolate(frame, [60, 78], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [60, 78], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          ¥12,800
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Dish Slide Component ─────────────────────────────────
const DishSlide: React.FC<{
  imageSrc: string;
  categoryJa: string;
  descriptionLines: string[];
}> = ({ imageSrc, categoryJa, descriptionLines }) => {
  const frame = useCurrentFrame();
  const duration = 105;

  // Ken Burns slow zoom out
  const imageScale = interpolate(frame, [0, duration], [1.12, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 12, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Category text
  const catOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const catSlide = interpolate(frame, [8, 22], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold line
  const lineScale = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Description text
  const descOpacity = interpolate(frame, [14, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descSlide = interpolate(frame, [14, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Dish photo */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
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

      {/* Dark gradient for readability */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Category label at top */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: catOpacity,
          transform: `translateY(${catSlide}px)`,
        }}
      >
        <div
          style={{
            fontSize: 38,
            color: "#c4a265",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 14,
          }}
        >
          {categoryJa}
        </div>
        <div
          style={{
            marginTop: 14,
            width: 70,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #c4a265, transparent)",
            transform: `scaleX(${lineScale})`,
          }}
        />
      </div>

      {/* Description at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 70,
          right: 70,
          opacity: descOpacity,
          transform: `translateY(${descSlide}px)`,
        }}
      >
        {descriptionLines.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: 30,
              color: "#ffffff",
              fontFamily,
              fontWeight: 400,
              lineHeight: 2.2,
              textAlign: "center",
              letterSpacing: 4,
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Closing Scene ────────────────────────────────────────
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient red glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,30,30,0.12) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Top decorative line */}
        <div
          style={{
            width: 100,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #c4a265, transparent)",
            transform: `scaleX(${interpolate(frame, [5, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        />

        {/* Course name */}
        <div
          style={{
            fontSize: 68,
            color: "#ffffff",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 14,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [10, 30], [25, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          宗伝唐茶コース
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#d4d0c8",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 6,
            opacity: interpolate(frame, [20, 38], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [20, 38], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          二月の懐石　全八品
        </div>

        {/* Bottom decorative line */}
        <div
          style={{
            width: 80,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #c4a265, transparent)",
            transform: `scaleX(${interpolate(frame, [25, 45], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        />

        {/* Price */}
        <div
          style={{
            marginTop: 16,
            fontSize: 52,
            color: "#c4a265",
            fontFamily,
            fontWeight: 700,
            letterSpacing: 8,
            opacity: interpolate(frame, [30, 48], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [30, 48], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          ¥12,800
        </div>

        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.5)",
            fontFamily,
            fontWeight: 400,
            letterSpacing: 3,
            opacity: interpolate(frame, [35, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          （税込）
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: interpolate(frame, [45, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [45, 65], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <div
            style={{
              width: 50,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(196,162,101,0.5), transparent)",
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              fontFamily,
              fontWeight: 400,
              letterSpacing: 8,
            }}
          >
            ご予約承り中
          </div>
        </div>

        {/* Store info */}
        <div
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
            opacity: interpolate(frame, [70, 95], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [70, 95], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          {/* 西梅田店 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 26,
                color: "#c4a265",
                fontFamily,
                fontWeight: 700,
                letterSpacing: 6,
              }}
            >
              禅園 西梅田店
            </div>
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.55)",
                fontFamily,
                fontWeight: 400,
                letterSpacing: 1,
                lineHeight: 1.8,
                textAlign: "center",
              }}
            >
              大阪市北区梅田2-5-25
              <br />
              ハービスPLAZA B2F
            </div>
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.65)",
                fontFamily,
                fontWeight: 400,
                letterSpacing: 2,
              }}
            >
              TEL 06-6457-1002
            </div>
          </div>

          {/* 心斎橋店 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 26,
                color: "#c4a265",
                fontFamily,
                fontWeight: 700,
                letterSpacing: 6,
              }}
            >
              禅園 心斎橋店
            </div>
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.55)",
                fontFamily,
                fontWeight: 400,
                letterSpacing: 1,
                lineHeight: 1.8,
                textAlign: "center",
              }}
            >
              大阪市中央区西心斎橋1-3-3
              <br />
              ホテル日航ビルB2F
            </div>
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.65)",
                fontFamily,
                fontWeight: 400,
                letterSpacing: 2,
              }}
            >
              TEL 06-6241-7027
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ─────────────────────────────────────
export const RestaurantMenuReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Scene 1: Opening title (frames 0-120, 4s) */}
      <Sequence from={0} durationInFrames={120}>
        <OpeningScene />
      </Sequence>

      {/* Scene 2: 前菜 - Appetizer (frames 105-210) */}
      <Sequence from={105} durationInFrames={105}>
        <DishSlide
          imageSrc="dish1.jpg"
          categoryJa="前　菜"
          descriptionLines={[
            "ズワイガニ湯葉和え",
            "いなり小袖寿司　鰯梅煮",
            "鬼面人参旨煮　海老金棒",
            "お多福豆",
          ]}
        />
      </Sequence>

      {/* Scene 3: 椀物 - Soup (frames 200-305) */}
      <Sequence from={200} durationInFrames={105}>
        <DishSlide
          imageSrc="dish2.jpg"
          categoryJa="椀　物"
          descriptionLines={[
            "清汁仕立て　焼甘鯛",
            "筍　木の芽",
          ]}
        />
      </Sequence>

      {/* Scene 4: 造里 - Sashimi (frames 295-400) */}
      <Sequence from={295} durationInFrames={105}>
        <DishSlide
          imageSrc="dish3.jpg"
          categoryJa="造　里"
          descriptionLines={[
            "～鮮魚四種盛～",
            "本鮪　鰤　平貝　鯛",
            "造里醤油　あしらい",
          ]}
        />
      </Sequence>

      {/* Scene 5: 焼物 - Grilled (frames 390-495) */}
      <Sequence from={390} durationInFrames={105}>
        <DishSlide
          imageSrc="dish4.jpg"
          categoryJa="焼　物"
          descriptionLines={[
            "ズワイガニステーキ",
            "筍バター醤油焼　菜の花",
          ]}
        />
      </Sequence>

      {/* Scene 6: 蓋物 - Covered dish (frames 485-590) */}
      <Sequence from={485} durationInFrames={105}>
        <DishSlide
          imageSrc="dish5.jpg"
          categoryJa="蓋　物"
          descriptionLines={[
            "海老芋旨煮",
            "振り柚子　一寸豆",
          ]}
        />
      </Sequence>

      {/* Scene 7: 温物 - Hot pot (frames 580-685) */}
      <Sequence from={580} durationInFrames={105}>
        <DishSlide
          imageSrc="dish6.jpg"
          categoryJa="温　物"
          descriptionLines={[
            "黒毛和牛サーロイン味噌小鍋",
            "岩津葱　玉葱",
            "糸こんにゃく　焼豆腐",
          ]}
        />
      </Sequence>

      {/* Scene 8: 甘味 - Dessert (frames 675-780) */}
      <Sequence from={675} durationInFrames={105}>
        <DishSlide
          imageSrc="dish7.jpg"
          categoryJa="甘　味"
          descriptionLines={["ショコラブリュレ"]}
        />
      </Sequence>

      {/*
        Note: 仕上 (鯛飯) has no dedicated photo,
        so it's included in the closing scene context
      */}

      {/* Scene 9: Closing (frames 770-990) */}
      <Sequence from={770} durationInFrames={220}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
