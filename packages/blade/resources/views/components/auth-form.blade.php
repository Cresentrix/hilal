@props(['action' => '', 'method' => 'POST', 'mode' => 'sign-in', 'title' => null, 'description' => null, 'submitLabel' => null, 'collectName' => null, 'error' => null])

<article class="hilal-card hilal-card--elevated hilal-card--md hilal-auth-form">
  <header class="hilal-card__header">
    <div>
      <h1 class="hilal-auth-form__title">{{ $effectiveTitle() }}</h1>
      @if($description)<p class="hilal-auth-form__desc">{{ $description }}</p>@endif
    </div>
  </header>
  <div class="hilal-card__body">
    @isset($social){{ $social }}@endisset
    @if($error)
      <div class="hilal-alert hilal-alert--danger" role="status">
        <div class="hilal-alert__body"><p class="hilal-alert__desc">{{ $error }}</p></div>
      </div>
    @endif
    <form action="{{ $action }}" method="{{ $method }}">
      @csrf
      @if($collectName)
        <div class="hilal-field hilal-field--md">
          <label class="hilal-field__label" for="hilal-auth-name">Name</label>
          <div class="hilal-field__control">
            <input id="hilal-auth-name" class="hilal-input" type="text" name="name" autocomplete="name" required value="{{ old('name') }}" />
          </div>
        </div>
      @endif
      <div class="hilal-field hilal-field--md">
        <label class="hilal-field__label" for="hilal-auth-email">Email</label>
        <div class="hilal-field__control">
          <input id="hilal-auth-email" class="hilal-input" type="email" name="email" autocomplete="email" required value="{{ old('email') }}" />
        </div>
      </div>
      <div class="hilal-field hilal-field--md">
        <label class="hilal-field__label" for="hilal-auth-password">Password</label>
        <div class="hilal-field__control">
          <input id="hilal-auth-password" class="hilal-input" type="password" name="password"
            autocomplete="{{ $mode === 'sign-in' ? 'current-password' : 'new-password' }}" required />
        </div>
      </div>
      <button type="submit" class="hilal-btn hilal-btn--primary hilal-btn--md">{{ $effectiveSubmitLabel() }}</button>
    </form>
  </div>
  @isset($footer)
    <footer class="hilal-card__footer">{{ $footer }}</footer>
  @endisset
</article>
