<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Sidebar extends Component
{
    public function __construct(
        public bool $collapsed = false,
    ) {
    }

    public function classes(): string
    {
        return $this->collapsed ? 'hilal-sidebar hilal-sidebar--collapsed' : 'hilal-sidebar';
    }

    public function render(): View
    {
        return view('hilal::components.sidebar');
    }
}
