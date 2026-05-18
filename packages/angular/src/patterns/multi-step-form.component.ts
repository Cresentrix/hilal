import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ContentChildren, QueryList, TemplateRef, Directive, ChangeDetectorRef,
} from '@angular/core';
import type { AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HilalStepperComponent, type HilalStepItem } from '../components/stepper.component.js';

@Directive({ selector: '[hilalMultiStepStep]', standalone: true })
export class HilalMultiStepStepDirective {
  @Input('hilalMultiStepStep') label = '';
  @Input() hideNext = false;
  /** Validation hook. Return false to block 'next'. May be sync or async. */
  @Input() validate?: () => boolean | Promise<boolean>;
  constructor(public template: TemplateRef<unknown>) {}
}

@Component({
  selector: 'hilal-multi-step-form',
  standalone: true,
  imports: [CommonModule, HilalStepperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="hilal-multi-step" (submit)="onSubmit($event)">
      <hilal-stepper [steps]="stepperItems()" [orientation]="orientation"></hilal-stepper>
      <div class="hilal-multi-step__content">
        <ng-container *ngIf="currentStep() as cs">
          <ng-container *ngTemplateOutlet="cs.template"></ng-container>
        </ng-container>
      </div>
      <div class="hilal-multi-step__footer">
        <button type="button" class="hilal-btn hilal-btn--tertiary hilal-btn--md"
                [disabled]="isFirst() || submitting"
                (click)="goBack()">
          {{ backLabel }}
        </button>
        <button *ngIf="!currentStep()?.hideNext"
                type="submit"
                class="hilal-btn hilal-btn--primary hilal-btn--md"
                [attr.data-state]="submitting ? 'loading' : null"
                [disabled]="submitting">
          <span *ngIf="submitting" class="hilal-btn__spinner" aria-hidden="true"></span>
          {{ isLast() ? submitLabel : nextLabel }}
        </button>
      </div>
    </form>
  `,
})
export class HilalMultiStepFormComponent implements AfterContentInit {
  @Input() step = 0;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nextLabel = 'Next';
  @Input() backLabel = 'Back';
  @Input() submitLabel = 'Submit';
  @Output() stepChange = new EventEmitter<number>();
  @Output() submitted = new EventEmitter<void>();

  @ContentChildren(HilalMultiStepStepDirective)
  protected stepDirectives!: QueryList<HilalMultiStepStepDirective>;

  protected submitting = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.stepDirectives.changes.subscribe(() => this.cdr.markForCheck());
  }

  protected steps(): HilalMultiStepStepDirective[] {
    return this.stepDirectives ? this.stepDirectives.toArray() : [];
  }

  protected currentStep(): HilalMultiStepStepDirective | undefined {
    return this.steps()[this.step];
  }

  protected isFirst(): boolean { return this.step === 0; }
  protected isLast(): boolean { return this.step === this.steps().length - 1; }

  protected stepperItems(): HilalStepItem[] {
    return this.steps().map((s, i) => ({
      label: s.label,
      status: i < this.step ? 'complete' : i === this.step ? 'current' : 'upcoming',
    }));
  }

  protected goBack(): void {
    if (this.isFirst()) return;
    this.step = this.step - 1;
    this.stepChange.emit(this.step);
  }

  protected async onSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const cs = this.currentStep();
    if (cs?.validate) {
      const ok = await cs.validate();
      if (!ok) return;
    }
    if (this.isLast()) {
      this.submitting = true;
      this.cdr.markForCheck();
      try {
        // Consumer reacts to 'submitted' and may toggle submitting via input afterwards if needed.
        this.submitted.emit();
      } finally {
        this.submitting = false;
        this.cdr.markForCheck();
      }
      return;
    }
    this.step = this.step + 1;
    this.stepChange.emit(this.step);
    this.cdr.markForCheck();
  }
}
