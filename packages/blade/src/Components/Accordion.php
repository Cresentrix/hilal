<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Accordion extends Component
{
    public function __construct(
        public string $variant = 'default',
    ) {
    }

    public function classes(): string
    {
        return $this->variant === 'default' ? 'hilal-accordion' : "hilal-accordion hilal-accordion--{$this->variant}";
    }

    public function render(): View
    {
        return view('hilal::components.accordion');
    }
}
