import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type LoadButtonProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export default function LoadMoreButton({ hasNextPage, isFetchingNextPage, fetchNextPage }: LoadButtonProps) {
  if (!hasNextPage) {
    return null;
  }

  return (
    <Button onClick={fetchNextPage} variant="secondary" disabled={!hasNextPage || isFetchingNextPage}>
      {isFetchingNextPage ? <Loader2 className="animate-spin" /> : "Load more"}
    </Button>
  );
}
