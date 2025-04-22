import BacklogFormDialog from "@/components/dialogs/BacklogFormDialog";
import Loading from "@/components/utils/Loading";
import useBacklog from "@/hooks/useBacklog";
import { Edit, Trash2Icon } from "lucide-react";
import { Link, Navigate, Outlet, useLocation, useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function ViewBacklog() {
  let { id } = useParams();
  const location = useLocation();
  const { getBacklogById, updateBacklog, deleteBacklog } = useBacklog();
  const { data: backlog, status } = getBacklogById(parseInt(id!));

  const tabs = [
    {
      title: "Backlog",
      href: `/backlogs/${id}`,
    },
    {
      title: "Browse",
      href: `/backlogs/${id}/browse-games`,
    },
  ];
  
  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <Navigate to="/error" />;
  }

  return (
    <div>
      <div className="py-12">
        <h1 className="font-bold text-5xl mb-4">{backlog?.name}</h1>
        <p className="line-clamp-3 mb-4">{backlog?.description}</p>
        <div className="flex items-center gap-2">
          <BacklogFormDialog
            title="Edit backlog details"
            buttonTriggerText="Edit"
            buttonTriggerIcon={<Edit />}
            backlogData={backlog}
            formSubmit={updateBacklog}
            submitButtonText="Update"
          />
          <Button variant="outline" onClick={() => deleteBacklog(parseInt(id!))}>
            <Trash2Icon />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue={location.pathname} className="w-full">
        <TabsList className="w-full">
          {tabs.map((tab) => {
            return (
              <TabsTrigger key={tab.title} value={tab.href} asChild>
                <Link to={tab.href}>{tab.title}</Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value={location.pathname}>
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
}
