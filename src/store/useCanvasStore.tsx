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
  setCanvas: (canvas: Canvas | null) => void;
  setSelectedImageSet: (newImageSet: Set<string>) => void;
  setAnswerUid: (uid: string[]) => void;
  setChoiceList: (newChoiceList: choiceInfo[]) => void;
};

const useCanvasStore = create<CanvasStore>((set) => ({
  canvas: null,
  selectedImageSet: new Set(),
  answerUid: [],
  choiceList: [],
  setCanvas: (canvas) => set({ canvas }),
  setSelectedImageSet: (newImageSet) => set({ selectedImageSet: newImageSet }),
  setAnswerUid: (uid) => set({ answerUid: uid }),
  setChoiceList: (newChoiceList) => set({ choiceList: newChoiceList }),
}));

export default useCanvasStore;
