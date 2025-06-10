import { Canvas, Group } from 'fabric';
import { useEffect, useRef } from 'react';
import NormalButton from './buttons/NormalButton';

function Preview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const canvas = createcanvas();
      if (!canvas) return;

      const elements = getSessionData('elements');
      if (!elements) return;

      canvas.loadFromJSON(elements).then(() => {
        canvas.forEachObject((obj) => {
          if (obj.isType('group')) {
            const group = obj as Group;

            const hasCheckboxChild = group
              .getObjects()
              .some((child) => child.get('isCheckbox'));

            if (!hasCheckboxChild) return;

            group.on('mousedown', () => {
              group.forEachObject((child) => {
                if (child.get('isCheckbox')) {
                  const currentSelected = child.get('isSelected') || false;
                  const newSelected = !currentSelected;

                  child.set({
                    isSelected: newSelected,
                    fill: newSelected ? '#dbeafe' : 'transparent',
                    stroke: newSelected ? 'blue' : '#d2d2d2',
                    strokeWidth: newSelected ? 2 : 1,
                  });
                }
              });
            });

            obj.set({
              selectable: false,
              hoverCursor: 'pointer',
            });

            return;
          }

          obj.set({
            selectable: false,
            hoverCursor: 'default',
          });
        });
        canvas.requestRenderAll();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      fabricCanvasRef.current?.dispose();
    };
  }, []);

  const createcanvas = () => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const canvasRect = canvasEl.getBoundingClientRect();
    const fabricCanvas = new Canvas(canvasEl, {
      width: canvasRect.width,
      height: canvasRect.height,
    });
    fabricCanvasRef.current = fabricCanvas;

    return fabricCanvas;
  };

  /** 세션스토리지에서 데이터를 가져오는 함수 */
  const getSessionData = (key: string) => {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to parse session data:', error);
      return null;
    }
  };

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl border-1 drop-shadow-xl"
      />
      <div className="absolute right-5 bottom-5">
        <NormalButton size="medium" text="정답확인" onClick={() => {}} />
      </div>
    </div>
  );
}

export default Preview;
