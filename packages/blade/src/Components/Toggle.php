<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Toggle extends Component
{
    public function __construct(
        public string $size = 'md',
        public ?string $label = null,
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.toggle');
    }
}
