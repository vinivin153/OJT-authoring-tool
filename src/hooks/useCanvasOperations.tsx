import useCanvasStore from 'store/useCanvasStore';
import useArrangeTool from './useArrangeTool';
import { useHistoryStore } from 'store/useHistoryStore';
import { RESTORE_FUNCTIONS } from 'constant/constant';

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
  const { ADD, DELETE, GROUP, UNGROUP } = RESTORE_FUNCTIONS;

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
    pushUndoHistory(DELETE, activeObjects);

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
      case ADD:
        pushRedoHistory(DELETE, restoreObjects);
        canvas.remove(...restoreObjects);
        break;

      case DELETE:
        pushRedoHistory(ADD, restoreObjects);
        canvas.add(...restoreObjects);
        break;

      case GROUP:
        pushRedoHistory(UNGROUP, restoreObjects);
        ungroupSelectedObjects();
        break;

      case UNGROUP:
        pushRedoHistory(GROUP, restoreObjects);
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
      case ADD:
        pushUndoHistory(DELETE, restoreObjects);
        canvas.remove(...restoreObjects);
        break;

      case DELETE:
        pushUndoHistory(ADD, restoreObjects);
        canvas.add(...restoreObjects);
        break;

      case GROUP:
        pushUndoHistory(UNGROUP, restoreObjects);
        ungroupSelectedObjects();
        break;

      case UNGROUP:
        pushUndoHistory(GROUP, restoreObjects);
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
