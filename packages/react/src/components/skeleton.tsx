import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const skeletonVariants = cva('hilal-skeleton', {
  variants: {
    variant: {
      rectangle: '',
      text:      'hilal-skeleton--text',
      circle:    'hilal-skeleton--circle',
    },
  },
  defaultVariants: { variant: 'rectangle' },
});

export interface SkeletonProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof skeletonVariants> {
  /** Width override (any CSS length). */
  width?: number | string;
  /** Height override (any CSS length). */
  height?: number | string;
  /** Convenience for circle size. */
  size?: number | string;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { variant, width, height, size, style, className, ...rest },
  ref,
) {
  const merged: CSSProperties = {
    ...(width !== undefined  && { inlineSize: width }),
    ...(height !== undefined && { blockSize:  height }),
    ...(size !== undefined   && { ['--size' as keyof CSSProperties]: size as string }),
    ...style,
  };
  return <span ref={ref} className={cn(skeletonVariants({ variant }), className)} style={merged} aria-hidden {...rest} />;
});
