@extends('layouts/app')
@section('body')
    <div id="root" props='{{ json_encode($props) }}'></div>
@endsection
