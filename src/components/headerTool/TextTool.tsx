import SVGButton from '../buttons/SVGButton';
import LeftAlign from 'assets/Images/align-left.svg?react';
import CenterAlign from 'assets/Images/align-center.svg?react';
import RightAlign from 'assets/Images/align-right.svg?react';
import Bold from 'assets/Images/bold.svg?react';
import Italic from 'assets/Images/italic.svg?react';
import type { ToolButtonsType } from './toolType';

/** 텍스트 도구 컴포넌트 */
function TextTool() {
  const textToolButtons: ToolButtonsType[] = [
    { icon: LeftAlign, label: '왼쪽 정렬' },
    { icon: CenterAlign, label: '가운데 정렬' },
    { icon: RightAlign, label: '오른쪽 정렬' },
    { icon: Bold, label: '굵게' },
    { icon: Italic, label: '기울임꼴' },
  ];

  return (
    <div aria-label="텍스트 도구" className="w-fit">
      <span className="flex justify-center mb-4 text-gray-800 text-sm">
        텍스트 도구
      </span>
      <div className="flex">
        {textToolButtons.map(({ icon: Icon, label }, index) => (
          <SVGButton
            key={index}
            // TODO(홍빈): 핸들러 기능 구현 후 매직넘버 제거
            onClick={() => console.log(`${label} button clicked`)}
          >
            <Icon />
          </SVGButton>
        ))}
      </div>
    </div>
  );
}

export default TextTool;
