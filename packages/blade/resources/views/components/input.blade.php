@props(['size' => 'md', 'label' => null, 'hint' => null, 'error' => null, 'success' => null, 'type' => 'text', 'leadingIcon' => null, 'trailingIcon' => null])

@php
  $inputId = $attributes->get('id') ?: 'hilal-input-'.uniqid();
@endphp

<div class="hilal-field hilal-field--{{ $size }}" data-state="{{ $state() }}">
  @if($label)
    <label class="hilal-field__label" for="{{ $inputId }}">{{ $label }}</label>
  @endif
  <div class="hilal-field__control">
    @if($leadingIcon)
      <span class="hilal-field__icon hilal-field__icon--leading" aria-hidden="true">{!! $leadingIcon !!}</span>
    @endif
    <input
      {{ $attributes->merge(['class' => 'hilal-input', 'id' => $inputId, 'type' => $type]) }}
      @if($error) aria-invalid="true" @endif
    />
    @if($trailingIcon)
      <span class="hilal-field__icon hilal-field__icon--trailing" aria-hidden="true">{!! $trailingIcon !!}</span>
    @endif
  </div>
  @if($message())
    <p class="hilal-field__hint">{{ $message() }}</p>
  @endif
</div>
