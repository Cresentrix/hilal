@props([
  'name',
  'items' => [],
  'title' => 'Notifications',
  'side' => 'end',
  'groupOrder' => null,
  'emptyTitle' => 'You’re all caught up',
  'emptyDescription' => 'New notifications will show up here.',
])

<dialog
  id="{{ $name }}"
  class="{{ $classes() }}"
  @click="if ($event.target === $el) $el.close()"
>
  <header class="hilal-drawer__header">
    <h2 class="hilal-drawer__title">
      {{ $title }}
      @if($unreadCount() > 0)
        <span class="hilal-notification-center__count" aria-label="{{ $unreadCount() }} unread">{{ $unreadCount() }}</span>
      @endif
    </h2>
    <button type="button" class="hilal-drawer__close" aria-label="Close" @click="$el.closest('dialog').close()">×</button>
  </header>
  <div class="hilal-drawer__body">
    @if(empty($items))
      <div class="hilal-empty">
        <h3 class="hilal-empty__title">{{ $emptyTitle }}</h3>
        @if($emptyDescription)<p class="hilal-empty__desc">{{ $emptyDescription }}</p>@endif
      </div>
    @else
      <ul class="hilal-notification-center__list">
        @foreach($groupedItems() as $g)
          <li class="hilal-notification-center__group">
            @if(!empty($g['key']))
              <div class="hilal-notification-center__group-heading">{{ $g['key'] }}</div>
            @endif
            <ul class="hilal-notification-center__list">
              @foreach($g['items'] as $it)
                @php
                  $interactive = !empty($it['href']);
                  $tag = $interactive ? 'a' : 'div';
                @endphp
                <li>
                  <{{ $tag }}
                    class="{{ $rowClasses($it, $interactive) }}"
                    @if($interactive) href="{{ $it['href'] }}" @endif
                  >
                    <span class="hilal-notification-center__dot-cell" aria-hidden="true">
                      @if(!empty($it['unread']))
                        <span class="hilal-notification-center__dot"></span>
                      @endif
                    </span>
                    @if(!empty($it['avatarSrc']) || !empty($it['initials']))
                      <span class="hilal-avatar hilal-avatar--sm{{ (!empty($it['initials']) && empty($it['avatarSrc'])) ? ' hilal-avatar--initials' : '' }}">
                        @if(!empty($it['avatarSrc']))
                          <img class="hilal-avatar__img" src="{{ $it['avatarSrc'] }}" alt="" />
                        @else
                          {{ $it['initials'] }}
                        @endif
                      </span>
                    @endif
                    <div class="hilal-notification-center__col">
                      <div class="hilal-notification-center__title">{{ $it['title'] }}</div>
                      @if(!empty($it['body']))
                        <div class="hilal-notification-center__body">{{ $it['body'] }}</div>
                      @endif
                      @if(!empty($it['time']))
                        <div class="hilal-notification-center__time">{{ $it['time'] }}</div>
                      @endif
                    </div>
                  </{{ $tag }}>
                </li>
              @endforeach
            </ul>
          </li>
        @endforeach
      </ul>
    @endif
  </div>
  @isset($footer)
    <footer class="hilal-drawer__footer">{{ $footer }}</footer>
  @endisset
</dialog>
