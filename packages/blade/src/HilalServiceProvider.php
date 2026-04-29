<?php

declare(strict_types=1);

namespace Hilal\Blade;

use Illuminate\Support\ServiceProvider;
use Illuminate\View\Compilers\BladeCompiler;

class HilalServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // no-op
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'hilal');

        $this->callAfterResolving(BladeCompiler::class, function (BladeCompiler $blade): void {
            $blade->componentNamespace('Hilal\\Blade\\Components', 'hilal');

            // <x-hilal-button>, <x-hilal-input>, …
            $blade->directive('hilalScripts', static function (): string {
                return '<?php echo \'<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>\'; ?>';
            });
        });

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/hilal'),
            ], 'hilal-views');
        }
    }
}
