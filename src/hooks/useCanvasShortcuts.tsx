import { useCallback, useEffect } from 'react';
import useCanvasOperations from './useCanvasOperations';
import useArrangeTool from './useArrangeTool';
import { KEY_CODES } from 'constant/constant';

/**
 * 캔버스에서 키보드 이벤트를 처리해 도형 삭제, 그룹화, 실행 취소 등의 기능을 하는 훅.
 */
const useKeyboardShortcuts = () => {
  const { deleteShape, undo, redo } = useCanvasOperations();
  const { groupSelectedObjects, ungroupSelectedObjects } = useArrangeTool();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key, metaKey, ctrlKey, shiftKey } = event;
      const isCmd = metaKey || ctrlKey;

      switch (true) {
        case key === KEY_CODES.DELETE:
          console.log('Delete action triggered');
          deleteShape();
          break;

        case isCmd && shiftKey && key.toLowerCase() === KEY_CODES.REDO:
          event.preventDefault();
          console.log('Redo action triggered');
          redo();
          break;

        case isCmd && key.toLowerCase() === KEY_CODES.UNDO:
          event.preventDefault();
          console.log('Undo action triggered');
          undo();
          break;

        case isCmd && shiftKey && key.toLowerCase() === KEY_CODES.UNGROUP:
          event.preventDefault();
          console.log('Ungroup action triggered');
          ungroupSelectedObjects();
          break;

        case isCmd && key.toLowerCase() === KEY_CODES.GROUP:
          event.preventDefault();
          groupSelectedObjects();
          break;
      }
    },
    [deleteShape, undo, redo, groupSelectedObjects, ungroupSelectedObjects]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
