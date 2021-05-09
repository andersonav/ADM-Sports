@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/alunos.css')}}" rel="stylesheet" />

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
                            Gerenciamento de alunos
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" ng-click="vm.Alunos.incluir();" data-hotkey="f6">
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
                    <div class="col-xl-2 col-lg-6 col-sm-12 col-md-12">
                        <div class="form-group" style="margin-top: 29px;">
                            <button class="btn btn-primary p-3" ng-click="vm.Alunos.consultar();">
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
                            <table class="table table-borderless mb-0" id="dataTableAlunos">

                            </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>

    </div>
</main>


<div class="modal" id="modalAlunos" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Alunos.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Alunos.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="matricula">Matrícula:</label>
                                <input class="form-control" id="matricula" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.MATRICULA" only-digits>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="nome">Nome:</label>
                                <input class="form-control" id="nome" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.NOME">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="dataNascimento">Data de nascimento:</label>
                                <input class="form-control" id="dataNascimento" type="date" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.DATA_NASCIMENTO">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="cep">CEP:</label>
                                <input class="form-control" id="cep" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.CEP" ng-change="vm.Alunos.getEnderecoByCep();" ui-br-cep-mask>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="endereco">Endereço:</label>
                                <input class="form-control" id="endereco" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.ENDERECO" maxlength="200">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="cidade">Cidade:</label>
                                <input class="form-control" id="cidade" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.CIDADE" maxlength="100">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="bairro">Bairro:</label>
                                <input class="form-control" id="bairro" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.BAIRRO" maxlength="100">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="uf">UF:</label>
                                <input class="form-control" id="uf" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.UF" maxlength="2">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="numero">N°:</label>
                                <input class="form-control" id="numero" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.NUMERO" maxlength="50">
                            </div>
                        </div>

                        <hr class="mb-4">

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="telefone">Telefone:</label>
                                <input class="form-control" id="telefone" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.TELEFONE" ui-br-phone-number-mask="areaCode">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="celular">Celular:</label>
                                <input class="form-control" id="celular" type="text" ng-disabled="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false" ng-model="vm.Alunos.SELECTED.CELULAR" ui-br-phone-number-mask="areaCode">
                            </div>
                        </div>
                        
                    </div>
                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.Alunos.alterar();" ng-if="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.Alunos.excluir();" ng-if="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.Alunos.gravar();" ng-if="vm.Alunos.INCLUINDO == true || vm.Alunos.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.Alunos.cancelar();" data-hotkey="esc" ng-if="vm.Alunos.INCLUINDO == true || vm.Alunos.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.Alunos.INCLUINDO == false && vm.Alunos.ALTERANDO == false">
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
<script src="{{ asset('assets/js/alunos.js') }}"></script>
@endsection