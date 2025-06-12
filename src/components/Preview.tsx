import { Canvas, Group, FabricObject } from 'fabric';
import { useCallback, useEffect, useRef } from 'react';
import NormalButton from './buttons/NormalButton';

function Preview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  /** 캔버스를 생성하는 함수 */
  const createCanvas = useCallback(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return null;

    const canvasRect = canvasEl.getBoundingClientRect();
    const fabricCanvas = new Canvas(canvasEl, {
      width: canvasRect.width,
      height: canvasRect.height,
      selection: false,
    });
    fabricCanvasRef.current = fabricCanvas;

    return fabricCanvas;
  }, []);

  /** 세션스토리지에서 데이터를 가져오는 함수 */
  const getSessionData = useCallback((key: string) => {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to parse session data:', error);
      return null;
    }
  }, []);

  /** 그룹에 클릭 이벤트 핸들러 등록 */
  const registerGroupClickHandler = useCallback((group: Group) => {
    group.on('mousedown', () => {
      group.forEachObject((child) => {
        if (child.get('isCheckbox')) {
          const isSelected = !group.get('isSelected');

          group.set('isSelected', isSelected);
          child.set({
            fill: isSelected ? '#dbeafe' : 'transparent',
            stroke: isSelected ? 'blue' : '#d2d2d2',
            strokeWidth: isSelected ? 2 : 1,
          });
        }
      });
    });
  }, []);

  /** 체크박스 그룹인지 확인하는 함수 */
  const isCheckboxGroup = useCallback((obj: FabricObject): obj is Group => {
    if (!obj.isType('group')) return false;

    const group = obj as Group;
    return group.getObjects().some((child) => child.get('isCheckbox'));
  }, []);

  /** 캔버스 객체들을 설정하는 함수 */
  const configureCanvasObjects = useCallback(
    (canvas: Canvas) => {
      canvas.forEachObject((obj) => {
        if (isCheckboxGroup(obj)) {
          registerGroupClickHandler(obj);
          obj.set({
            selectable: false,
            hoverCursor: 'pointer',
          });
        } else {
          obj.set({
            selectable: false,
            hoverCursor: 'default',
          });
        }
      });
      canvas.requestRenderAll();
    },
    [isCheckboxGroup, registerGroupClickHandler]
  );

  /** 캔버스 초기화 함수 */
  const initializeCanvas = useCallback(async () => {
    const canvas = createCanvas();
    if (!canvas) return;

    const elements = getSessionData('elements');
    if (!elements) return;

    try {
      await canvas.loadFromJSON(elements);
      configureCanvasObjects(canvas);
    } catch (error) {
      console.error('데이터를 가져오는데 실패했습니다:', error);
    }
  }, [createCanvas, getSessionData, configureCanvasObjects]);

  /** 캔버스 정리 함수 */
  const cleanupCanvas = useCallback(() => {
    fabricCanvasRef.current?.dispose();
    fabricCanvasRef.current = null;
  }, []);

  /** 정답 애니메이션 함수 */
  const animateCorrectAnswer = useCallback((group: Group) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const originalScaleX = group.scaleX!;
    const originalScaleY = group.scaleY!;

    // 정답 애니메이션: 초록색 테두리와 확대/축소 효과
    group.animate(
      {
        scaleX: originalScaleX * 1.1,
        scaleY: originalScaleY * 1.1,
      },
      {
        duration: 300,
        onChange: () => canvas.requestRenderAll(),
        onComplete: () => {
          group.animate(
            {
              scaleX: originalScaleX,
              scaleY: originalScaleY,
            },
            {
              duration: 300,
              onChange: () => canvas.requestRenderAll(),
            }
          );
        },
      }
    );

    // 정답 그룹의 체크박스 스타일 변경
    group.forEachObject((child) => {
      if (child.get('isCheckbox')) {
        child.set({
          stroke: '#22c55e', // 초록색
          strokeWidth: 3,
          fill: '#dcfce7', // 연한 초록색
        });
      }
    });

    canvas.requestRenderAll();
  }, []);

  /** 오답 애니메이션 함수 */
  const animateWrongAnswer = useCallback((group: Group) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // 오답 애니메이션: 좌우 흔들기 효과
    const originalLeft = group.left!;
    const shakeDistance = 10;

    group.animate(
      { left: originalLeft - shakeDistance },
      {
        duration: 100,
        onChange: () => canvas.requestRenderAll(),
        onComplete: () => {
          group.animate(
            { left: originalLeft + shakeDistance },
            {
              duration: 100,
              onChange: () => canvas.requestRenderAll(),
              onComplete: () => {
                group.animate(
                  { left: originalLeft },
                  {
                    duration: 100,
                    onChange: () => canvas.requestRenderAll(),
                  }
                );
              },
            }
          );
        },
      }
    );

    // 오답 그룹의 체크박스 스타일 변경
    group.forEachObject((child) => {
      if (child.get('isCheckbox')) {
        child.set({
          stroke: '#ef4444', // 빨간색
          strokeWidth: 3,
          fill: '#fee2e2', // 연한 빨간색
        });
      }
    });

    canvas.requestRenderAll();
  }, []);

  /** 체크된 그룹이 정답인지 체크하는 함수 */
  const handleCheckAnswerClick = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const interaction = getSessionData('interaction');
    const answerUids = interaction?.answerUid || [];

    const selectedGroups = canvas
      .getObjects()
      .filter((obj) => obj.get('isSelected')) as Group[];

    const selectedUids = selectedGroups.map((group) => group.get('uid'));

    const isCorrect =
      selectedUids.length === answerUids.length &&
      selectedUids.every((uid) => answerUids.includes(uid));

    if (isCorrect) {
      selectedGroups.forEach((group) => {
        animateCorrectAnswer(group);
      });
    } else {
      selectedGroups.forEach((group) => {
        animateWrongAnswer(group);
      });
    }
  }, [getSessionData, animateCorrectAnswer, animateWrongAnswer]);

  useEffect(() => {
    const raf = requestAnimationFrame(initializeCanvas);

    return () => {
      cancelAnimationFrame(raf);
      cleanupCanvas();
    };
  }, [initializeCanvas, cleanupCanvas]);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl border-1 drop-shadow-xl"
      />
      <div className="absolute right-5 bottom-5">
        <NormalButton
          size="medium"
          text="정답확인"
          onClick={handleCheckAnswerClick}
        />
      </div>
    </div>
  );
}

export default Preview;
