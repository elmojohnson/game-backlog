import { useState } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { BacklogSchema } from "@/form-schemas/Backlog";
import { Backlog } from "@/types/backlog";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

type Props = {
  title: string;
  buttonTriggerText: string;
  buttonTriggerIcon?: any;
  backlogData?: Backlog;
  formSubmit: (values: InferType<typeof BacklogSchema>, setError: UseFormSetError<InferType<typeof BacklogSchema>>, id?: number) => void;
  submitButtonText: string;
};

export default function BacklogFormDialog({ title, buttonTriggerText, buttonTriggerIcon, backlogData, formSubmit, submitButtonText }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(BacklogSchema),
    defaultValues: {
      name: backlogData?.name || "",
      description: backlogData?.description || "",
    },
  });

  async function onSubmit(values: InferType<typeof BacklogSchema>) {
    formSubmit(values, form.setError, backlogData?.id);
    setOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {buttonTriggerIcon}
          {buttonTriggerText}
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">Form dialog</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              // @ts-ignore
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} disabled={form.formState.isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              // @ts-ignore
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} disabled={form.formState.isSubmitting} />
                    </FormControl>
                    <FormMessage />
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              {submitButtonText}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
