import type { ReactNode } from 'react';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function stringChildren(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(stringChildren).join('');
  return '';
}

interface Props { children: ReactNode; slug?: string; }

function HeadingBase({ as: Tag, children, slug }: Props & { as: 'h2' | 'h3' }) {
  const text = stringChildren(children);
  const id = slug ?? slugify(text);
  // Render the <a> as a sibling text node inside the heading. Because this
  // is rendered server-side, hydration sees identical markup on both sides
  // — no Next 16 hydration warnings.
  return (
    <Tag id={id} className="doc-heading">
      {children}
      {id ? (
        <a className="doc-heading__anchor" href={`#${id}`} aria-label={`Link to ${text || 'section'}`}>
          #
        </a>
      ) : null}
    </Tag>
  );
}

export function H2(props: Props) { return <HeadingBase as="h2" {...props} />; }
export function H3(props: Props) { return <HeadingBase as="h3" {...props} />; }
