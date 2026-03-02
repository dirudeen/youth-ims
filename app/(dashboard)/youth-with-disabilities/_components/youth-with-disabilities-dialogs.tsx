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
import { youthWithDisabilitiesSchema } from "@/lib/validations/youth-with-disablilties";
import { deleteYouthPopulation } from "@/server/actions/youth-population";
import { useYouthPopulationStore } from "@/store/youth-population-store";
import { useYouthWithDisabilitiesStore } from "@/store/youth-with-disabilities-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { YouthWithDisabilitiesForm } from "./youth-with-disabilities-form";

export function YouthWithDisabilitiesDialogs() {
  const { selectedItem } = useYouthWithDisabilitiesStore();
  return (
    <>
      <YouthWithDisabilitiesCraeteDialog />
      <YouthWithDisabilitiesEditDialog key={selectedItem?.id} />
      <YouthWithDisabilitiesDeleteDialog />
    </>
  );
}

function YouthWithDisabilitiesCraeteDialog() {
  const { createOpen, setCreateOpen } = useYouthPopulationStore();
  const form = useForm<z.infer<typeof youthWithDisabilitiesSchema>>({
    resolver: zodResolver(youthWithDisabilitiesSchema),
    defaultValues: {
      ageGroup: "",
      total: "",
      male: "",
      female: "",
      urban: "",
      rural: "",
      seeing: "",
      hearing: "",
      physical: "",
      learning: "",
      selfcare: "",
      speech: "",
    },
  });
  async function onSubmit(data: z.infer<typeof youthWithDisabilitiesSchema>) {
    // const res = await createYouthPopulation();
    // if (res.success) {
    //   toast.success("Youth population added successfully.", {
    //     richColors: true,
    //   });
    //   form.reset();
    //   setCreateOpen(false);
    // } else {
    //   toast.error(res.error, {
    //     richColors: true,
    //   });
    // }
  }

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="sm:max-w-150">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Youth With Disability Entry</DialogTitle>
              <DialogDescription>
                Fill in the details for the new youth with disability entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <YouthWithDisabilitiesForm />
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

const youthWithDisabilitiesUpdateSchema = z.object({
  ...youthWithDisabilitiesSchema.shape,
  id: z.number(),
  version: z.number(),
});

function YouthWithDisabilitiesEditDialog() {
  const { editOpen, setEditOpen, selectedItem } =
    useYouthWithDisabilitiesStore();
  const form = useForm<z.infer<typeof youthWithDisabilitiesUpdateSchema>>({
    resolver: zodResolver(youthWithDisabilitiesUpdateSchema),
    defaultValues: {
      ageGroup: selectedItem?.ageGroup,
      total: selectedItem?.total.toString(),
      male: selectedItem?.male.toString(),
      female: selectedItem?.female.toString(),
      urban: selectedItem?.urban.toString(),
      rural: selectedItem?.rural.toString(),
      seeing: selectedItem?.seeing.toString(),
      hearing: selectedItem?.hearing.toString(),
      physical: selectedItem?.physical.toString(),
      learning: selectedItem?.learning.toString(),
      selfcare: selectedItem?.selfcare.toString(),
      speech: selectedItem?.speech.toString(),
      id: selectedItem?.id,
      version: selectedItem?.version,
    },
  });
  async function onSubmit(
    data: z.infer<typeof youthWithDisabilitiesUpdateSchema>,
  ) {
    // const res = await updateYouthPopulation();
    // if (res.success) {
    //   toast.success("Youth population added successfully.", {
    //     richColors: true,
    //   });
    //   console.log(res.data);
    //   form.reset();
    //   setEditOpen(false);
    // } else {
    //   toast.error(res.error, {
    //     richColors: true,
    //   });
    // }
  }

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="sm:max-w-150">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Youth With Disability Entry</DialogTitle>
              <DialogDescription>
                Update the details for this youth with disability entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <YouthWithDisabilitiesForm />
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

function YouthWithDisabilitiesDeleteDialog() {
  const { deleteOpen, setDeleteOpen, selectedItem, setSelectedItem } =
    useYouthWithDisabilitiesStore();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    // const res = await deleteYouthPopulation({
    //   id: selectedItem?.id ?? 1,
    //   version: selectedItem?.version ?? 1,
    // });
    // if (res.success) {
    //   toast.success("Youth with disability deleted successfully.", {
    //     richColors: true,
    //   });
    //   setDeleteOpen(false);
    //   setSelectedItem(null);
    // } else {
    //   toast.error(res.error, {
    //     richColors: true,
    //   });
    // }
  }

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the entry the Age Group &quot;
            {selectedItem?.ageGroup}&quot;. This action cannot be undone.
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
