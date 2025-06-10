import { create } from 'zustand';

type ModalType = 'image' | 'preview' | 'none';

type ModalStore = {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: 'none',
  openModal: (modalType) => set({ isOpen: true, modalType }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
