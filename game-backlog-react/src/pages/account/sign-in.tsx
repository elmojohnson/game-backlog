import PublicNavbar from "@/components/layouts/PublicNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { UserCredentials } from "@/form-schemas/User";
import useAccount from "@/hooks/useAccount";
import { AlertCircle } from "lucide-react";
import { useSession } from "@/contexts/SessionProvider";
import { Navigate } from "react-router";

export default function SignIn() {
  const session = useSession();
  
  const { signInForm, signIn } = useAccount();
  const form = signInForm();

  async function onSubmit(values: UserCredentials) {
    await signIn(values, form.setError);
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background relative">
      <PublicNavbar />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              {form.formState.errors.root?.message ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{form.formState.errors.root?.message}</AlertDescription>
                </Alert>
              ) : null}
              <Button type="submit">Sign in</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
