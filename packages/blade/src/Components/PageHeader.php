<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class PageHeader extends Component
{
    /**
     * @param array<int, array{label: string, href?: string, current?: bool}> $breadcrumbs
     */
    public function __construct(
        public string $title = '',
        public ?string $description = null,
        public array $breadcrumbs = [],
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.page-header');
    }
}
