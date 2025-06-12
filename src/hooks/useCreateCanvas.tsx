import { COLORS } from 'constant/constant';
import { Canvas } from 'fabric';
import { useCallback, useEffect, useRef } from 'react';
import useCanvasStore from 'store/useCanvasStore';
import useKeyboardShortcuts from './useCanvasShortcuts';

const useCreateCanvas = () => {
  const setCanvas = useCanvasStore((state) => state.setCanvas);
  const setHasSelection = useCanvasStore((state) => state.setHasSelection);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useKeyboardShortcuts();

  /** 선택 상태 업데이트 함수 */
  const updateSelectionState = useCallback(
    (canvas: Canvas) => {
      const activeObject = canvas.getActiveObject();
      setHasSelection(!!activeObject);
    },
    [setHasSelection]
  );

  /** 캔버스 이벤트 리스너 설정 */
  const setupCanvasEvents = useCallback(
    (canvas: Canvas) => {
      // 객체가 선택되었을 때
      canvas.on('selection:created', () => {
        updateSelectionState(canvas);
      });

      // 선택이 변경되었을 때
      canvas.on('selection:updated', () => {
        updateSelectionState(canvas);
      });

      // 선택이 해제되었을 때
      canvas.on('selection:cleared', () => {
        updateSelectionState(canvas);
      });

      // 객체가 삭제되었을 때도 선택 상태 업데이트
      canvas.on('object:removed', () => {
        updateSelectionState(canvas);
      });
    },
    [updateSelectionState]
  );

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
    setupCanvasEvents(canvas);

    return canvas;
  }, [setCanvas, setupCanvasEvents]);

  /** 캔버스를 정리하는 함수 */
  const clearCanvas = useCallback(
    (canvas: Canvas) => {
      canvas.removeListeners();
      canvas.dispose();
      setCanvas(null);
      setHasSelection(false);
    },
    [setCanvas, setHasSelection]
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
