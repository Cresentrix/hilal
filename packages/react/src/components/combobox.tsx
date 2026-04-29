import {
  forwardRef, useId, useState, useRef, useEffect, useMemo, useCallback,
  type KeyboardEvent, type HTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const fieldVariants = cva('hilal-field hilal-combobox', {
  variants: { size: { sm: 'hilal-field--sm', md: 'hilal-field--md', lg: 'hilal-field--lg' } },
  defaultVariants: { size: 'md' },
});

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof fieldVariants> {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Custom filter. Defaults to case-insensitive substring on label. */
  filter?: (option: ComboboxOption, query: string) => boolean;
  /** Shown when filtered list is empty. */
  emptyMessage?: string;
}

const defaultFilter = (option: ComboboxOption, query: string): boolean =>
  option.label.toLowerCase().includes(query.toLowerCase());

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(function Combobox(
  {
    options, value, onChange, label, hint, error, placeholder = 'Select…',
    size, disabled, filter = defaultFilter, emptyMessage = 'No results',
    className, id, ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const [query, setQuery] = useState(selected?.label ?? '');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(selected?.label ?? ''); }, [selected]);

  const filtered = useMemo(
    () => (open && query !== (selected?.label ?? '') ? options.filter((o) => filter(o, query)) : options),
    [options, filter, query, open, selected],
  );

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const commit = useCallback((opt: ComboboxOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setQuery(opt.label);
    setOpen(false);
    inputRef.current?.focus();
  }, [onChange]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filtered[activeIndex];
      if (opt) commit(opt);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery(selected?.label ?? '');
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  const state = error ? 'error' : disabled ? 'disabled' : 'default';
  const message = error ?? hint;

  return (
    <div ref={(node) => { wrapRef.current = node; if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }}
      className={cn(fieldVariants({ size }), className)} data-state={state} {...rest}>
      {label ? <label className="hilal-field__label" htmlFor={inputId}>{label}</label> : null}
      <div className="hilal-field__control hilal-combobox__control">
        <input
          ref={inputRef}
          id={inputId}
          className="hilal-input hilal-combobox__input"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={open && filtered[activeIndex] ? `${listboxId}-${activeIndex}` : undefined}
          placeholder={placeholder}
          value={query}
          disabled={disabled}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIndex(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
        />
        <span className="hilal-select__chevron" aria-hidden>▾</span>
      </div>
      {open && !disabled ? (
        <ul id={listboxId} className="hilal-combobox__listbox" role="listbox">
          {filtered.length === 0 ? (
            <li className="hilal-combobox__empty">{emptyMessage}</li>
          ) : (
            filtered.map((opt, i) => (
              <li
                key={opt.value}
                id={`${listboxId}-${i}`}
                role="option"
                aria-selected={opt.value === value}
                aria-disabled={opt.disabled}
                className={cn(
                  'hilal-combobox__option',
                  i === activeIndex && 'hilal-combobox__option--active',
                )}
                onMouseDown={(e) => { e.preventDefault(); commit(opt); }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      ) : null}
      {message ? <p className="hilal-field__hint">{message}</p> : null}
    </div>
  );
});
