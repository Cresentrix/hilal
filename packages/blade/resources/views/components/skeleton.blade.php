@props(['variant' => 'rectangle', 'width' => null, 'height' => null, 'size' => null])

<span {{ $attributes->merge(['class' => $classes(), 'style' => $styleAttr(), 'aria-hidden' => 'true']) }}></span>
