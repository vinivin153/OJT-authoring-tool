import type { Canvas } from 'fabric';
import { create } from 'zustand';

type CanvasStore = {
  canvas: Canvas | null;
  selectedImageSet: Set<string>;
  setSelectedImageSet: (newImageSet: Set<string>) => void;
  setCanvas: (canvas: Canvas | null) => void;
};

const useCanvasStore = create<CanvasStore>((set) => ({
  canvas: null,
  selectedImageSet: new Set<string>(),
  setSelectedImageSet: (newImageSet) => set({ selectedImageSet: newImageSet }),
  setCanvas: (canvas) => set({ canvas }),
}));

export default useCanvasStore;
