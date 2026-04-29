import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const avatarVariants = cva('hilal-avatar', {
  variants: {
    size: {
      xs: 'hilal-avatar--xs',
      sm: 'hilal-avatar--sm',
      md: 'hilal-avatar--md',
      lg: 'hilal-avatar--lg',
      xl: 'hilal-avatar--xl',
    },
  },
  defaultVariants: { size: 'md' },
});

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  status?: AvatarStatus;
  fallback?: ReactNode;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, initials, status, fallback, size, className, ...rest },
  ref,
) {
  const isInitials = !src && initials;
  return (
    <span
      ref={ref}
      className={cn(avatarVariants({ size }), isInitials && 'hilal-avatar--initials', className)}
      data-status={status}
      {...rest}
    >
      {src ? (
        <img className="hilal-avatar__img" src={src} alt={alt ?? ''} />
      ) : initials ? (
        initials
      ) : (
        fallback
      )}
    </span>
  );
});

export const AvatarGroup = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function AvatarGroup(
  { className, ...rest },
  ref,
) {
  return <span ref={ref} className={cn('hilal-avatar-group', className)} {...rest} />;
});
