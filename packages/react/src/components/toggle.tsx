import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const toggleVariants = cva('hilal-toggle', {
  variants: { size: { sm: 'hilal-toggle--sm', md: 'hilal-toggle--md' } },
  defaultVariants: { size: 'md' },
});

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'role'>,
    VariantProps<typeof toggleVariants> {
  children?: ReactNode;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { size, children, className, ...rest },
  ref,
) {
  return (
    <label className={cn(toggleVariants({ size }), className)}>
      <input ref={ref} type="checkbox" role="switch" className="hilal-toggle__input" {...rest} />
      <span className="hilal-toggle__track" aria-hidden>
        <span className="hilal-toggle__thumb" />
      </span>
      {children ? <span className="hilal-toggle__label">{children}</span> : null}
    </label>
  );
});
