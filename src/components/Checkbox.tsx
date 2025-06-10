import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import clsx from 'clsx';

// 체크박스 컴포넌트 예시
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const checkboxClasses = clsx(
    // 기본 스타일
    'peer',
    'border-input',
    'size-4',
    'shrink-0',
    'rounded-[4px]',
    'border',
    'shadow-xs',
    'transition-shadow',
    'outline-none',

    // 다크 모드 배경
    'dark:bg-input/30',

    // 체크된 상태
    'data-[state=checked]:bg-blue-500',
    'data-[state=checked]:text-primary-foreground',
    'dark:data-[state=checked]:bg-primary',

    // 포커스 상태
    'focus-visible:border-ring',
    'focus-visible:ring-ring/50',
    'focus-visible:ring-[3px]',

    // 에러 상태
    'aria-invalid:ring-destructive/20',
    'aria-invalid:border-destructive',
    'dark:aria-invalid:ring-destructive/40',

    // 비활성화 상태
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',

    // 추가 클래스
    className
  );
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={checkboxClasses}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
export { Checkbox };
