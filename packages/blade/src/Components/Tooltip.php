<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Tooltip extends Component
{
    public function __construct(
        public string $label = '',
        public string $side = 'top',
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.tooltip');
    }
}
