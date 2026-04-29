@props(['name', 'title' => null, 'size' => 'md', 'closeOnBackdrop' => true])

<dialog
  id="{{ $name }}"
  x-data="{
    open() { this.$el.showModal(); },
    close() { this.$el.close(); },
    onBackdropClick(e) { @if($closeOnBackdrop) if (e.target === this.$el) this.$el.close(); @endif }
  }"
  @click="onBackdropClick($event)"
  {{ $attributes->merge(['class' => $classes()]) }}
>
  @if($title)
    <header class="hilal-modal__header">
      <h2 class="hilal-modal__title">{{ $title }}</h2>
      <button type="button" class="hilal-modal__close" aria-label="Close" @click="$el.closest('dialog').close()">×</button>
    </header>
  @endif

  <div class="hilal-modal__body">
    {{ $slot }}
  </div>

  @isset($footer)
    <footer class="hilal-modal__footer">{{ $footer }}</footer>
  @endisset
</dialog>
