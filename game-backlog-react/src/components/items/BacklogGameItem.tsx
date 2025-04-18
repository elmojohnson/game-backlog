import { BacklogGame } from "@/types/backlog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Game } from "@/types/game";
import { Button } from "../ui/button";
import { NotepadText, X } from "lucide-react";

export default function BacklogGameItem({ game }: { game: BacklogGame }) {
  const gameInfo: Game = JSON.parse(game.game_metadata);

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
          <Button size="sm" variant="outline"><NotepadText />Note</Button>
          <Button size="sm" variant="outline"><X />Remove</Button>
        </div>
      </div>
    </Card>
  );
}
