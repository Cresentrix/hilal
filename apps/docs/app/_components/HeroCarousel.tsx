'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Button, Badge, Calendar, Avatar, Toggle } from '@hilal-ds/react';
import { StatsGrid, type StatItem } from '@hilal-ds/patterns';

const statItems: StatItem[] = [
  { id: '1', label: 'Revenue',      value: '$42,318', delta: '12.4%', trend: 'up',   hint: 'vs last week' },
  { id: '2', label: 'Active users', value: '8,204',   delta: '3.1%',  trend: 'up',   hint: 'vs last week' },
  { id: '3', label: 'Refund rate',  value: '0.42%',   delta: '0.05%', trend: 'down', hint: 'vs last week' },
];

interface Slide { label: string; element: ReactNode; }

const SLIDES: Slide[] = [
  {
    label: 'Buttons',
    element: (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button loading>Saving…</Button>
        <Badge tone="success">Live</Badge>
        <Badge tone="warning">Beta</Badge>
        <Badge tone="brand" size="md">12 new</Badge>
      </div>
    ),
  },
  {
    label: 'KPI grid',
    element: <div style={{ width: '100%', maxWidth: '40rem' }}><StatsGrid items={statItems} minColumnWidth="10rem" /></div>,
  },
  {
    label: 'Calendar',
    element: <Calendar mode="single" />,
  },
  {
    label: 'Forms',
    element: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
        <Toggle defaultChecked>Email notifications</Toggle>
        <Toggle>Beta features</Toggle>
        <Toggle defaultChecked size="sm">Compact mode</Toggle>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBlockStart: '0.5rem' }}>
          <Avatar initials="SA" size="md" status="online" />
          <Avatar initials="MM" size="md" status="busy" />
          <Avatar initials="JL" size="md" />
          <Avatar initials="KP" size="md" />
        </div>
      </div>
    ),
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="hero-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-carousel__stage" aria-live="polite">
        <div className="hero-carousel__label">{SLIDES[active].label}</div>
        <div className="hero-carousel__content">{SLIDES[active].element}</div>
      </div>
      <div className="hero-carousel__dots" role="tablist" aria-label="Showcase">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-label={s.label}
            aria-selected={active === i}
            className="hero-carousel__dot"
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
