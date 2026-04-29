<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Skeleton extends Component
{
    public function __construct(
        public string $variant = 'rectangle',
        public ?string $width = null,
        public ?string $height = null,
        public ?string $size = null,
    ) {
    }

    public function classes(): string
    {
        $parts = ['hilal-skeleton'];
        if ($this->variant !== 'rectangle') $parts[] = "hilal-skeleton--{$this->variant}";
        return implode(' ', $parts);
    }

    public function styleAttr(): string
    {
        $parts = [];
        if ($this->width)  $parts[] = "inline-size: {$this->width}";
        if ($this->height) $parts[] = "block-size: {$this->height}";
        if ($this->size)   $parts[] = "--size: {$this->size}";
        return implode('; ', $parts);
    }

    public function render(): View
    {
        return view('hilal::components.skeleton');
    }
}
