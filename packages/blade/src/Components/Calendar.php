<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Calendar extends Component
{
    public function __construct(
        public ?string $value = null,
        public int $weekStartsOn = 1,
        public string $locale = 'en-US',
        public ?string $minDate = null,
        public ?string $maxDate = null,
        public string $name = 'date',
    ) {
    }

    public function render(): View
    {
        return view('hilal::components.calendar');
    }
}
