@props(['title' => '', 'description' => null, 'twoColumn' => false])

<section {{ $attributes->merge(['class' => $classes()]) }}>
  <header class="hilal-form-section__header">
    <div>
      <h2 class="hilal-form-section__title">{{ $title }}</h2>
      @if($description)<p class="hilal-form-section__desc">{{ $description }}</p>@endif
      @isset($aside)<div style="margin-block-start: var(--hilal-spacing-3);">{{ $aside }}</div>@endisset
    </div>
  </header>
  <div class="hilal-form-section__fields">{{ $slot }}</div>
</section>
