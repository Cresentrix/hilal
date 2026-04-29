<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class SearchHeader extends Component
{
    public function __construct(
        public string $action = '',
        public string $name = 'q',
        public string $query = '',
        public string $placeholder = 'Search…',
        public ?int $totalCount = null,
        public ?int $activeFiltersCount = null,
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.search-header');
    }
}
