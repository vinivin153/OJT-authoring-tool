import type { Textbox } from 'fabric';
import useCanvasStore from 'store/useCanvasStore';

const useTextTool = () => {
  const { canvas } = useCanvasStore((state) => state);

  /** 텍스트 왼쪽 정렬하는 함수 */
  const alignLeft = () => {
    if (!canvas) return;

    const activeObject = canvas?.getActiveObject();
    if (!activeObject || !activeObject.isType('textbox')) return;

    activeObject.set({
      textAlign: 'left',
    });

    canvas.requestRenderAll();
  };

  /** 텍스트 가운데 정렬하는 함수 */
  const alignCenter = () => {
    if (!canvas) return;

    const activeObject = canvas?.getActiveObject();
    if (!activeObject || !activeObject.isType('textbox')) return;

    activeObject.set({
      textAlign: 'center',
    });

    canvas.requestRenderAll();
  };

  /** 텍스트 오른쪽 정렬하는 함수 */
  const alignRight = () => {
    if (!canvas) return;

    const activeObject = canvas?.getActiveObject();
    if (!activeObject || !activeObject.isType('textbox')) return;

    activeObject.set({
      textAlign: 'right',
    });

    canvas.requestRenderAll();
  };

  /** 텍스트를 두께를 굵게 만드는 함수 */
  const boldText = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || !activeObject.isType('textbox')) return;

    const textObject = activeObject as Textbox;
    const currentFontWeight = textObject.fontWeight;
    textObject.set({
      fontWeight: currentFontWeight === 'bold' ? 'normal' : 'bold',
    });

    canvas.requestRenderAll();
  };

  /** 텍스트 기울임을 주는 함수 */
  const italicText = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || !activeObject.isType('textbox')) return;

    const textObject = activeObject as Textbox;
    const currentFontStyle = textObject.fontStyle;
    textObject.set({
      fontStyle: currentFontStyle === 'italic' ? 'normal' : 'italic',
    });

    canvas.requestRenderAll();
  };

  return { alignLeft, alignCenter, alignRight, boldText, italicText };
};

export default useTextTool;
