@extends('layouts.app')

<head>
    <link rel="stylesheet" href="/css/drawing.css">
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
        <li id="download">
          <img src="{{ asset("/images/icons/icon-download.svg") }}" alt="download">
          <ul>
            <li>
              <button id="save-pdf">PDF</button>
            </li>
            <li>
              <button id="save-png">PNG</button>
            </li>
          </ul>
        </li>
        @if (Auth::user())
        <li id="profile">
          <img src="{{ asset("/images/icons/user-icon.svg") }}" alt="profile">
          <ul>
            <li>
              <button>Log out</button>
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
            <li id="pen"><button><img src="{{ asset("/images/icons/icon-pen.svg") }}" alt="pen"></button></li>
            <li id="rubber"><button><img src="{{ asset("/images/icons/icon-rubber.svg") }}" alt="rubber"></button></li>
            <li id="rectangle"><button><img src="{{ asset("/images/icons/icon-rectangle.svg") }}" alt="rectangle"></button></li>
            <li id="ellipse"><button><img src="{{ asset("/images/icons/icon-ellipse.svg") }}" alt="ellipse"></button></li>
            <li id="triangle"><button><img src="{{ asset("/images/icons/icone_triangle.svg") }}" alt="triangle"></button></li>
            <li id="line"><button><img src="{{ asset("/images/icons/icon-line.svg") }}" alt="line tool"></button></li>
            <li id="text"><button><img src="{{ asset("/images/icons/icon-text.svg") }}" alt="text tool"></button></li>
            <li id="background"><button><img class="change-icon" src="{{ asset("/images/icons/background.svg") }}" alt="stroke fill rectangles"></button></li>
            <li id="undo"><button><img src="{{ asset("/images/icons/arrow-left.svg") }}" alt="undo"></button></li>
            <li id="redo"><button><img src="{{ asset("/images/icons/arrow-right.svg") }}" alt="redo"></button></li>
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

<script src="http://localhost:8001/socket.io/socket.io.js"></script>
<script type="module" src="{{ asset("/js/canvas.js") }}"></script>

@endsection