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
import { youthMigrationSchema } from "@/lib/validations/youth-migration";
import { useYouthMigrationStore } from "@/store/youth-migration-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { YouthMigrationForm } from "./youth-migration-form";
import {
  createYouthMigration,
  deleteYouthMigration,
  updateYouthMigration,
} from "@/server/actions/youth-migration";
import { Loader } from "lucide-react";

export function YouthMigrationDialogs() {
  const { selectedItem } = useYouthMigrationStore();
  return (
    <>
      <YouthMigrationCreateDialog />
      <YouthMigrationEditDialog key={selectedItem?.id} />
      <YouthMigrationDeleteDialog />
    </>
  );
}

function YouthMigrationCreateDialog() {
  const { createOpen, setCreateOpen } = useYouthMigrationStore();
  const form = useForm<z.infer<typeof youthMigrationSchema>>({
    resolver: zodResolver(youthMigrationSchema),
    defaultValues: {
      year: "",
      total: "",
      male: "",
      female: "",
      origin: "",
      destination: "",
    },
  });
  async function onSubmit(data: z.infer<typeof youthMigrationSchema>) {
    const res = await createYouthMigration({
      origin: data.origin,
      destination: data.destination,
      total: Number(data.total),
      male: Number(data.male),
      female: Number(data.female),
      year: Number(data.year),
    });
    if (res.success) {
      toast.success("Youth migration record added successfully.", {
        richColors: true,
      });
      form.reset();
      setCreateOpen(false);
    } else {
      toast.error(res.error, {
        richColors: true,
      });
    }
  }

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="sm:max-w-150">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Youth Migration Entry</DialogTitle>
              <DialogDescription>
                Fill in the details for the new youth migration entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <YouthMigrationForm />
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

const youthMigrationUpdateSchema = z.object({
  ...youthMigrationSchema.shape,
  id: z.number(),
  version: z.number(),
});

function YouthMigrationEditDialog() {
  const { editOpen, setEditOpen, selectedItem } = useYouthMigrationStore();
  const form = useForm<z.infer<typeof youthMigrationUpdateSchema>>({
    resolver: zodResolver(youthMigrationUpdateSchema),
    defaultValues: {
      id: selectedItem?.id,
      origin: selectedItem?.origin,
      destination: selectedItem?.destination,
      year: selectedItem?.year.toString(),
      total: selectedItem?.total.toString(),
      male: selectedItem?.male.toString(),
      female: selectedItem?.female.toString(),
      version: selectedItem?.version,
    },
  });
  async function onSubmit(data: z.infer<typeof youthMigrationUpdateSchema>) {
    const res = await updateYouthMigration({
      id: data?.id,
      origin: data.origin,
      destination: data.destination,
      total: Number(data.total),
      male: Number(data.male),
      female: Number(data.female),
      year: Number(data.year),
      version: data?.version,
    });
    if (res.success) {
      toast.success("Youth migration record edited successfully.", {
        richColors: true,
      });
      form.reset();
      setEditOpen(false);
    } else {
      toast.error(res.error, {
        richColors: true,
      });
    }
  }

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="sm:max-w-150">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Youth Migration Entry</DialogTitle>
              <DialogDescription>
                Update the details for this youth migration entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <YouthMigrationForm />
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

function YouthMigrationDeleteDialog() {
  const { deleteOpen, setDeleteOpen, selectedItem, setSelectedItem } =
    useYouthMigrationStore();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!selectedItem) return;
    setIsDeleting(true);
    const res = await deleteYouthMigration({
      id: selectedItem.id,
      version: selectedItem.version,
    });
    if (res.success) {
      toast.success("Youth migration record deleted successfully.", {
        richColors: true,
      });
      setIsDeleting(false);
      setDeleteOpen(false);
      setSelectedItem(null);
    } else {
      toast.error(res.error, {
        richColors: true,
      });
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the entry for &quot;
            {selectedItem?.origin}&quot; to &quot;{selectedItem?.destination}
            &quot; in {selectedItem?.year}. This action cannot be undone.
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
