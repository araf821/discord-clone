import { create } from "zustand";

export type ModalType = "createServer";

interface ModalStoreProps {
  type: ModalType | null;
  isOpen: boolean;
  open: (type: ModalType) => void;
  close: () => void;
}

export const useModal = create<ModalStoreProps>((set) => ({
  type: null,
  isOpen: false,
  open: (type) => {
    set({ isOpen: true, type });
  },
  close: () => set({ type: null, isOpen: false }),
}));
