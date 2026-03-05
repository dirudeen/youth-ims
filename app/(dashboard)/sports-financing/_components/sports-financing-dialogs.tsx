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
import { sportsFinancingSchema } from "@/lib/validations/sports-financing";
import { useSportsFinancingStore } from "@/store/sports-financing.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { SportsFinancingForm } from "./sports-financing-form";
import {
  createSportsFinancing,
  deleteSportsFinancing,
  updateSportsFinancing,
} from "@/server/actions/sports-financing";
import { Loader } from "lucide-react";

export function SportsFinancingDialogs() {
  const { selectedItem } = useSportsFinancingStore();
  return (
    <>
      <SportsFinancingCreateDialog />
      <SportsFinancingEditDialog key={selectedItem?.id} />
      <SportsFinancingDeleteDialog />
    </>
  );
}

function SportsFinancingCreateDialog() {
  const { createOpen, setCreateOpen } = useSportsFinancingStore();
  const form = useForm<z.infer<typeof sportsFinancingSchema>>({
    resolver: zodResolver(sportsFinancingSchema),
    defaultValues: {
      year: "",
      period: "",
      amount: "",
      associationName: "",
    },
  });
  async function onSubmit(data: z.infer<typeof sportsFinancingSchema>) {
    const res = await createSportsFinancing({
      year: Number(data.year),
      period: data.period,
      amount: data.amount,
      associationName: data.associationName,
    });
    if (res.success) {
      toast.success("Sports financing record added successfully.", {
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
              <DialogTitle>Add New Sports Financing Entry</DialogTitle>
              <DialogDescription>
                Fill in the details for the new sports financing entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <SportsFinancingForm />
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

const SportsFinancingUpdateSchema = z.object({
  ...sportsFinancingSchema.shape,
  id: z.number(),
  version: z.number(),
});

function SportsFinancingEditDialog() {
  const { editOpen, setEditOpen, selectedItem } = useSportsFinancingStore();
  const form = useForm<z.infer<typeof SportsFinancingUpdateSchema>>({
    resolver: zodResolver(SportsFinancingUpdateSchema),
    defaultValues: {
      id: selectedItem?.id,
      associationName: selectedItem?.associationName,
      amount: selectedItem?.amount.toString(),
      year: String(selectedItem?.year),
      period: selectedItem?.period,
      version: selectedItem?.version,
    },
  });
  async function onSubmit(data: z.infer<typeof SportsFinancingUpdateSchema>) {
    const res = await updateSportsFinancing({
      id: data?.id,
      associationName: data.associationName,
      amount: data.amount,
      year: Number(data.year),
      period: data.period,
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
              <DialogTitle>Edit Sports Financing Entry</DialogTitle>
              <DialogDescription>
                Update the details for this sports financing entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <SportsFinancingForm />
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

function SportsFinancingDeleteDialog() {
  const { deleteOpen, setDeleteOpen, selectedItem, setSelectedItem } =
    useSportsFinancingStore();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!selectedItem) return;
    setIsDeleting(true);
    const res = await deleteSportsFinancing({
      id: selectedItem.id,
      version: selectedItem.version,
    });
    if (res.success) {
      toast.success("Sports financing record deleted successfully.", {
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
            {selectedItem?.associationName}&quot; in {selectedItem?.year}. This
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
