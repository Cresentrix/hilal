<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class FilterBar extends Component
{
    /**
     * @param array<int, array{id: string, label: string, count?: int, active?: bool, disabled?: bool, href?: string}> $filters
     */
    public function __construct(
        public array $filters = [],
        public ?string $clearAllHref = null,
    ) {
    }

    public function hasActive(): bool
    {
        foreach ($this->filters as $f) {
            if (!empty($f['active'])) return true;
        }
        return false;
    }

    public function render(): View
    {
        return view('hilal::components.filter-bar');
    }
}
