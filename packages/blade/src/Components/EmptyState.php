<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class EmptyState extends Component
{
    public function __construct(
        public string $size = 'default',
        public ?string $icon = null,
        public ?string $title = null,
        public ?string $description = null,
    ) {
    }

    public function classes(): string
    {
        return $this->size === 'compact' ? 'hilal-empty hilal-empty--compact' : 'hilal-empty';
    }

    public function render(): View
    {
        return view('hilal::components.empty-state');
    }
}
