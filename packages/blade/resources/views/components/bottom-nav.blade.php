@props(['variant' => 'default', 'ariaLabel' => 'Primary'])

<nav {{ $attributes->merge(['class' => $classes(), 'aria-label' => $ariaLabel]) }}>{{ $slot }}</nav>
