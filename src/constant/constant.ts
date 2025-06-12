export const COLORS = Object.freeze({
  CARD_BACKGROUND: '#f7f8fd',
  CANVAS_BACKGROUND: '#ffffff',
} as const);

export const KEY_CODES = Object.freeze({
  DELETE: 'Delete',
  UNDO: 'z',
  REDO: 'z',
  GROUP: 'g',
  UNGROUP: 'g',
} as const);

export const RESTORE_FUNCTIONS = Object.freeze({
  ADD: 'add',
  DELETE: 'delete',
  GROUP: 'group',
  UNGROUP: 'ungroup',
} as const);
