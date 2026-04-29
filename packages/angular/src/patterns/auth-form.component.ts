import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalAuthMode = 'sign-in' | 'sign-up';

export interface HilalAuthFormValues {
  email: string;
  password: string;
  name?: string;
}

@Component({
  selector: 'hilal-auth-form',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="hilal-card hilal-card--elevated hilal-card--md hilal-auth-form">
      <header class="hilal-card__header">
        <div>
          <h1 class="hilal-auth-form__title">{{ title || (mode === 'sign-in' ? 'Sign in' : 'Create account') }}</h1>
          <p *ngIf="description" class="hilal-auth-form__desc">{{ description }}</p>
        </div>
      </header>
      <div class="hilal-card__body">
        <ng-content select="[hilalAuthSocial]"></ng-content>
        <div *ngIf="error" class="hilal-alert hilal-alert--danger" role="status">
          <div class="hilal-alert__body"><p class="hilal-alert__desc">{{ error }}</p></div>
        </div>
        <form (submit)="onSubmit($event)">
          <div *ngIf="collectName" class="hilal-field hilal-field--md">
            <label class="hilal-field__label" for="hilal-auth-name">Name</label>
            <div class="hilal-field__control">
              <input id="hilal-auth-name" class="hilal-input" type="text" autocomplete="name" required
                [value]="name" (input)="name = $any($event.target).value" />
            </div>
          </div>
          <div class="hilal-field hilal-field--md">
            <label class="hilal-field__label" for="hilal-auth-email">Email</label>
            <div class="hilal-field__control">
              <input id="hilal-auth-email" class="hilal-input" type="email" autocomplete="email" required
                [value]="email" (input)="email = $any($event.target).value" />
            </div>
          </div>
          <div class="hilal-field hilal-field--md">
            <label class="hilal-field__label" for="hilal-auth-password">Password</label>
            <div class="hilal-field__control">
              <input id="hilal-auth-password" class="hilal-input" type="password"
                [attr.autocomplete]="mode === 'sign-in' ? 'current-password' : 'new-password'"
                required [value]="password" (input)="password = $any($event.target).value" />
            </div>
          </div>
          <button type="submit" class="hilal-btn hilal-btn--primary hilal-btn--md" [disabled]="loading"
            [attr.data-state]="loading ? 'loading' : null">
            <span *ngIf="loading" class="hilal-btn__spinner" aria-hidden="true"></span>
            {{ submitLabel || (mode === 'sign-in' ? 'Sign in' : 'Create account') }}
          </button>
        </form>
      </div>
      <footer *ngIf="hasFooter" class="hilal-card__footer">
        <ng-content select="[hilalAuthFooter]"></ng-content>
      </footer>
    </article>
  `,
})
export class HilalAuthFormComponent {
  @Input() mode: HilalAuthMode = 'sign-in';
  @Input() title?: string;
  @Input() description?: string;
  @Input() submitLabel?: string;
  @Input() collectName = false;
  @Input() hasFooter = false;
  @Input() loading = false;
  @Input() error?: string;
  @Output() submitted = new EventEmitter<HilalAuthFormValues>();

  protected name = '';
  protected email = '';
  protected password = '';

  ngOnInit(): void {
    if (this.collectName === undefined) this.collectName = this.mode === 'sign-up';
  }

  protected onSubmit(e: Event): void {
    e.preventDefault();
    this.submitted.emit({
      email: this.email,
      password: this.password,
      name: this.collectName ? this.name : undefined,
    });
  }
}
