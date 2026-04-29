import { forwardRef, useId, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const fieldVariants = cva('hilal-field', {
  variants: { size: { sm: 'hilal-field--sm', md: 'hilal-field--md', lg: 'hilal-field--lg' } },
  defaultVariants: { size: 'md' },
});

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof fieldVariants> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  containerClassName?: string;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, success, size, id, className, containerClassName, disabled, children, ...rest },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const state = error ? 'error' : success ? 'success' : disabled ? 'disabled' : 'default';
  const message = error ?? success ?? hint;
  return (
    <div className={cn(fieldVariants({ size }), containerClassName)} data-state={state}>
      {label ? (
        <label className="hilal-field__label" htmlFor={selectId}>{label}</label>
      ) : null}
      <div className="hilal-field__control hilal-select-control">
        <select
          ref={ref}
          id={selectId}
          className={cn('hilal-select', className)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={message ? `${selectId}-msg` : undefined}
          {...rest}
        >
          {children}
        </select>
        <span className="hilal-select__chevron" aria-hidden>▾</span>
      </div>
      {message ? <p id={`${selectId}-msg`} className="hilal-field__hint">{message}</p> : null}
    </div>
  );
});
