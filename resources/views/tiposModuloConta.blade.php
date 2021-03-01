@extends('layouts.master')

@section('content')

<main>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="user"></i></div>
                            Gerenciamento de Tipos para Módulos de Conta
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">

                        <button class="btn btn-warning" id="buttonWithIcon" ng-click="vm.TiposModuloConta.incluir();">
                            <i class="fas fa-plus"></i>
                            Incluir
                            <span class="badge badge-white" id="atalho">F6</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Main page content-->
    <div class="container mt-n10">
        <div class="card mb-4">
            <div class="card-body">
                <div class="datatable">
                    <table class="table table-bordered table-hover" id="dataTableTiposModuloConta" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Descrição Resumida</th>
                                <th class="text-center">Operação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Descrição Resumida</th>
                                <th class="text-center">Operação</th>
                                <th>Ações</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr ng-repeat="item in vm.TiposModuloConta.DADOS track by $index">
                                <td ng-bind="item.DESC_ID"></td>
                                <td ng-bind="item.DESCRICAO"></td>
                                <td ng-bind="item.DESC_RESUMIDA"></td>
                                <td class="text-center">
                                    <span class="badge badge-red" ng-if="item.OPERACAO == 1" style="padding: 5px !important;">Saída</span>
                                    <span class="badge badge-green" ng-if="item.OPERACAO == 0" style="padding: 5px !important;">Entrada</span>
                                </td>
                                <td>
                                    <button class="btn btn-datatable btn-icon btn-transparent-dark mr-2" ng-click="vm.TiposModuloConta.alterar(item);"><i data-feather="edit"></i></button>
                                    <button class="btn btn-datatable btn-icon btn-transparent-dark" ng-click="vm.TiposModuloConta.excluir(item);"><i data-feather="trash-2"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalTiposModuloConta" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" ng-if="vm.TiposModuloConta.INCLUINDO">Gerenciamento de Tipos para Módulos de Conta - Inclusão</h5>
                        <h5 class="modal-title" ng-if="vm.TiposModuloConta.INCLUINDO == false && vm.TiposModuloConta.ALTERANDO == false">Gerenciamento de Tipos para Módulos de Conta - Visualização</h5>
                        <h5 class="modal-title" ng-if="vm.TiposModuloConta.ALTERANDO == true && vm.TiposModuloConta.INCLUINDO == false">Gerenciamento de Tipos para Módulos de Conta - Alteração</h5>
                    </div>
                    <div class="modal-body">

                        <form>
                            <div class="row">

                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label for="descricao">Descrição:</label>
                                        <input class="form-control required" id="descricao" type="text" ng-model="vm.TiposModuloConta.SELECTED.DESCRICAO" maxlength="200">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="descricaoResumida">Descrição Resumida:</label>
                                        <input class="form-control" id="descricaoResumida" type="text" ng-model="vm.TiposModuloConta.SELECTED.DESC_RESUMIDA" maxlength="20">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="operacao">Operação:</label>
                                        <select class="form-control" id="operacao" ng-model="vm.TiposModuloConta.SELECTED.OPERACAO">
                                            <option ng-value="0">Entrada</option>
                                            <option ng-value="1">Saída</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-success" id="buttonWithIcon" ng-click="vm.TiposModuloConta.gravar();">
                            <i class="fas fa-check"></i>
                            Gravar
                        </button>

                        <button class="btn btn-danger" id="buttonWithIcon" ng-click="vm.TiposModuloConta.cancelar();">
                            <i class="fas fa-ban"></i>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</main>
@endsection

@section('script')
<script src="{{ asset('assets/js/tiposModuloConta.js') }}"></script>
@endsection