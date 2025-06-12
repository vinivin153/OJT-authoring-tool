import useCanvasStore from 'store/useCanvasStore';
import useArrangeTool from './useArrangeTool';
import { useHistoryStore } from 'store/useHistoryStore';

/**
 * 캔버스에서 도형을 삭제, 뒤로 되돌리기, 앞으로 되돌리기 등의 작업을 수행하는 훅입니다.
 */
const useCanvasOperations = () => {
  const canvas = useCanvasStore((state) => state.canvas);
  const choiceList = useCanvasStore((state) => state.choiceList);
  const setChoiceList = useCanvasStore((state) => state.setChoiceList);
  const { pushUndoHistory, popUndoHistory, pushRedoHistory, popRedoHistory } =
    useHistoryStore();
  const { groupSelectedObjects, ungroupSelectedObjects } = useArrangeTool();

  /** 도형을 삭제하는 함수. */
  const deleteShape = () => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    const activeObjectUidSet = new Set(
      activeObjects.map((obj) => obj.get('uid'))
    );
    const updatedChoiceList = choiceList.filter(
      (choice) => !activeObjectUidSet.has(choice.uid)
    );

    // 선택된 도형이 선택지 목록에 있는 경우 제거
    setChoiceList(updatedChoiceList);

    // 현재 활성화된 도형들을 히스토리에 저장
    pushUndoHistory('delete', activeObjects);

    // 활성화된 도형들을 캔버스에서 제거
    canvas.remove(...activeObjects);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const undo = () => {
    if (!canvas) return;

    const history = popUndoHistory();

    if (!history) return;
    const { type: historyType, objects: restoreObjects } = history;

    switch (historyType) {
      case 'add':
        pushRedoHistory('delete', restoreObjects);
        canvas.remove(...restoreObjects);
        break;

      case 'delete':
        pushRedoHistory('add', restoreObjects);
        canvas.add(...restoreObjects);
        break;

      case 'group':
        pushRedoHistory('ungroup', restoreObjects);
        ungroupSelectedObjects();
        break;

      case 'ungroup':
        pushRedoHistory('group', restoreObjects);
        groupSelectedObjects();
        break;
    }

    canvas.requestRenderAll();
  };

  const redo = () => {
    if (!canvas) return;

    const history = popRedoHistory();

    if (!history) return;
    const { type: historyType, objects: restoreObjects } = history;

    switch (historyType) {
      case 'add':
        pushUndoHistory('delete', restoreObjects);
        canvas.remove(...restoreObjects);
        break;

      case 'delete':
        pushUndoHistory('add', restoreObjects);
        canvas.add(...restoreObjects);
        break;

      case 'group':
        pushUndoHistory('ungroup', restoreObjects);
        ungroupSelectedObjects();
        break;

      case 'ungroup':
        pushUndoHistory('group', restoreObjects);
        groupSelectedObjects();
        break;
    }
    canvas.requestRenderAll();
  };

  return {
    deleteShape,
    undo,
    redo,
  };
};

export default useCanvasOperations;
