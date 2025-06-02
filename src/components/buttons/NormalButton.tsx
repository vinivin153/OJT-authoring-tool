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
  medium: 'w-36',
  large: 'w-52',
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
    SIZE_CLASSES[size],
    borderColor ? `border ${borderColor}` : 'border-none',
    textColor
  );

  return (
    <button
      className={className}
      style={{ background: bgColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default NormalButton;
