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
import { youthPopulationSchema } from "@/lib/validations/youth-population";
import { useYouthPopulationStore } from "@/store/youth-population-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { YouthPopulationForm } from "./youth-population-form";

export function YouthPopulationDialogs() {
  const { selectedItem } = useYouthPopulationStore();
  return (
    <>
      <YouthPopulationCraeteDialog />
      <YouthPopulationEditDialog key={selectedItem?.id} />
      <YouthPopulationDeleteDialog />
    </>
  );
}

function YouthPopulationCraeteDialog() {
  const { createOpen, setCreateOpen } = useYouthPopulationStore();
  const form = useForm<z.infer<typeof youthPopulationSchema>>({
    resolver: zodResolver(youthPopulationSchema),
    defaultValues: {
      lga: "",
    },
  });
  function onSubmit(data: z.infer<typeof youthPopulationSchema>) {
    // Do something with the form values.
    console.log(data);
    form.reset();
    setCreateOpen(false);
  }

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="sm:max-w-150">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Youth Population Entry</DialogTitle>
              <DialogDescription>
                Fill in the details for the new youth population entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <YouthPopulationForm />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Entry"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

function YouthPopulationEditDialog() {
  const { editOpen, setEditOpen, selectedItem } = useYouthPopulationStore();
  const form = useForm<z.infer<typeof youthPopulationSchema>>({
    resolver: zodResolver(youthPopulationSchema),
    defaultValues: {
      lga: selectedItem?.lga,
      totalPopulation: selectedItem?.totalPopulation.toString(),
      youthPopulation: selectedItem?.youthPopulation.toString(),
      year: selectedItem?.year.toString(),
      maleYouth: selectedItem?.maleYouth.toString(),
      femaleYouth: selectedItem?.femaleYouth.toString(),
      urbanYouth: selectedItem?.urbanYouth.toString(),
      ruralYouth: selectedItem?.ruralYouth.toString(),
    },
  });
  function onSubmit(data: z.infer<typeof youthPopulationSchema>) {
    // Do something with the form values.
    console.log(data);
    form.reset();
    setEditOpen(false);
  }

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="sm:max-w-150">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Youth Population Entry</DialogTitle>
              <DialogDescription>
                Update the details for this youth population entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <YouthPopulationForm />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Updating..." : "Update Entry"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

function YouthPopulationDeleteDialog() {
  const { deleteOpen, setDeleteOpen, selectedItem } = useYouthPopulationStore();
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    console.log(selectedItem);
  }

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the entry for LGA &quot;
            {selectedItem?.lga}&quot;. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
