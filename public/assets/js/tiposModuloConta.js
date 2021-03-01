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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
module.exports = __webpack_require__(25);


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

angular.module('app').value('gScope', {}).controller('Ctrl', Ctrl);

Ctrl.$inject = ['$scope', '$timeout', 'gScope', 'Consulta', 'TiposModuloConta'];

function Ctrl($scope, $timeout, gScope, Consulta, TiposModuloConta) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.TiposModuloConta = new TiposModuloConta();

	vm.TiposModuloConta.getTiposModuloConta();

	gScope.TiposModuloConta = vm.TiposModuloConta;
}

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.module('app').factory('TiposModuloConta', TiposModuloConta);

	TiposModuloConta.$inject = ['$ajax', '$q', '$rootScope', '$timeout', 'gScope'];

	function TiposModuloConta($ajax, $q, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
   * Constructor, with class name
   */
		function TiposModuloConta() {

			obj = this;
			obj.model = 'vm.TiposModuloConta';

			obj.url_consultar = urlhost + '/admin/cadastros/modulos-conta/tipos/get';
			obj.url_gravar = urlhost + '/admin/cadastros/modulos-conta/tipos/post';
			obj.url_excluir = urlhost + '/admin/cadastros/modulos-conta/tipos/delete';

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
			obj.getTiposModuloConta = getTiposModuloConta;
			obj.recompileDatatable = recompileDatatable;

			obj.DATATABLE = null;
		}

		function setDadosIncluir() {

			var dados = {
				DESCRICAO: '',
				DESC_RESUMIDA: '',
				OPERACAO: 0
			};

			return dados;
		}

		function incluir() {
			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			$("#modalTiposModuloConta").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalTiposModuloConta");
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

					$("#modalTiposModuloConta").modal('hide');

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

			$("#modalTiposModuloConta").modal('hide');
			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar(item) {
			obj.INCLUINDO = false;
			obj.ALTERANDO = true;

			obj.SELECTED = item;
			obj.BACKUP = angular.copy(obj.SELECTED);

			$("#modalTiposModuloConta").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalTiposModuloConta");
			}, 200);
		}

		function getTiposModuloConta() {

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

				obj.DATATABLE = $('#dataTableTiposModuloConta').DataTable({
					"order": [[0, 'asc']],
					"language": returnLanguageDatatable()
				});
			}, 200);
		}

		return TiposModuloConta;
	};
})(window, window.angular);

/***/ })

/******/ });