<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Button extends Component
{
    /** @param 'primary'|'secondary'|'tertiary' $variant */
    /** @param 'sm'|'md'|'lg' $size */
    public function __construct(
        public string $variant = 'primary',
        public string $size = 'md',
        public bool $loading = false,
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.button');
    }

    public function classes(): string
    {
        return implode(' ', [
            'hilal-btn',
            "hilal-btn--{$this->variant}",
            "hilal-btn--{$this->size}",
        ]);
    }
}
