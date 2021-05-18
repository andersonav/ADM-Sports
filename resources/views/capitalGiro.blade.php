@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/capitalGiro.css')}}" rel="stylesheet" />

@endsection

@section('content')
<main>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container-fluid">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="database"></i></div>
                            Capital de Giro
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    <!-- Main page content-->
    <div class="container-fluid mt-n10">

        <div class="card">
            <div class="card-body">
                <div class="row">

                    <div class="col-xl-2 col-lg-6 col-sm-12 col-md-12">
                        <div class="form-group">
                            <label>Ano:</label>
                            <select class="custom-select" ng-model="vm.CapitalGiro.ANO" ng-change="vm.CapitalGiro.consultar();">
                                <option ng-repeat="item in vm.ARRAY_ANOS track by $index" ng-value="item.ANO">@{{item.ANO}}</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-xl-12 mb-4">
                        <div class="card card-header-actions">
                            <div class="card-header">
                                
                                
                            </div>
                            <div class="card-body">
                                <div class=""><canvas id="myAreaStacked" width="100%" height="30"></canvas></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
</main>

@endsection


@section('script')
<script src="{{ asset('assets/js/capitalGiro.js') }}"></script>
@endsection