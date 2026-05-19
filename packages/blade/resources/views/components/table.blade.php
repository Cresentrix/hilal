@props([
  'columns' => [],
  'rows' => [],
  'caption' => null,
  'size' => 'md',
  'sticky' => false,
  'loading' => false,
  'loadingRows' => 4,
  'emptyState' => null,
  'sortColumn' => null,
  'sortDirection' => null,
])

<div class="hilal-table-wrap">
  <table class="{{ $tableClasses() }}">
    @if($caption)<caption class="hilal-table__caption">{{ $caption }}</caption>@endif
    <thead class="hilal-table__head">
      <tr>
        @foreach($columns as $col)
          <th scope="col"
              class="{{ $cellClasses($col) }}"
              @if(!empty($col['width'])) style="inline-size: {{ $col['width'] }};" @endif
              @if($ariaSort($col)) aria-sort="{{ $ariaSort($col) }}" @endif
          >
            @if($col['sortable'] ?? false)
              <button type="button"
                      class="hilal-table__sort"
                      @if($ariaSort($col)) aria-sort="{{ $ariaSort($col) }}" @endif
                      {{ $attributes->only(['onclick', 'x-on:click']) }}
              >
                <span>{{ $col['header'] }}</span>
                <span aria-hidden="true" class="hilal-table__sort-arrow">{{ $sortArrow($col['id']) }}</span>
              </button>
            @else
              {{ $col['header'] }}
            @endif
          </th>
        @endforeach
      </tr>
    </thead>
    <tbody class="hilal-table__body">
      @if($loading)
        @for($i = 0; $i < $loadingRows; $i++)
          <tr class="hilal-table__loading-row">
            @foreach($columns as $col)
              <td class="{{ $col['className'] ?? '' }}">
                <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 60%;"></span>
              </td>
            @endforeach
          </tr>
        @endfor
      @elseif(empty($rows))
        <tr>
          <td colspan="{{ count($columns) }}" class="hilal-table__empty">{{ $emptyState ?? 'No rows to display.' }}</td>
        </tr>
      @else
        @foreach($rows as $row)
          <tr>
            @foreach($columns as $col)
              <td class="{{ $cellClasses($col) }}">{{ $row[$col['accessor']] ?? '' }}</td>
            @endforeach
          </tr>
        @endforeach
      @endif
    </tbody>
  </table>
</div>
