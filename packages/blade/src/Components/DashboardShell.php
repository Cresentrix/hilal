<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class DashboardShell extends Component
{
    public function render(): View
    {
        return view('hilal::components.dashboard-shell');
    }
}
