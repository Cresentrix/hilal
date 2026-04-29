<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class DataList extends Component
{
    /**
     * @param array<int, array{id: string, label: string, meta?: string, avatarSrc?: string, initials?: string, href?: string}> $items
     */
    public function __construct(
        public array $items = [],
        public bool $loading = false,
        public int $loadingRows = 4,
        public string $emptyTitle = 'Nothing here yet',
        public ?string $emptyDescription = null,
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.data-list');
    }
}
