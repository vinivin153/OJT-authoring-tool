/** 버튼에 사용될 타입 정의 */
export type ToolButtonsType = {
  /** svg 이미지 */
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /** 버튼 레이블 */
  label: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
};
