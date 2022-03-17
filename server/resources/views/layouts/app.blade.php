<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/global.css">
    <link rel="stylesheet" href="/css/{{ $css }}.css">
    <title>Colladraw - {{ $title }}</title>
</head>
<body>
@yield('content')   
</body>
</html>
