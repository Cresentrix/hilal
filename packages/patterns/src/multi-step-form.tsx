import {
  useState, type FormEvent, type ReactNode,
} from 'react';
import { Stepper, Button, type StepItem } from '@hilal-ds/react';
import { cn } from './utils/cn.js';

export interface MultiStepFormStep {
  /** Label shown in the Stepper. */
  label: ReactNode;
  /** Step body content. */
  content: ReactNode;
  /** Optional validation hook. Return false (or a Promise resolving false) to block 'next'. */
  validate?: () => boolean | Promise<boolean>;
  /** Hide this step's Next button — useful when the step itself owns its primary CTA. */
  hideNext?: boolean;
}

export interface MultiStepFormProps {
  steps: MultiStepFormStep[];
  /** Controlled active step index. If omitted, the component manages it internally. */
  step?: number;
  /** Called when active step changes. Required if `step` is provided (controlled mode). */
  onStepChange?: (next: number) => void;
  /** Initial step in uncontrolled mode. Default 0. */
  defaultStep?: number;
  /** Called when the final step's Next is pressed. May return a promise. */
  onSubmit?: () => void | Promise<void>;
  /** Stepper orientation. Default 'horizontal'. */
  orientation?: 'horizontal' | 'vertical';
  /** Labels for navigation buttons. */
  nextLabel?: string;
  backLabel?: string;
  submitLabel?: string;
  /** Replace the default footer entirely. Receives controls + state. */
  renderFooter?: (controls: MultiStepFormFooterControls) => ReactNode;
  className?: string;
}

export interface MultiStepFormFooterControls {
  step: number;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  goBack: () => void;
  goNext: () => Promise<void>;
}

/**
 * MultiStepForm — Stepper + content area + footer with back/next/submit.
 * - Works controlled (`step` + `onStepChange`) or uncontrolled (`defaultStep`).
 * - `validate` on a step blocks advancement when it returns false.
 * - The last step's Next becomes Submit and calls `onSubmit`.
 */
export function MultiStepForm({
  steps,
  step: stepProp,
  onStepChange,
  defaultStep = 0,
  onSubmit,
  orientation = 'horizontal',
  nextLabel = 'Next',
  backLabel = 'Back',
  submitLabel = 'Submit',
  renderFooter,
  className,
}: MultiStepFormProps) {
  const isControlled = stepProp !== undefined;
  const [internal, setInternal] = useState(defaultStep);
  const step = isControlled ? stepProp! : internal;
  const setStep = (next: number) => {
    if (!isControlled) setInternal(next);
    onStepChange?.(next);
  };
  const [submitting, setSubmitting] = useState(false);

  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  const current = steps[step];

  const goBack = () => { if (!isFirst) setStep(step - 1); };

  const goNext = async () => {
    if (current?.validate) {
      const ok = await current.validate();
      if (!ok) return;
    }
    if (isLast) {
      if (!onSubmit) return;
      setSubmitting(true);
      try { await onSubmit(); } finally { setSubmitting(false); }
      return;
    }
    setStep(step + 1);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void goNext();
  };

  const stepperItems: StepItem[] = steps.map((s, i) => ({
    label: s.label,
    status: i < step ? 'complete' : i === step ? 'current' : 'upcoming',
  }));

  const controls: MultiStepFormFooterControls = {
    step, isFirst, isLast, isSubmitting: submitting, goBack, goNext,
  };

  return (
    <form onSubmit={handleFormSubmit} className={cn(className)} style={rootStyle}>
      <Stepper steps={stepperItems} orientation={orientation} />
      <div style={contentStyle}>{current?.content}</div>
      {renderFooter ? (
        renderFooter(controls)
      ) : (
        <div style={footerStyle}>
          <Button type="button" variant="tertiary" onClick={goBack} disabled={isFirst || submitting}>
            {backLabel}
          </Button>
          {!current?.hideNext ? (
            <Button type="submit" loading={submitting}>
              {isLast ? submitLabel : nextLabel}
            </Button>
          ) : null}
        </div>
      )}
    </form>
  );
}

const rootStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--hilal-spacing-6)',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--hilal-spacing-4)',
} as const;

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--hilal-spacing-3)',
  paddingBlockStart: 'var(--hilal-spacing-4)',
  borderBlockStart: '1px solid var(--hilal-border-subtle)',
} as const;
