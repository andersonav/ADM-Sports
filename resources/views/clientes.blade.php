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
                            Gerenciamento de Clientes
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                    <div class="col-12 col-xl-auto mt-4">

                        <button class="btn btn-warning" id="buttonWithIcon" ng-click="vm.Clientes.incluir();">
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
                    <table class="table table-bordered table-hover" id="dataTableClientes" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Razão Social</th>
                                <th>Nome Fantasia</th>
                                <th>Endereço</th>
                                <th>Cidade/UF</th>
                                <th>Telefone</th>
                                <th>Celular</th>
                                <th>Contato</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Razão Social</th>
                                <th>Nome Fantasia</th>
                                <th>Endereço</th>
                                <th>Cidade/UF</th>
                                <th>Telefone</th>
                                <th>Celular</th>
                                <th>Contato</th>
                                <th>Ações</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr ng-repeat="item in vm.Clientes.DADOS track by $index">
                                <td ng-bind="item.DESC_ID"></td>
                                <td ng-bind="item.RAZAOSOCIAL"></td>
                                <td ng-bind="item.NOMEFANTASIA"></td>
                                <td ng-bind="item.ENDERECO"></td>
                                <td ng-bind="item.CIDADE"></td>
                                <td ng-bind="item.TELEFONE"></td>
                                <td ng-bind="item.CELULAR"></td>
                                <td ng-bind="item.CONTATO"></td>
                                <td>
                                    <button class="btn btn-datatable btn-icon btn-transparent-dark mr-2" ng-click="vm.Clientes.alterar(item);"><i data-feather="edit"></i></button>
                                    <button class="btn btn-datatable btn-icon btn-transparent-dark" ng-click="vm.Clientes.excluir(item);"><i data-feather="trash-2"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalClientes" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" ng-if="vm.Clientes.INCLUINDO">Gerenciamento de Clientes - Inclusão</h5>
                        <h5 class="modal-title" ng-if="vm.Clientes.INCLUINDO == false && vm.Clientes.ALTERANDO == false">Gerenciamento de Clientes - Visualização</h5>
                        <h5 class="modal-title" ng-if="vm.Clientes.ALTERANDO == true && vm.Clientes.INCLUINDO == false">Gerenciamento de Clientes - Alteração</h5>
                    </div>
                    <div class="modal-body">

                        <form>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="identificacao">CNPJ/CPF:</label>
                                        <input class="form-control required" id="identificacao" type="text" ng-model="vm.Clientes.SELECTED.IDENTIFICACAO" ui-br-cpfcnpj-mask>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="razaoSocial">Razão Social:</label>
                                        <input class="form-control required" id="razaoSocial" type="text" ng-model="vm.Clientes.SELECTED.RAZAOSOCIAL" maxlength="200">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="nomeFantasia">Nome Fantasia:</label>
                                        <input class="form-control" id="nomeFantasia" type="text" ng-model="vm.Clientes.SELECTED.NOMEFANTASIA" maxlength="200">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="cep">CEP:</label>
                                        <input class="form-control" id="cep" type="text" ng-model="vm.Clientes.SELECTED.CEP" ng-change="vm.Clientes.getEnderecoByCep();" ui-br-cep-mask>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="endereco">Endereço:</label>
                                        <input class="form-control" id="endereco" type="text" ng-model="vm.Clientes.SELECTED.ENDERECO" maxlength="200">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="cidade">Cidade:</label>
                                        <input class="form-control" id="cidade" type="text" ng-model="vm.Clientes.SELECTED.CIDADE" maxlength="100">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="cidade">Cidade:</label>
                                        <input class="form-control" id="cidade" type="text" ng-model="vm.Clientes.SELECTED.BAIRRO" maxlength="100">
                                    </div>
                                </div>

                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label for="uf">UF:</label>
                                        <input class="form-control" id="uf" type="text" ng-model="vm.Clientes.SELECTED.UF" maxlength="2">
                                    </div>
                                </div>

                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label for="numero">N°:</label>
                                        <input class="form-control" id="numero" type="text" ng-model="vm.Clientes.SELECTED.NUMERO" maxlength="50">
                                    </div>
                                </div>

                                <hr class="mb-4">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="telefone">Telefone:</label>
                                        <input class="form-control" id="telefone" type="text" ng-model="vm.Clientes.SELECTED.TELEFONE" ui-br-phone-number-mask="areaCode">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="celular">Celular:</label>
                                        <input class="form-control" id="celular" type="text" ng-model="vm.Clientes.SELECTED.CELULAR" ui-br-phone-number-mask="areaCode">
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-success" id="buttonWithIcon" ng-click="vm.Clientes.gravar();">
                            <i class="fas fa-check"></i>
                            Gravar
                        </button>

                        <button class="btn btn-danger" id="buttonWithIcon" ng-click="vm.Clientes.cancelar();">
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
<script src="{{ asset('assets/js/clientes.js') }}"></script>
@endsection