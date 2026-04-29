@props(['size' => 'md', 'label' => null, 'hint' => null, 'error' => null, 'success' => null])

@php $selectId = $attributes->get('id') ?: 'hilal-select-'.uniqid(); @endphp

<div class="hilal-field hilal-field--{{ $size }}" data-state="{{ $state() }}">
  @if($label)
    <label class="hilal-field__label" for="{{ $selectId }}">{{ $label }}</label>
  @endif
  <div class="hilal-field__control hilal-select-control">
    <select {{ $attributes->merge(['class' => 'hilal-select', 'id' => $selectId]) }} @if($error) aria-invalid="true" @endif>
      {{ $slot }}
    </select>
    <span class="hilal-select__chevron" aria-hidden="true">▾</span>
  </div>
  @if($message())
    <p class="hilal-field__hint">{{ $message() }}</p>
  @endif
</div>
