<div class="hilal-dashboard">
  <div class="hilal-dashboard__sidebar">
    @isset($sidebar){{ $sidebar }}@endisset
  </div>
  <div class="hilal-dashboard__main-col">
    @isset($topbar)
      <div class="hilal-dashboard__topbar">{{ $topbar }}</div>
    @endisset
    <main class="hilal-dashboard__main">{{ $slot }}</main>
    @isset($bottomNav){{ $bottomNav }}@endisset
  </div>
</div>
