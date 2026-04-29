<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Alert extends Component
{
    public function __construct(
        public string $tone = 'info',
        public ?string $title = null,
        public ?string $description = null,
        public ?string $icon = null,
        public bool $dismissible = false,
        public string $dismissLabel = 'Dismiss',
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.alert');
    }
}
