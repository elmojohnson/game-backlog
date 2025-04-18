import React from "react";
import { PaginatedBacklogGames } from "@/types/backlog";
import { InfiniteData } from "@tanstack/react-query";
import NoData from "../utils/NoData";
import BacklogGameItem from "../items/BacklogGameItem";

export default function BacklogGameList({ data }: { data: InfiniteData<PaginatedBacklogGames, unknown> | undefined }) {
  if (!data?.pages[0].count) {
    return <NoData message="Backlog is empty" />;
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.data?.map((game) => {
            return <BacklogGameItem key={game.id} game={game} />;
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
