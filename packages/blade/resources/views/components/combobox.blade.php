@props(['options' => [], 'value' => null, 'size' => 'md', 'label' => null, 'hint' => null, 'error' => null, 'placeholder' => 'Select…', 'disabled' => false, 'emptyMessage' => 'No results', 'name' => 'value'])

@php $inputId = $attributes->get('id') ?: 'hilal-cb-'.uniqid(); @endphp

<div
  x-data="{
    options: @js($options),
    value: @js($value),
    query: @js($selectedLabel()),
    open: false,
    activeIndex: 0,
    filtered() {
      if (!this.query || this.query === this.selectedLabel()) return this.options;
      return this.options.filter(o => o.label.toLowerCase().includes(this.query.toLowerCase()));
    },
    selectedLabel() {
      const sel = this.options.find(o => o.value === this.value);
      return sel ? sel.label : '';
    },
    commit(opt) {
      if (opt.disabled) return;
      this.value = opt.value;
      this.query = opt.label;
      this.open = false;
      this.$dispatch('hilal-combobox-change', { value: opt.value });
    },
    onKey(e) {
      const list = this.filtered();
      if (e.key === 'ArrowDown') { e.preventDefault(); this.open = true; this.activeIndex = Math.min(this.activeIndex + 1, list.length - 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); this.activeIndex = Math.max(this.activeIndex - 1, 0); }
      else if (e.key === 'Enter') { e.preventDefault(); if (list[this.activeIndex]) this.commit(list[this.activeIndex]); }
      else if (e.key === 'Escape') { this.open = false; }
    }
  }"
  @click.outside="open = false"
  class="hilal-field hilal-combobox hilal-field--{{ $size }}"
  data-state="{{ $state() }}"
>
  @if($label)
    <label class="hilal-field__label" for="{{ $inputId }}">{{ $label }}</label>
  @endif
  <div class="hilal-field__control hilal-combobox__control">
    <input
      id="{{ $inputId }}"
      class="hilal-input hilal-combobox__input"
      role="combobox"
      :aria-expanded="open"
      :aria-controls="@js($inputId).concat('-listbox')"
      aria-autocomplete="list"
      placeholder="{{ $placeholder }}"
      x-model="query"
      @focus="open = true"
      @input="open = true; activeIndex = 0"
      @keydown="onKey($event)"
      @if($disabled) disabled @endif
    />
    <span class="hilal-select__chevron" aria-hidden="true">▾</span>
  </div>
  <ul x-show="open && !@js($disabled)" :id="@js($inputId).concat('-listbox')" class="hilal-combobox__listbox" role="listbox" x-cloak>
    <template x-if="filtered().length === 0">
      <li class="hilal-combobox__empty">{{ $emptyMessage }}</li>
    </template>
    <template x-for="(opt, i) in filtered()" :key="opt.value">
      <li
        :id="@js($inputId).concat('-listbox-') + i"
        role="option"
        :aria-selected="opt.value === value"
        :class="i === activeIndex ? 'hilal-combobox__option hilal-combobox__option--active' : 'hilal-combobox__option'"
        @mousedown.prevent="commit(opt)"
        @mouseenter="activeIndex = i"
        x-text="opt.label"
      ></li>
    </template>
  </ul>
  @if($message = ($error ?? $hint))
    <p class="hilal-field__hint">{{ $message }}</p>
  @endif
  <input type="hidden" name="{{ $name }}" :value="value" />
</div>
