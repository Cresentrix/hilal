@props(['items' => [], 'loading' => false, 'loadingCount' => null, 'minColumnWidth' => '14rem'])

<div class="hilal-stats-grid" style="{{ $gridStyle() }}">
  @if($loading)
    @for($i = 0; $i < $skeletonRows(); $i++)
      <div class="hilal-stats-grid__card">
        <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 40%;"></span>
        <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 70%; block-size: 1.5rem; margin-block-start: var(--hilal-spacing-2);"></span>
        <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 35%; margin-block-start: var(--hilal-spacing-2);"></span>
      </div>
    @endfor
  @else
    @foreach($items as $item)
      @php
        $interactive = !empty($item['href']);
        $tag = $interactive ? 'a' : 'div';
        $classes = 'hilal-stats-grid__card' . ($interactive ? ' hilal-stats-grid__card--interactive' : '');
      @endphp
      <{{ $tag }}
        class="{{ $classes }}"
        @if($interactive) href="{{ $item['href'] }}" @endif
      >
        <div class="hilal-stats-grid__header">
          <span class="hilal-stats-grid__label">{{ $item['label'] }}</span>
        </div>
        <div class="hilal-stats-grid__value">{{ $item['value'] }}</div>
        @if(!empty($item['delta']) || !empty($item['hint']))
          <div class="hilal-stats-grid__footer">
            @if(!empty($item['delta']))
              <span class="{{ $badgeClass($item['trend'] ?? null) }}">
                {{ $trendGlyph($item['trend'] ?? null) }} {{ $item['delta'] }}
              </span>
            @endif
            @if(!empty($item['hint']))
              <span class="hilal-stats-grid__hint">{{ $item['hint'] }}</span>
            @endif
          </div>
        @endif
      </{{ $tag }}>
    @endforeach
  @endif
</div>
