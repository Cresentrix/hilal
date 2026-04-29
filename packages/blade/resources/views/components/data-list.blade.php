@props(['items' => [], 'loading' => false, 'loadingRows' => 4, 'emptyTitle' => 'Nothing here yet', 'emptyDescription' => null])

@if($loading)
  <ul class="hilal-data-list">
    @for($i = 0; $i < $loadingRows; $i++)
      <li class="hilal-data-list__row">
        <span class="hilal-skeleton hilal-skeleton--circle" style="--size: 2.5rem;"></span>
        <div class="hilal-data-list__col">
          <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 60%;"></span>
          <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 40%; margin-block-start: var(--hilal-spacing-1);"></span>
        </div>
      </li>
    @endfor
  </ul>
@elseif(empty($items))
  <div class="hilal-empty">
    <h3 class="hilal-empty__title">{{ $emptyTitle }}</h3>
    @if($emptyDescription)<p class="hilal-empty__desc">{{ $emptyDescription }}</p>@endif
    @isset($emptyActions)<div class="hilal-empty__actions">{{ $emptyActions }}</div>@endisset
  </div>
@else
  <ul class="hilal-data-list">
    @foreach($items as $item)
      <li class="hilal-data-list__item">
        @if(!empty($item['href']))
          <a href="{{ $item['href'] }}" class="hilal-data-list__row hilal-data-list__row--interactive">
            @include('hilal::components._data-list-row-content', ['item' => $item])
          </a>
        @else
          <div class="hilal-data-list__row">
            @include('hilal::components._data-list-row-content', ['item' => $item])
          </div>
        @endif
      </li>
    @endforeach
  </ul>
@endif
