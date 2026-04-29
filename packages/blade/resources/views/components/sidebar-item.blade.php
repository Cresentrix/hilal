@props(['label', 'href' => '#', 'icon' => null, 'active' => false])

<a {{ $attributes->merge(['class' => 'hilal-sidebar__item', 'href' => $href]) }}
  @if($active) aria-current="page" @endif>
  @if($icon)<span class="hilal-sidebar__icon" aria-hidden="true">{!! $icon !!}</span>@endif
  <span class="hilal-sidebar__label">{{ $label }}</span>
  {{ $slot }}
</a>
