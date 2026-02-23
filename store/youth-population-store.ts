import { create } from "zustand";
import type { YouthPopulationType } from "@/db/schema";

interface YouthPopulationStore {
  data: YouthPopulationType[];
  selectedItem: YouthPopulationType | null;

  setData: (data: YouthPopulationType[]) => void;
  setSelectedItem: (item: YouthPopulationType | null) => void;

  editOpen: boolean;
  deleteOpen: boolean;
  createOpen: boolean;

  setEditOpen: (open: boolean) => void;
  setDeleteOpen: (open: boolean) => void;
  setCreateOpen: (open: boolean) => void;
}

export const useYouthPopulationStore = create<YouthPopulationStore>((set) => ({
  data: [],
  selectedItem: null,
  editOpen: false,
  deleteOpen: false,
  createOpen: false,

  setData: (data) => set({ data }),
  setSelectedItem: (item) => {
    set({ selectedItem: item });
  },

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
  setCreateOpen: (open) => set({ createOpen: open }),
}));
