import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About' };

const ITEMS = [
  { slug: 'why',      name: 'Why Hilal',  hint: 'The problem Hilal solves and when not to use it.' },
  { slug: 'faq',      name: 'FAQ',        hint: 'Short answers to common questions.' },
  { slug: 'compare',  name: 'Compared',   hint: 'How Hilal differs from shadcn, Radix, and Mantine.' },
  { slug: 'roadmap',  name: 'Roadmap',    hint: 'What’s in flight and what’s next.' },
  { slug: 'showcase', name: 'Showcase',   hint: 'Real products built with Hilal.' },
];

export default function AboutIndex() {
  return (
    <>
      <h1>About</h1>
      <p className="lede">Positioning, history, and how Hilal compares to the alternatives.</p>
      <div className="card-grid">
        {ITEMS.map((it) => (
          <Link key={it.slug} href={`/docs/about/${it.slug}`}>
            <div className="card-grid__title">{it.name}</div>
            <div className="card-grid__hint">{it.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
