@props(['name', 'items' => [], 'placeholder' => 'Type a command or search…', 'emptyMessage' => 'No matches.', 'groupOrder' => null])

@php
  $groups = $groupedItems();
  $flat = [];
  foreach ($groups as $g) { foreach ($g['items'] as $it) { $flat[] = $it; } }
  $jsonItems = json_encode($flat, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
@endphp

<dialog
  id="{{ $name }}"
  class="hilal-modal hilal-modal--md hilal-cmd-palette"
  x-data="hilalCommandPalette({{ $jsonItems }})"
  @click="if ($event.target === $el) $el.close()"
  @keydown.window.escape="if ($el.open) $el.close()"
>
  <div @keydown="onKey($event)">
    <div class="hilal-cmd-palette__input-row">
      <span class="hilal-cmd-palette__search" aria-hidden="true">⌕</span>
      <input
        x-ref="input"
        type="text"
        class="hilal-cmd-palette__input"
        placeholder="{{ $placeholder }}"
        aria-label="Search commands"
        autocomplete="off"
        spellcheck="false"
        x-model="query"
      />
      <kbd class="hilal-cmd-palette__kbd">Esc</kbd>
    </div>
    <div class="hilal-modal__body hilal-cmd-palette__body">
      <div x-show="filtered.length === 0" class="hilal-cmd-palette__empty">{{ $emptyMessage }}</div>
      <ul x-show="filtered.length > 0" class="hilal-cmd-palette__list" role="listbox">
        <template x-for="g in grouped" :key="g.key || '__none'">
          <li>
            <div x-show="g.key" class="hilal-cmd-palette__group-heading" x-text="g.key"></div>
            <ul class="hilal-cmd-palette__list">
              <template x-for="it in g.items" :key="it.id">
                <li
                  role="option"
                  :aria-selected="filtered.indexOf(it) === activeIndex"
                  :aria-disabled="it.disabled ? 'true' : null"
                  :data-cmd-index="filtered.indexOf(it)"
                  class="hilal-cmd-palette__row"
                  @mouseenter="activeIndex = filtered.indexOf(it)"
                  @click="commit(it)"
                >
                  <span class="hilal-cmd-palette__icon-spacer"></span>
                  <div class="hilal-cmd-palette__col">
                    <div class="hilal-cmd-palette__label" x-text="it.label"></div>
                    <div x-show="it.hint" class="hilal-cmd-palette__hint" x-text="it.hint"></div>
                  </div>
                  <kbd x-show="it.shortcut" class="hilal-cmd-palette__kbd" x-text="it.shortcut"></kbd>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </div>
</dialog>

<script>
window.hilalCommandPalette = window.hilalCommandPalette || function (items) {
  return {
    items,
    query: '',
    activeIndex: 0,
    get filtered() {
      const q = (this.query || '').toLowerCase().trim();
      if (!q) return this.items;
      return this.items.filter((it) => {
        if ((it.label || '').toLowerCase().includes(q)) return true;
        return (it.keywords || []).some((k) => (k || '').toLowerCase().includes(q));
      });
    },
    get grouped() {
      const map = new Map();
      for (const it of this.filtered) {
        const k = it.group || '';
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(it);
      }
      return Array.from(map.entries()).map(([key, items]) => ({ key, items }));
    },
    onKey(e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); this.move(1); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); this.move(-1); return; }
      if (e.key === 'Enter')     { e.preventDefault(); this.commit(this.filtered[this.activeIndex]); return; }
    },
    move(delta) {
      const list = this.filtered;
      if (list.length === 0) return;
      this.activeIndex = (this.activeIndex + delta + list.length) % list.length;
    },
    commit(it) {
      if (!it || it.disabled) return;
      this.$el.closest('dialog').dispatchEvent(new CustomEvent('hilal:command-select', { detail: it, bubbles: true }));
      this.$el.closest('dialog').close();
    },
    init() {
      this.$watch('query', () => { this.activeIndex = 0; });
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus());
    },
  };
};
</script>
