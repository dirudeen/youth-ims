import { create } from "zustand";
import type { NyssProgramsType } from "@/db/schema";

interface NyssProgramsStore {
  selectedItem: NyssProgramsType | null;
  setSelectedItem: (item: NyssProgramsType | null) => void;

  createOpen: boolean;
  editOpen: boolean;
  deleteOpen: boolean;

  setCreateOpen: (open: boolean) => void;
  setEditOpen: (open: boolean) => void;
  setDeleteOpen: (open: boolean) => void;
}

export const useNyssProgramsStore = create<NyssProgramsStore>((set) => ({
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

