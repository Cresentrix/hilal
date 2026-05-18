<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class StatsGrid extends Component
{
    /**
     * @param array<int, array{
     *     id: string,
     *     label: string,
     *     value: string|int|float,
     *     hint?: string,
     *     delta?: string,
     *     trend?: string,
     *     href?: string
     * }> $items
     */
    public function __construct(
        public array $items = [],
        public bool $loading = false,
        public ?int $loadingCount = null,
        public string $minColumnWidth = '14rem',
    ) {
    }

    public function gridStyle(): string
    {
        return "grid-template-columns: repeat(auto-fit, minmax({$this->minColumnWidth}, 1fr));";
    }

    public function badgeClass(?string $trend): string
    {
        $tone = match ($trend) {
            'down' => 'danger',
            'flat' => 'neutral',
            default => 'success',
        };
        return "hilal-badge hilal-badge--{$tone}";
    }

    public function trendGlyph(?string $trend): string
    {
        return match ($trend) {
            'down' => '↓',
            'flat' => '→',
            default => '↑',
        };
    }

    public function skeletonRows(): int
    {
        return $this->loadingCount ?? (count($this->items) ?: 4);
    }

    public function render(): View
    {
        return view('hilal::components.stats-grid');
    }
}
