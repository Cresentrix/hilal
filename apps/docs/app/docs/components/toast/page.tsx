'use client';

import { ToastProvider, useToast, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast({ tone: 'info',    title: 'Heads up',  description: 'Sync resumed.' })}>Info</Button>
      <Button onClick={() => toast({ tone: 'success', title: 'Saved',     description: 'Your changes are live.' })} variant="secondary">Success</Button>
      <Button onClick={() => toast({ tone: 'warning', title: 'Slow down', description: 'You are about to hit the limit.' })} variant="secondary">Warning</Button>
      <Button onClick={() => toast({ tone: 'danger',  title: 'Failed',    description: 'Connection lost.' })} variant="tertiary">Danger</Button>
    </div>
  );
}

function PersistentDemo() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ tone: 'warning', title: 'Action required', description: 'Click the × to dismiss.', durationMs: 0 })}>
      Show persistent toast
    </Button>
  );
}

export default function ToastPage() {
  return (
    <>
      <h1>Toast</h1>
      <p className="lede">
        Transient notification messages stacked in a corner of the viewport. Wrap your app in{' '}
        <code>ToastProvider</code> and call <code>useToast()</code> to enqueue messages.
      </p>

      <h2>Tones</h2>
      <FrameworkTabs
        preview={
          <ToastProvider position="top-end">
            <ToastDemo />
          </ToastProvider>
        }
        react={`<ToastProvider position="top-end">
  <App />
</ToastProvider>

// Inside any component:
const { toast } = useToast();
toast({ tone: 'success', title: 'Saved', description: '…' });
toast({ tone: 'info',    title: '…' });
toast({ tone: 'warning', title: '…' });
toast({ tone: 'danger',  title: '…' });`}
        angular={`<hilal-toast-region position="top-end"></hilal-toast-region>

// In a component:
this.toasts.push({ tone: 'success', title: 'Saved' });`}
        blade={`<x-hilal-toast-region position="top-end" />

// Triggered via flash session
@if (session('toast'))
  <script>window.dispatchEvent(new CustomEvent('hilal:toast', { detail: @json(session('toast')) }))</script>
@endif`}
      />

      <h2>Position</h2>
      <p>Six corners: <code>top-start</code>, <code>top</code>, <code>top-end</code>, <code>bottom-start</code>, <code>bottom</code>, <code>bottom-end</code>. Default is <code>bottom-end</code>.</p>
      <pre className="preview__code"><code>{`<ToastProvider position="top-start">…</ToastProvider>
<ToastProvider position="top">…</ToastProvider>
<ToastProvider position="top-end">…</ToastProvider>
<ToastProvider position="bottom-start">…</ToastProvider>
<ToastProvider position="bottom">…</ToastProvider>
<ToastProvider position="bottom-end">…</ToastProvider>`}</code></pre>

      <h2>Persistent toasts</h2>
      <p>Pass <code>durationMs=&#123;0&#125;</code> to skip auto-dismiss — the user closes it with the × button.</p>
      <FrameworkTabs
        preview={
          <ToastProvider position="top-end">
            <PersistentDemo />
          </ToastProvider>
        }
        react={`toast({
  tone: 'warning',
  title: 'Action required',
  description: 'Click the × to dismiss.',
  durationMs: 0,   // persistent
});`}
        angular={`this.toasts.push({
  tone: 'warning',
  title: 'Action required',
  durationMs: 0,
});`}
        blade={`session()->flash('toast', [
  'tone' => 'warning',
  'title' => 'Action required',
  'durationMs' => 0,
]);`}
      />

      <h2>Custom default duration</h2>
      <pre className="preview__code"><code>{`<ToastProvider defaultDurationMs={8000}>
  <App />
</ToastProvider>`}</code></pre>

      <h2>API</h2>
      <pre className="preview__code"><code>{`<ToastProvider>
  position             'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end'
                       default: 'bottom-end'
  defaultDurationMs    number   default: 5000   set 0 to disable auto-dismiss

useToast()
  toast(t)             enqueues a toast; returns its id
  dismiss(id)          removes a toast by id

Toast {
  tone           'info' | 'success' | 'warning' | 'danger'
  title          ReactNode
  description    ReactNode
  icon           ReactNode
  durationMs     number   per-toast override; 0 = persistent
}`}</code></pre>
      <Accessibility
        summary={<>Toast region uses <code>{"role=\"region\""}</code> with <code>{"aria-label=\"Notifications\""}</code>. Each toast uses <code>{"role=\"status\""}</code> (assertive for <code>{"danger"}</code>) so screen readers announce new toasts as they arrive.</>}
        keys={[
                {
                        "keys": "Tab",
                        "action": "Focus the dismiss button on a visible toast"
                },
                {
                        "keys": "Enter / Space",
                        "action": "Dismiss the focused toast"
                }
        ]}
      />
    </>
  );
}
