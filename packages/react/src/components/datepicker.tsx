import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const fieldVariants = cva('hilal-field', {
  variants: { size: { sm: 'hilal-field--sm', md: 'hilal-field--md', lg: 'hilal-field--lg' } },
  defaultVariants: { size: 'md' },
});

export type DatepickerKind = 'date' | 'datetime-local' | 'time' | 'month' | 'week';

export interface DatepickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof fieldVariants> {
  /** Defaults to "date". */
  kind?: DatepickerKind;
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

/**
 * v1 — wraps the native <input type="date"> picker. Inherits the full
 * field/input system. A custom calendar with range-select, locale formatting,
 * and accessible keyboard nav lands as DatepickerCustom in a follow-up.
 */
export const Datepicker = forwardRef<HTMLInputElement, DatepickerProps>(function Datepicker(
  { kind = 'date', label, hint, error, size, id, className, containerClassName, disabled, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const state = error ? 'error' : disabled ? 'disabled' : 'default';
  const message = error ?? hint;
  return (
    <div className={cn(fieldVariants({ size }), containerClassName)} data-state={state}>
      {label ? <label className="hilal-field__label" htmlFor={inputId}>{label}</label> : null}
      <div className="hilal-field__control">
        <input
          ref={ref}
          id={inputId}
          type={kind}
          className={cn('hilal-input', className)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={message ? `${inputId}-msg` : undefined}
          {...rest}
        />
      </div>
      {message ? <p id={`${inputId}-msg`} className="hilal-field__hint">{message}</p> : null}
    </div>
  );
});
