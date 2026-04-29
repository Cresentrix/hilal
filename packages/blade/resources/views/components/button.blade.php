@props(['variant' => 'primary', 'size' => 'md', 'loading' => false])

<button
  {{ $attributes->merge(['class' => $classes(), 'type' => 'button']) }}
  @if($loading) data-state="loading" disabled @endif
>
  @if($loading)
    <span class="hilal-btn__spinner" aria-hidden="true"></span>
  @endif
  {{ $slot }}
</button>
