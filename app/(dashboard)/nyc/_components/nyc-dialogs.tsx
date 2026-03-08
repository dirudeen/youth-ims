"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { nycParticipantSchema } from "@/lib/validations/nyc-participants";
import { useNycParticipantsStore } from "@/store/nyc-participants-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  createNycParticipant,
  deleteNycParticipant,
  updateNycParticipant,
} from "@/server/actions/nyc-participants";
import { NycForm } from "./nyc-form";

export function NycDialogs() {
  const { selectedItem } = useNycParticipantsStore();
  return (
    <>
      <NycCreateDialog />
      <NycEditDialog key={selectedItem?.id} />
      <NycDeleteDialog />
    </>
  );
}

function NycCreateDialog() {
  const { createOpen, setCreateOpen } = useNycParticipantsStore();
  const form = useForm<z.infer<typeof nycParticipantSchema>>({
    resolver: zodResolver(nycParticipantSchema),
    defaultValues: {
      name: "",
      age: "0",
      gender: "Male",
      region: "Banjul",
      category: "Amateur",
      sport: "",
      level: "Beginner",
      status: "Active",
      achievements: "",
      dateRegistered: new Date().toISOString().split("T")[0],
      contact: "",
    },
  });

  async function onSubmit(data: z.infer<typeof nycParticipantSchema>) {
    const res = await createNycParticipant({
      name: data.name,
      age: Number(data.age),
      gender: data.gender,
      region: data.region,
      category: data.category,
      sport: data.sport,
      level: data.level,
      status: data.status,
      achievements: data.achievements,
      dateRegistered: data.dateRegistered,
      contact: data.contact,
    });
    if (res.success) {
      toast.success("Participant added successfully.", { richColors: true });
      form.reset();
      setCreateOpen(false);
    } else {
      toast.error(res.error, { richColors: true });
    }
  }

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New NYC Participant</DialogTitle>
              <DialogDescription>Enter the participant information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <NycForm />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <div className="flex items-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  "Save Entry"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

const NycUpdateSchema = z.object({
  ...nycParticipantSchema.shape,
  id: z.number(),
  version: z.number(),
});

function NycEditDialog() {
  const { editOpen, setEditOpen, selectedItem } = useNycParticipantsStore();
  const form = useForm<z.infer<typeof NycUpdateSchema>>({
    resolver: zodResolver(NycUpdateSchema),
    defaultValues: {
      id: selectedItem?.id,
      version: selectedItem?.version,
      name: selectedItem?.name ?? "",
      age: String(selectedItem?.age ?? 0),
      gender: selectedItem?.gender ?? "Male",
      region: (selectedItem?.region as any) ?? "Banjul",
      category: (selectedItem?.category as any) ?? "Amateur",
      sport: selectedItem?.sport ?? "",
      level: (selectedItem?.level as any) ?? "Beginner",
      status: selectedItem?.status ?? "Active",
      achievements: selectedItem?.achievements ?? "",
      dateRegistered: selectedItem?.dateRegistered?.toString() ?? "",
      contact: selectedItem?.contact ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof NycUpdateSchema>) {
    const res = await updateNycParticipant({
      id: data.id,
      version: data.version,
      name: data.name,
      age: Number(data.age),
      gender: data.gender,
      region: data.region,
      category: data.category,
      sport: data.sport,
      level: data.level,
      status: data.status,
      achievements: data.achievements,
      dateRegistered: data.dateRegistered,
      contact: data.contact,
    });
    if (res.success) {
      toast.success("Participant updated successfully.", { richColors: true });
      form.reset();
      setEditOpen(false);
    } else {
      toast.error(res.error, { richColors: true });
    }
  }

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit NYC Participant</DialogTitle>
              <DialogDescription>Update participant details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <NycForm />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <div className="flex items-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </div>
                ) : (
                  "Update Entry"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

function NycDeleteDialog() {
  const { deleteOpen, setDeleteOpen, selectedItem, setSelectedItem } =
    useNycParticipantsStore();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!selectedItem) return;
    setIsDeleting(true);
    const res = await deleteNycParticipant({
      id: selectedItem.id,
      version: selectedItem.version,
    });
    if (res.success) {
      toast.success("Participant deleted successfully.", { richColors: true });
      setDeleteOpen(false);
      setSelectedItem(null);
    } else {
      toast.error(res.error, { richColors: true });
    }
    setIsDeleting(false);
  }

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {selectedItem?.name}&apos;s record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? (
              <div className="flex items-center">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
