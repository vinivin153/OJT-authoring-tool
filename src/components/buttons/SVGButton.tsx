/** SVG 버튼 컴포넌트 타입 정의 */
type SVGButtonProps = {
  /**클릭 이벤트 핸들러 */
  onClick: () => void;
  /** 버튼에 대한 접근성 레이블 */
  label?: string;
  /** 버튼 내부에 렌더링할 SVG 아이콘 */
  children?: React.ReactNode;
};

/** SVG 버튼 컴포넌트 */
function SVGButton({ onClick, label, children }: SVGButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="w-10 h-10 rounded-full border-none bg-[#f7f8fd] p-0"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SVGButton;
