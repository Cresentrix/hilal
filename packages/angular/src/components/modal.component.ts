import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ElementRef, ViewChild, computed,
} from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'hilal-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dlg [class]="classes()" (close)="onClose()" (click)="onBackdropClick($event)">
      <header class="hilal-modal__header" *ngIf="title">
        <h2 class="hilal-modal__title">{{ title }}</h2>
        <button type="button" class="hilal-modal__close" aria-label="Close" (click)="close()">×</button>
      </header>
      <div class="hilal-modal__body">
        <ng-content></ng-content>
      </div>
      <footer class="hilal-modal__footer" *ngIf="hasFooter">
        <ng-content select="[hilalModalFooter]"></ng-content>
      </footer>
    </dialog>
  `,
})
export class HilalModalComponent implements OnChanges {
  @Input() open = false;
  @Input() size: HilalModalSize = 'md';
  @Input() title?: string;
  @Input() hasFooter = false;
  @Input() closeOnBackdrop = true;
  @Output() openChange = new EventEmitter<boolean>();

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

  protected onBackdropClick(e: MouseEvent): void {
    if (!this.closeOnBackdrop) return;
    if (e.target === this.dlg.nativeElement) this.close();
  }

  close(): void {
    this.dlg.nativeElement.close();
  }
}
