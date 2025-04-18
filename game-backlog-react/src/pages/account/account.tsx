import { useSession } from "@/contexts/SessionProvider";
import useAccount from "@/hooks/useAccount";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Account() {
  const session = useSession();
  const { signOut } = useAccount();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {session?.user.user_metadata.first_name} {session?.user.user_metadata.last_name}
          </CardTitle>
          <CardDescription>{session?.user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" onClick={signOut}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
