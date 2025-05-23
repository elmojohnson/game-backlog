import React from "react";
import { GameList } from "@/types/game";
import { InfiniteData } from "@tanstack/react-query";
import BrowseGameItem from "../items/BrowseGameItem";
import { motion } from "motion/react";

export default function BrowseGameList({ data }: { data: InfiniteData<GameList, unknown> | undefined }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-4"
    >
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.results.map((game) => {
            return <BrowseGameItem key={game.id} game={game} />;
          })}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
