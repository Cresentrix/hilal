import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn.js';

export type StepStatus = 'complete' | 'current' | 'upcoming';
export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepItem {
  label: ReactNode;
  status?: StepStatus;
  /** Override the default 1-based number / check shown in the indicator. */
  indicator?: ReactNode;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  steps: StepItem[];
  orientation?: StepperOrientation;
}

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  { steps, orientation = 'horizontal', className, ...rest },
  ref,
) {
  return (
    <ol ref={ref} className={cn('hilal-stepper', className)} data-orientation={orientation} {...rest}>
      {steps.map((s, i) => {
        const status = s.status ?? 'upcoming';
        return (
          <li
            key={i}
            className="hilal-stepper__step"
            data-status={status}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            <span className="hilal-stepper__indicator" aria-hidden>
              {s.indicator ?? (status === 'complete' ? '✓' : i + 1)}
            </span>
            <span className="hilal-stepper__label">{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
});
