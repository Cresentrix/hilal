@props(['collapsed' => false])

<aside {{ $attributes->merge(['class' => $classes()]) }}>{{ $slot }}</aside>
