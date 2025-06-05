import { COLORS } from 'constant/constant';
import useCreateCanvas from 'hooks/useCreateCanvas';

function Canvas() {
  const { canvasRef } = useCreateCanvas();

  return (
    <main
      className="w-[70%] rounded-2xl p-10"
      style={{ backgroundColor: COLORS.CARD_BACKGROUND }}
      aria-label="캔버스 영역"
    >
      <canvas
        className="w-full h-full rounded-2xl drop-shadow-xl"
        ref={canvasRef}
      />
    </main>
  );
}

export default Canvas;
