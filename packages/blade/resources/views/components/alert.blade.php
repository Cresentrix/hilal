@props(['tone' => 'info', 'title' => null, 'description' => null, 'icon' => null, 'dismissible' => false, 'dismissLabel' => 'Dismiss'])

<div {{ $attributes->merge(['class' => "hilal-alert hilal-alert--{$tone}", 'role' => 'status']) }}
  @if($dismissible) x-data="{ visible: true }" x-show="visible" @endif>
  @if($icon)
    <span class="hilal-alert__icon" aria-hidden="true">{!! $icon !!}</span>
  @endif
  <div class="hilal-alert__body">
    @if($title)<p class="hilal-alert__title">{{ $title }}</p>@endif
    @if($description)<p class="hilal-alert__desc">{{ $description }}</p>@endif
    {{ $slot }}
  </div>
  @if($dismissible)
    <button type="button" class="hilal-alert__close" aria-label="{{ $dismissLabel }}" @click="visible = false">×</button>
  @endif
</div>
