<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class MultiStepForm extends Component
{
    /**
     * Blade rendering is server-side, so this pattern renders all step slots in
     * the DOM and an Alpine controller toggles which one is visible.
     *
     * @param array<int, array{label: string}> $steps
     *   Step metadata used for the Stepper. The actual step content is provided
     *   via named slots, e.g. <x-slot:step0>...</x-slot:step0>.
     */
    public function __construct(
        public array $steps = [],
        public int $step = 0,
        public string $orientation = 'horizontal',
        public string $nextLabel = 'Next',
        public string $backLabel = 'Back',
        public string $submitLabel = 'Submit',
        public ?string $action = null,
        public string $method = 'POST',
    ) {
    }

    /**
     * @return array<int, array{label: string, status: string}>
     */
    public function stepperItems(): array
    {
        $out = [];
        foreach ($this->steps as $i => $s) {
            $status = $i < $this->step ? 'complete' : ($i === $this->step ? 'current' : 'upcoming');
            $out[] = ['label' => $s['label'], 'status' => $status];
        }
        return $out;
    }

    public function render(): View
    {
        return view('hilal::components.multi-step-form');
    }
}
