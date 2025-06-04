import SVGButton from '../buttons/SVGButton';
import Up from 'assets/Images/up.svg?react';
import Down from 'assets/Images/down.svg?react';
import UpDoubble from 'assets/Images/up-double.svg?react';
import DownDouble from 'assets/Images/down-double.svg?react';
import type { ToolButtonsType } from './toolType';

/** 레이어 도구 컴포넌트 */
function LayerTool() {
  const LayerToolButtons: ToolButtonsType[] = [
    { icon: Up, label: '위로 이동' },
    { icon: Down, label: '아래로 이동' },
    { icon: UpDoubble, label: '맨 위로 이동' },
    { icon: DownDouble, label: '맨 아래로 이동' },
  ];

  return (
    <div aria-label="레이어 도구" className="w-fit">
      <span className="flex justify-center mb-4 text-gray-800 text-sm">
        레이어 도구
      </span>
      <div className="flex">
        {LayerToolButtons.map(({ icon: Icon, label }, index) => (
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

export default LayerTool;
