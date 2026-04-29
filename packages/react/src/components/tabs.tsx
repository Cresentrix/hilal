import {
  createContext, useContext, useId, useRef, useState, useCallback,
  forwardRef, type HTMLAttributes, type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

type Orientation = 'horizontal' | 'vertical';

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
  orientation: Orientation;
  baseId: string;
}
const TabsContext = createContext<TabsCtx | null>(null);
function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>');
  return ctx;
}

const tabsVariants = cva('hilal-tabs', {
  variants: {
    variant: { line: '', enclosed: 'hilal-tabs--enclosed', pill: 'hilal-tabs--pill' },
    size:    { sm: 'hilal-tabs--sm', md: '' },
  },
  defaultVariants: { variant: 'line', size: 'md' },
});

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    VariantProps<typeof tabsVariants> {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: Orientation;
  children: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { defaultValue = '', value, onChange, orientation = 'horizontal', variant, size, className, children, ...rest },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const setValue = useCallback(
    (v: string) => { onChange?.(v); if (value === undefined) setInternal(v); },
    [onChange, value],
  );
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ value: current, setValue, orientation, baseId }}>
      <div ref={ref} className={cn(tabsVariants({ variant, size }), className)} data-orientation={orientation} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TabList(
  { className, onKeyDown, ...rest },
  ref,
) {
  const { orientation } = useTabs();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const tabs = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? []);
    const idx = tabs.findIndex((t) => t === document.activeElement);
    const next =
      orientation === 'horizontal' && (e.key === 'ArrowRight') ? idx + 1 :
      orientation === 'horizontal' && (e.key === 'ArrowLeft')  ? idx - 1 :
      orientation === 'vertical'   && (e.key === 'ArrowDown')  ? idx + 1 :
      orientation === 'vertical'   && (e.key === 'ArrowUp')    ? idx - 1 :
      e.key === 'Home' ? 0 :
      e.key === 'End'  ? tabs.length - 1 :
      -2;
    if (next === -2) return;
    e.preventDefault();
    const target = tabs[(next + tabs.length) % tabs.length];
    target?.focus();
    target?.click();
  };

  return (
    <div
      ref={(node) => {
        listRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      role="tablist"
      className={cn('hilal-tabs__list', className)}
      onKeyDown={handleKey}
      {...rest}
    />
  );
});

export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
  disabled?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled, className, children, onClick, ...rest },
  ref,
) {
  const { value: current, setValue, baseId } = useTabs();
  const selected = current === value;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={cn('hilal-tabs__tab', className)}
      onClick={(e) => { onClick?.(e); if (!disabled) setValue(value); }}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, className, ...rest },
  ref,
) {
  const { value: current, baseId } = useTabs();
  if (current !== value) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn('hilal-tabs__panel', className)}
      {...rest}
    />
  );
});
