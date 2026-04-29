@props(['position' => 'bottom-end', 'sessionKey' => 'hilal.toast'])

@php $list = $items(); @endphp

@if(count($list) > 0)
  <div class="hilal-toast-region" data-position="{{ $position }}" role="region" aria-label="Notifications">
    @foreach($list as $t)
      @php $tone = $t['tone'] ?? null; @endphp
      <div class="hilal-toast{{ $tone ? ' hilal-toast--'.$tone : '' }}" role="status"
        x-data="{ show: true }" x-show="show" x-init="setTimeout(() => show = false, {{ $t['durationMs'] ?? 5000 }})">
        @if(!empty($t['icon']))<span class="hilal-toast__icon" aria-hidden="true">{!! $t['icon'] !!}</span>@endif
        <div class="hilal-toast__body">
          @if(!empty($t['title']))<p class="hilal-toast__title">{{ $t['title'] }}</p>@endif
          @if(!empty($t['description']))<p class="hilal-toast__desc">{{ $t['description'] }}</p>@endif
        </div>
        <button type="button" class="hilal-toast__close" aria-label="Dismiss" @click="show = false">×</button>
      </div>
    @endforeach
  </div>
@endif
