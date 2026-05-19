import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Foundations' };

const ITEMS = [
  { slug: 'colors',     name: 'Colors',     hint: 'Semantic aliases, brand palette, status colors.' },
  { slug: 'typography', name: 'Typography', hint: 'Size scale, weights, line-heights, Latin + Arabic stacks.' },
  { slug: 'spacing',    name: 'Spacing',    hint: 'Base-4 spacing scale used by every component.' },
  { slug: 'radius',     name: 'Radius',     hint: 'Corner-radius scale, from sm to full.' },
  { slug: 'elevation',  name: 'Elevation',  hint: 'Box-shadow stack and a dedicated focus ring.' },
  { slug: 'motion',     name: 'Motion',     hint: 'Duration and easing curves used across components.' },
  { slug: 'theming',    name: 'Theming',    hint: 'Brand customization with a live color picker.' },
];

export default function FoundationsIndex() {
  return (
    <>
      <h1>Foundations</h1>
      <p className="lede">
        The token system. Every component reads from these CSS variables — change one value and
        every primitive, pattern, and page updates together.
      </p>
      <div className="card-grid">
        {ITEMS.map((it) => (
          <Link key={it.slug} href={`/docs/foundations/${it.slug}`}>
            <div className="card-grid__title">{it.name}</div>
            <div className="card-grid__hint">{it.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
