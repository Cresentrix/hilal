<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Badge extends Component
{
    public function __construct(
        public string $tone = 'neutral',
        public string $size = 'sm',
        public bool $dot = false,
    ) {
    }

    public function classes(): string
    {
        $parts = ['hilal-badge', "hilal-badge--{$this->tone}"];
        if ($this->size === 'md') $parts[] = 'hilal-badge--md';
        if ($this->dot)           $parts[] = 'hilal-badge--dot';
        return implode(' ', $parts);
    }

    public function render(): View
    {
        return view('hilal::components.badge');
    }
}
