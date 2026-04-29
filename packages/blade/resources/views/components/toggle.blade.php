@props(['size' => 'md', 'label' => null])

<label class="hilal-toggle hilal-toggle--{{ $size }}">
  <input type="checkbox" role="switch" {{ $attributes->merge(['class' => 'hilal-toggle__input']) }} />
  <span class="hilal-toggle__track" aria-hidden="true">
    <span class="hilal-toggle__thumb"></span>
  </span>
  @if($label)<span class="hilal-toggle__label">{{ $label }}</span>@endif
</label>
