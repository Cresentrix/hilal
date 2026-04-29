import {
  forwardRef, useEffect, useImperativeHandle, useRef,
  type DialogHTMLAttributes, type HTMLAttributes, type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const drawerVariants = cva('hilal-drawer', {
  variants: {
    side: {
      start: 'hilal-drawer--start', end: 'hilal-drawer--end',
      top:   'hilal-drawer--top',   bottom: 'hilal-drawer--bottom',
    },
    size: { sm: 'hilal-drawer--sm', md: 'hilal-drawer--md', lg: 'hilal-drawer--lg' },
  },
  defaultVariants: { side: 'end', size: 'md' },
});

export type DrawerSide = 'start' | 'end' | 'top' | 'bottom';

export interface DrawerProps
  extends DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof drawerVariants> {
  open: boolean;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  children: ReactNode;
}

export const Drawer = forwardRef<HTMLDialogElement, DrawerProps>(function Drawer(
  { open, onClose, closeOnBackdrop = true, side, size, className, children, ...rest },
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => dialogRef.current!, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handler = () => onClose?.();
    d.addEventListener('close', handler);
    return () => d.removeEventListener('close', handler);
  }, [onClose]);

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdrop) return;
    if (e.target === dialogRef.current) onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn(drawerVariants({ side, size }), className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </dialog>
  );
});

export const DrawerHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function DrawerHeader(
  { className, ...rest }, ref,
) {
  return <header ref={ref} className={cn('hilal-drawer__header', className)} {...rest} />;
});

export const DrawerTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function DrawerTitle(
  { className, ...rest }, ref,
) {
  return <h2 ref={ref} className={cn('hilal-drawer__title', className)} {...rest} />;
});

export const DrawerBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DrawerBody(
  { className, ...rest }, ref,
) {
  return <div ref={ref} className={cn('hilal-drawer__body', className)} {...rest} />;
});

export const DrawerFooter = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function DrawerFooter(
  { className, ...rest }, ref,
) {
  return <footer ref={ref} className={cn('hilal-drawer__footer', className)} {...rest} />;
});

export const DrawerClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function DrawerClose({ className, children, 'aria-label': ariaLabel = 'Close', ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn('hilal-drawer__close', className)}
        {...rest}
      >
        {children ?? '×'}
      </button>
    );
  },
);
