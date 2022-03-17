@extends('layouts.login')

@section('form')
<form action="/register" method="POST">
  @csrf
  <input type="text" placeholder="Name" name="name" class="field">
  <input type="email" placeholder="Email" name="email" class="field">
  <input type="password" placeholder="Password" name="password" class="field">
  <input type="password" placeholder="Confirm password" name="password_confirmation" class="field">
  <div>
    <a href="/login" class="button">Log in</a>
    <button class="button fill" type="submit">Register</button>
  </div>
</form>
@endsection
