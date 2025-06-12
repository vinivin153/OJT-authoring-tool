import type { Canvas } from 'fabric';
import { create } from 'zustand';

type choiceInfo = {
  imageUrl: string;
  uid: string;
};

type CanvasStore = {
  canvas: Canvas | null;
  selectedImageSet: Set<string>;
  answerUid: string[];
  choiceList: choiceInfo[];
  hasSelection: boolean;
  setCanvas: (canvas: Canvas | null) => void;
  setSelectedImageSet: (newImageSet: Set<string>) => void;
  setAnswerUid: (uid: string[]) => void;
  setChoiceList: (newChoiceList: choiceInfo[]) => void;
  setHasSelection: (hasSelection: boolean) => void;
};

const useCanvasStore = create<CanvasStore>((set) => ({
  canvas: null,
  selectedImageSet: new Set(),
  answerUid: [],
  choiceList: [],
  hasSelection: false,
  setCanvas: (canvas) => set({ canvas }),
  setSelectedImageSet: (newImageSet) => set({ selectedImageSet: newImageSet }),
  setAnswerUid: (uid) => set({ answerUid: uid }),
  setChoiceList: (newChoiceList) => set({ choiceList: newChoiceList }),
  setHasSelection: (hasSelection) => set({ hasSelection }),
}));

export default useCanvasStore;
