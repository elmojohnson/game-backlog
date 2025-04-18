import moment from "moment";
import { Backlog } from "@/types/backlog";
import { Link } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function BacklogItem({ backlog }: { backlog: Backlog }) {
  return (
    <Link to={"/backlogs/" + backlog.id}>
      <Card>
        <CardHeader>
          <CardTitle className="line-clamp-2">{backlog.name}</CardTitle>
        </CardHeader>
        <CardFooter>
          <p className="text-xs">{moment(backlog.created_at).fromNow()}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
