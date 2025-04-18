import { useState } from "react";
import useBacklog from "@/hooks/useBacklog";

import { BacklogGame } from "@/types/backlog";
import { Game } from "@/types/game";

import { Card, CardDescription, CardTitle } from "../ui/card";
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
    <Card className="flex sm:flex-row flex-col gap-4 !p-5">
      <div
        className="sm:w-[250px] w-full sm:h-[120px] h-[250px] bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: `url(${gameInfo.background_image})` }}
      />
      <div className="w-full flex flex-col justify-between gap-3">
        <div>
          <CardTitle className="line-clamp-2">{game.name}</CardTitle>
          <CardDescription>{gameInfo.genres.map((genre) => genre.name).join(", ")}</CardDescription>
        </div>
        <div className="flex gap-2">
          <NoteFormDialog game={game} updateNote={updateNote} />
          <Button size="sm" variant="outline" onClick={handleRemoveFromBacklog} disabled={isRemoving}>
            {isRemoving ? <Loader2 className="animate-spin" /> : <X />}
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}
