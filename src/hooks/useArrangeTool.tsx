import { Group } from 'fabric';
import useCanvasStore from 'store/useCanvasStore';

const useArrangeTool = () => {
  const { canvas } = useCanvasStore((state) => state);

  /** 선택된 요소를 그룹핑 하는 함수 */
  const groupSelectedObjects = () => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    canvas.remove(...activeObjects);
    const group = new Group([...activeObjects]);
    group.set({
      uid: new Date().getTime().toString(),
    });
    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.requestRenderAll();
  };

  /** 그룹핑된 요소를 언그룹핑 하는 함수 */
  const ungroupSelectedObjects = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject() as Group;
    canvas.remove(activeObject);
    activeObject.getObjects().forEach((obj, idx) => {
      obj.set({
        uid: (new Date().getTime() + idx).toString(),
      });
    });
    canvas.add(...activeObject.removeAll());
    canvas.requestRenderAll();
  };

  /** 선택된 요소들을 수평정렬하는 함수 */
  const horizontalAlignSelectedObjects = () => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects || activeObjects.length === 0) return;

    activeObjects.forEach((obj) => {
      obj.set({
        top: 0,
        originY: 'center',
      });
    });

    canvas.requestRenderAll();
  };

  /** 선택된 요소들을 수직정렬하는 함수 */
  const verticalAlignSelectedObjects = () => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects || activeObjects.length === 0) return;

    console.log(activeObjects);
    activeObjects.forEach((obj) => {
      obj.set({
        left: 0,
        originX: 'center',
      });
    });

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
