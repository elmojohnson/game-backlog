import React from "react";
import { Game } from "@/types/game";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type GameItemProps = {
  game: Game;
  actionButtons?: React.ReactNode[];
};

export default function GameItem({ game, actionButtons }: GameItemProps) {
  return (
    <Card className="flex sm:flex-row flex-col gap-4 !p-5">
      <LazyLoadImage
        alt={game.name}
        src={game.background_image}
        effect="blur"
        wrapperClassName="sm:w-[250px] w-full sm:h-[120px] h-[250px] overflow-hidden rounded-lg"
        className="w-full h-full object-cover inline-flex"
        threshold={200}
        useIntersectionObserver
      />

      <div className="w-full flex flex-col justify-between gap-3">
        <div>
          <CardTitle className="line-clamp-2">{game.name}</CardTitle>
          <CardDescription>{game.genres.map((genre) => genre.name).join(", ")}</CardDescription>
        </div>
        {actionButtons ? (
          <div className="flex gap-2 justify-end">
            {actionButtons.map((button, i) => {
              return <React.Fragment key={i}>{button}</React.Fragment>;
            })}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
