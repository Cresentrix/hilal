@if(!empty($item['avatarSrc']) || !empty($item['initials']))
  <span class="hilal-avatar hilal-avatar--md{{ !empty($item['initials']) && empty($item['avatarSrc']) ? ' hilal-avatar--initials' : '' }}">
    @if(!empty($item['avatarSrc']))
      <img class="hilal-avatar__img" src="{{ $item['avatarSrc'] }}" alt="" />
    @else
      {{ $item['initials'] ?? '' }}
    @endif
  </span>
@endif
<div class="hilal-data-list__col">
  <span class="hilal-data-list__label">{{ $item['label'] }}</span>
  @if(!empty($item['meta']))
    <span class="hilal-data-list__meta">{{ $item['meta'] }}</span>
  @endif
</div>
