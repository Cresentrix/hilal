<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class CommandPalette extends Component
{
    /**
     * @param array<int, array{
     *     id: string,
     *     label: string,
     *     hint?: string,
     *     shortcut?: string,
     *     keywords?: array<int, string>,
     *     group?: string,
     *     disabled?: bool
     * }> $items
     * @param array<int, string>|null $groupOrder
     */
    public function __construct(
        public string $name,
        public array $items = [],
        public string $placeholder = 'Type a command or search…',
        public string $emptyMessage = 'No matches.',
        public ?array $groupOrder = null,
    ) {
    }

    /**
     * @return array<int, array{key: string, items: array<int, array<string, mixed>>}>
     */
    public function groupedItems(): array
    {
        $map = [];
        foreach ($this->items as $it) {
            $key = $it['group'] ?? '';
            $map[$key] ??= [];
            $map[$key][] = $it;
        }
        $keys = [];
        if ($this->groupOrder !== null) {
            foreach ($this->groupOrder as $g) {
                if (array_key_exists($g, $map)) {
                    $keys[] = $g;
                }
            }
        }
        foreach (array_keys($map) as $k) {
            if (!in_array($k, $keys, true)) {
                $keys[] = $k;
            }
        }
        $groups = [];
        foreach ($keys as $k) {
            $groups[] = ['key' => $k, 'items' => $map[$k]];
        }
        return $groups;
    }

    public function render(): View
    {
        return view('hilal::components.command-palette');
    }
}
