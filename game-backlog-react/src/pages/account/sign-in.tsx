import { UserCredentials } from "@/form-schemas/User";
import useAccount from "@/hooks/useAccount";
import { useSession } from "@/contexts/SessionProvider";
import { Link, Navigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { appTitle } from "@/app-settings";

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
      <div>
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold mb-4">{appTitle}</h1>
        <Card className="md:w-[350px] w-full">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" data-testid="email-input" {...field} disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormMessage data-testid="email-error-message"/>
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
                          <Input type="password" placeholder="Password" data-testid="password-input" {...field} disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormMessage data-testid="password-error-message"/>
                      </FormItem>
                    );
                  }}
                />
                {form.formState.errors.root?.message ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription data-testid="error-alert">{form.formState.errors.root?.message}</AlertDescription>
                  </Alert>
                ) : null}
                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full" data-testid="sign-in-button" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="animate-spin" />}Sign in
                  </Button>
                  <Button type="submit" variant="link" asChild>
                    <Link to="/account/sign-up">I don't have an account</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
