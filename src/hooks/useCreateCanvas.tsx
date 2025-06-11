import { COLORS } from 'constant/constant';
import { Canvas } from 'fabric';
import { useCallback, useEffect, useRef } from 'react';
import useCanvasStore from 'store/useCanvasStore';
import useKeyboardShortcuts from './useCanvasShortcuts';

const useCreateCanvas = () => {
  const { setCanvas } = useCanvasStore((state) => state);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useKeyboardShortcuts();

  /** 캔버스를 생성하는 함수 */
  const createCanvas = useCallback(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const canvasRect = canvasEl.getBoundingClientRect();
    const canvas = new Canvas(canvasEl, {
      width: canvasRect.width,
      height: canvasRect.height,
    });
    canvas.backgroundColor = COLORS.CANVAS_BACKGROUND;
    setCanvas(canvas);

    return canvas;
  }, [setCanvas]);

  /** 캔버스를 정리하는 함수 */
  const clearCanvas = useCallback(
    (canvas: Canvas) => {
      canvas.dispose();
      setCanvas(null);
    },
    [setCanvas]
  );

  useEffect(() => {
    const canvas = createCanvas();

    if (!canvas) return;

    canvas.renderAll();
    return () => {
      clearCanvas(canvas);
    };
  }, [createCanvas, clearCanvas]);

  return { canvasRef };
};

export default useCreateCanvas;
