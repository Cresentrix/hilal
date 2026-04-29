import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const cardVariants = cva('hilal-card', {
  variants: {
    variant: {
      default:  'hilal-card--default',
      elevated: 'hilal-card--elevated',
      outlined: 'hilal-card--outlined',
      ghost:    'hilal-card--ghost',
    },
    padding: {
      none: '',
      sm: 'hilal-card--sm',
      md: 'hilal-card--md',
      lg: 'hilal-card--lg',
    },
    interactive: { true: 'hilal-card--interactive', false: '' },
  },
  defaultVariants: { variant: 'default', padding: 'md', interactive: false },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant, padding, interactive, className, ...rest },
  ref,
) {
  return <article ref={ref} className={cn(cardVariants({ variant, padding, interactive }), className)} {...rest} />;
});

export const CardHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function CardHeader(
  { className, ...rest },
  ref,
) {
  return <header ref={ref} className={cn('hilal-card__header', className)} {...rest} />;
});

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardBody(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn('hilal-card__body', className)} {...rest} />;
});

export const CardFooter = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function CardFooter(
  { className, ...rest },
  ref,
) {
  return <footer ref={ref} className={cn('hilal-card__footer', className)} {...rest} />;
});
