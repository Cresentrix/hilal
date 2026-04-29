<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Avatar extends Component
{
    public function __construct(
        public string $size = 'md',
        public ?string $src = null,
        public ?string $alt = null,
        public ?string $initials = null,
        public ?string $status = null,
    ) {
    }

    public function classes(): string
    {
        $parts = ['hilal-avatar', "hilal-avatar--{$this->size}"];
        if (! $this->src && $this->initials) $parts[] = 'hilal-avatar--initials';
        return implode(' ', $parts);
    }

    public function render(): View
    {
        return view('hilal::components.avatar');
    }
}
