@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/conferencia.css')}}" rel="stylesheet" />

@endsection

@section('content')
<main>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container-fluid">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="refresh-cw"></i></div>
                            Conferência de itens
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" ng-click="vm.Conferencia.incluir();" data-hotkey="f6">
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
                    <div class="col-xl-3 col-lg-6 col-sm-12 col-md-12">
                        <div class="consulta-tabela-preco-filtro"></div>
                    </div>

                    <div class="col-xl-3 col-lg-6 col-sm-12 col-md-12">
                        <div class="consulta-cliente-filtro"></div>
                    </div>

                    <div class="col-xl-2 col-lg-6 col-sm-12 col-md-12">
                        <div class="form-group" style="margin-top: 29px;">
                            <button class="btn btn-primary p-3" ng-click="vm.Conferencia.consultar();">
                                <i class="mr-2 text-white" data-feather="filter"></i>
                                <span>Filtrar</span>

                                <span class="badge badge-counter">ALT + F</span>
                            </button>
                        </div>

                    </div>

                </div>

                <div class="row">

                    <div class="col-sm-12" style="margin-top: 25px !important;">
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0" id="dataTableConferencia">

                            </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>

    </div>
</main>


<!-- Modal Conferência -->
<div class="modal" id="modalConferencia" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Conferencia.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Conferencia.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-2">
                        <div class="form-group">
                            <label>ID:</label>
                            <input type="text" class="form-control" ng-model="vm.Conferencia.SELECTED.DESC_ID" disabled>
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="consulta-tabela-preco"></div>
                    </div>
                    <div class="col-sm-5">
                        <div class="consulta-cliente"></div>
                    </div>

                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Observações:</label>
                            <input type="text" maxlength="200" class="form-control" ng-model="vm.Conferencia.SELECTED.OBSERVACAO" ng-disabled="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-sm-12">
                        <fieldset>
                            <legend>Itens</legend>
                            <div class="row">
                                <div class="col-sm-12">

                                    <button class="btn btn-primary btn-sm" type="button" data-hotkey="f6" ng-click="vm.ConferenciaItens.incluir();" ng-disabled="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                                        <i class="mr-2 text-white" data-feather="plus-circle"></i>
                                        Incluir
                                        <span class="badge badge-counter">F6</span>
                                    </button>
                                    <button class="btn btn-danger btn-sm" type="button" ng-if="vm.ConferenciaItens.DADOS.length > 0" data-hotkey="f7" ng-click="vm.ConferenciaItens.excluirAllItens();" ng-disabled="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                                        <i class="mr-2 text-white" data-feather="trash-2"></i>
                                        Excluir todos os itens
                                        <span class="badge badge-counter">F7</span>
                                    </button>

                                    <hr />

                                    <div class="table-responsive">
                                        <table class="table mb-0" id="dataTableConferenciaItens">

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.Conferencia.alterar();" ng-if="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.Conferencia.excluir();" ng-if="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.Conferencia.gravar();" ng-if="vm.Conferencia.INCLUINDO == true || vm.Conferencia.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.Conferencia.cancelar();" data-hotkey="esc" ng-if="vm.Conferencia.INCLUINDO == true || vm.Conferencia.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-warning p-3" type="button" data-hotkey="f10" ng-click="vm.Conferencia.imprimirPapelTermico();" ng-if="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="printer"></i>
                    Imprimir
                    <span class="badge badge-counter">F10</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                    <i class="mr-2 text-black" data-feather="corner-up-left"></i>
                    Voltar
                    <span class="badge badge-counter">ESC</span>
                </button>

            </div>
        </div>
    </div>
</div>

<!-- Modal Conferência de Itens -->
<div class="modal" id="modalConferenciaItens" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Inclusão de itens</h5>
            </div>
            <div class="modal-body">

                <div class="row mb-4 d-flex flex-row align-items-center justify-content-center">
                    <form class="form-inline">

                        <div class="input-group" style="margin-right: 20px;">
                            <div class="input-group-prepend" style="cursor: pointer;" ng-click="vm.ConferenciaItens.plusQtd();">
                                <span class="input-group-text">
                                    <i class="fa fa-plus"></i>
                                </span>
                            </div>
                            <input type="text" only-digits min="1" class="form-control text-center" style="width: 62px;" ng-model="vm.ConferenciaItens.SELECTED.QUANTIDADE">
                            <div class="input-group-append" style="cursor: pointer;" ng-click="vm.ConferenciaItens.minusQtd();">
                                <span class="input-group-text">
                                    <i class="fa fa-minus"></i>
                                </span>
                            </div>
                        </div>

                        <div class="input-group" style="margin-top: 1px;">
                            <input type="text" class="form-control" autocomplete="off" placeholder="Código de Barras" only-digits aria-label="Pesquisar" aria-describedby="basic-addon2" style="width: 335px;" id="codigoEANConferencia" ng-model="vm.ConferenciaItens.SELECTED.EAN" ng-keypress="vm.ConferenciaItens.enterOnCodigoEAN($event);">
                            <!-- <div class="input-group-append">
                                <button class="btn btn-primary" type="button" data-hotkey="f3" ng-click="vm.ConferenciaItens.showProducts();">
                                    <i class="fas fa-search" style="margin-right: 6px;"></i>
                                    Produtos
                                    <span class="badge badge-counter">F3</span>
                                </button>

                            </div> -->
                        </div>
                    </form>

                </div>
                <div class="row" ng-if="vm.ConferenciaItens.HABILITA_PRODUTO">
                    <div class="col-sm-12">
                        <div class="input-group input-group-joined">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i data-feather="search"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" id="filtroProduto" ng-model="vm.ConferenciaItens.FILTRO_PRODUTO" autocomplete="off" ng-change="vm.ConferenciaItens.keyUPSearchProducts($event);">
                        </div>
                    </div>

                    <div class="col-sm-12" style="margin-top: 25px !important;">
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0" id="dataTableProducts">

                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.ConferenciaItens.confirmarGravar();">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.ConferenciaItens.cancelar();" data-hotkey="esc">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

            </div>
        </div>
    </div>
</div>

@endsection


@section('script')
<script src="{{ asset('assets/js/conferencia.js') }}"></script>
@endsection