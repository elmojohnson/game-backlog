import React from "react";
import { InfiniteData } from "@tanstack/react-query";
import { PaginatinatedBacklog } from "@/types/backlog";
import NoData from "../utils/NoData";
import BacklogItem from "../items/BacklogItem";
import { motion } from "motion/react";

export default function BacklogList({ data }: { data: InfiniteData<PaginatinatedBacklog, unknown> | undefined }) {
  if (!data?.pages[0].count) {
    return <NoData message="Backlog list is empty" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-4"
    >
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.data?.map((backlog) => {
            return <BacklogItem key={backlog.id} backlog={backlog} />;
          })}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
