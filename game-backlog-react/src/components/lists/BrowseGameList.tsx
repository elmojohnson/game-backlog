import { GameList } from "@/types/game";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import BrowseGameItem from "../items/BrowseGameItem";

export default function BrowseGameList({ data }: { data: InfiniteData<GameList, unknown> | undefined }) {
  if (!data?.pages[0].count) {
    return <p>No data</p>;
  }

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-4">
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.results.map((game) => {
            return <BrowseGameItem key={game.id} game={game} />
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
