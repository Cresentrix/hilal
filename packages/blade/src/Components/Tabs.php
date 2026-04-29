<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Tabs extends Component
{
    /**
     * @param array<int, array{value: string, label: string, content?: string, disabled?: bool}> $items
     */
    public function __construct(
        public array $items = [],
        public ?string $value = null,
        public string $variant = 'line',
        public string $size = 'md',
        public string $orientation = 'horizontal',
    ) {
        if ($this->value === null && count($this->items) > 0) {
            $this->value = $this->items[0]['value'];
        }
    }

    public function classes(): string
    {
        $parts = ['hilal-tabs'];
        if ($this->variant !== 'line') $parts[] = "hilal-tabs--{$this->variant}";
        if ($this->size === 'sm')      $parts[] = 'hilal-tabs--sm';
        return implode(' ', $parts);
    }

    public function render(): View
    {
        return view('hilal::components.tabs');
    }
}
