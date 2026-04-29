@props(['size' => 'md', 'label' => null])

<label class="hilal-check hilal-check--{{ $size }}">
  <input type="checkbox" {{ $attributes->merge(['class' => 'hilal-check__input']) }} />
  <span class="hilal-check__box" aria-hidden="true">
    <svg class="hilal-check__tick" viewBox="0 0 16 16" focusable="false">
      <path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </span>
  @if($label)<span class="hilal-check__label">{{ $label }}</span>@endif
</label>
