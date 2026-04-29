@props(['items' => [], 'value' => null, 'variant' => 'line', 'size' => 'md', 'orientation' => 'horizontal'])

<div
  x-data="{ active: @js($value ?? ($items[0]['value'] ?? '')) }"
  {{ $attributes->merge(['class' => $classes()]) }}
  data-orientation="{{ $orientation }}"
>
  <div class="hilal-tabs__list" role="tablist">
    @foreach($items as $item)
      <button
        type="button"
        role="tab"
        class="hilal-tabs__tab"
        :aria-selected="active === @js($item['value']) ? 'true' : 'false'"
        :tabindex="active === @js($item['value']) ? 0 : -1"
        @click="active = @js($item['value'])"
        @if(!empty($item['disabled'])) disabled @endif
      >{{ $item['label'] }}</button>
    @endforeach
  </div>
  @foreach($items as $item)
    <div role="tabpanel" class="hilal-tabs__panel" x-show="active === @js($item['value'])" x-cloak>
      {!! $item['content'] ?? '' !!}
    </div>
  @endforeach
  {{ $slot }}
</div>
