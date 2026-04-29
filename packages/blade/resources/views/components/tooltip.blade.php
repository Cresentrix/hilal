@props(['label' => '', 'side' => 'top'])

<span class="hilal-tooltip" data-side="{{ $side }}">
  {{ $slot }}
  <span class="hilal-tooltip__content" role="tooltip">{{ $label }}</span>
</span>
