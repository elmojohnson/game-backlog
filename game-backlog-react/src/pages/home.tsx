import LoadMoreButton from "@/components/buttons/LoadMoreButton";
import BacklogFormDialog from "@/components/dialogs/BacklogFormDialog";
import BacklogList from "@/components/lists/BacklogList";
import Loading from "@/components/utils/Loading";
import useBacklog from "@/hooks/useBacklog";
import { Navigate } from "react-router";
import { Plus } from "lucide-react";

export default function Home() {
  const { getBacklogList, createBacklog } = useBacklog();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = getBacklogList();

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <Navigate to="/error" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h1 className="font-bold text-xl">Backlog</h1>
        <BacklogFormDialog title="Create a backlog" buttonTriggerText="Create" buttonTriggerIcon={<Plus />} formSubmit={createBacklog} submitButtonText="Create" />
      </div>
      <BacklogList data={data} />
      <LoadMoreButton hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
    </div>
  );
}
