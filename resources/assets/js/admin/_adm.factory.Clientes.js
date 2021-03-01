(function (window, angular) {
	'use strict';

	angular
		.module('app')
		.factory('Clientes', Clientes);

	Clientes.$inject = [
		'$ajax',
		'$q',
		'$rootScope',
		'$timeout',
		'gScope'
	];

	function Clientes($ajax, $q, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
		 * Constructor, with class name
		 */
		function Clientes() {

			obj = this;
			obj.model 					= 'vm.Clientes';

			obj.url_consultar 			= urlhost + '/admin/cadastros/clientes/get';
			obj.url_gravar 				= urlhost + '/admin/cadastros/clientes/post';
			obj.url_excluir 			= urlhost + '/admin/cadastros/clientes/delete';

			obj.SELECTED 				= {};
			obj.BACKUP 					= {};
			obj.DADOS 					= [];

			obj.CAMPO_INDEX 			= 'ID';

			obj.INCLUINDO 				= false;
			obj.ALTERANDO 				= false;

			obj.setDadosIncluir 		= setDadosIncluir;
			obj.incluir 				= incluir;
			obj.gravar 					= gravar;
			obj.confirmarGravar 		= confirmarGravar;
			obj.excluir					= excluir;
			obj.confirmarExcluir		= confirmarExcluir;
			obj.cancelar 				= cancelar;
			obj.confirmarCancelar 		= confirmarCancelar;
			obj.alterar					= alterar;
			obj.getClientes 			= getClientes;
			obj.getEnderecoByCep 		= getEnderecoByCep;
			obj.recompileDatatable 		= recompileDatatable;

			obj.DATATABLE 				= null;

		}

		function setDadosIncluir() {

			var dados = {
				IDENTIFICACAO: '',
				RAZAOSOCIAL: '',
				NOMEFANTASIA: '',
				CEP: '',
				ENDERECO: '',
				BAIRRO: '',
				CIDADE: '',
				UF: '',
				NUMERO: '',
				TELEFONE: '',
				CELULAR: '',
				CONTATO: ''
			};

			return dados;
		}

		function incluir() {
			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			$("#modalClientes").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalClientes");
			}, 200);
		}

		function gravar() {

			var that = this;

			var check = true;

			if (typeof that.SELECTED.IDENTIFICACAO == 'undefined' || (typeof that.SELECTED.IDENTIFICACAO != 'undefined' && that.SELECTED.IDENTIFICACAO == '')) {
				check = false;
				showErro("CNPJ/CPF obrigatório");
			}

			if (that.SELECTED.RAZAOSOCIAL == '' || that.SELECTED.RAZAOSOCIAL == null) {
				check = false;
				showErro("Razão Social obrigatória");
			}

			if (check == true) {
				sweetAlert(1, 'Deseja realmente gravar esse registro?', that);
			}

		}

		function confirmarGravar() {
			var that = this;

			var dados = {
				DADOS: obj.SELECTED
			};

			return $q(function (resolve, reject) {

				$ajax.post(that.url_gravar, dados).then(function (response) {

					var copy = angular.copy(obj.DADOS);

					obj.DADOS = [];
					obj.DATATABLE.clear();
					obj.DATATABLE.destroy();

					if(obj.INCLUINDO){
						response.DESC_ID = trim_null(response.ID).padStart(6, '0');
						copy.push(response);
					}else{
						angular.forEach(copy, function (item, value){
							if(item.ID == response.ID){
								item = Object.merge(item, response);
							}
						});
					}

					$("#modalClientes").modal('hide');

					if(obj.INCLUINDO){
						showSuccess("Registro incluído com sucesso");
					}else{
						showSuccess("Registro alterado com sucesso");
					}

					obj.INCLUINDO = false;
					obj.ALTERANDO = false;
					obj.SELECTED = {};

					obj.DADOS = angular.copy(copy);

					obj.recompileDatatable();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});
		}

		function excluir(item) {
			var that = this;

			obj.SELECTED 	= item;

			sweetAlert(3, 'Deseja realmente excluir esse registro?', that);
		}

		function confirmarExcluir() {

			var that = this;

			var dados = {
				DADOS: obj.SELECTED
			};

			return $q(function (resolve, reject) {

				$ajax.post(that.url_excluir, dados).then(function (response) {
					var copySelected = angular.copy(obj.SELECTED);

					var copy = angular.copy(obj.DADOS);

					obj.DADOS = [];
					obj.DATATABLE.clear();
					obj.DATATABLE.destroy();
					
					angular.forEach(copy, function (item, value){
						if(item.ID == copySelected.ID){
							copy.splice(value, 1);
						}
					});

					obj.SELECTED = {};

					obj.DADOS = angular.copy(copy);

					showSuccess("Registro excluído com sucesso");

					obj.recompileDatatable();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function cancelar() {
			var that = this;

			sweetAlert(2, 'Deseja realmente cancelar essa operação?', that);
		}

		function confirmarCancelar() {

			if(Object.keys(obj.BACKUP).length === 0){
				obj.SELECTED = {};
			}else{
				obj.SELECTED = angular.copy(obj.BACKUP);
			}

			$("#modalClientes").modal('hide');
			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar(item) {
			obj.INCLUINDO 	= false;
			obj.ALTERANDO 	= true;

			obj.SELECTED 	= item;
			obj.BACKUP		= angular.copy(obj.SELECTED);

			$("#modalClientes").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalClientes");
			}, 200);
		}

		function getClientes() {

			var that = this;

			var dados = {
				DADOS: {

				}
			};

			return $q(function (resolve, reject) {

				$ajax.post(that.url_consultar, dados).then(function (response) {

					angular.forEach(response, function (item, value) {
						item.DESC_ID = trim_null(item.ID).padStart(6, '0');
					});

					obj.DADOS = response;

					obj.recompileDatatable();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function getEnderecoByCep() {
			var that = this;

			if (typeof that.SELECTED.CEP != 'undefined') {
				if (that.SELECTED.CEP.length == 8) {
					getEnderecoByCepJS(that.SELECTED.CEP).then(function (dadosRetornados) {

						$timeout(function () {
							if (dadosRetornados.ERROR == true) {
								showErro("Nenhum endereço encontrado para esse CEP");
							} else {

								$rootScope.$apply(function () {
									that.SELECTED.ENDERECO = dadosRetornados.ENDERECO;
									that.SELECTED.BAIRRO = dadosRetornados.BAIRRO;
									that.SELECTED.CIDADE = dadosRetornados.CIDADE;
									that.SELECTED.UF = dadosRetornados.UF;
								});

							}
						}, 200);
					});
				}

			}
		}

		function recompileDatatable() {
			$timeout(function () {

				obj.DATATABLE = '';

				obj.DATATABLE = $('#dataTableClientes').DataTable({
					"order": [[1, 'asc']],
					"language": returnLanguageDatatable()
				});

			}, 200);
		}

		return Clientes;
	};

})(window, window.angular);