import SVGButton from '../buttons/SVGButton';
import Group from 'assets/Images/group.svg?react';
import UnGroup from 'assets/Images/ungroup.svg?react';
import HorizontalAlign from 'assets/Images/horizontal.svg?react';
import VerticalAlign from 'assets/Images/vertical.svg?react';
import type { ToolButtonsType } from './toolType';

/** 그룹 및 정렬 도구 컴포넌트 */
function ArrangeTool() {
  const arrangeToolButtons: ToolButtonsType[] = [
    { icon: Group, label: '그룹으로 묶기' },
    { icon: UnGroup, label: '그룹 해제' },
    { icon: HorizontalAlign, label: '수평 정렬' },
    { icon: VerticalAlign, label: '수직 정렬' },
  ];

  return (
    <div aria-label="그룹 / 정렬" className="w-fit">
      <span className="flex justify-center mb-4 text-gray-800 text-sm">
        그룹 / 정렬
      </span>
      <div className="flex">
        {arrangeToolButtons.map(({ icon: Icon, label }, index) => (
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

export default ArrangeTool;
