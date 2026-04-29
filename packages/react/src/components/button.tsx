import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const buttonVariants = cva('hilal-btn', {
  variants: {
    variant: {
      primary: 'hilal-btn--primary',
      secondary: 'hilal-btn--secondary',
      tertiary: 'hilal-btn--tertiary',
    },
    size: {
      sm: 'hilal-btn--sm',
      md: 'hilal-btn--md',
      lg: 'hilal-btn--lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, loading, disabled, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      data-state={loading ? 'loading' : undefined}
      {...rest}
    >
      {loading ? <span className="hilal-btn__spinner" aria-hidden /> : null}
      {children}
    </button>
  );
});
