import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Guides' };

const ITEMS = [
  { slug: 'build-your-own', name: 'Build your own component', hint: 'Extend Hilal with your own primitives that match its style.' },
];

export default function GuidesIndex() {
  return (
    <>
      <h1>Guides</h1>
      <p className="lede">Longer-form walkthroughs for going beyond the built-in components.</p>
      <div className="card-grid">
        {ITEMS.map((it) => (
          <Link key={it.slug} href={`/docs/guides/${it.slug}`}>
            <div className="card-grid__title">{it.name}</div>
            <div className="card-grid__hint">{it.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
