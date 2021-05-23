@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/meta.css')}}" rel="stylesheet" />

@endsection

@section('content')
<main>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container-fluid">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="file"></i></div>
                            Gerenciamento de Metas Financeiras
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" ng-click="vm.Meta.incluir();" data-hotkey="f6">
                            <i class="mr-2 text-primary" data-feather="plus-circle"></i>
                            <span>Incluir</span>

                            <span class="badge badge-counter">F6</span>

                        </button>
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

                    <div class="col-sm-12" style="margin-top: 25px !important;">
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0" id="dataTableMeta">

                            </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>

    </div>
</main>


<div class="modal" id="modalMeta" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Meta.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Meta.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Meta.INCLUINDO == false && vm.Meta.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body" style="height: calc(100vh - 490px);">
                <form>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="identificador">ID:</label>
                                <input class="form-control" id="identificador" type="text" ng-disabled="true" ng-model="vm.Meta.SELECTED.DESC_ID">
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="status">Mês:</label>
                                <select class="custom-select" ng-model="vm.Meta.SELECTED.MES">
                                    <option ng-repeat="item in vm.ARRAY_MESES track by $index" ng-value="item.VALOR">@{{item.MES}}</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="status">Ano:</label>
                                <select class="custom-select" ng-model="vm.Meta.SELECTED.ANO">
                                    <option ng-repeat="item in vm.ARRAY_ANOS track by $index" ng-value="item.ANO">@{{item.ANO}}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <label for="">Valor:</label>
                            <div class="input-group input-group-joined">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i data-feather="dollar-sign"></i>
                                    </span>
                                </div>

                                <input ng-number-format="2" class="form-control" id="valorTotal" type="text" ng-disabled="vm.Meta.INCLUINDO == false && vm.Meta.ALTERANDO == false" ng-model="vm.Meta.SELECTED.VALOR">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="status">Tipo:</label>
                                <select class="form-control" id="status" ng-model="vm.Meta.SELECTED.TIPO" ng-disabled="vm.Meta.INCLUINDO == false && vm.Meta.ALTERANDO == false">
                                    <option ng-value="0">Saldo em caixa</option>
                                    <option ng-value="1">Margem de segurança</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.Meta.alterar();" ng-if="vm.Meta.INCLUINDO == false && vm.Meta.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.Meta.excluir();" ng-if="vm.Meta.INCLUINDO == false && vm.Meta.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.Meta.gravar();" ng-if="vm.Meta.INCLUINDO == true || vm.Meta.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.Meta.cancelar();" data-hotkey="esc" ng-if="vm.Meta.INCLUINDO == true || vm.Meta.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.Meta.INCLUINDO == false && vm.Meta.ALTERANDO == false">
                    <i class="mr-2 text-black" data-feather="corner-up-left"></i>
                    Voltar
                    <span class="badge badge-counter">ESC</span>
                </button>

            </div>
        </div>
    </div>
</div>

@endsection


@section('script')
<script src="{{ asset('assets/js/meta.js') }}"></script>
@endsection