@props(['label', 'open' => false])

<details {{ $attributes->merge(['class' => 'hilal-accordion__item']) }} @if($open) open @endif>
  <summary class="hilal-accordion__trigger">{{ $label }}</summary>
  <div class="hilal-accordion__content">{{ $slot }}</div>
</details>
