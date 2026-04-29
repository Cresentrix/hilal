<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Datepicker extends Component
{
    public function __construct(
        public string $kind = 'date',
        public string $size = 'md',
        public ?string $label = null,
        public ?string $hint = null,
        public ?string $error = null,
    ) {
    }

    public function state(): string
    {
        return $this->error ? 'error' : 'default';
    }

    public function message(): ?string
    {
        return $this->error ?? $this->hint;
    }

    public function render(): View
    {
        return view('hilal::components.datepicker');
    }
}
