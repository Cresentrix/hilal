<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class SidebarItem extends Component
{
    public function __construct(
        public string $label,
        public string $href = '#',
        public ?string $icon = null,
        public bool $active = false,
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.sidebar-item');
    }
}
