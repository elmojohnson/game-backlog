import LoadMoreButton from "@/components/buttons/LoadMoreButton";
import BrowseGameList from "@/components/lists/BrowseGameList";
import SkeletonList from "@/components/utils/SkeletonList";
import useGames from "@/hooks/useGames";
import { AnimatePresence } from "motion/react";
import { Navigate } from "react-router";

export default function BrowseGames() {
  const { getGameList } = useGames();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = getGameList();

  if (status === "error") {
    return <Navigate to="/error" />;
  }

  return (
    <div>
      <AnimatePresence>{status === "pending" ? <SkeletonList maxRow={2} /> : <BrowseGameList data={data} />}</AnimatePresence>
      <LoadMoreButton hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
    </div>
  );
}
