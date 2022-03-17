@extends('layouts.login')

@section('form')
<form action="/login" method="POST">
  @csrf
  <input type="email" placeholder="Email" name="email" class="field">
  <input type="password" placeholder="Password" name="password" class="field">
  <div>
    <a href="/register" class="button">Register</a>
    <button class="button fill" type="submit">Log in</button>
  </div>
</form>
@endsection
