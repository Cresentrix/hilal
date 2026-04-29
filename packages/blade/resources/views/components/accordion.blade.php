@props(['variant' => 'default'])

<div {{ $attributes->merge(['class' => $classes()]) }}>{{ $slot }}</div>
