import clsx from 'clsx';
import { COLORS } from 'constant/constant';
import useCreateCanvas from 'hooks/useCreateCanvas';

function Canvas() {
  const { canvasRef } = useCreateCanvas();

  return (
    <main
      className={clsx(
        `bg-[${COLORS.CARD_BACKGROUND}] w-[70%] rounded-2xl p-10`
      )}
      aria-label="캔버스 영역"
    >
      <canvas className="w-full h-full rounded-2xl" ref={canvasRef} />
    </main>
  );
}

export default Canvas;
