import { useParams } from "react-router";
import useBacklog from "@/hooks/useBacklog";
import { Game } from "@/types/game";
import GameItem from "./GameItem";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function BrowseGameItem({ game }: { game: Game }) {
  const { id } = useParams();
  const { addGameToBacklog } = useBacklog();

  function handleAddGame() {
    addGameToBacklog(parseInt(id!), game);
  }

  return (
    <GameItem
      game={game}
      actionButtons={[
        <Button size="sm" onClick={handleAddGame}>
          <Plus />
          Backlog
        </Button>,
      ]}
    />
  );
}
