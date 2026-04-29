@props(['title' => '', 'description' => null, 'breadcrumbs' => []])

<header class="hilal-page-header">
  @if(!empty($breadcrumbs))
    <nav aria-label="Breadcrumb" class="hilal-page-header__crumbs">
      <ol>
        @foreach($breadcrumbs as $i => $b)
          <li>
            @if(!empty($b['href']) && empty($b['current']))
              <a href="{{ $b['href'] }}">{{ $b['label'] }}</a>
            @else
              <span @if(!empty($b['current'])) aria-current="page" class="hilal-page-header__crumb-current" @endif>{{ $b['label'] }}</span>
            @endif
            @if($i < count($breadcrumbs) - 1)<span aria-hidden="true">/</span>@endif
          </li>
        @endforeach
      </ol>
    </nav>
  @endif
  <div class="hilal-page-header__row">
    <div class="hilal-page-header__title-wrap">
      @isset($leading){{ $leading }}@endisset
      <div>
        <h1 class="hilal-page-header__title">{{ $title }}</h1>
        @if($description)<p class="hilal-page-header__desc">{{ $description }}</p>@endif
      </div>
    </div>
    @isset($actions)
      <div class="hilal-page-header__actions">{{ $actions }}</div>
    @endisset
  </div>
</header>
