import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ElementRef, ViewChild, computed,
} from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hilal-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dlg [class]="classes()" (close)="onClose()" (click)="onBackdrop($event)">
      <header class="hilal-modal__header">
        <h2 class="hilal-modal__title">{{ title }}</h2>
        <button type="button" class="hilal-modal__close" aria-label="Close" (click)="dismiss()">×</button>
      </header>
      <div class="hilal-modal__body">{{ description }}<ng-content></ng-content></div>
      <footer class="hilal-modal__footer">
        <button type="button" class="hilal-btn hilal-btn--tertiary hilal-btn--md" [disabled]="loading" (click)="dismiss()">{{ cancelLabel }}</button>
        <button type="button"
          class="hilal-btn hilal-btn--primary hilal-btn--md"
          [style.background]="destructive ? 'var(--hilal-status-error)' : null"
          [disabled]="loading"
          [attr.data-state]="loading ? 'loading' : null"
          (click)="onConfirm()">
          <span *ngIf="loading" class="hilal-btn__spinner" aria-hidden="true"></span>
          {{ confirmLabel }}
        </button>
      </footer>
    </dialog>
  `,
})
export class HilalConfirmDialogComponent implements OnChanges {
  @Input() open = false;
  @Input() title = '';
  @Input() description?: string;
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';
  @Input() destructive = false;
  @Input() size: 'sm' | 'md' = 'sm';
  @Input() loading = false;
  @Input() closeOnBackdrop = true;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<void>();

  @ViewChild('dlg', { static: true }) dlg!: ElementRef<HTMLDialogElement>;

  protected readonly classes = computed(() => `hilal-modal hilal-modal--${this.size}`);

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
  protected onBackdrop(e: MouseEvent): void {
    if (this.closeOnBackdrop && e.target === this.dlg.nativeElement) this.dismiss();
  }
  dismiss(): void { this.dlg.nativeElement.close(); }
  protected onConfirm(): void { this.confirmed.emit(); }
}
