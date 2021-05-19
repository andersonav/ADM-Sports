@extends('layouts.master')

@section('content')

<input type="hidden" ng-init="vm.Dashboard.QTD_ALUNOS = {{$countAlunos}}">
<input type="hidden" ng-init="vm.Dashboard.QTD_CLIENTES = {{$countClientes}}">
<main>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="activity"></i></div>
                            Dashboard
                        </h1>
                        <div class="page-header-subtitle">Resumo de movimentações em ADM Sports</div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" id="reportrange">
                            <i class="mr-2 text-primary" data-feather="calendar"></i>
                            <span></span>
                            <i class="ml-1" data-feather="chevron-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Main page content-->
    <div class="container mt-n10">
        <!-- Example Colored Cards for Dashboard Demo-->
        <div class="row">
            <div class="col-xxl-3 col-lg-6">
                <div class="card bg-primary text-white mb-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-3">
                                <div class="text-white-75 small">Quantidade de Alunos</div>
                                <div class="text-lg font-weight-bold" ng-bind="vm.Dashboard.QTD_ALUNOS"></div>
                            </div>
                            <i class="feather-xl text-white-50" data-feather="users"></i>
                        </div>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">Gerenciar</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>

            <div class="col-xxl-3 col-lg-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-3">
                                <div class="text-white-75 small">Quantidade de Clientes</div>
                                <div class="text-lg font-weight-bold" ng-bind="vm.Dashboard.QTD_CLIENTES"></div>
                            </div>
                            <i class="feather-xl text-white-50" data-feather="user"></i>
                        </div>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">Gerenciar</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>

            <div class="col-xxl-3 col-lg-6">
                <div class="card bg-warning text-white mb-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-3">
                                <div class="text-white-75 small">Contas a receber</div>
                                <div class="text-lg font-weight-bold" ng-bind="vm.Dashboard.CONTAS_RECEBER_VISUALIZACAO"></div>
                            </div>
                            <i class="feather-xl text-white-50" data-feather="dollar-sign"></i>
                        </div>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">Gerenciar</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>

            <div class="col-xxl-3 col-lg-6">
                <div class="card bg-danger text-white mb-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-3">
                                <div class="text-white-75 small">Contas a pagar</div>
                                <div class="text-lg font-weight-bold" ng-bind="vm.Dashboard.CONTAS_PAGAR_VISUALIZACAO"></div>
                            </div>
                            <i class="feather-xl text-white-50" data-feather="dollar-sign"></i>
                        </div>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">Gerenciar</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Example Charts for Dashboard Demo-->
        <div class="row">
            <div class="col-xl-6 mb-4">
                <div class="card card-header-actions h-100">
                    <div class="card-header">
                        Módulos de conta
                    </div>
                    <div class="card-body">
                        <div class="chart-area"><canvas id="myMovimentacoesChart" width="100%" height="30"></canvas></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 mb-4">
                <div class="card card-header-actions h-100">
                    <div class="card-header">
                        Saldos Disponíveis
                    </div>
                    <div class="card-body">
                        <div class="chart-bar"><canvas id="mySaldoChart" width="100%" height="30"></canvas></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Example DataTable for Dashboard Demo-->
        <div class="row">

            <div class="col-xl-6 mb-4">
                <div class="card card-header-actions h-100">
                    <div class="card-header">
                       Estatísticas de Alunos
                    </div>
                    <div class="card-body">
                        <div class="chart-area"><canvas id="myAlunoChart" width="100%" height="30"></canvas></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 mb-4">
                <div class="card card-header-actions h-100">
                    <div class="card-header">
                        Contas Bancárias
                    </div>
                    <div class="card-body">
                        <div class="chart-bar"><canvas id="myContaChart" width="100%" height="30"></canvas></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

@endsection

@section('script')
<script src="{{ asset('assets/js/dashboard.js') }}"></script>
@endsection