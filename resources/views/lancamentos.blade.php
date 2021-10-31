@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/lancamentos.css')}}" rel="stylesheet" />

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
                            Gerenciamento de Lançamentos
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" ng-click="vm.Lancamentos.incluir();" data-hotkey="f6">
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

                    <div class="col-xl-4 col-lg-6 col-sm-12 col-md-12" style="display: contents !important;">

                        <div class="form-group" style="margin-right: 0px !important;">
                            <div class="form-group" id="formGroutMotherData">
                                <select class="form-control" ng-model="vm.Lancamentos.TIPO_DATA_FILTRO" id="selectFormGroup">
                                    <option style="font-weight: 600;" ng-value="1">Data Lançamento</option>
                                    <option style="font-weight: 600;" ng-value="2">Data Vencimento</option>
                                    <option style="font-weight: 600;" ng-value="3">Data Recebimento</option>
                                </select>
                                <input type="date" style="width: 170px;" class="form-control filter_main" ng-model="vm.Lancamentos.DATA_INICIAL" ng-atalho>
                                <label style="padding-top: 8px; padding-right: 5px; padding-left: 5px;"> à </label>
                                <input type="date" style="width: 170px;" class="form-control filter_main" ng-model="vm.Lancamentos.DATA_FINAL" ng-atalho>
                            </div>
                        </div>

                        <!-- <div class="form-group">
                            <label>Data do Lançamento:</label>
                            <div class="form-group" style="display: flex;">
                                <input type="date" class="form-control filter_on_enter" ng-atalho ng-model="vm.Lancamentos.DATA_INICIAL">
                                <label style="padding-top: 10px; padding-right: 5px; padding-left: 5px; font-weight: bold;"> à </label>
                                <input type="date" class="form-control filter_on_enter" ng-atalho ng-model="vm.Lancamentos.DATA_FINAL">
                            </div>
                        </div> -->
                    </div>

                    <div class="col-xl-2 col-lg-6 col-sm-12 col-md-12">
                        <div class="form-group">
                            <label>Status:</label>
                            <select class="custom-select" ng-model="vm.Lancamentos.FILTRO_STATUS">
                                <option value="">Todos</option>
                                <option value="0">Não efetivado</option>
                                <option value="1">Não recebido/Não pago</option>
                                <option value="2">Recebido/Pago</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="consulta-modulo-conta-item-filtro"></div>
                    </div>
                   
                    <div class="col-sm-3">
                        <div class="consulta-tipo-documento-filtro"></div>
                    </div>
                    
                    <div class="col-sm-3">
                        <div class="consulta-conta-bancaria-filtro"></div>
                    </div>

                    <div class="col-xl-2 col-lg-6 col-sm-12 col-md-12">
                        <div class="form-group" style="margin-top: 29px;">
                            <button class="btn btn-primary p-3" ng-click="vm.Lancamentos.consultar();">
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
                            <table class="table table-borderless mb-0" id="dataTableLancamentos">

                            </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>

    </div>
</main>


<div class="modal" id="modalLancamentos" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Lancamentos.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Lancamentos.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body" style="height: calc(100vh - 230px);">
                <form>
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="identificador">ID:</label>
                                <input class="form-control" id="identificador" type="text" ng-disabled="true" ng-model="vm.Lancamentos.SELECTED.DESC_ID">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="consulta-perfil"></div>
                        </div>

                        <div class="col-sm-3">
                            <label for="">Valor Total:</label>
                            <div class="input-group input-group-joined">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i data-feather="dollar-sign"></i>
                                    </span>
                                </div>

                                <input ng-number-format="2" class="form-control required" id="valorTotal" type="text" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false" ng-model="vm.Lancamentos.SELECTED.VALOR_TOTAL" ng-readonly="vm.Lancamentos.SELECTED.TIPO != 0 && vm.LancamentoItens.DADOS > 0">
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="consulta-modulo-conta-item"></div>
                        </div>

                        <div class="col-sm-3">
                            <div class="consulta-tipo-documento"></div>
                        </div>

                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="descricao">Descrição:</label>
                                <input class="form-control required" id="descricao" type="text" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false" ng-model="vm.Lancamentos.SELECTED.DESCRICAO">
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="data">Data Lançamento:</label>
                                <input class="form-control required" id="data" type="date" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false" ng-model="vm.Lancamentos.SELECTED.DATA">
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="dataVencimento">Data Vencimento:</label>
                                <input class="form-control required" id="dataVencimento" type="date" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false" ng-model="vm.Lancamentos.SELECTED.DATA_VENCIMENTO" ng-readonly="vm.Lancamentos.SELECTED.TIPO != 0">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="dataRecebimentoPagamento">Data Recebimento/Pagamento:</label>
                                <input class="form-control required" id="dataRecebimentoPagamento" type="date" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false" ng-model="vm.Lancamentos.SELECTED.DATA_RECEB_PAG">
                            </div>
                        </div>

                        <div class="col-sm-5">
                            <div class="consulta-conta-bancaria"></div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="status">Status:</label>
                                <select class="form-control" id="status" ng-model="vm.Lancamentos.SELECTED.STATUS" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">
                                    <option ng-value="0">Não efetivado</option>
                                    <option ng-value="1">Pago</option>
                                    <option ng-value="2">Recebido</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="status">Tipo:</label>
                                <select class="form-control" id="status" ng-model="vm.Lancamentos.SELECTED.TIPO" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">
                                    <option ng-value="0">Avulso</option>
                                    <option ng-value="1">Vincular alunos</option>
                                    <option ng-value="2">Vincular clientes</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="row" ng-show="vm.Lancamentos.SELECTED.TIPO != 0">

                        <div class="col-sm-12">
                            <fieldset>
                                <legend ng-if="vm.Lancamentos.SELECTED.TIPO == 1">Vincular Alunos</legend>
                                <legend ng-if="vm.Lancamentos.SELECTED.TIPO == 2">Vincular Clientes</legend>
                                <div class="row">
                                    <div class="col-sm-12">

                                        <button ng-if="vm.Lancamentos.SELECTED.TIPO == 1" class="btn btn-primary btn-sm" type="button" data-hotkey="f6" ng-click="vm.LancamentoAlunos.incluir();" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">
                                            <i class="mr-2 text-white" data-feather="plus-circle"></i>
                                            Incluir
                                            <span class="badge badge-counter">F6</span>
                                        </button>

                                        <button ng-if="vm.Lancamentos.SELECTED.TIPO == 2" class="btn btn-primary btn-sm" type="button" data-hotkey="f6" ng-click="vm.LancamentoClientes.incluir();" ng-disabled="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">
                                            <i class="mr-2 text-white" data-feather="plus-circle"></i>
                                            Incluir
                                            <span class="badge badge-counter">F6</span>
                                        </button>

                                        <hr />

                                        <div class="table-responsive">
                                            <table class="table mb-0" id="dataTableLancamentoItens">

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.Lancamentos.alterar();" ng-if="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.Lancamentos.excluir();" ng-if="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.Lancamentos.gravar();" ng-if="vm.Lancamentos.INCLUINDO == true || vm.Lancamentos.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.Lancamentos.cancelar();" data-hotkey="esc" ng-if="vm.Lancamentos.INCLUINDO == true || vm.Lancamentos.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.Lancamentos.INCLUINDO == false && vm.Lancamentos.ALTERANDO == false">
                    <i class="mr-2 text-black" data-feather="corner-up-left"></i>
                    Voltar
                    <span class="badge badge-counter">ESC</span>
                </button>

            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalLancamentoAlunos" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Vinculando alunos ao lançamento</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-sm-8" style="margin-bottom: 20px;">
                            <label for="">Filtragem rápida:</label>
                            <div class="input-group input-group-joined">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i data-feather="search"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control" id="filtroAluno" ng-model="vm.LancamentoAlunos.FILTRO_ALUNO" autocomplete="off" ng-change="vm.LancamentoAlunos.keyUPSearchAlunos($event);">
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-bottom: 20px;">
                            <label for="">Valor Padrão:</label>
                            <div class="input-group input-group-joined">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i data-feather="dollar-sign"></i>
                                    </span>
                                </div>

                                <input ng-number-format="2" class="form-control required" id="valorPadrao" type="text" ng-model="vm.LancamentoAlunos.VALOR_PADRAO">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table mb-0" id="dataTableLancamentoAlunos">

                                </table>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.LancamentoAlunos.gravar();">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Confirmar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.LancamentoAlunos.cancelar();" data-hotkey="esc" ng-if="vm.Lancamentos.INCLUINDO == true || vm.Lancamentos.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalLancamentoClientes" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Vinculando clientes ao lançamento</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-sm-8" style="margin-bottom: 20px;">
                            <label for="">Filtragem rápida:</label>
                            <div class="input-group input-group-joined">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i data-feather="search"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control" id="filtroCliente" ng-model="vm.LancamentoClientes.FILTRO_CLIENTE" autocomplete="off" ng-change="vm.LancamentoClientes.keyUPSearchClientes($event);">
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-bottom: 20px;">
                            <label for="">Valor Padrão:</label>
                            <div class="input-group input-group-joined">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i data-feather="dollar-sign"></i>
                                    </span>
                                </div>

                                <input ng-number-format="2" class="form-control required" id="valorPadrao" type="text" ng-model="vm.LancamentoClientes.VALOR_PADRAO">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table mb-0" id="dataTableLancamentoClientes">

                                </table>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.LancamentoClientes.gravar();">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Confirmar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.LancamentoClientes.cancelar();" data-hotkey="esc" ng-if="vm.Lancamentos.INCLUINDO == true || vm.Lancamentos.ALTERANDO == true">
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
<script src="{{ asset('assets/js/lancamentos.js') }}"></script>
@endsection