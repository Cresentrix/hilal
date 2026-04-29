@props(['filters' => [], 'clearAllHref' => null])

<div role="toolbar" aria-label="Filters" class="hilal-filter-bar">
  @isset($leading){{ $leading }}@endisset
  @foreach($filters as $f)
    @php
      $classes = 'hilal-filter-pill' . (!empty($f['active']) ? ' hilal-filter-pill--active' : '');
    @endphp
    @if(!empty($f['href']))
      <a href="{{ $f['href'] }}" class="{{ $classes }}"
        @if(!empty($f['active'])) aria-pressed="true" @endif
        @if(!empty($f['disabled'])) aria-disabled="true" @endif>
        {{ $f['label'] }}
        @if(isset($f['count']))<span class="hilal-filter-pill__count">{{ number_format($f['count']) }}</span>@endif
      </a>
    @else
      <button type="button" role="switch" class="{{ $classes }}"
        aria-pressed="{{ !empty($f['active']) ? 'true' : 'false' }}"
        @if(!empty($f['disabled'])) disabled @endif>
        {{ $f['label'] }}
        @if(isset($f['count']))<span class="hilal-filter-pill__count">{{ number_format($f['count']) }}</span>@endif
      </button>
    @endif
  @endforeach
  @if($hasActive() && $clearAllHref)
    <a href="{{ $clearAllHref }}" class="hilal-btn hilal-btn--tertiary hilal-btn--sm">Clear all</a>
  @endif
  @isset($trailing)<div class="hilal-filter-bar__trailing">{{ $trailing }}</div>@endisset
</div>
