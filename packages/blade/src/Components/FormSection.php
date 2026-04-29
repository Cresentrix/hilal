<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class FormSection extends Component
{
    public function __construct(
        public string $title = '',
        public ?string $description = null,
        public bool $twoColumn = false,
    ) {
    }

    public function classes(): string
    {
        return $this->twoColumn ? 'hilal-form-section hilal-form-section--two-column' : 'hilal-form-section';
    }

    public function render(): View
    {
        return view('hilal::components.form-section');
    }
}
