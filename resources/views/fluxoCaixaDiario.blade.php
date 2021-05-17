@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/fluxoCaixaDiario.css')}}" rel="stylesheet" />

@endsection

@section('content')
<main>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container-fluid">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="users"></i></div>
                            Fluxo de Caixa Diário
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
                            <select class="custom-select" ng-model="vm.FluxoCaixaDiario.ANO">
                                <option ng-repeat="item in vm.ARRAY_ANOS track by $index" ng-value="item.ANO">@{{item.ANO}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-xl-2 col-lg-6 col-sm-12 col-md-12">
                        <div class="form-group">
                            <label>Mês:</label>
                            <select class="custom-select" ng-model="vm.FluxoCaixaDiario.MES">
                                <option ng-repeat="item in vm.ARRAY_MESES track by $index" ng-value="item.VALOR">@{{item.MES}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-xl-2 col-lg-6 col-sm-12 col-md-12">

                        <div class="form-group" style="margin-top: 29px;">
                            <button class="btn btn-primary p-3" ng-click="vm.FluxoCaixaDiario.consultar();">
                                <i class="mr-2 text-white" data-feather="filter"></i>
                                <span>Filtrar</span>

                                <span class="badge badge-counter">ALT + F</span>
                            </button>
                        </div>

                    </div>

                </div>

                <div class="row">
                    <div class="col-xl-12 mb-4">
                        <div class="card card-header-actions">
                            <div class="card-header">
                                Movimentações diárias
                                
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
<script src="{{ asset('assets/js/fluxoCaixaDiario.js') }}"></script>
@endsection