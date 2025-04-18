import BacklogFormDialog from "@/components/dialogs/BacklogFormDialog";
import Loading from "@/components/utils/Loading";
import useBacklog from "@/hooks/useBacklog";
import { Edit, Trash2Icon } from "lucide-react";
import { Link, Navigate, Outlet, useLocation, useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewBacklog() {
  let { id } = useParams();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<string>("backlog");
  const { getBacklogById, updateBacklog, deleteBacklog } = useBacklog();
  const { data: backlog, status } = getBacklogById(parseInt(id!));

  const tabs = [
    {
      title: "Backlog",
      value: "backlog",
      href: `/backlogs/${id}`,
    },
    {
      title: "Browse",
      value: "browse",
      href: `/backlogs/${id}/browse-games`,
    },
  ];

  useEffect(() => {
    if (location.pathname === `/backlogs/${id}`) {
      setCurrentTab("backlog");
    } else if (location.pathname === `/backlogs/${id}/browse-games`) {
      setCurrentTab("browse");
    }
  }, [location.pathname]);

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <Navigate to="/error" />;
  }

  return (
    <div>
      <div className="py-12">
        <h1 className="font-bold text-5xl">{backlog?.name}</h1>
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

      <Tabs defaultValue={currentTab} className="w-full">
        <TabsList>
          {tabs.map((tab) => {
            return (
              <TabsTrigger key={tab.value} value={tab.value} asChild>
                <Link to={tab.href}>{tab.title}</Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value={currentTab}>
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
}
