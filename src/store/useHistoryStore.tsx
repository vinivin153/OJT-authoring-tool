import { create } from 'zustand';
import type { FabricObject } from 'fabric';

export type HistoryType = 'add' | 'delete' | 'group' | 'ungroup';

type HistoryEntry = {
  type: HistoryType;
  objects: FabricObject[];
};

type HistoryStore = {
  undoHistory: HistoryEntry[];
  redoHistory: HistoryEntry[];
  pushUndoHistory: (type: HistoryType, objects: FabricObject[]) => void;
  pushRedoHistory: (type: HistoryType, objects: FabricObject[]) => void;
  popUndoHistory: () => HistoryEntry | undefined;
  popRedoHistory: () => HistoryEntry | undefined;
  clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  undoHistory: [],
  redoHistory: [],

  pushUndoHistory: (type, objects) => {
    set((state) => ({
      undoHistory: [...state.undoHistory, { type, objects: [...objects] }],
    }));
  },

  pushRedoHistory: (type, objects) => {
    set((state) => ({
      redoHistory: [...state.redoHistory, { type, objects: [...objects] }],
    }));
  },

  popUndoHistory: () => {
    const { undoHistory } = get();
    if (undoHistory.length === 0) return undefined;

    const newHistory = [...undoHistory];
    const last = newHistory.pop();
    set({ undoHistory: newHistory });
    return last;
  },

  popRedoHistory: () => {
    const { redoHistory } = get();
    if (redoHistory.length === 0) return undefined;

    const newHistory = [...redoHistory];
    const last = newHistory.pop();
    set({ redoHistory: newHistory });
    return last;
  },

  clearHistory: () => {
    set({ undoHistory: [], redoHistory: [] });
  },
}));
