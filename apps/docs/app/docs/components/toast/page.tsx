'use client';

import { ToastProvider, useToast, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

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

export default function ToastPage() {
  return (
    <>
      <h1>Toast</h1>
      <p className="lede">
        Transient notification messages stacked in a corner of the viewport. Wrap your app in{' '}
        <code>ToastProvider</code>; trigger via the <code>useToast</code> hook.
      </p>

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
toast({ tone: 'success', title: 'Saved', description: 'Your changes are live.' });`}
        angular={`// Provider lives at the app root:
<hilal-toast-region position="top-end"></hilal-toast-region>

// Inside any component:
constructor(private toasts: HilalToastService) {}
this.toasts.push({ tone: 'success', title: 'Saved', description: '…' });`}
        blade={`{{-- Layout root --}}
<x-hilal-toast-region position="top-end" />

{{-- Push via Alpine event or controller flash --}}
@if (session()->has('flash'))
  <script>window.dispatchEvent(new CustomEvent('hilal:toast', { detail: @json(session('flash')) }))</script>
@endif`}
      />
    </>
  );
}
