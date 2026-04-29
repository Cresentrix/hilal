<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Card extends Component
{
    public function __construct(
        public string $variant = 'default',
        public string $padding = 'md',
        public bool $interactive = false,
    ) {
    }

    public function classes(): string
    {
        $parts = ['hilal-card', "hilal-card--{$this->variant}"];
        if ($this->padding !== 'none') $parts[] = "hilal-card--{$this->padding}";
        if ($this->interactive)        $parts[] = 'hilal-card--interactive';
        return implode(' ', $parts);
    }

    public function render(): View
    {
        return view('hilal::components.card');
    }
}
