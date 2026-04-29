<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Combobox extends Component
{
    /**
     * @param array<int, array{value: string, label: string, disabled?: bool}> $options
     */
    public function __construct(
        public array $options = [],
        public ?string $value = null,
        public string $size = 'md',
        public ?string $label = null,
        public ?string $hint = null,
        public ?string $error = null,
        public string $placeholder = 'Select…',
        public bool $disabled = false,
        public string $emptyMessage = 'No results',
        public string $name = 'value',
    ) {
    }

    public function state(): string
    {
        if ($this->error)    return 'error';
        if ($this->disabled) return 'disabled';
        return 'default';
    }

    public function selectedLabel(): string
    {
        foreach ($this->options as $o) {
            if ($o['value'] === $this->value) return $o['label'];
        }
        return '';
    }

    public function render(): View
    {
        return view('hilal::components.combobox');
    }
}
