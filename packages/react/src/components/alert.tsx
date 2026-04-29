import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const alertVariants = cva('hilal-alert', {
  variants: {
    tone: {
      info:    'hilal-alert--info',
      success: 'hilal-alert--success',
      warning: 'hilal-alert--warning',
      danger:  'hilal-alert--danger',
    },
  },
  defaultVariants: { tone: 'info' },
});

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone, title, description, icon, onDismiss, dismissLabel = 'Dismiss', className, children, role = 'status', ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(alertVariants({ tone }), className)} role={role} {...rest}>
      {icon ? <span className="hilal-alert__icon" aria-hidden>{icon}</span> : null}
      <div className="hilal-alert__body">
        {title       ? <p className="hilal-alert__title">{title}</p> : null}
        {description ? <p className="hilal-alert__desc">{description}</p> : null}
        {children}
      </div>
      {onDismiss ? (
        <button type="button" className="hilal-alert__close" aria-label={dismissLabel} onClick={onDismiss}>×</button>
      ) : null}
    </div>
  );
});
