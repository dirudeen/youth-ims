import { create } from "zustand";
import type { NycParticipantsType } from "@/db/schema";

interface NycParticipantsStore {
  selectedItem: NycParticipantsType | null;
  setSelectedItem: (item: NycParticipantsType | null) => void;

  createOpen: boolean;
  editOpen: boolean;
  deleteOpen: boolean;

  selectedRegion: string;
  selectedCategory: string;
  selectedStatus: string;

  setCreateOpen: (open: boolean) => void;
  setEditOpen: (open: boolean) => void;
  setDeleteOpen: (open: boolean) => void;

  setSelectedRegion: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  setSelectedStatus: (value: string) => void;
}

export const useNycParticipantsStore = create<NycParticipantsStore>((set) => ({
  selectedItem: null,
  createOpen: false,
  editOpen: false,
  deleteOpen: false,

  selectedRegion: "all",
  selectedCategory: "all",
  selectedStatus: "all",

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

  setSelectedRegion: (value) => set({ selectedRegion: value }),
  setSelectedCategory: (value) => set({ selectedCategory: value }),
  setSelectedStatus: (value) => set({ selectedStatus: value }),
}));
