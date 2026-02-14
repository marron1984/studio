import React from "react";
import { Composition } from "remotion";
import { RestaurantMenuReel } from "./compositions/RestaurantMenuReel";
import { OdenStandReel } from "./compositions/OdenStandReel";
import { YakinikuArataReel } from "./compositions/YakinikuArataReel";
import { AubergeRecruitReel } from "./compositions/AubergeRecruitReel";
import { AubergeSceneryReel } from "./compositions/AubergeSceneryReel";
import { AubergeOtaReel } from "./compositions/AubergeOtaReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RestaurantMenuReel"
        component={RestaurantMenuReel}
        durationInFrames={990}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="OdenStandReel"
        component={OdenStandReel}
        durationInFrames={570}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="YakinikuArataReel"
        component={YakinikuArataReel}
        durationInFrames={570}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AubergeRecruitReel"
        component={AubergeRecruitReel}
        durationInFrames={1290}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AubergeSceneryReel"
        component={AubergeSceneryReel}
        durationInFrames={1080}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AubergeOtaReel"
        component={AubergeOtaReel}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
