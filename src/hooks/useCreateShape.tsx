import {
  Circle,
  FabricObject,
  Line,
  Point,
  Rect,
  Shadow,
  Textbox,
  Triangle,
} from 'fabric';
import { useCallback } from 'react';
import useCanvasStore from 'store/useCanvasStore';
import { useHistoryStore } from 'store/useHistoryStore';
import useModalStore from 'store/useModalStore';

const useCreateShape = () => {
  const canvas = useCanvasStore((state) => state.canvas);
  const openModal = useModalStore((state) => state.openModal);
  const pushUndoHistory = useHistoryStore((state) => state.pushUndoHistory);

  /** 원을 생성하는 함수 */
  const drawCircle = useCallback(() => {
    if (!canvas) return;

    const circle = new Circle({
      radius: 50,
      left: 100,
      top: 100,
      stroke: 'black',
      strokeWidth: 1,
      fill: 'transparent',
      uid: new Date().getTime().toString(),
    });
    const circlePos = new Point(100, 100);
    circle.setPositionByOrigin(circlePos, 'center', 'center');
    pushUndoHistory('add', [circle]);
    canvas.add(circle);
    canvas.requestRenderAll();
  }, [canvas, pushUndoHistory]);

  /** 사각형을 생성하는 함수 */
  const drawSquare = useCallback(() => {
    if (!canvas) return;

    const square = new Rect({
      width: 100,
      height: 100,
      stroke: 'black',
      strokeWidth: 1,
      fill: 'transparent',
      uid: new Date().getTime().toString(),
    });
    const squarePos = new Point(100, 100);
    square.setPositionByOrigin(squarePos, 'center', 'center');
    pushUndoHistory('add', [square]);
    canvas.add(square);
    canvas.requestRenderAll();
  }, [canvas, pushUndoHistory]);

  /** 세모를 생성하는 함수 */
  const drawTriangle = useCallback(() => {
    if (!canvas) return;

    const triangle = new Triangle({
      width: 100,
      height: 100,
      stroke: 'black',
      strokeWidth: 1,
      fill: 'transparent',
      uid: new Date().getTime().toString(),
    });
    const trianglePos = new Point(100, 100);
    triangle.setPositionByOrigin(trianglePos, 'center', 'center');
    pushUndoHistory('add', [triangle]);
    canvas.add(triangle);
    canvas.requestRenderAll();
  }, [canvas, pushUndoHistory]);

  /** 라인을 생성하는 함수 */
  const drawLine = useCallback(() => {
    if (!canvas) return;

    const line = new Line([50, 200, 200, 50], {
      stroke: 'black',
      strokeWidth: 1,
      uid: new Date().getTime().toString(),
    });
    pushUndoHistory('add', [line]);
    canvas.add(line);
    canvas.requestRenderAll();
  }, [canvas, pushUndoHistory]);

  /** 텍스트를 생성하는 함수 */
  const drawText = useCallback(() => {
    if (!canvas) return;

    const text = new Textbox('text', {
      width: 200,
      height: 50,
      left: 100,
      top: 100,
      fontSize: 32,
      fill: 'black',
      fontFamily: 'Pretendard',
      uid: new Date().getTime().toString(),
    });

    // 리사이즈될 때 fontSize를 동적으로 할당하는 이벤트 핸들러
    text.on('scaling', () => {
      const scaleY = text.scaleY ?? 1;
      const newFontSize = text.fontSize! * scaleY;

      text.set({
        fontSize: newFontSize,
        scaleX: 1,
        scaleY: 1,
        height: undefined,
      });
      canvas.requestRenderAll();
    });

    pushUndoHistory('add', [text]);
    canvas.add(text);
    canvas.requestRenderAll();
  }, [canvas, pushUndoHistory]);

  /** 체크박스를 생성하는 함수 */
  const drawCheckBox = useCallback(() => {
    if (!canvas) return;

    FabricObject.customProperties = ['isCheckbox', 'isSelected', 'uid'];
    const checkBox = new Rect({
      width: 100,
      height: 100,
      rx: 10,
      ry: 10,
      stroke: '#d2d2d2',
      strokeWidth: 2,
      fill: 'transparent',
      shadow: new Shadow({
        color: 'rgba(0, 0, 0, 0.08)',
        blur: 25,
        affectStroke: true,
      }),
      isCheckbox: true,
      uid: new Date().getTime().toString(),
    });

    const checkBoxPos = new Point(100, 100);
    checkBox.setPositionByOrigin(checkBoxPos, 'center', 'center');
    pushUndoHistory('add', [checkBox]);
    canvas.add(checkBox);
    canvas.requestRenderAll();
  }, [canvas, pushUndoHistory]);

  /** 이미지를 생성하는 함수 */
  const drawImage = useCallback(() => {
    if (!canvas) return;

    openModal('image');
  }, [canvas, openModal]);

  return {
    drawCircle,
    drawSquare,
    drawTriangle,
    drawLine,
    drawText,
    drawCheckBox,
    drawImage,
  };
};

export default useCreateShape;
