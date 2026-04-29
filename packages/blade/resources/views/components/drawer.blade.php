@props(['name', 'title' => null, 'side' => 'end', 'size' => 'md', 'closeOnBackdrop' => true])

<dialog
  id="{{ $name }}"
  @click="@if($closeOnBackdrop) if ($event.target === $el) $el.close() @endif"
  {{ $attributes->merge(['class' => $classes()]) }}
>
  @if($title)
    <header class="hilal-drawer__header">
      <h2 class="hilal-drawer__title">{{ $title }}</h2>
      <button type="button" class="hilal-drawer__close" aria-label="Close" @click="$el.closest('dialog').close()">×</button>
    </header>
  @endif

  <div class="hilal-drawer__body">
    {{ $slot }}
  </div>

  @isset($footer)
    <footer class="hilal-drawer__footer">{{ $footer }}</footer>
  @endisset
</dialog>
