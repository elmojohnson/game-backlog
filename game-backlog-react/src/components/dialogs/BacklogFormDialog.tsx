import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "../ui/button";
import { InferType } from "yup";
import { BacklogSchema } from "@/form-schemas/Backlog";
import { useForm, UseFormSetError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/input";
import { AlertCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Backlog } from "@/types/backlog";
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  title: string;
  buttonTriggerText: string;
  buttonTriggerIcon?: any;
  backlogData?: Backlog;
  formSubmit: (
    values: InferType<typeof BacklogSchema>,
    setError: UseFormSetError<InferType<typeof BacklogSchema>>,
    id?: number
  ) => void;
  submitButtonText: string
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

  function onSubmit(values: InferType<typeof BacklogSchema>) {
    formSubmit(values, form.setError, backlogData?.id);
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {buttonTriggerIcon}
          {buttonTriggerText}
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
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
                        <Input type="text" placeholder="Name" {...field} />
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
                        <Textarea placeholder="Description" {...field} />
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
              <Button type="submit" disabled={form.formState.isSubmitting}>{submitButtonText}</Button>
            </form>
          </Form>
      </DialogContent>
    </Dialog>
  );
}
