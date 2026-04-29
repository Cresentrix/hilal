import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const badgeVariants = cva('hilal-badge', {
  variants: {
    tone: {
      neutral: 'hilal-badge--neutral',
      info:    'hilal-badge--info',
      success: 'hilal-badge--success',
      warning: 'hilal-badge--warning',
      danger:  'hilal-badge--danger',
      brand:   'hilal-badge--brand',
    },
    size: { sm: '', md: 'hilal-badge--md' },
    dot:  { true: 'hilal-badge--dot', false: '' },
  },
  defaultVariants: { tone: 'neutral', size: 'sm', dot: false },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone, size, dot, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ tone, size, dot }), className)} {...rest}>
      {dot ? null : children}
    </span>
  );
});
