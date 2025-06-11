import type { FabricObject } from 'fabric';
import { useCallback, useEffect, useRef } from 'react';
import useCanvasStore from 'store/useCanvasStore';
import useArrangeTool from './useArrangeTool';
import { KEY_CODES } from 'constant/constant';

/** 키보드 이벤트 핸들러
 * - Delete 키를 누르면 선택된 객체가 삭제됩니다.
 */
const useKeyboardHandler = () => {
  const canvas = useCanvasStore((state) => state.canvas);
  const choiceList = useCanvasStore((state) => state.choiceList);
  const setChoiceList = useCanvasStore((state) => state.setChoiceList);
  const { groupSelectedObjects } = useArrangeTool();

  const undoHistoryRef = useRef<FabricObject[][]>([]);

  /** 삭제할 객체를 히스토리에 저장하는 함수 */
  const saveDeletedObjects = useCallback((activeObjects: FabricObject[]) => {
    const objectsToSave = [...activeObjects];
    undoHistoryRef.current.push(objectsToSave);
  }, []);

  /** 선택된 객체를 삭제하고 히스토리에 저장하는 함수 */
  const handleDeleteSelectedObjects = useCallback(() => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    saveDeletedObjects(activeObjects);

    // 선택된 객체가 choiceList에 있는 경우 제거
    const updatedChoiceList = choiceList.filter(
      (choice) => !activeObjects.some((obj) => obj.get('uid') === choice.uid)
    );
    setChoiceList(updatedChoiceList);

    canvas.remove(...activeObjects);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }, [canvas, saveDeletedObjects, choiceList, setChoiceList]);

  /** 삭제된 객체들을 복원하는 함수 */
  const handleUndoLastAction = useCallback(() => {
    if (!canvas || undoHistoryRef.current.length === 0) return;

    const objectsToRestore = undoHistoryRef.current.pop();
    if (!objectsToRestore) return;

    canvas.add(...objectsToRestore);
    canvas.requestRenderAll();
  }, [canvas]);

  useEffect(() => {
    if (!canvas) return;

    /** 키보드 이벤트 리스너 */
    const handleKeyDown = (event: KeyboardEvent) => {
      const isDelete = event.key === KEY_CODES.DELETE;
      const isUndo =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === KEY_CODES.UNDO;
      const isGroup =
        event.metaKey ||
        event.ctrlKey ||
        event.key.toLowerCase() === KEY_CODES.GROUP;

      if (isDelete) {
        handleDeleteSelectedObjects();
      } else if (isUndo) {
        event.preventDefault();
        handleUndoLastAction();
      } else if (isGroup) {
        event.preventDefault();
        groupSelectedObjects();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    canvas,
    handleDeleteSelectedObjects,
    handleUndoLastAction,
    groupSelectedObjects,
  ]);
};

export default useKeyboardHandler;
