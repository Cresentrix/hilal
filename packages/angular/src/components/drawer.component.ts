import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ElementRef, ViewChild, computed,
} from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalDrawerSide = 'start' | 'end' | 'top' | 'bottom';
export type HilalDrawerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'hilal-drawer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dlg [class]="classes()" (close)="onClose()" (click)="onBackdropClick($event)">
      <header class="hilal-drawer__header" *ngIf="title">
        <h2 class="hilal-drawer__title">{{ title }}</h2>
        <button type="button" class="hilal-drawer__close" aria-label="Close" (click)="close()">×</button>
      </header>
      <div class="hilal-drawer__body">
        <ng-content></ng-content>
      </div>
      <footer class="hilal-drawer__footer" *ngIf="hasFooter">
        <ng-content select="[hilalDrawerFooter]"></ng-content>
      </footer>
    </dialog>
  `,
})
export class HilalDrawerComponent implements OnChanges {
  @Input() open = false;
  @Input() side: HilalDrawerSide = 'end';
  @Input() size: HilalDrawerSize = 'md';
  @Input() title?: string;
  @Input() hasFooter = false;
  @Input() closeOnBackdrop = true;
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dlg', { static: true }) dlg!: ElementRef<HTMLDialogElement>;

  protected readonly classes = computed(() => `hilal-drawer hilal-drawer--${this.side} hilal-drawer--${this.size}`);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      const d = this.dlg.nativeElement;
      if (this.open && !d.open) d.showModal();
      if (!this.open && d.open) d.close();
    }
  }

  protected onClose(): void {
    if (this.open) {
      this.open = false;
      this.openChange.emit(false);
    }
  }

  protected onBackdropClick(e: MouseEvent): void {
    if (!this.closeOnBackdrop) return;
    if (e.target === this.dlg.nativeElement) this.close();
  }

  close(): void {
    this.dlg.nativeElement.close();
  }
}
