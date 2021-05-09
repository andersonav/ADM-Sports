@extends('layouts.master')


@section('css')

<link href="{{asset('assets/css/clientes.css')}}" rel="stylesheet" />

@endsection

@section('content')
<main>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container-fluid">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="user"></i></div>
                            Gerenciamento de clientes
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">
                        <button class="btn btn-white p-3" ng-click="vm.Clientes.incluir();" data-hotkey="f6">
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
                            <button class="btn btn-primary p-3" ng-click="vm.Clientes.consultar();">
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
                            <table class="table table-borderless mb-0" id="dataTableClientes">

                            </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>

    </div>
</main>


<!-- Modal Conferência -->
<div class="modal" id="modalClientes" role="dialog" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Clientes.INCLUINDO">Inclusão</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Clientes.ALTERANDO">Alteração</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false">Visualização</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="identificacao">CNPJ/CPF:</label>
                                <input class="form-control required" id="identificacao" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.IDENTIFICACAO" ui-br-cpfcnpj-mask>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="razaoSocial">Razão Social:</label>
                                <input class="form-control required" id="razaoSocial" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.RAZAOSOCIAL" maxlength="200">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="nomeFantasia">Nome Fantasia:</label>
                                <input class="form-control" id="nomeFantasia" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.NOMEFANTASIA" maxlength="200">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label>Tipo:</label>
                                <select required class="custom-select" ng-model="vm.Clientes.SELECTED.TIPO" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false">
                                    <option ng-value="1">Cliente</option>
                                    <option ng-value="2">Fornecedor</option>
                                    <option ng-value="3">Cliente/Fornecedor</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="cep">CEP:</label>
                                <input class="form-control" id="cep" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.CEP" ng-change="vm.Clientes.getEnderecoByCep();" ui-br-cep-mask>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="endereco">Endereço:</label>
                                <input class="form-control" id="endereco" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.ENDERECO" maxlength="200">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="cidade">Cidade:</label>
                                <input class="form-control" id="cidade" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.CIDADE" maxlength="100">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="bairro">Bairro:</label>
                                <input class="form-control" id="bairro" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.BAIRRO" maxlength="100">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="uf">UF:</label>
                                <input class="form-control" id="uf" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.UF" maxlength="2">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="numero">N°:</label>
                                <input class="form-control" id="numero" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.NUMERO" maxlength="50">
                            </div>
                        </div>

                        <hr class="mb-4">

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="telefone">Telefone:</label>
                                <input class="form-control" id="telefone" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.TELEFONE" ui-br-phone-number-mask="areaCode">
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="celular">Celular:</label>
                                <input class="form-control" id="celular" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.CELULAR" ui-br-phone-number-mask="areaCode">
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="contato">Contato:</label>
                                <input class="form-control" id="contato" type="text" ng-disabled="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false" ng-model="vm.Clientes.SELECTED.CONTATO" maxlength="100">
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">

                <button class="btn btn-primary p-3" type="button" data-hotkey="f9" ng-click="vm.Clientes.alterar();" ng-if="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="edit"></i>
                    Alterar
                    <span class="badge badge-counter">F9</span>
                </button>

                <button class="btn btn-danger p-3" type="button" data-hotkey="f12" ng-click="vm.Clientes.excluir();" ng-if="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false">
                    <i class="mr-2 text-white" data-feather="trash-2"></i>
                    Excluir
                    <span class="badge badge-counter">F12</span>
                </button>

                <button class="btn btn-success p-3" type="button" data-hotkey="enter" ng-click="vm.Clientes.gravar();" ng-if="vm.Clientes.INCLUINDO == true || vm.Clientes.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="check-circle"></i>
                    Gravar
                    <span class="badge badge-counter">ENTER</span>
                </button>

                <button class="btn btn-danger p-3" type="button" ng-click="vm.Clientes.cancelar();" data-hotkey="esc" ng-if="vm.Clientes.INCLUINDO == true || vm.Clientes.ALTERANDO == true">
                    <i class="mr-2 text-white" data-feather="slash"></i>
                    Cancelar
                    <span class="badge badge-counter">ESC</span>
                </button>

                <button class="btn btn-white p-3" type="button" data-hotkey="esc" data-dismiss="modal" ng-if="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false">
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
<script src="{{ asset('assets/js/clientes.js') }}"></script>
@endsection