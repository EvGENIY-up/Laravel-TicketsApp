@extends('layouts/app')

@section('body')
    <div id="root" data-main={{ json_encode($props) }}></div>
@endsection
