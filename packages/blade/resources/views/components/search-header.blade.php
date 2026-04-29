@props(['action' => '', 'name' => 'q', 'query' => '', 'placeholder' => 'Search…', 'totalCount' => null, 'activeFiltersCount' => null])

<header class="hilal-search-header">
  <form action="{{ $action }}" method="GET" class="hilal-search-header__row">
    @isset($leading){{ $leading }}@endisset
    <div class="hilal-search-header__input-wrap">
      <div class="hilal-field hilal-field--md">
        <div class="hilal-field__control">
          <span class="hilal-field__icon hilal-field__icon--leading" aria-hidden="true">🔎</span>
          <input class="hilal-input" type="search" name="{{ $name }}" placeholder="{{ $placeholder }}" value="{{ $query }}" />
        </div>
      </div>
    </div>
    @isset($trailing)
      <div class="hilal-search-header__trailing">{{ $trailing }}</div>
    @endisset
  </form>
  @if($totalCount !== null || $activeFiltersCount)
    <div class="hilal-search-header__summary">
      @if($totalCount !== null)
        <span>
          @if($query)
            Showing <strong>{{ number_format($totalCount) }}</strong> results for "{{ $query }}"
          @else
            <strong>{{ number_format($totalCount) }}</strong> total
          @endif
        </span>
      @endif
      @if($activeFiltersCount)
        <span aria-hidden="true">·</span>
        <span>{{ $activeFiltersCount }} active <span class="hilal-badge hilal-badge--brand">{{ $activeFiltersCount }}</span></span>
      @endif
    </div>
  @endif
</header>
