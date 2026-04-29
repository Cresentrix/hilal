@props(['size' => 'default', 'icon' => null, 'title' => null, 'description' => null])

<div {{ $attributes->merge(['class' => $classes()]) }}>
  @if($icon)<div class="hilal-empty__icon" aria-hidden="true">{!! $icon !!}</div>@endif
  @if($title)<h3 class="hilal-empty__title">{{ $title }}</h3>@endif
  @if($description)<p class="hilal-empty__desc">{{ $description }}</p>@endif
  @isset($actions)<div class="hilal-empty__actions">{{ $actions }}</div>@endisset
  {{ $slot }}
</div>
