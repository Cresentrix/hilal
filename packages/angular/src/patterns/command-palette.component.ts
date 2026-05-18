import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ElementRef, ViewChild, ChangeDetectorRef,
} from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HilalCommandItem {
  id: string;
  label: string;
  hint?: string;
  shortcut?: string;
  keywords?: string[];
  group?: string;
  disabled?: boolean;
}

interface CommandGroup { key: string; items: HilalCommandItem[]; }

@Component({
  selector: 'hilal-command-palette',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dlg class="hilal-modal hilal-modal--md hilal-cmd-palette"
            (close)="onClose()" (click)="onBackdrop($event)">
      <div (keydown)="onKey($event)">
        <div class="hilal-cmd-palette__input-row">
          <span class="hilal-cmd-palette__search" aria-hidden="true">⌕</span>
          <input #input
                 type="text"
                 class="hilal-cmd-palette__input"
                 [value]="query"
                 [attr.placeholder]="placeholder"
                 aria-label="Search commands"
                 autocomplete="off"
                 spellcheck="false"
                 (input)="onQuery($any($event.target).value)" />
          <kbd class="hilal-cmd-palette__kbd">Esc</kbd>
        </div>
        <div class="hilal-modal__body hilal-cmd-palette__body">
          <div *ngIf="flat.length === 0" class="hilal-cmd-palette__empty">{{ emptyMessage }}</div>
          <ul *ngIf="flat.length > 0" class="hilal-cmd-palette__list" role="listbox">
            <li *ngFor="let g of groups">
              <div *ngIf="g.key" class="hilal-cmd-palette__group-heading">{{ g.key }}</div>
              <ul class="hilal-cmd-palette__list">
                <li *ngFor="let it of g.items; let i = index"
                    role="option"
                    [attr.aria-selected]="indexOf(it) === activeIndex"
                    [attr.aria-disabled]="it.disabled ? 'true' : null"
                    [attr.data-cmd-index]="indexOf(it)"
                    class="hilal-cmd-palette__row"
                    (mouseenter)="setActive(indexOf(it))"
                    (click)="commit(it)">
                  <span class="hilal-cmd-palette__icon-spacer"></span>
                  <div class="hilal-cmd-palette__col">
                    <div class="hilal-cmd-palette__label">{{ it.label }}</div>
                    <div *ngIf="it.hint" class="hilal-cmd-palette__hint">{{ it.hint }}</div>
                  </div>
                  <kbd *ngIf="it.shortcut" class="hilal-cmd-palette__kbd">{{ it.shortcut }}</kbd>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </dialog>
  `,
})
export class HilalCommandPaletteComponent implements OnChanges {
  @Input() open = false;
  @Input() items: HilalCommandItem[] = [];
  @Input() placeholder = 'Type a command or search…';
  @Input() emptyMessage = 'No matches.';
  @Input() groupOrder?: string[];
  @Output() openChange = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<HilalCommandItem>();

  @ViewChild('dlg', { static: true }) dlg!: ElementRef<HTMLDialogElement>;
  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  protected query = '';
  protected activeIndex = 0;
  protected flat: HilalCommandItem[] = [];
  protected groups: CommandGroup[] = [];

  constructor(private cdr: ChangeDetectorRef) { this.recompute(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['groupOrder']) this.recompute();
    if (changes['open']) {
      const d = this.dlg.nativeElement;
      if (this.open && !d.open) {
        this.query = '';
        this.activeIndex = 0;
        this.recompute();
        d.showModal();
        setTimeout(() => this.input.nativeElement.focus(), 0);
      }
      if (!this.open && d.open) d.close();
    }
  }

  protected indexOf(item: HilalCommandItem): number { return this.flat.indexOf(item); }

  protected onQuery(v: string): void {
    this.query = v;
    this.recompute();
    if (this.activeIndex >= this.flat.length) this.activeIndex = 0;
    this.cdr.markForCheck();
  }

  protected setActive(i: number): void {
    this.activeIndex = i;
    this.cdr.markForCheck();
  }

  protected onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown') { e.preventDefault(); this.move(1); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); this.move(-1); return; }
    if (e.key === 'Enter')     { e.preventDefault(); this.commit(this.flat[this.activeIndex]); return; }
  }

  private move(delta: number): void {
    if (this.flat.length === 0) return;
    this.activeIndex = (this.activeIndex + delta + this.flat.length) % this.flat.length;
    this.cdr.markForCheck();
  }

  protected commit(item: HilalCommandItem | undefined): void {
    if (!item || item.disabled) return;
    this.selected.emit(item);
    this.close();
  }

  protected close(): void {
    this.open = false;
    this.openChange.emit(false);
    if (this.dlg.nativeElement.open) this.dlg.nativeElement.close();
  }

  protected onClose(): void {
    if (this.open) {
      this.open = false;
      this.openChange.emit(false);
    }
  }

  protected onBackdrop(e: MouseEvent): void {
    if (e.target === this.dlg.nativeElement) this.close();
  }

  private recompute(): void {
    const q = this.query.toLowerCase().trim();
    const matched = this.items.filter((it) => {
      if (!q) return true;
      if (it.label.toLowerCase().includes(q)) return true;
      return (it.keywords ?? []).some((k) => k.toLowerCase().includes(q));
    });
    const map = new Map<string, HilalCommandItem[]>();
    for (const it of matched) {
      const k = it.group ?? '';
      const arr = map.get(k) ?? [];
      arr.push(it);
      map.set(k, arr);
    }
    const keys: string[] = [];
    if (this.groupOrder) for (const g of this.groupOrder) if (map.has(g)) keys.push(g);
    for (const k of map.keys()) if (!keys.includes(k)) keys.push(k);
    this.groups = keys.map((k) => ({ key: k, items: map.get(k)! }));
    this.flat = this.groups.flatMap((g) => g.items);
  }
}
