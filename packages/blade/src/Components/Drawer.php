<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Drawer extends Component
{
    public function __construct(
        public string $name,
        public ?string $title = null,
        public string $side = 'end',
        public string $size = 'md',
        public bool $closeOnBackdrop = true,
    ) {
    }

    public function classes(): string
    {
        return "hilal-drawer hilal-drawer--{$this->side} hilal-drawer--{$this->size}";
    }

    public function render(): View
    {
        return view('hilal::components.drawer');
    }
}
