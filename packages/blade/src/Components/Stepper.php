<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Stepper extends Component
{
    /**
     * @param array<int, array{label: string, status?: string, indicator?: string}> $steps
     */
    public function __construct(
        public array $steps = [],
        public string $orientation = 'horizontal',
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.stepper');
    }
}
