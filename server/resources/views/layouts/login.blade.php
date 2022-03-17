@extends('layouts.app')

@section('content')
<header>
  <a href="/" class="button fill">
    <img src="/images/arrow-left.svg" alt="back to homepage">
    Back to homepage
  </a>
</header>
<div class="container">
  <img src="/images/logo.svg" alt="logo colladraw">
  @yield('form')
</div>
@endsection
