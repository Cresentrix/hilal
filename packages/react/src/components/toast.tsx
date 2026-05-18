import {
  createContext, useContext, useState, useCallback, useEffect, useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../utils/cn.js';

export type ToastTone = 'info' | 'success' | 'warning' | 'danger';
export type ToastPosition = 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end';

export interface Toast {
  id: string;
  tone?: ToastTone;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  durationMs?: number;
}

interface ToastContextValue {
  toast: (t: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

export interface ToastProviderProps {
  position?: ToastPosition;
  children: ReactNode;
  /** Defaults to 5000ms. Set 0 for persistent toasts. */
  defaultDurationMs?: number;
}

export function ToastProvider({
  position = 'bottom-end', children, defaultDurationMs = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) { clearTimeout(t); timers.current.delete(id); }
  }, []);

  const toast = useCallback((t: Omit<Toast, 'id'>): string => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const duration = t.durationMs ?? defaultDurationMs;
    setToasts((prev) => [...prev, { ...t, id }]);
    if (duration > 0) {
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
    }
    return id;
  }, [defaultDurationMs, dismiss]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  // Gate the portal on a mounted flag so SSR and the first client render
  // both yield null (no DOM); the portal only appears after hydration.
  // Without this, createPortal renders into document.body on the first
  // client pass and React flags the mismatch against the server output.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const region = mounted
    ? createPortal(
        <div className="hilal-toast-region" data-position={position} role="region" aria-label="Notifications">
          {toasts.map((t) => (
            <div key={t.id} className={cn('hilal-toast', t.tone && `hilal-toast--${t.tone}`)} role="status">
              {t.icon ? <span className="hilal-toast__icon" aria-hidden>{t.icon}</span> : null}
              <div className="hilal-toast__body">
                {t.title       ? <p className="hilal-toast__title">{t.title}</p> : null}
                {t.description ? <p className="hilal-toast__desc">{t.description}</p> : null}
              </div>
              <button type="button" className="hilal-toast__close" aria-label="Dismiss" onClick={() => dismiss(t.id)}>×</button>
            </div>
          ))}
        </div>,
        document.body,
      )
    : null;

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {region}
    </ToastContext.Provider>
  );
}
