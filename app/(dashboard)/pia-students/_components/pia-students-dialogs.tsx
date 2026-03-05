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
import { piaStudentsSchema } from "@/lib/validations/pia-students";
import { usePiaStudentsStore } from "@/store/pia-students-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { PiaStudentsForm } from "./pia-students-form";
import {
  createPiaStudents,
  deletePiaStudents,
  updatePiaStudents,
} from "@/server/actions/pia-students";
import { Loader } from "lucide-react";

export function PiaStudentsDialogs() {
  const { selectedItem } = usePiaStudentsStore();

  return (
    <>
      <PiaStudentsCreateDialog />
      <PiaStudentsEditDialog key={selectedItem?.id} />
      <PiaStudentsDeleteDialog />
    </>
  );
}

function PiaStudentsCreateDialog() {
  const { createOpen, setCreateOpen } = usePiaStudentsStore();
  const form = useForm<z.infer<typeof piaStudentsSchema>>({
    resolver: zodResolver(piaStudentsSchema),
    defaultValues: {
      department: "",
      year: "",
      male: "",
      female: "",
      enrolled: "",
      graduated: "",
    },
  });

  async function onSubmit(data: z.infer<typeof piaStudentsSchema>) {
    const res = await createPiaStudents({
      department: data.department,
      year: data.year,
      male: Number(data.male),
      female: Number(data.female),
      enrolled: Number(data.enrolled),
      graduated: Number(data.graduated),
    });

    if (res.success) {
      toast.success("PIA student record added successfully.", {
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
              <DialogTitle>Add New PIA Student Entry</DialogTitle>
              <DialogDescription>
                Fill in the details for the new PIA student entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <PiaStudentsForm />
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

const PiaStudentsUpdateSchema = z.object({
  ...piaStudentsSchema.shape,
  id: z.number(),
  version: z.number(),
});

function PiaStudentsEditDialog() {
  const { editOpen, setEditOpen, selectedItem } = usePiaStudentsStore();
  const form = useForm<z.infer<typeof PiaStudentsUpdateSchema>>({
    resolver: zodResolver(PiaStudentsUpdateSchema),
    defaultValues: {
      id: selectedItem?.id,
      department: selectedItem?.department,
      year: selectedItem?.year,
      male: String(selectedItem?.male ?? 0),
      female: String(selectedItem?.female ?? 0),
      enrolled: String(selectedItem?.enrolled ?? 0),
      graduated: String(selectedItem?.graduated ?? 0),
      version: selectedItem?.version,
    },
  });

  async function onSubmit(data: z.infer<typeof PiaStudentsUpdateSchema>) {
    const res = await updatePiaStudents({
      id: data.id,
      department: data.department,
      year: data.year,
      male: Number(data.male),
      female: Number(data.female),
      enrolled: Number(data.enrolled),
      graduated: Number(data.graduated),
      version: selectedItem?.version ?? 0,
    });

    if (res.success) {
      toast.success("PIA student record edited successfully.", {
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
              <DialogTitle>Edit PIA Student Entry</DialogTitle>
              <DialogDescription>
                Update the details for this PIA student entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <PiaStudentsForm />
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

function PiaStudentsDeleteDialog() {
  const { deleteOpen, setDeleteOpen, selectedItem, setSelectedItem } =
    usePiaStudentsStore();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!selectedItem) return;
    setIsDeleting(true);

    const res = await deletePiaStudents({
      id: selectedItem.id,
      version: selectedItem.version,
    });

    if (res.success) {
      toast.success("PIA student record deleted successfully.", {
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
            {selectedItem?.department}&quot; in {selectedItem?.year}. This
            action cannot be undone.
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
