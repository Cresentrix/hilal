<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * Server-rendered toast region. Toasts can be flashed via session and rendered here.
 *
 *   // controller
 *   session()->flash('hilal.toast', ['tone' => 'success', 'title' => 'Saved']);
 *
 *   // layout
 *   <x-hilal-toast position="bottom-end" />
 */
class Toast extends Component
{
    public function __construct(
        public string $position = 'bottom-end',
        public string $sessionKey = 'hilal.toast',
    ) {
    }

    /**
     * @return array<int, array{tone?: string, title?: string, description?: string, icon?: string}>
     */
    public function items(): array
    {
        $raw = session($this->sessionKey, []);
        if (!is_array($raw)) return [];
        // accept either a single toast or an array of toasts
        return array_is_list($raw) ? $raw : [$raw];
    }

    public function render(): View
    {
        return view('hilal::components.toast');
    }
}
