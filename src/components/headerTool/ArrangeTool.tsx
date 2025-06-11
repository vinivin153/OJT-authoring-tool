import SVGButton from '../buttons/SVGButton';
import Group from 'assets/Images/link.svg?react';
import UnGroup from 'assets/Images/ungroup.svg?react';
import HorizontalAlign from 'assets/Images/horizontal.svg?react';
import VerticalAlign from 'assets/Images/vertical.svg?react';
import type { ToolButtonsType } from './toolType';
import useArrangeTool from 'hooks/useArrangeTool';

/** 그룹 및 정렬 도구 컴포넌트 */
function ArrangeTool() {
  const {
    groupSelectedObjects,
    ungroupSelectedObjects,
    horizontalAlignSelectedObjects,
    verticalAlignSelectedObjects,
  } = useArrangeTool();
  const arrangeToolButtons: ToolButtonsType[] = [
    { icon: Group, label: '그룹으로 묶기', onClick: groupSelectedObjects },
    { icon: UnGroup, label: '그룹 해제', onClick: ungroupSelectedObjects },
    {
      icon: HorizontalAlign,
      label: '수평 정렬',
      onClick: horizontalAlignSelectedObjects,
    },
    {
      icon: VerticalAlign,
      label: '수직 정렬',
      onClick: verticalAlignSelectedObjects,
    },
  ];

  return (
    <div aria-label="그룹 / 정렬" className="w-fit">
      <span className="flex justify-center mb-4 text-gray-800 text-sm">
        그룹 / 정렬
      </span>
      <div className="flex">
        {arrangeToolButtons.map(({ icon: Icon, label, onClick }) => (
          <SVGButton key={label} label={label} onClick={onClick}>
            <Icon />
          </SVGButton>
        ))}
      </div>
    </div>
  );
}

export default ArrangeTool;
