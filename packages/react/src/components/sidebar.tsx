import { forwardRef, type HTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const sidebarVariants = cva('hilal-sidebar', {
  variants: { collapsed: { true: 'hilal-sidebar--collapsed', false: '' } },
  defaultVariants: { collapsed: false },
});

export interface SidebarProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { collapsed, className, ...rest }, ref,
) {
  return <aside ref={ref} className={cn(sidebarVariants({ collapsed }), className)} {...rest} />;
});

export const SidebarHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function SidebarHeader(
  { className, ...rest }, ref,
) { return <header ref={ref} className={cn('hilal-sidebar__header', className)} {...rest} />; });

export const SidebarFooter = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function SidebarFooter(
  { className, ...rest }, ref,
) { return <footer ref={ref} className={cn('hilal-sidebar__footer', className)} {...rest} />; });

export const SidebarNav = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function SidebarNav(
  { className, ...rest }, ref,
) { return <nav ref={ref} className={cn('hilal-sidebar__nav', className)} {...rest} />; });

export const SidebarSection = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function SidebarSection(
  { className, ...rest }, ref,
) { return <p ref={ref} className={cn('hilal-sidebar__section', className)} {...rest} />; });

export interface SidebarItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
  label: ReactNode;
  active?: boolean;
  trailing?: ReactNode;
}

export const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(function SidebarItem(
  { icon, label, trailing, active, className, ...rest }, ref,
) {
  return (
    <a ref={ref} className={cn('hilal-sidebar__item', className)} aria-current={active ? 'page' : undefined} {...rest}>
      {icon ? <span className="hilal-sidebar__icon" aria-hidden>{icon}</span> : null}
      <span className="hilal-sidebar__label">{label}</span>
      {trailing}
    </a>
  );
});
