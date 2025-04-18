import LoadMoreButton from "@/components/buttons/LoadMoreButton";
import BrowseGameList from "@/components/lists/BrowseGameList";
import Loading from "@/components/utils/Loading";
import useGames from "@/hooks/useGames";
import { Navigate } from "react-router";

export default function BrowseGames() {
  const { getGameList } = useGames();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = getGameList();

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <Navigate to="/error" />;
  }

  return (
    <div>
      <BrowseGameList data={data} />
      <LoadMoreButton hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
    </div>
  );
}
