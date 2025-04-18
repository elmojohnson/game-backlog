import { useSession } from "@/contexts/SessionProvider";
import { BacklogSchema } from "@/form-schemas/Backlog";
import { supabase } from "@/lib/supabase";
import { Backlog, BacklogGame, PaginatedBacklogGames, PaginatinatedBacklog } from "@/types/backlog";
import { Game } from "@/types/game";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { InferType } from "yup";

export default function useBacklog() {
  const navigate = useNavigate();
  const session = useSession();
  const queryClient = useQueryClient();

  // List Backlog
  async function queryBacklogList({ pageParam }: { pageParam: number }): Promise<PaginatinatedBacklog> {
    const listPerPage = 12;

    const { data, count, error } = await supabase
      .from("backlogs")
      .select("*", { count: "exact" })
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false })
      .range((pageParam - 1) * listPerPage, pageParam * listPerPage - 1)
      .overrideTypes<Array<Backlog>, { merge: false }>();

    const totalPages = count ? Math.ceil(count / listPerPage) : 0;

    if (error) {
      navigate("/error");
    }

    return { data, count, totalPages };
  }

  function getBacklogList() {
    return useInfiniteQuery({
      queryKey: ["backlogList"],
      queryFn: queryBacklogList,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (Math.ceil(lastPage.totalPages / lastPageParam) <= 1) {
          return undefined;
        }

        return lastPageParam + 1;
      },
    });
  }

  // Single Backlog
  async function queryBacklogById(id: number): Promise<Backlog | undefined> {
    const { data, error } = await supabase.from("backlogs").select("*").eq("id", id).overrideTypes<Array<Backlog>, { merge: false }>();

    if (error) {
      toast.error("There was an error loading the backlog");
      navigate("/");
    }

    if (data) {
      return data[0];
    }
  }

  function getBacklogById(id: number) {
    return useQuery({
      queryKey: ["backlog", id],
      refetchOnMount: false,
      queryFn: () => queryBacklogById(id),
    });
  }

  // List Backlog Games
  async function queryBacklogGames({ pageParam }: { pageParam: number }, id: number): Promise<PaginatedBacklogGames> {
    const listPerPage = 12;

    const { data, count, error } = await supabase
      .from("games")
      .select("*", { count: "exact" })
      .eq("backlog_id", id)
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false })
      .range((pageParam - 1) * listPerPage, pageParam * listPerPage - 1)
      .overrideTypes<Array<BacklogGame>, { merge: false }>();

    const totalPages = count ? Math.ceil(count / listPerPage) : 0;

    if (error) {
      navigate("/error");
    }

    return { data, count, totalPages };
  }

  function getBacklogGames(id: number) {
    return useInfiniteQuery({
      queryKey: ["backlogGames", id],
      queryFn: (pageParam) => queryBacklogGames(pageParam, id),
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (Math.ceil(lastPage.totalPages / lastPageParam) <= 1) {
          return undefined;
        }

        return lastPageParam + 1;
      },
    });
  }

  // Create Backlog
  async function createBacklog({ name, description }: InferType<typeof BacklogSchema>, setError: UseFormSetError<InferType<typeof BacklogSchema>>) {
    const { count } = await supabase.from("backlogs").select("name", { count: "exact" }).eq("user_id", session?.user?.id).eq("name", name);

    if (count) {
      setError("root", {
        type: "manual",
        message: name + " already exist",
      });
    } else {
      const { data, error } = await supabase
        .from("backlogs")
        .upsert({ name, description: description || null, user_id: session?.user?.id })
        .select("id")
        .overrideTypes<Array<Backlog>, { merge: false }>();

      if (error) {
        navigate("/error");
      } else {
        toast.success("Backlog created!");
        navigate("/backlogs/" + data[0].id);
      }
    }
  }

  // Update Backlog
  async function updateBacklog(
    { name, description }: InferType<typeof BacklogSchema>,
    setError: UseFormSetError<InferType<typeof BacklogSchema>>,
    id?: number
  ) {
    const { error } = await supabase
      .from("backlogs")
      .update({ name, description: description || null, updated_at: new Date().toISOString() })
      .eq("id", id)
      .overrideTypes<Backlog, { merge: false }>();

    if (error) {
      setError("root", {
        type: "manual",
        message: "There was an error updating. Please try again.",
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ["backlog", id] });
      toast.success("Backlog details updated!");
    }
  }

  // Delete backlog
  async function deleteBacklog(id: number) {
    const { error, data } = await supabase.from("backlogs").delete().eq("id", id).select();

    if(error) {
      toast.error("There was an error deleting the backlog. Please try again.")
    }

    if(data) {
      toast.success("Backlog deleted!");
      queryClient.invalidateQueries({ queryKey: ["backlogList"] });
      navigate("/");
    }
  }

  // Add game to backlog
  async function addGameToBacklog(backlogId: number, game: Game) {
    const { count } = await supabase
      .from("games")
      .select("name", { count: "exact" })
      .eq("name", game.name)
      .eq("user_id", session?.user?.id)
      .eq("backlog_id", backlogId);

    if (count) {
      toast.warning("Game is already in the backlog");
    } else {
      const { data, error } = await supabase
        .from("games")
        .upsert({ name: game.name, game_metadata: JSON.stringify(game), user_id: session?.user.id, backlog_id: backlogId })
        .select("id")
        .overrideTypes<Array<BacklogGame>, { merge: false }>();

      if (error) {
        console.log(error);
        toast.error("There was an error adding it to the backlog. Please try again.");
      }

      if (data) {
        toast.success("Game added!");
        queryClient.invalidateQueries({ queryKey: ["backlogGames", backlogId] });
      }
    }
  }

  // Remove game from backlog
  async function removeGameFromBacklog(gameId: number) {

  }

  return { getBacklogList, getBacklogById, getBacklogGames, createBacklog, updateBacklog, deleteBacklog, addGameToBacklog };
}
