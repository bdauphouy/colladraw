@extends('layouts.app')

@section('content')
<pre>
  {{ $drawing }}
</pre>
<canvas id="canvas"></canvas>
<script src="/js/canvas.js" type="module"></script>
@endsection
