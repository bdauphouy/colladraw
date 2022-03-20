@extends('layouts.login')

<head>
    <link rel="stylesheet" href="/css/login.css">
    <title>Colladraw - Login</title>
</head>

@section('form')
<form action="/login" method="POST">
  @csrf
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
  <div>
    <a href="/register" class="button">Register</a>
    <button class="button fill" type="submit">Log in</button>
  </div>
</form>
@endsection
