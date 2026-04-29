@props(['tone' => 'neutral', 'size' => 'sm', 'dot' => false])

<span {{ $attributes->merge(['class' => $classes()]) }}>@unless($dot){{ $slot }}@endunless</span>
