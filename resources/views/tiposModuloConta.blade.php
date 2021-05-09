@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/tiposModuloConta.css')}}" rel="stylesheet" />

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
                            Gerenciamento de tipos de módulos de contas
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" ng-click="vm.ModuloConta.incluir();" data-hotkey="f6">
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
                            <table class="table table-borderless mb-0" id="dataTableModuloConta">

                            </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>

    </div>
</main>


<div class="modal" id="modalModuloConta" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloConta.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloConta.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="identificador">ID:</label>
                                <input class="form-control" id="identificador" type="text" ng-disabled="true" ng-model="vm.ModuloConta.SELECTED.DESC_ID">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="descricaoResumida">Descrição resumida:</label>
                                <input class="form-control" id="descricaoResumida" type="text" ng-disabled="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false" ng-model="vm.ModuloConta.SELECTED.DESC_RESUMIDA">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="descricao">Descrição:</label>
                                <input class="form-control" id="descricao" type="text" ng-disabled="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false" ng-model="vm.ModuloConta.SELECTED.DESCRICAO">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="operacao">Operação:</label>
                                <select class="form-control" id="operacao" ng-model="vm.ModuloConta.SELECTED.OPERACAO" ng-disabled="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false">
                                    <option ng-value="0">Entrada</option>
                                    <option ng-value="1">Saída</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="row" ng-show="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false">

                        <div class="col-sm-12">
                            <fieldset>
                                <legend>Itens</legend>
                                <div class="row">
                                    <div class="col-sm-12">

                                        <button class="btn btn-primary btn-sm" type="button" data-hotkey="f6" ng-click="vm.ModuloContaItens.incluir();" ng-disabled="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false">
                                            <i class="mr-2 text-white" data-feather="plus-circle"></i>
                                            Incluir
                                            <span class="badge badge-counter">F6</span>
                                        </button>

                                        <hr />

                                        <div class="table-responsive">
                                            <table class="table mb-0" id="dataTableModuloContaItens">

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

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.ModuloConta.alterar();" ng-if="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.ModuloConta.excluir();" ng-if="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.ModuloConta.gravar();" ng-if="vm.ModuloConta.INCLUINDO == true || vm.ModuloConta.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.ModuloConta.cancelar();" data-hotkey="esc" ng-if="vm.ModuloConta.INCLUINDO == true || vm.ModuloConta.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.ModuloConta.INCLUINDO == false && vm.ModuloConta.ALTERANDO == false">
                    <i class="mr-2 text-black" data-feather="corner-up-left"></i>
                    Voltar
                    <span class="badge badge-counter">ESC</span>
                </button>

            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalModuloContaItens" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloContaItens.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloContaItens.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloContaItens.INCLUINDO == false && vm.ModuloContaItens.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="identificador">ID:</label>
                                <input class="form-control" id="identificador" type="text" ng-disabled="true" ng-model="vm.ModuloContaItens.SELECTED.DESC_ID">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="descricaoResumida">Descrição resumida:</label>
                                <input class="form-control" id="descricaoResumida" type="text" ng-disabled="vm.ModuloContaItens.INCLUINDO == false && vm.ModuloContaItens.ALTERANDO == false" ng-model="vm.ModuloContaItens.SELECTED.DESC_RESUMIDA">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="descricao">Descrição:</label>
                                <input class="form-control" id="descricao" type="text" ng-disabled="vm.ModuloContaItens.INCLUINDO == false && vm.ModuloContaItens.ALTERANDO == false" ng-model="vm.ModuloContaItens.SELECTED.DESCRICAO">
                            </div>
                        </div>

                    </div>
                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.ModuloContaItens.alterar();" ng-if="vm.ModuloContaItens.INCLUINDO == false && vm.ModuloContaItens.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.ModuloContaItens.excluir();" ng-if="vm.ModuloContaItens.INCLUINDO == false && vm.ModuloContaItens.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.ModuloContaItens.gravar();" ng-if="vm.ModuloContaItens.INCLUINDO == true || vm.ModuloContaItens.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.ModuloContaItens.cancelar();" data-hotkey="esc" ng-if="vm.ModuloContaItens.INCLUINDO == true || vm.ModuloContaItens.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.ModuloContaItens.INCLUINDO == false && vm.ModuloContaItens.ALTERANDO == false">
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
<script src="{{ asset('assets/js/tiposModuloConta.js') }}"></script>
@endsection