@props(['label', 'href' => '#', 'icon' => null, 'active' => false])

<a {{ $attributes->merge(['class' => 'hilal-bottomnav__item', 'href' => $href]) }}
  @if($active) aria-current="page" @endif>
  @if($icon)<span class="hilal-bottomnav__icon" aria-hidden="true">{!! $icon !!}</span>@endif
  <span class="hilal-bottomnav__label">{{ $label }}</span>
</a>
