import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const fieldVariants = cva('hilal-field', {
  variants: {
    size: { sm: 'hilal-field--sm', md: 'hilal-field--md', lg: 'hilal-field--lg' },
  },
  defaultVariants: { size: 'md' },
});

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof fieldVariants> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    success,
    leadingIcon,
    trailingIcon,
    size,
    id,
    className,
    containerClassName,
    disabled,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const state = error ? 'error' : success ? 'success' : disabled ? 'disabled' : 'default';
  const message = error ?? success ?? hint;

  return (
    <div className={cn(fieldVariants({ size }), containerClassName)} data-state={state}>
      {label ? (
        <label className="hilal-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="hilal-field__control">
        {leadingIcon ? (
          <span className="hilal-field__icon hilal-field__icon--leading" aria-hidden>
            {leadingIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn('hilal-input', className)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={message ? `${inputId}-msg` : undefined}
          {...rest}
        />
        {trailingIcon ? (
          <span className="hilal-field__icon hilal-field__icon--trailing" aria-hidden>
            {trailingIcon}
          </span>
        ) : null}
      </div>
      {message ? (
        <p id={`${inputId}-msg`} className="hilal-field__hint">
          {message}
        </p>
      ) : null}
    </div>
  );
});
