import { forwardRef, type HTMLAttributes, type DetailsHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const accordionVariants = cva('hilal-accordion', {
  variants: {
    variant: {
      default:   '',
      bordered:  'hilal-accordion--bordered',
      separated: 'hilal-accordion--separated',
    },
  },
  defaultVariants: { variant: 'default' },
});

export interface AccordionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { variant, className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(accordionVariants({ variant }), className)} {...rest} />;
});

export interface AccordionItemProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> {
  title: ReactNode;
}

export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(function AccordionItem(
  { title, className, children, ...rest },
  ref,
) {
  return (
    <details ref={ref} className={cn('hilal-accordion__item', className)} {...rest}>
      <summary className="hilal-accordion__trigger">{title}</summary>
      <div className="hilal-accordion__content">{children}</div>
    </details>
  );
});
