@extends('layouts.app')

<head>
    <link rel="stylesheet" href="/css/not-found.css">
    <title>Colladraw - {{ $type === 'classic' ? 'Page' : 'Drawing' }} not found</title>
</head>


@section('content')

<header>
    <a href="/">
      <img src="{{ asset("/images/logo.svg") }}" alt="logo colladraw">
    </a>
</header>

<main>
  <h1>This {{ $type === 'classic' ? 'page' : 'drawing' }} doesn't exist...</h1>

  <a href="/" class="button fill">
    <img src="{{ asset("/images/arrow-left.svg") }}" alt="back to homepage">
    Back to homepage
  </a>
</main>

@endsection