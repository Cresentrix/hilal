@props(['page' => 1, 'total' => 1, 'siblingCount' => 1, 'size' => 'md', 'prevLabel' => 'Previous', 'nextLabel' => 'Next', 'hrefTemplate' => null])

<nav {{ $attributes->merge(['class' => $classes(), 'aria-label' => 'Pagination']) }}>
  @php $prevHref = $href($page - 1); @endphp
  @if($prevHref)
    <a class="hilal-pagination__btn" data-prev href="{{ $page <= 1 ? '#' : $prevHref }}" @if($page <= 1) aria-disabled="true" @endif aria-label="{{ $prevLabel }}">‹</a>
  @else
    <button type="button" class="hilal-pagination__btn" data-prev @if($page <= 1) disabled @endif aria-label="{{ $prevLabel }}">‹</button>
  @endif

  @foreach($pages() as $p)
    @if($p === 'ellipsis')
      <span class="hilal-pagination__ellipsis" aria-hidden="true">…</span>
    @else
      @php $h = $href($p); @endphp
      @if($h)
        <a class="hilal-pagination__btn" @if($p === $page) aria-current="page" @endif href="{{ $h }}">{{ $p }}</a>
      @else
        <button type="button" class="hilal-pagination__btn" @if($p === $page) aria-current="page" @endif>{{ $p }}</button>
      @endif
    @endif
  @endforeach

  @php $nextHref = $href($page + 1); @endphp
  @if($nextHref)
    <a class="hilal-pagination__btn" data-next href="{{ $page >= $total ? '#' : $nextHref }}" @if($page >= $total) aria-disabled="true" @endif aria-label="{{ $nextLabel }}">›</a>
  @else
    <button type="button" class="hilal-pagination__btn" data-next @if($page >= $total) disabled @endif aria-label="{{ $nextLabel }}">›</button>
  @endif
</nav>
