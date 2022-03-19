@extends('layouts.app')
<head>
    <link rel="stylesheet" href="{{ asset("/css/profile.css") }}">
    <title>Colladraw - Profile</title>
</head>

@section('content')
<header>
    <div class="thumbnail"></div>
    <div class="profile">
        <div>
          <div class="picture"></div>
          <div class="info">
              <h2>{{ $user->name }}</h2>
              <p>Joined {{ date('F Y', strtotime($user->created_at)) }}</p>
          </div>
        </div>
        <a href="/" class="button fill">
          <img src="/images/arrow-left.svg" alt="back to homepage">
          Back to homepage
        </a>
    </div>
</header>

<div class="drawings">
    @if (!$user_drawings)
      <p>No drawings.</p>
    @endif
    @foreach($user_drawings as $drawing)
    @php
    // dd(json_decode($drawing['members']));   
    @endphp
    <a href="/drawings/{{ $drawing['uuid'] }}" class="drawing">
        <header class="thumbnail"></header>
        <footer>
            <div class="info">
                <h2>{{ $drawing['uuid'] }}</h2>
                <p>Created by {{ json_decode($drawing['members'])[0] }} in {{ date('F Y', strtotime($drawing['created_at'])) }}</p>
            </div>
            {{-- <button class="settings">
                <div></div>
            </button> --}}
        </footer>
    </a>
    @endforeach

</div>

@endsection