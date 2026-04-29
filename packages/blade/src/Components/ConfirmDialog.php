<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class ConfirmDialog extends Component
{
    public function __construct(
        public string $name,
        public string $title,
        public ?string $description = null,
        public string $confirmLabel = 'Confirm',
        public string $cancelLabel = 'Cancel',
        public bool $destructive = false,
        public string $size = 'sm',
        public bool $closeOnBackdrop = true,
    ) {
    }

    public function classes(): string
    {
        return "hilal-modal hilal-modal--{$this->size}";
    }

    public function render(): View
    {
        return view('hilal::components.confirm-dialog');
    }
}
