import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ElementRef, HostListener, signal, computed, inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HilalComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'hilal-combobox',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="fieldClasses()" [attr.data-state]="state()">
      <label *ngIf="label" class="hilal-field__label" [attr.for]="inputId">{{ label }}</label>
      <div class="hilal-field__control hilal-combobox__control">
        <input
          class="hilal-input hilal-combobox__input"
          [id]="inputId"
          role="combobox"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="inputId + '-listbox'"
          aria-autocomplete="list"
          [placeholder]="placeholder"
          [value]="query()"
          [disabled]="disabled"
          (input)="onInput($event)"
          (focus)="open.set(true)"
          (keydown)="onKey($event)"
        />
        <span class="hilal-select__chevron" aria-hidden="true">▾</span>
      </div>
      <ul *ngIf="open() && !disabled" [id]="inputId + '-listbox'" class="hilal-combobox__listbox" role="listbox">
        <li *ngIf="filtered().length === 0" class="hilal-combobox__empty">{{ emptyMessage }}</li>
        <li *ngFor="let opt of filtered(); let i = index"
          [id]="inputId + '-listbox-' + i"
          role="option"
          [attr.aria-selected]="opt.value === value"
          [attr.aria-disabled]="opt.disabled"
          [class]="optionClass(i)"
          (mousedown)="$event.preventDefault(); commit(opt)"
          (mouseenter)="activeIndex.set(i)"
        >{{ opt.label }}</li>
      </ul>
      <p *ngIf="message()" class="hilal-field__hint">{{ message() }}</p>
    </div>
  `,
})
export class HilalComboboxComponent {
  @Input() options: HilalComboboxOption[] = [];
  @Input() value = '';
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() placeholder = 'Select…';
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() emptyMessage = 'No results';
  @Input() inputId = `hilal-cb-${Math.random().toString(36).slice(2, 9)}`;
  @Output() valueChange = new EventEmitter<string>();

  protected readonly query = signal('');
  protected readonly open = signal(false);
  protected readonly activeIndex = signal(0);

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly fieldClasses = computed(
    () => `hilal-field hilal-combobox hilal-field--${this.size}`,
  );
  protected readonly state = computed(() =>
    this.error ? 'error' : this.disabled ? 'disabled' : 'default',
  );
  protected readonly message = computed(() => this.error ?? this.hint ?? '');

  protected readonly filtered = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.options;
    return this.options.filter((o) => o.label.toLowerCase().includes(q));
  });

  ngOnInit(): void {
    const sel = this.options.find((o) => o.value === this.value);
    this.query.set(sel?.label ?? '');
  }

  protected onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.query.set(v);
    this.open.set(true);
    this.activeIndex.set(0);
  }

  protected onKey(e: KeyboardEvent): void {
    const list = this.filtered();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.open.set(true);
      this.activeIndex.update((i) => Math.min(i + 1, list.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex.update((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = list[this.activeIndex()];
      if (opt) this.commit(opt);
    } else if (e.key === 'Escape') {
      this.open.set(false);
    }
  }

  protected commit(opt: HilalComboboxOption): void {
    if (opt.disabled) return;
    this.value = opt.value;
    this.query.set(opt.label);
    this.open.set(false);
    this.valueChange.emit(opt.value);
  }

  protected optionClass(i: number): string {
    return i === this.activeIndex()
      ? 'hilal-combobox__option hilal-combobox__option--active'
      : 'hilal-combobox__option';
  }

  @HostListener('document:mousedown', ['$event'])
  protected onDocClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target as Node)) this.open.set(false);
  }
}
