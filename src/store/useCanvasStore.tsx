import type { Canvas } from 'fabric';
import { create } from 'zustand';

type CanvasStore = {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
};

const useCanvasStore = create<CanvasStore>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
}));

export default useCanvasStore;
