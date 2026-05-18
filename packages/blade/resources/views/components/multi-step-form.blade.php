@props([
  'steps' => [],
  'step' => 0,
  'orientation' => 'horizontal',
  'nextLabel' => 'Next',
  'backLabel' => 'Back',
  'submitLabel' => 'Submit',
  'action' => null,
  'method' => 'POST',
])

@php $count = count($steps); @endphp

<form
  class="hilal-multi-step"
  @if($action) action="{{ $action }}" @endif
  method="{{ $method }}"
  x-data="{ step: {{ (int) $step }}, count: {{ $count }} }"
>
  <ol class="hilal-stepper" data-orientation="{{ $orientation }}">
    @foreach($steps as $i => $s)
      <li
        class="hilal-stepper__step"
        :data-status="step > {{ $i }} ? 'complete' : (step === {{ $i }} ? 'current' : 'upcoming')"
        :aria-current="step === {{ $i }} ? 'step' : null"
      >
        <span class="hilal-stepper__indicator" aria-hidden="true">
          <template x-if="step > {{ $i }}">✓</template>
          <template x-if="step <= {{ $i }}">{{ $i + 1 }}</template>
        </span>
        <span class="hilal-stepper__label">{{ $s['label'] }}</span>
      </li>
    @endforeach
  </ol>

  <div class="hilal-multi-step__content">
    @foreach($steps as $i => $s)
      @php $slotName = 'step' . $i; @endphp
      <div x-show="step === {{ $i }}" x-cloak>
        @if(isset(${$slotName}))
          {{ ${$slotName} }}
        @endif
      </div>
    @endforeach
  </div>

  <div class="hilal-multi-step__footer">
    <button
      type="button"
      class="hilal-btn hilal-btn--tertiary hilal-btn--md"
      :disabled="step === 0"
      @click="if (step > 0) step--"
    >{{ $backLabel }}</button>
    <button
      type="button"
      class="hilal-btn hilal-btn--primary hilal-btn--md"
      x-show="step < count - 1"
      @click="step++"
    >{{ $nextLabel }}</button>
    <button
      type="submit"
      class="hilal-btn hilal-btn--primary hilal-btn--md"
      x-show="step === count - 1"
    >{{ $submitLabel }}</button>
  </div>
</form>
