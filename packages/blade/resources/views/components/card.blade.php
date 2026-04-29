@props(['variant' => 'default', 'padding' => 'md', 'interactive' => false])

<article {{ $attributes->merge(['class' => $classes()]) }}>
  {{ $slot }}
</article>
