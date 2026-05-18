<?php

declare(strict_types=1);

namespace Hilal\Blade\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class NotificationCenter extends Component
{
    /**
     * @param array<int, array{
     *     id: string,
     *     title: string,
     *     body?: string,
     *     time?: string,
     *     avatarSrc?: string,
     *     initials?: string,
     *     group?: string,
     *     unread?: bool,
     *     href?: string
     * }> $items
     * @param array<int, string>|null $groupOrder
     */
    public function __construct(
        public string $name,
        public array $items = [],
        public string $title = 'Notifications',
        public string $side = 'end',
        public ?array $groupOrder = null,
        public string $emptyTitle = 'You’re all caught up',
        public ?string $emptyDescription = 'New notifications will show up here.',
    ) {
    }

    public function classes(): string
    {
        return "hilal-drawer hilal-drawer--{$this->side} hilal-drawer--md hilal-notification-center";
    }

    public function unreadCount(): int
    {
        return count(array_filter($this->items, static fn ($i) => !empty($i['unread'])));
    }

    /**
     * @return array<int, array{key: string, items: array<int, array<string, mixed>>}>
     */
    public function groupedItems(): array
    {
        $map = [];
        foreach ($this->items as $it) {
            $key = $it['group'] ?? '';
            $map[$key] ??= [];
            $map[$key][] = $it;
        }
        $keys = [];
        if ($this->groupOrder !== null) {
            foreach ($this->groupOrder as $g) {
                if (array_key_exists($g, $map)) {
                    $keys[] = $g;
                }
            }
        }
        foreach (array_keys($map) as $k) {
            if (!in_array($k, $keys, true)) {
                $keys[] = $k;
            }
        }
        $groups = [];
        foreach ($keys as $k) {
            $groups[] = ['key' => $k, 'items' => $map[$k]];
        }
        return $groups;
    }

    public function rowClasses(array $item, bool $interactive): string
    {
        $base = 'hilal-notification-center__row';
        $cls = $base;
        if ($interactive) {
            $cls .= " {$base}--interactive";
        }
        if (!empty($item['unread'])) {
            $cls .= " {$base}--unread";
        }
        return $cls;
    }

    public function render(): View
    {
        return view('hilal::components.notification-center');
    }
}
