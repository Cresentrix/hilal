@props(['name', 'title', 'description' => null, 'confirmLabel' => 'Confirm', 'cancelLabel' => 'Cancel', 'destructive' => false, 'size' => 'sm', 'closeOnBackdrop' => true])

<dialog
  id="{{ $name }}"
  @click="@if($closeOnBackdrop) if ($event.target === $el) $el.close() @endif"
  class="{{ $classes() }}"
>
  <header class="hilal-modal__header">
    <h2 class="hilal-modal__title">{{ $title }}</h2>
    <button type="button" class="hilal-modal__close" aria-label="Close" @click="$el.closest('dialog').close()">×</button>
  </header>
  <div class="hilal-modal__body">
    {{ $description }}{{ $slot }}
  </div>
  <footer class="hilal-modal__footer">
    <button type="button" class="hilal-btn hilal-btn--tertiary hilal-btn--md" @click="$el.closest('dialog').close()">{{ $cancelLabel }}</button>
    <button type="button"
      class="hilal-btn hilal-btn--primary hilal-btn--md"
      @if($destructive) style="background: var(--hilal-status-error)" @endif
      {{ $attributes->only(['onclick', 'x-on:click']) }}
    >{{ $confirmLabel }}</button>
  </footer>
</dialog>
