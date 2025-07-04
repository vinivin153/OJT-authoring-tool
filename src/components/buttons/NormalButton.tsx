import clsx from 'clsx';

type ButtonSize = 'small' | 'medium' | 'large';

type NormalButtonProps = {
  text: string;
  disabled?: boolean;
  size?: ButtonSize;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  onClick: () => void;
};

const SIZE_CLASSES = {
  small: 'w-24 text-base',
  medium: 'w-36 h-10! text-xl',
  large: 'w-full text-xl',
};

function NormalButton({
  text,
  disabled,
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
    'transition-all duration-200',
    SIZE_CLASSES[size],
    borderColor ? `border ${borderColor}` : 'border-none',
    disabled
      ? 'text-gray-400 cursor-not-allowed pointer-events-none'
      : `${textColor} cursor-pointer hover:scale-105 active:scale-95`
  );

  const getBackgroundStyle = () => {
    if (disabled) {
      return { background: '#e5e7eb' };
    }
    return { background: bgColor };
  };

  return (
    <button
      type="button"
      aria-label={text}
      className={className}
      style={getBackgroundStyle()}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </button>
  );
}

export default NormalButton;
