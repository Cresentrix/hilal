<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class AccordionItem extends Component
{
    public function __construct(
        public string $label,
        public bool $open = false,
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.accordion-item');
    }
}
