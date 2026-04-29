@props(['value' => null, 'weekStartsOn' => 1, 'locale' => 'en-US', 'minDate' => null, 'maxDate' => null, 'name' => 'date'])

<div
  x-data="{
    locale: @js($locale),
    weekStartsOn: @js((int) $weekStartsOn),
    selected: @js($value),
    view: new Date(@js($value) || Date.now()),
    minDate: @js($minDate) ? new Date(@js($minDate)) : null,
    maxDate: @js($maxDate) ? new Date(@js($maxDate)) : null,
    title() { return new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric' }).format(this.view); },
    weekdays() {
      const fmt = new Intl.DateTimeFormat(this.locale, { weekday: 'short' });
      const baseSunday = new Date(Date.UTC(1970, 0, 4));
      const out = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(baseSunday);
        d.setUTCDate(baseSunday.getUTCDate() + ((this.weekStartsOn + i) % 7));
        out.push(fmt.format(d));
      }
      return out;
    },
    days() {
      const first = new Date(this.view.getFullYear(), this.view.getMonth(), 1);
      const lead = (first.getDay() - this.weekStartsOn + 7) % 7;
      const start = new Date(first); start.setDate(first.getDate() - lead);
      return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
    },
    iso(d) {
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    },
    dayClass(d) {
      const parts = ['hilal-calendar__day'];
      if (d.getMonth() !== this.view.getMonth()) parts.push('hilal-calendar__day--outside');
      const today = new Date();
      if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) parts.push('hilal-calendar__day--today');
      if (this.selected === this.iso(d)) parts.push('hilal-calendar__day--selected');
      return parts.join(' ');
    },
    dayDisabled(d) {
      if (this.minDate && d < this.minDate) return true;
      if (this.maxDate && d > this.maxDate) return true;
      return false;
    },
    select(d) {
      if (this.dayDisabled(d)) return;
      this.selected = this.iso(d);
      this.$dispatch('hilal-calendar-change', { value: this.selected });
    },
    prev() { this.view = new Date(this.view.getFullYear(), this.view.getMonth() - 1, 1); },
    next() { this.view = new Date(this.view.getFullYear(), this.view.getMonth() + 1, 1); },
  }"
  {{ $attributes->merge(['class' => 'hilal-calendar']) }}
>
  <header class="hilal-calendar__header">
    <button type="button" class="hilal-calendar__nav" data-prev aria-label="Previous month" @click="prev()">‹</button>
    <span class="hilal-calendar__title" x-text="title()" aria-live="polite"></span>
    <button type="button" class="hilal-calendar__nav" data-next aria-label="Next month" @click="next()">›</button>
  </header>
  <div class="hilal-calendar__weekdays" aria-hidden="true">
    <template x-for="l in weekdays()" :key="l"><span x-text="l"></span></template>
  </div>
  <div class="hilal-calendar__grid" role="grid">
    <template x-for="d in days()" :key="iso(d)">
      <button type="button" role="gridcell"
        :class="dayClass(d)" :aria-selected="selected === iso(d)" :disabled="dayDisabled(d)"
        @click="select(d)" x-text="d.getDate()"></button>
    </template>
  </div>
  <input type="hidden" :name="@js($name)" :value="selected" />
</div>
