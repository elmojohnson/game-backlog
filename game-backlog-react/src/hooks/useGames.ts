import rawgApi from "@/lib/rawgApi";
import { GameList } from "@/types/game";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGames() {
  // List
  async function queryGameList({ pageParam }: { pageParam: number }): Promise<GameList> {
    const result = await rawgApi.get("/games?page=" + pageParam);
    return result.data;
  }

  function getGameList() {
    return useInfiniteQuery({
      queryKey: ["gameList"],
      queryFn: queryGameList,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (!lastPage.next) {
          return undefined;
        }

        return lastPageParam + 1;
      },
    });
  }

  return { getGameList };
}
