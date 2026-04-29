import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn.js';

export type TooltipSide = 'top' | 'bottom' | 'start' | 'end';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: ReactNode;
  side?: TooltipSide;
  children: ReactNode;
}

/**
 * CSS-only tooltip — shows on hover or keyboard focus of the trigger.
 * For floating-positioned, dismissable tooltips with full a11y, swap this
 * for a Radix Tooltip wrapper in a follow-up.
 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, side = 'top', children, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn('hilal-tooltip', className)} data-side={side} {...rest}>
      {children}
      <span className="hilal-tooltip__content" role="tooltip">
        {content}
      </span>
    </span>
  );
});
