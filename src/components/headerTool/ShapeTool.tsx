import SVGButton from '../buttons/SVGButton';
import Circle from 'assets/Images/circle.svg?react';
import Square from 'assets/Images/square.svg?react';
import Triangle from 'assets/Images/triangle.svg?react';
import Slash from 'assets/Images/slash.svg?react';
import Text from 'assets/Images/text.svg?react';
import CheckSquare from 'assets/Images/check-square.svg?react';
import ImagePlus from 'assets/Images/image-plus.svg?react';
import type { ToolButtonsType } from './toolType';
import useCreateShape from 'hooks/useCreateShape';

/** 도형 생성 버튼 그룹 컴포넌트 */
function ShapeTool() {
  const {
    drawCircle,
    drawSquare,
    drawTriangle,
    drawLine,
    drawText,
    drawCheckBox,
    drawImage,
  } = useCreateShape();

  const shapeToolButtons: ToolButtonsType[] = [
    { icon: Circle, label: '원 추가', onClick: drawCircle },
    { icon: Square, label: '사각형 추가', onClick: drawSquare },
    { icon: Triangle, label: '세모 추가', onClick: drawTriangle },
    { icon: Slash, label: '라인 추가', onClick: drawLine },
    { icon: Text, label: '텍스트 추가', onClick: drawText },
    { icon: CheckSquare, label: '체크 박스 추가', onClick: drawCheckBox },
    { icon: ImagePlus, label: '이미지 추가', onClick: drawImage },
  ];

  return (
    <div aria-label="도형 생성" className="w-fit">
      <span className="flex justify-center mb-4 text-gray-800 text-sm">
        도형 생성
      </span>
      <div className="flex">
        {shapeToolButtons.map(({ icon: Icon, label, onClick }) => (
          <SVGButton
            key={label}
            // TODO(홍빈): 핸들러 기능 구현 후 매직넘버 제거
            onClick={onClick || (() => console.log(`${label} button clicked`))}
          >
            <Icon />
          </SVGButton>
        ))}
      </div>
    </div>
  );
}

export default ShapeTool;
