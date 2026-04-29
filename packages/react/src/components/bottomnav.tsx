import { forwardRef, type HTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const bottomNavVariants = cva('hilal-bottomnav', {
  variants: { variant: { default: '', floating: 'hilal-bottomnav--floating' } },
  defaultVariants: { variant: 'default' },
});

export interface BottomNavProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof bottomNavVariants> {
  ariaLabel?: string;
}

export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(function BottomNav(
  { variant, ariaLabel = 'Primary', className, ...rest }, ref,
) {
  return <nav ref={ref} className={cn(bottomNavVariants({ variant }), className)} aria-label={ariaLabel} {...rest} />;
});

export interface BottomNavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
  label: ReactNode;
  active?: boolean;
}

export const BottomNavItem = forwardRef<HTMLAnchorElement, BottomNavItemProps>(function BottomNavItem(
  { icon, label, active, className, ...rest }, ref,
) {
  return (
    <a ref={ref} className={cn('hilal-bottomnav__item', className)} aria-current={active ? 'page' : undefined} {...rest}>
      {icon ? <span className="hilal-bottomnav__icon" aria-hidden>{icon}</span> : null}
      <span className="hilal-bottomnav__label">{label}</span>
    </a>
  );
});
