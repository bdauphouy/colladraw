@extends('layouts.app')

@section('content')
<header>
    <a href="/">
        <img src="/images/logo.svg" alt="logo colladraw" />
    </a>
    <div>
        @if (!Auth::user())
            <a href="/register" class="button">Register</a>
            <a href="/login" class="button fill">Log in</a>
        @else
            <a id="logout" href="/logout" class="button">Log out</a>
            <a href="/profile" class="button fill">Profile</a>
        @endif
    </div>

</header>
<main>
    <div class="content">
        @if (!Auth::user())
        <h1>Colladraw</h1>
        <h2>The collaborative online whiteboard.</h2>
        @else
        <h1>Hi {{ Auth::user()->name }}!</h1>
        <h2>Start a new session now.</h2>
        @endif
        <form action="/drawings" method="POST" id="create-session">
            @csrf
            @if (!Auth::user())
            <input id="username" class="field" type="text" placeholder="Username" />
            @endif
            <button class="button fill">Create a session</button>
        </form>
    </div>
    <img src="/images/illustration.png" alt="illustration" />
</main>
<script type="module" src="/js/home.js"></script>
@endsection
