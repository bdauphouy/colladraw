@extends('layouts.app')

<head>
    <link rel="stylesheet" href="{{ asset("/css/profile.css") }}">
    <title>Colladraw - Drawing</title>
</head>


@section('content')

<header>
    <a href="/">
      <img src="{{ asset("/images/logo.svg") }}" alt="logo colladraw">
    </a>
{{-- 
    <div class="message-mobile">
      <h1 class="sentence-mobile">Go to your Desktop or tablet to discover our solution</h1>
    </div> --}}

    <ul class="header-icons">
        <li><img src="{{ asset("/images/icons/icon-trash.svg") }}" alt="trash"></li>
        <li><img src="{{ asset("/images/icons/icon-download.svg") }}" alt="download"></li>
        <li><img src="{{ asset("/images/icons/icon-upload.svg") }}" alt="upload"></li>
        @if (!Auth::user())
        <li id="profile">
          <img src="{{ asset("/images/icons/user-icon.svg") }}" alt="profile">
          <ul>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/logout">Log out</a>
            </li>
          </ul>
        </li>
        @endif
    </ul>

    {{-- <div class="members">

    </div> --}}

    {{-- @if (Auth::user())
    <ul class="profile-panel">
      <li><a href="/profile">Profile</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
    @endif --}}
</header>

<main>
    <aside class="panel left-panel show">
        <header>
          <img class="toggle-icon" src="{{ asset("/images/icons/icon-tools-chevron.svg") }}" alt="toggle colors"> 
        </header>

        <ul class="colors">
          @for ($i = 1; $i <= 10; $i++)
          <li class="color-{{ $i }}"></li>
          @endfor
          <li>
            <input type="color" id="color-picker" value="#ffffff">
          </li>
        </ul> 
    </aside>

    <canvas id="canvas"></canvas>

    <aside class="panel right-panel show">
        <header>
          <img class="toggle-icon" src="{{ asset("/images/icons/icon-colors-chevron.svg") }}" alt="toggle tools">
        </header>

        <ul class="tools">
            <li id="pen"><img src="{{ asset("/images/icons/icon-pen.svg") }}" alt="pen"></li>
            <li id="rubber"><img src="{{ asset("/images/icons/icon-rubber.svg") }}" alt="rubber"></li>
            <li id="rectangle"><img src="{{ asset("/images/icons/icon-rectangle.svg") }}" alt="rectangle"></li>
            <li id="ellipse"><img src="{{ asset("/images/icons/icon-ellipse.svg") }}" alt="ellipse"></li>
            <li id="triangle"><img src="{{ asset("/images/icons/icone_triangle.svg") }}" alt="triangle"></li>
            <li id="line"><img src="{{ asset("/images/icons/icon-line.svg") }}" alt="line tool"></li>
            <li id="text"><img src="{{ asset("/images/icons/icon-text.svg") }}" alt="text tool"></li>
            <li id="background"><img class="change-icon" src="{{ asset("/images/icons/background.svg") }}" alt="stroke fill rectangles"></li>
            <li><img src="{{ asset("/images/icons/arrow-left.svg") }}" alt="undo"></li>
            <li><img src="{{ asset("/images/icons/arrow-right.svg") }}" alt="redo"></li>
        </ul>
{{--             
        <details class="typo-choices">
      
          <summary>
            <h1>fonts</h1>
          </summary>

      <ul name="fonts" class="select-fonts" id="select-fonts">
        <li id="first-font">Helvetica</li>
        <li id="second-font">Time New Roman</li>
        <li id="third-font">Courier New</li>
      </ul>

    </details> --}}
    </aside>     

</main>

<script type="module" src="{{ asset("/js/canvas.js") }}"></script>

@endsection