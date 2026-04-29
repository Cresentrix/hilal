import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const emptyVariants = cva('hilal-empty', {
  variants: { size: { default: '', compact: 'hilal-empty--compact' } },
  defaultVariants: { size: 'default' },
});

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof emptyVariants> {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, actions, size, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(emptyVariants({ size }), className)} {...rest}>
      {icon ? <div className="hilal-empty__icon" aria-hidden>{icon}</div> : null}
      {title       ? <h3 className="hilal-empty__title">{title}</h3> : null}
      {description ? <p className="hilal-empty__desc">{description}</p> : null}
      {actions     ? <div className="hilal-empty__actions">{actions}</div> : null}
      {children}
    </div>
  );
});
