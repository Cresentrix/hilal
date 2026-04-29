@props(['size' => 'md', 'src' => null, 'alt' => null, 'initials' => null, 'status' => null])

<span {{ $attributes->merge(['class' => $classes()]) }} @if($status) data-status="{{ $status }}" @endif>
  @if($src)
    <img class="hilal-avatar__img" src="{{ $src }}" alt="{{ $alt ?? '' }}" />
  @elseif($initials)
    {{ $initials }}
  @else
    {{ $slot }}
  @endif
</span>
