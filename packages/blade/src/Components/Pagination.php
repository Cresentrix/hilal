<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Pagination extends Component
{
    public function __construct(
        public int $page = 1,
        public int $total = 1,
        public int $siblingCount = 1,
        public string $size = 'md',
        public string $prevLabel = 'Previous',
        public string $nextLabel = 'Next',
        public ?string $hrefTemplate = null,
    ) {
    }

    /**
     * @return array<int, int|string>  list of page numbers and 'ellipsis' markers
     */
    public function pages(): array
    {
        if ($this->total <= 7) {
            return range(1, $this->total);
        }
        $start = max(2, $this->page - $this->siblingCount);
        $end   = min($this->total - 1, $this->page + $this->siblingCount);
        $out = [1];
        if ($start > 2) $out[] = 'ellipsis';
        for ($i = $start; $i <= $end; $i++) $out[] = $i;
        if ($end < $this->total - 1) $out[] = 'ellipsis';
        $out[] = $this->total;
        return $out;
    }

    public function classes(): string
    {
        return $this->size === 'sm' ? 'hilal-pagination hilal-pagination--sm' : 'hilal-pagination';
    }

    public function href(int $page): ?string
    {
        return $this->hrefTemplate ? str_replace('{page}', (string) $page, $this->hrefTemplate) : null;
    }

    public function render(): View
    {
        return view('hilal::components.pagination');
    }
}
