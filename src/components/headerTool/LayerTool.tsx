import SVGButton from '../buttons/SVGButton';
import Up from 'assets/Images/up.svg?react';
import Down from 'assets/Images/down.svg?react';
import UpDoubble from 'assets/Images/up-double.svg?react';
import DownDouble from 'assets/Images/down-double.svg?react';
import type { ToolButtonsType } from './toolType';
import useLayerTool from 'hooks/useLayerTool';

/** 레이어 도구 컴포넌트 */
function LayerTool() {
  const { bringForward, sendBackwards, bringToFront, sendToBack } =
    useLayerTool();
  const LayerToolButtons: ToolButtonsType[] = [
    { icon: Up, label: '위로 이동', onClick: bringForward },
    { icon: Down, label: '아래로 이동', onClick: sendBackwards },
    { icon: UpDoubble, label: '맨 위로 이동', onClick: bringToFront },
    { icon: DownDouble, label: '맨 아래로 이동', onClick: sendToBack },
  ];

  return (
    <div aria-label="레이어 도구" className="w-fit">
      <span className="flex justify-center mb-4 text-gray-800 text-sm">
        레이어 도구
      </span>
      <div className="flex">
        {LayerToolButtons.map(({ icon: Icon, label, onClick }) => (
          <SVGButton key={label} label={label} onClick={onClick}>
            <Icon />
          </SVGButton>
        ))}
      </div>
    </div>
  );
}

export default LayerTool;
