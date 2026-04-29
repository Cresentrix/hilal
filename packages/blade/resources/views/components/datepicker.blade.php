@props(['kind' => 'date', 'size' => 'md', 'label' => null, 'hint' => null, 'error' => null])

@php $inputId = $attributes->get('id') ?: 'hilal-dp-'.uniqid(); @endphp

<div class="hilal-field hilal-field--{{ $size }}" data-state="{{ $state() }}">
  @if($label)
    <label class="hilal-field__label" for="{{ $inputId }}">{{ $label }}</label>
  @endif
  <div class="hilal-field__control">
    <input
      {{ $attributes->merge(['class' => 'hilal-input', 'id' => $inputId, 'type' => $kind]) }}
      @if($error) aria-invalid="true" @endif
    />
  </div>
  @if($message())
    <p class="hilal-field__hint">{{ $message() }}</p>
  @endif
</div>
