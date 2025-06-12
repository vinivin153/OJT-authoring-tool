import { ActiveSelection, Group } from 'fabric';
import useCanvasStore from 'store/useCanvasStore';
import { useHistoryStore } from 'store/useHistoryStore';

const useArrangeTool = () => {
  const { canvas } = useCanvasStore((state) => state);
  const { pushUndoHistory } = useHistoryStore();

  /** 선택된 요소를 그룹핑 하는 함수 */
  const groupSelectedObjects = () => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    // 선택된 오브젝트 중에서 checkbox가 있는지 확인하고, 정렬
    const sortedObjects = [...activeObjects].sort((a, b) => {
      const aIsCheckbox = a.get('isCheckbox') ? 0 : 1;
      const bIsCheckbox = b.get('isCheckbox') ? 0 : 1;
      return aIsCheckbox - bIsCheckbox;
    });

    canvas.remove(...activeObjects);

    const group = new Group(sortedObjects);
    group.set({
      uid: new Date().getTime().toString(),
    });

    pushUndoHistory('group', [group]);
    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.requestRenderAll();
  };

  /** 그룹핑된 요소를 언그룹핑 하는 함수 */
  const ungroupSelectedObjects = () => {
    if (!canvas) return;

    // 선택된 오브젝트가 그룹이 아니면 예외처리
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !activeObject.isType('group')) return;

    const group = activeObject as Group;
    canvas.remove(group);

    const objects = group.getObjects();
    objects.forEach((obj, idx) => {
      obj.set({
        uid: (new Date().getTime() + idx).toString(),
      });
    });

    canvas.add(...group.removeAll());
    const selection = new ActiveSelection(objects, { canvas });
    canvas.setActiveObject(selection);
    canvas.requestRenderAll();
  };

  /** 선택된 요소들을 수평정렬하는 함수 */
  const horizontalAlignSelectedObjects = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects || activeObjects.length <= 1) return;

    const centerY = activeObject.getCenterPoint().y;

    activeObjects.forEach((obj) => {
      const currentCenter = obj.getCenterPoint();
      obj.set({
        top: obj.top + (centerY - currentCenter.y),
      });
    });

    const selection = new ActiveSelection(activeObjects, {
      canvas: canvas,
    });

    canvas.setActiveObject(selection);
    canvas.requestRenderAll();
  };

  /** 선택된 요소들을 수직정렬하는 함수 */
  const verticalAlignSelectedObjects = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects || activeObjects.length <= 1) return;

    const centerX = activeObject.getCenterPoint().x;

    activeObjects.forEach((obj) => {
      const currentCenter = obj.getCenterPoint();
      obj.set({
        left: obj.left + (centerX - currentCenter.x),
      });
    });

    const selection = new ActiveSelection(activeObjects, {
      canvas: canvas,
    });

    canvas.setActiveObject(selection);
    canvas.requestRenderAll();
  };

  return {
    groupSelectedObjects,
    ungroupSelectedObjects,
    horizontalAlignSelectedObjects,
    verticalAlignSelectedObjects,
  };
};

export default useArrangeTool;
