import { useState } from "react";

import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GameNoteSchema } from "@/form-schemas/Backlog";
import { BacklogGame } from "@/types/backlog";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, NotepadText } from "lucide-react";

type NoteProps = {
  game: BacklogGame;
  updateNote: (id: number, note: string) => void;
};

export default function NoteFormDialog({ game, updateNote }: NoteProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(GameNoteSchema),
    defaultValues: {
      note: game.note || "",
    },
  });

  async function onSubmit(values: InferType<typeof GameNoteSchema>) {
    if (game.note !== values.note) {
      updateNote(game.id, values.note!);
      setOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <NotepadText />
          Note
        </Button>
      </DialogTrigger>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
          <DialogDescription className="sr-only">Note for your game</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              // @ts-ignore
              control={form.control}
              name="note"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Note" {...field} disabled={form.formState.isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
