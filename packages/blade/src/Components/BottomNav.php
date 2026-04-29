<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class BottomNav extends Component
{
    public function __construct(
        public string $variant = 'default',
        public string $ariaLabel = 'Primary',
    ) {
    }

    public function classes(): string
    {
        return $this->variant === 'floating' ? 'hilal-bottomnav hilal-bottomnav--floating' : 'hilal-bottomnav';
    }

    public function render(): View
    {
        return view('hilal::components.bottom-nav');
    }
}
