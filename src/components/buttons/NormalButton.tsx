import clsx from 'clsx';

type ButtonSize = 'small' | 'medium' | 'large';

type NormalButtonProps = {
  text: string;
  size?: ButtonSize;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  onClick: () => void;
};

const SIZE_CLASSES = {
  small: 'w-24 text-base',
  medium: 'w-36 text-xl',
  large: 'w-full text-xl',
};

function NormalButton({
  text,

  size = 'medium',
  borderColor,
  bgColor = 'linear-gradient(135deg, #667eea, #594ba2)',
  textColor = 'text-white',
  onClick,
}: NormalButtonProps) {
  const className = clsx(
    'h-12',
    'px-2',
    'py-4',
    SIZE_CLASSES[size],
    borderColor ? `border ${borderColor}` : 'border-none',
    textColor
  );

  return (
    <button
      type="button"
      className={className}
      style={{ background: bgColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default NormalButton;
