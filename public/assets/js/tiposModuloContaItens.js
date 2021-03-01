/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
module.exports = __webpack_require__(28);


/***/ }),

/***/ 27:
/***/ (function(module, exports) {

angular.module('app').value('gScope', {}).controller('Ctrl', Ctrl);

Ctrl.$inject = ['$scope', '$timeout', 'gScope', 'Consulta', 'TiposModuloContaItens'];

function Ctrl($scope, $timeout, gScope, Consulta, TiposModuloContaItens) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.TiposModuloContaItens = new TiposModuloContaItens();

	vm.TiposModuloContaItens.getTiposModuloContaItens();

	// Consulta Tipo Módulo de Conta

	// Consulta Vendedor
	vm.ConsultaTipoModuloConta = vm.Consulta.getNew(true);
	vm.ConsultaTipoModuloConta.componente = '.consulta-modulo-conta-tipo';
	vm.ConsultaTipoModuloConta.option.class = 'consulta-modulo-conta-tipo-c';
	vm.ConsultaTipoModuloConta.model = 'vm.ConsultaTipoModuloConta';
	vm.ConsultaTipoModuloConta.option.label_descricao = 'Tipo Módulo Conta: ';
	// vm.ConsultaTipoModuloConta.option.label_descricao      = 'Tipo Módulo Conta: <a tabindex="-1" href="'+urlhost+'/_11640" target="_blank" rel="noopener noreferrer"><span class="fa fa-external-link" title="Gerenciamento de Tipos para Módulos de Conta"></span></a>';
	vm.ConsultaTipoModuloConta.option.obj_consulta = '/admin/cadastros/modulos-conta/tipos/get';
	vm.ConsultaTipoModuloConta.option.tamanho_tabela = 520;
	vm.ConsultaTipoModuloConta.option.required = false;
	vm.ConsultaTipoModuloConta.autoload = false;
	vm.ConsultaTipoModuloConta.cache = false;
	vm.ConsultaTipoModuloConta.option.infinite_scroll = false;
	vm.ConsultaTipoModuloConta.option.obj_ret = ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaTipoModuloConta.option.campos_tabela = [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO']];
	vm.ConsultaTipoModuloConta.option.filtro_sql = {};

	vm.ConsultaTipoModuloConta.compile();

	vm.ConsultaTipoModuloConta.onSelect = function (item) {};

	vm.ConsultaTipoModuloConta.onClear = function (item) {};

	gScope.ConsultaTipoModuloConta = vm.ConsultaTipoModuloConta;

	gScope.TiposModuloContaItens = vm.TiposModuloContaItens;
}

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.module('app').factory('TiposModuloContaItens', TiposModuloContaItens);

	TiposModuloContaItens.$inject = ['$ajax', '$q', '$rootScope', '$timeout', 'gScope'];

	function TiposModuloContaItens($ajax, $q, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
   * Constructor, with class name
   */
		function TiposModuloContaItens() {

			obj = this;
			obj.model = 'vm.TiposModuloContaItens';

			obj.url_consultar = urlhost + '/admin/cadastros/modulos-conta/itens/get';
			obj.url_gravar = urlhost + '/admin/cadastros/modulos-conta/itens/post';
			obj.url_excluir = urlhost + '/admin/cadastros/modulos-conta/itens/delete';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.setDadosIncluir = setDadosIncluir;
			obj.incluir = incluir;
			obj.gravar = gravar;
			obj.confirmarGravar = confirmarGravar;
			obj.excluir = excluir;
			obj.confirmarExcluir = confirmarExcluir;
			obj.cancelar = cancelar;
			obj.confirmarCancelar = confirmarCancelar;
			obj.alterar = alterar;
			obj.getTiposModuloContaItens = getTiposModuloContaItens;
			obj.recompileDatatable = recompileDatatable;

			obj.DATATABLE = null;
		}

		function setDadosIncluir() {

			var dados = {
				DESCRICAO: '',
				DESC_RESUMIDA: ''
			};

			return dados;
		}

		function incluir() {
			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			$("#modalTiposModuloContaItens").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalTiposModuloContaItens");
			}, 200);
		}

		function gravar() {

			var that = this;

			var check = true;

			if (that.SELECTED.DESCRICAO == '' || that.SELECTED.DESCRICAO == null) {
				check = false;
				showErro("Descrição obrigatória");
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

					if (obj.INCLUINDO) {
						response.DESC_ID = trim_null(response.ID).padStart(6, '0');
						copy.push(response);
					} else {
						angular.forEach(copy, function (item, value) {
							if (item.ID == response.ID) {
								item = Object.merge(item, response);
							}
						});
					}

					$("#modalTiposModuloContaItens").modal('hide');

					if (obj.INCLUINDO) {
						showSuccess("Registro incluído com sucesso");
					} else {
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

			obj.SELECTED = item;

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

					angular.forEach(copy, function (item, value) {
						if (item.ID == copySelected.ID) {
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

			if (Object.keys(obj.BACKUP).length === 0) {
				obj.SELECTED = {};
			} else {
				obj.SELECTED = angular.copy(obj.BACKUP);
			}

			$("#modalTiposModuloContaItens").modal('hide');
			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar(item) {
			obj.INCLUINDO = false;
			obj.ALTERANDO = true;

			obj.SELECTED = item;
			obj.BACKUP = angular.copy(obj.SELECTED);

			$("#modalTiposModuloContaItens").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalTiposModuloContaItens");
			}, 200);
		}

		function getTiposModuloContaItens() {

			var that = this;

			var dados = {
				DADOS: {}
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

		function recompileDatatable() {
			$timeout(function () {

				obj.DATATABLE = '';

				obj.DATATABLE = $('#dataTableTiposModuloContaItens').DataTable({
					"order": [[0, 'asc']],
					"language": returnLanguageDatatable()
				});
			}, 200);
		}

		return TiposModuloContaItens;
	};
})(window, window.angular);

/***/ })

/******/ });