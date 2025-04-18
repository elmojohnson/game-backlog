import { Game } from "@/types/game";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useParams } from "react-router";
import useBacklog from "@/hooks/useBacklog";

export default function BrowseGameItem({ game }: { game: Game }) {
  const { id } = useParams();
  const { addGameToBacklog } = useBacklog();

  function handleAddGame() {
    addGameToBacklog(parseInt(id!), game);
  }

  return (
    <Card className="flex sm:flex-row flex-col gap-4 !p-5">
      <div className="sm:w-[250px] w-full sm:h-[120px] h-[250px] bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: `url(${game.background_image})` }} />
      <div className="w-full flex flex-col justify-between gap-3">
        <div>
          <CardTitle className="line-clamp-2">{game.name}</CardTitle>
          <CardDescription>{game.genres.map((genre) => genre.name).join(", ")}</CardDescription>
        </div>
        <div>
          <Button size="sm" onClick={handleAddGame}>
            <Plus />
            Backlog
          </Button>
        </div>
      </div>
    </Card>
  );
}
