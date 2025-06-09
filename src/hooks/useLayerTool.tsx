import useCanvasStore from 'store/useCanvasStore';

const useLayerTool = () => {
  const canvas = useCanvasStore((state) => state.canvas);

  /** 레이어를 하나 위로 올리는 함수 */
  const bringForward = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    canvas.bringObjectForward(activeObject);
    canvas.requestRenderAll();
  };

  /** 레이어를 하나 아래로 내리는 함수 */
  const sendBackwards = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    canvas.sendObjectBackwards(activeObject);
    canvas.requestRenderAll();
  };

  /** 레이어를 맨 위로 올리는 함수 */
  const bringToFront = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    canvas.bringObjectToFront(activeObject);
    canvas.requestRenderAll();
  };

  /** 레이어를 맨 아래로 내리는 함수 */
  const sendToBack = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    canvas.sendObjectToBack(activeObject);
    canvas.requestRenderAll();
  };

  return { bringForward, sendBackwards, bringToFront, sendToBack };
};

export default useLayerTool;
