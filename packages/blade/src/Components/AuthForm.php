<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class AuthForm extends Component
{
    public function __construct(
        public string $action = '',
        public string $method = 'POST',
        public string $mode = 'sign-in',
        public ?string $title = null,
        public ?string $description = null,
        public ?string $submitLabel = null,
        public ?bool $collectName = null,
        public ?string $error = null,
    ) {
        if ($this->collectName === null) {
            $this->collectName = $mode === 'sign-up';
        }
    }

    public function effectiveTitle(): string
    {
        return $this->title ?? ($this->mode === 'sign-in' ? 'Sign in' : 'Create account');
    }

    public function effectiveSubmitLabel(): string
    {
        return $this->submitLabel ?? ($this->mode === 'sign-in' ? 'Sign in' : 'Create account');
    }

    public function render(): View
    {
        return view('hilal::components.auth-form');
    }
}
