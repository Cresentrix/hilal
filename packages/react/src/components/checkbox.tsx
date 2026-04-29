import { forwardRef, useEffect, useRef, useImperativeHandle, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const checkboxVariants = cva('hilal-check', {
  variants: { size: { sm: 'hilal-check--sm', md: 'hilal-check--md' } },
  defaultVariants: { size: 'md' },
});

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  indeterminate?: boolean;
  children?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size, indeterminate, children, className, ...rest },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate ?? false;
  }, [indeterminate]);

  return (
    <label className={cn(checkboxVariants({ size }), className)}>
      <input ref={inputRef} type="checkbox" className="hilal-check__input" {...rest} />
      <span className="hilal-check__box" aria-hidden>
        <svg className="hilal-check__tick" viewBox="0 0 16 16" focusable="false">
          {indeterminate ? (
            <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
          ) : (
            <path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </span>
      {children ? <span className="hilal-check__label">{children}</span> : null}
    </label>
  );
});
