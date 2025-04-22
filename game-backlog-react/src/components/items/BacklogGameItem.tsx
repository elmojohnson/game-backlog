import { useState } from "react";
import useBacklog from "@/hooks/useBacklog";

import { BacklogGame } from "@/types/backlog";
import { Game } from "@/types/game";

import GameItem from "./GameItem";
import { Button } from "../ui/button";
import NoteFormDialog from "../dialogs/NoteFormDialog";
import { Loader2, X } from "lucide-react";

export default function BacklogGameItem({ game }: { game: BacklogGame }) {
  const gameInfo: Game = JSON.parse(game.game_metadata);
  const [isRemoving, setRemoving] = useState<boolean>(false);
  const { removeGameFromBacklog, updateNote } = useBacklog();

  async function handleRemoveFromBacklog() {
    setRemoving(true);
    await removeGameFromBacklog(game.id);
    setRemoving(false);
  }

  return (
    <GameItem
      game={gameInfo}
      actionButtons={[
        <NoteFormDialog game={game} updateNote={updateNote} />,
        <Button size="sm" variant="outline" onClick={handleRemoveFromBacklog} disabled={isRemoving}>
          {isRemoving ? <Loader2 className="animate-spin" /> : <X />}
          Remove
        </Button>,
      ]}
    />
  );
}
