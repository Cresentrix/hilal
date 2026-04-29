import {
  forwardRef, useEffect, useImperativeHandle, useRef,
  type DialogHTMLAttributes, type HTMLAttributes, type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const modalVariants = cva('hilal-modal', {
  variants: {
    size: {
      sm: 'hilal-modal--sm', md: 'hilal-modal--md',
      lg: 'hilal-modal--lg', xl: 'hilal-modal--xl',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface ModalProps
  extends DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof modalVariants> {
  open: boolean;
  onClose?: () => void;
  /** Click on the backdrop closes the modal. Default true. */
  closeOnBackdrop?: boolean;
  children: ReactNode;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { open, onClose, closeOnBackdrop = true, size, className, children, ...rest },
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
      className={cn(modalVariants({ size }), className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </dialog>
  );
});

export const ModalHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function ModalHeader(
  { className, ...rest }, ref,
) {
  return <header ref={ref} className={cn('hilal-modal__header', className)} {...rest} />;
});

export const ModalTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function ModalTitle(
  { className, ...rest }, ref,
) {
  return <h2 ref={ref} className={cn('hilal-modal__title', className)} {...rest} />;
});

export const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ModalBody(
  { className, ...rest }, ref,
) {
  return <div ref={ref} className={cn('hilal-modal__body', className)} {...rest} />;
});

export const ModalFooter = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function ModalFooter(
  { className, ...rest }, ref,
) {
  return <footer ref={ref} className={cn('hilal-modal__footer', className)} {...rest} />;
});

export const ModalClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function ModalClose({ className, children, 'aria-label': ariaLabel = 'Close', ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn('hilal-modal__close', className)}
        {...rest}
      >
        {children ?? '×'}
      </button>
    );
  },
);
