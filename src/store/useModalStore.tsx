import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => {
  return {
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  };
});

export default useModalStore;
