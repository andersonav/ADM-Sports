@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/moduloConta.css')}}" rel="stylesheet" />

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
                            Gerenciamento de módulos de conta
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" ng-click="vm.ModuloContaItem.incluir();" data-hotkey="f6">
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
                            <table class="table table-borderless mb-0" id="dataTableModuloContaItem">

                            </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>

    </div>
</main>


<div class="modal" id="modalModuloContaItem" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloContaItem.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloContaItem.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.ModuloContaItem.INCLUINDO == false && vm.ModuloContaItem.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body" style="height: calc(100vh - 490px);">
                <form>
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="identificador">ID:</label>
                                <input class="form-control" id="identificador" type="text" ng-disabled="true" ng-model="vm.ModuloContaItem.SELECTED.DESC_ID">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="descricaoResumida">Descrição Resumida:</label>
                                <input class="form-control" id="descricaoResumida" type="text" ng-disabled="vm.ModuloContaItem.INCLUINDO == false && vm.ModuloContaItem.ALTERANDO == false" ng-model="vm.ModuloContaItem.SELECTED.DESC_RESUMIDA">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="descricao">Descrição:</label>
                                <input class="form-control" id="descricao" type="text" ng-disabled="vm.ModuloContaItem.INCLUINDO == false && vm.ModuloContaItem.ALTERANDO == false" ng-model="vm.ModuloContaItem.SELECTED.DESCRICAO">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="consulta-tipo-modulo-conta"></div>
                        </div>
                        
                    </div>
                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.ModuloContaItem.alterar();" ng-if="vm.ModuloContaItem.INCLUINDO == false && vm.ModuloContaItem.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.ModuloContaItem.excluir();" ng-if="vm.ModuloContaItem.INCLUINDO == false && vm.ModuloContaItem.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.ModuloContaItem.gravar();" ng-if="vm.ModuloContaItem.INCLUINDO == true || vm.ModuloContaItem.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.ModuloContaItem.cancelar();" data-hotkey="esc" ng-if="vm.ModuloContaItem.INCLUINDO == true || vm.ModuloContaItem.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.ModuloContaItem.INCLUINDO == false && vm.ModuloContaItem.ALTERANDO == false">
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
<script src="{{ asset('assets/js/moduloConta.js') }}"></script>
@endsection