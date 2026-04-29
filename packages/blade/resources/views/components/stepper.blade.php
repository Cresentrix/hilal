@props(['steps' => [], 'orientation' => 'horizontal'])

<ol {{ $attributes->merge(['class' => 'hilal-stepper']) }} data-orientation="{{ $orientation }}">
  @foreach($steps as $i => $s)
    @php
      $status = $s['status'] ?? 'upcoming';
      $indicator = $s['indicator'] ?? ($status === 'complete' ? '✓' : ($i + 1));
    @endphp
    <li class="hilal-stepper__step" data-status="{{ $status }}" @if($status === 'current') aria-current="step" @endif>
      <span class="hilal-stepper__indicator" aria-hidden="true">{{ $indicator }}</span>
      <span class="hilal-stepper__label">{{ $s['label'] }}</span>
    </li>
  @endforeach
</ol>
