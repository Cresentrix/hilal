<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Table extends Component
{
    /**
     * @param array<int, array{
     *     id: string,
     *     header: string,
     *     accessor: string,
     *     sortable?: bool,
     *     align?: 'start' | 'center' | 'end',
     *     numeric?: bool,
     *     width?: string,
     *     className?: string
     * }> $columns  Each column references a row field by `accessor`.
     * @param array<int, array<string, mixed>> $rows
     */
    public function __construct(
        public array $columns = [],
        public array $rows = [],
        public ?string $caption = null,
        public string $size = 'md',
        public bool $sticky = false,
        public bool $loading = false,
        public int $loadingRows = 4,
        public ?string $emptyState = null,
        public ?string $sortColumn = null,
        public ?string $sortDirection = null,
    ) {
    }

    public function tableClasses(): string
    {
        return implode(' ', array_filter([
            'hilal-table',
            $this->size === 'sm' ? 'hilal-table--sm' : '',
            $this->sticky ? 'hilal-table--sticky' : '',
        ]));
    }

    public function cellClasses(array $col): string
    {
        return implode(' ', array_filter([
            ($col['align'] ?? null) === 'center' ? 'hilal-table__cell--center' : '',
            (($col['align'] ?? null) === 'end' || ($col['numeric'] ?? false)) ? 'hilal-table__cell--num' : '',
            $col['className'] ?? '',
        ]));
    }

    public function ariaSort(array $col): ?string
    {
        if (!($col['sortable'] ?? false)) {
            return null;
        }
        if ($this->sortColumn !== $col['id']) {
            return 'none';
        }
        return $this->sortDirection === 'desc' ? 'descending' : 'ascending';
    }

    public function sortArrow(string $colId): string
    {
        if ($this->sortColumn !== $colId) {
            return '↕';
        }
        return $this->sortDirection === 'desc' ? '↓' : '↑';
    }

    public function render(): View
    {
        return view('hilal::components.table');
    }
}
