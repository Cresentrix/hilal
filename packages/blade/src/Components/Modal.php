<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Modal extends Component
{
    public function __construct(
        public string $name,
        public ?string $title = null,
        public string $size = 'md',
        public bool $closeOnBackdrop = true,
    ) {
    }

    public function classes(): string
    {
        return "hilal-modal hilal-modal--{$this->size}";
    }

    public function render(): View
    {
        return view('hilal::components.modal');
    }
}
