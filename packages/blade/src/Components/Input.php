<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Input extends Component
{
    public function __construct(
        public string $size = 'md',
        public ?string $label = null,
        public ?string $hint = null,
        public ?string $error = null,
        public ?string $success = null,
        public string $type = 'text',
        public ?string $leadingIcon = null,
        public ?string $trailingIcon = null,
    ) {
    }

    public function state(): string
    {
        if ($this->error)   return 'error';
        if ($this->success) return 'success';
        return 'default';
    }

    public function message(): ?string
    {
        return $this->error ?? $this->success ?? $this->hint;
    }

    public function render(): View
    {
        return view('hilal::components.input');
    }
}
