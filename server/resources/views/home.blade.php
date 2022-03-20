@extends('layouts.app')

<head>
    <link rel="stylesheet" href="/css/index.css">
    <title>Colladraw - The collaborative online whiteboard.</title>
</head>

@section('content')
<header>
    <a href="/">
        <img src="{{ "/images/logo.svg" }}" alt="logo colladraw" />
    </a>
    <div>
        @if (!Auth::user())
            <a href="/register" class="button">Register</a>
            <a href="/login" class="button fill">Log in</a>
        @else
            <button id="logout" class="button">Log out</button>
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
        <form id="create-session">
            @csrf
            @if (!Auth::user())
            <div>
                <input id="username" class="field" type="text" placeholder="Username" />
                <span class="error"></span>
            </div>
            @endif
            <button class="button fill" id="open-modal">Create a session</button>
        </form>
    </div>
    <img src="{{ asset("/images/illustration.png") }}" alt="illustration" />
    <dialog id="create-session-modal">
        <header>
            <img src="{{ "/images/logo.svg" }}" alt="logo colladraw" />
        </header>
        <p>Share the link with your friend !</p>
        <div>
            <input id="modal-uuid" type="text" class="field" disabled>
            <button type="text" class="button" id="copy-button">Copy</button>
        </div>
        <div>
            <button class="button" id="close-modal">Close</button>
            <button class="button fill" id="draw">Draw</button>
        </div>
    </dialog>
</main>
<script type="module" src="{{ asset("/js/home.js") }}"></script>
@endsection
