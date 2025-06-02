type SVGButtonProps = {
  svg: React.ReactNode;
  onClick: () => void;
};

function SVGButton({ svg, onClick }: SVGButtonProps) {
  return (
    <button
      className="w-10 h-10 rounded-full border-none bg-[#f7f8fd] p-0"
      onClick={onClick}
    >
      {svg}
    </button>
  );
}

export default SVGButton;
