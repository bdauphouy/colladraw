@extends('layouts.login')

<head>
    <link rel="stylesheet" href="{{ asset("/css/login.css") }}">
    <title>Colladraw - Register</title>
</head>

@section('form')
<form action="/register" method="POST">
  @csrf
  <div class="field-group">
    <input type="text" placeholder="Name" name="name" class="field">
    @error('name')
      <span class="error">{{ $message }}</span>
    @enderror
  </div>
  <div class="field-group">
    <input type="email" placeholder="Email" name="email" class="field">
    @error('email')
      <span class="error">{{ $message }}</span>
    @enderror
  </div>
  <div class="field-group">
    <input type="password" placeholder="Password" name="password" class="field">
    @error('password')
      <span class="error">{{ $message }}</span>
    @enderror
  </div>
  <div class="field-group">
    <input type="password" placeholder="Confirm password" name="password_confirmation" class="field">
  </div>
  <div>
    <a href="/login" class="button">Log in</a>
    <button class="button fill" type="submit">Register</button>
  </div>
</form>
@endsection
