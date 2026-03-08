import { create } from "zustand";
import type { NyssGraduatesType } from "@/db/schema";

interface NyssGraduatesStore {
  selectedItem: NyssGraduatesType | null;
  setSelectedItem: (item: NyssGraduatesType | null) => void;

  createOpen: boolean;
  editOpen: boolean;
  deleteOpen: boolean;

  setCreateOpen: (open: boolean) => void;
  setEditOpen: (open: boolean) => void;
  setDeleteOpen: (open: boolean) => void;
}

export const useNyssGraduatesStore = create<NyssGraduatesStore>((set) => ({
  selectedItem: null,
  createOpen: false,
  editOpen: false,
  deleteOpen: false,

  setSelectedItem: (item) => set({ selectedItem: item }),
  setCreateOpen: (open) => set({ createOpen: open }),
  setEditOpen: (open) =>
    set((state) => ({
      editOpen: open,
      selectedItem: open ? state.selectedItem : null,
    })),
  setDeleteOpen: (open) =>
    set((state) => ({
      deleteOpen: open,
      selectedItem: open ? state.selectedItem : null,
    })),
}));

