import { BacklogGame } from "@/types/backlog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Game } from "@/types/game";
import { Button } from "../ui/button";
import { NotepadText, Trash2, X } from "lucide-react";

export default function BacklogGameItem({ game }: { game: BacklogGame }) {
  const gameInfo: Game = JSON.parse(game.game_metadata);

  return (
    <Card className="max-h-[100px] !py-0 overflow-hidden flex flex-row items-center !gap-0">
      <div
        className="w-[240px] h-[100px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gameInfo.background_image})` }}
      />
      <CardHeader className="w-full">
        <CardTitle className="line-clamp-2">{game.name}</CardTitle>
        <CardDescription className="text-sm">{gameInfo.genres.map((genre) => genre.name).join(", ")}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button size="icon" variant="secondary">
          <NotepadText />
        </Button>
        <Button size="icon" variant="outline">
          <X />
        </Button>
      </CardContent>
    </Card>
  );
}
