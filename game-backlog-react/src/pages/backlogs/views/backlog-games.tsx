import LoadMoreButton from "@/components/buttons/LoadMoreButton";
import BacklogGameList from "@/components/lists/BacklogGameList";
import SkeletonList from "@/components/utils/SkeletonList";
import useBacklog from "@/hooks/useBacklog";
import { AnimatePresence } from "motion/react";
import { Navigate, useParams } from "react-router";

export default function BacklogGames() {
  const { id } = useParams();
  const { getBacklogGames } = useBacklog();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = getBacklogGames(parseInt(id!));

  if (status === "error") {
    return <Navigate to="/error" />;
  }

  return (
    <div className="py-4 flex-col gap-4">
      <AnimatePresence>
        {status === "pending" ? <SkeletonList maxRow={2} /> : <BacklogGameList data={data} />}
      </AnimatePresence>
      <LoadMoreButton hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
    </div>
  );
}
