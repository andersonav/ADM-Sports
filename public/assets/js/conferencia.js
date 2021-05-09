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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
__webpack_require__(26);
module.exports = __webpack_require__(27);


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

angular.
module('app').
value('gScope', {}).
controller('Ctrl', Ctrl);


Ctrl.$inject = [
'$scope',
'$timeout',
'gScope',
'Consulta',
'Conferencia',
'ConferenciaItens',
'Confirmacao',
'Devices'];


function Ctrl(
$scope,
$timeout,
gScope,
Consulta,
Conferencia,
ConferenciaItens,
Confirmacao,
Devices)
{

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.Conferencia = new Conferencia($scope);
	vm.ConferenciaItens = new ConferenciaItens($scope);
	vm.Confirmacao = new Confirmacao();
	vm.Devices = new Devices();
	vm.Confirme = vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme = vm.Confirme;
	gScope.Devices = vm.Devices;


	// CONSULTAS
	vm.ConsultaTabelaPrecoFiltro = vm.Consulta.getConsultaPadrao('TABELA_PRECO', 'consulta-tabela-preco-filtro');
	vm.ConsultaTabelaPrecoFiltro.model = 'vm.ConsultaTabelaPrecoFiltro';
	vm.ConsultaTabelaPrecoFiltro.option.required = false;
	vm.ConsultaTabelaPrecoFiltro.cache = false;
	vm.ConsultaTabelaPrecoFiltro.compile();

	vm.ConsultaTabelaPrecoFiltro.onSelect = function (item) {

	};

	vm.ConsultaTabelaPrecoFiltro.onClear = function (item) {

	};

	gScope.ConsultaTabelaPrecoFiltro = vm.ConsultaTabelaPrecoFiltro;

	vm.ConsultaClienteFiltro = vm.Consulta.getConsultaPadrao('CLIENTES', 'consulta-cliente-filtro');
	vm.ConsultaClienteFiltro.model = 'vm.ConsultaClienteFiltro';
	vm.ConsultaClienteFiltro.option.required = false;
	vm.ConsultaClienteFiltro.option.tamanho_tabela = '100%';
	vm.ConsultaClienteFiltro.option.obj_consulta = '/funcionalidades/consultas/getClientes';
	vm.ConsultaClienteFiltro.cache = false;
	vm.ConsultaClienteFiltro.option.campos_tabela = [['ID', 'ID'], ['RAZAOSOCIAL', 'NOME'], ['CNPJ_F', 'CNPJ/CPF'], ['UF', 'UF']];
	vm.ConsultaClienteFiltro.compile();

	vm.ConsultaClienteFiltro.onSelect = function (item) {

	};

	vm.ConsultaClienteFiltro.onClear = function (item) {

	};

	gScope.ConsultaClienteFiltro = vm.ConsultaClienteFiltro;


	// Consulta Tabela de Preço para Inclusão
	vm.ConsultaTabelaPreco = angular.copy(gScope.ConsultaTabelaPrecoFiltro);
	vm.ConsultaTabelaPreco.consulta_id = 'consulta_' + Math.floor(Math.random() * 9999999 + 1);
	vm.ConsultaTabelaPreco.componente = '.consulta-tabela-preco';
	vm.ConsultaTabelaPreco.option.class = 'consulta-tabela-preco-c';
	vm.ConsultaTabelaPreco.model = 'vm.ConsultaTabelaPreco';
	vm.ConsultaTabelaPreco.key_object_scop = -1;
	vm.ConsultaTabelaPreco.option.required = true;
	vm.ConsultaTabelaPreco.compile();

	vm.Conferencia.consultas.push({ OBJ: vm.ConsultaTabelaPreco, NOME: 'TABELA_PRECO' });

	vm.ConsultaTabelaPreco.onSelect = function (item) {

		if (vm.ConsultaTabelaPreco.item.selected == true) {

		}

	};

	vm.ConsultaTabelaPreco.onClear = function (item) {

	};

	gScope.ConsultaTabelaPreco = vm.ConsultaTabelaPreco;

	// Consulta Cliente para Inclusão
	vm.ConsultaCliente = angular.copy(gScope.ConsultaClienteFiltro);
	vm.ConsultaCliente.consulta_id = 'consulta_' + Math.floor(Math.random() * 9999999 + 1);
	vm.ConsultaCliente.componente = '.consulta-cliente';
	vm.ConsultaCliente.option.class = 'consulta-cliente-c';
	vm.ConsultaCliente.model = 'vm.ConsultaCliente';
	vm.ConsultaCliente.key_object_scop = -1;
	vm.ConsultaCliente.compile();

	vm.Conferencia.consultas.push({ OBJ: vm.ConsultaCliente, NOME: 'CLIENTE' });

	vm.ConsultaCliente.onSelect = function (item) {

		if (vm.ConsultaCliente.item.selected == true) {

		}

	};

	vm.ConsultaCliente.onClear = function (item) {

	};

	gScope.ConsultaCliente = vm.ConsultaCliente;

	vm.Conferencia.compileDatatable();
	vm.ConferenciaItens.compileDatatable();

	vm.calcularQuantidadeDecimais = function (number) {
		var quantidadeDecimais = 0;
		var contarDecimaisNumber = gScope.countDecimals(number);

		if (contarDecimaisNumber < 2) {
			quantidadeDecimais = 2;
		} else if (contarDecimaisNumber > 5) {
			quantidadeDecimais = 5;
		} else {
			quantidadeDecimais = contarDecimaisNumber;
		}

		return quantidadeDecimais;
	};

	vm.countDecimals = function (number) {
		if (Math.floor(number.valueOf()) === number.valueOf()) return 0;

		return number.toString().split(".")[1].length || 0;
	};

	gScope.calcularQuantidadeDecimais = vm.calcularQuantidadeDecimais;
	gScope.countDecimals = vm.countDecimals;
	gScope.Conferencia = vm.Conferencia;
	gScope.ConferenciaItens = vm.ConferenciaItens;


	$(document).ready(function () {
		$('body').keydown(function (e) {
			var key = e.keyCode;

			if (key == 107 && $(".modal#modalConferenciaItens:visible").length == 1) {
				vm.ConferenciaItens.plusQtd();
			}

			if (key == 109 && $(".modal#modalConferenciaItens:visible").length == 1) {
				vm.ConferenciaItens.minusQtd();
			}

		});

	});

	$('.filter_on_enter').keyup(function (event) {
		var key = event.keyCode;

		if (key == 13) {
			vm.Conferencia.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.Conferencia.consultar();
		}
	});

	$.key("delete", function (e) {
		if (!$(".modal").is(':visible')) {
			if ($("#dataTableConferencia tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.Conferencia.DATATABLE.row("#dataTableConferencia tbody tr.row_selected").data();
				vm.Conferencia.SELECTED = data;

				$timeout(function () {
					$scope.$apply(function () {
						vm.Conferencia.excluir();
					});
				});

			}
		} else {
			if ($(".modal#modalConferencia").is(':visible')) {
				if (vm.ConferenciaItens.DADOS.length > 0 && $(".modal#modalConferenciaItens:visible").length == 0) {
					if ($("#dataTableConferenciaItens tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0 && (vm.Conferencia.ALTERANDO == true || vm.Conferencia.INCLUINDO == true)) {
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();

						var data = vm.ConferenciaItens.DATATABLE.row("#dataTableConferenciaItens tbody tr.row_selected").data();
						vm.ConferenciaItens.SELECTED = data;

						$timeout(function () {
							$scope.$apply(function () {
								vm.ConferenciaItens.excluir();
							});
						});

					}
				}
			}
		}
	});

	$.key("enter", function (e) {
		if ($(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			if ($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')) {
				var idModal = $(".modal:visible").last().attr("id");

				if (typeof idModal == 'undefined') {
					$(".modal.in.confirm button[data-hotkey=enter]:visible:enabled").first().trigger('click');
				} else {
					$("#" + idModal + " [data-hotkey=enter]:visible:enabled").first().trigger('click');
				}
			}
		} else {
			if ($("#dataTableConferencia tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.Conferencia.DATATABLE.row("#dataTableConferencia tbody tr.row_selected").data();
				vm.Conferencia.SELECTED = data;

				$timeout(function () {
					$scope.$apply(function () {
						vm.Conferencia.visualizar();
					});
				});

			}
		}

	});

	$.key("esc", function (e) {
		if ($(".modal.in.confirm:visible").length > 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			$(".modal.in.confirm button[data-hotkey=esc]:visible:enabled").first().trigger('click');

			$timeout(function () {
				onFocusInputModal("#modalConferencia");
			});
		} else {
			if ($(".modal:visible").length > 0) {

				if ($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')) {
					var idModal = $(".modal:visible").last().attr("id");
					$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');

					$timeout(function () {
						onFocusInputModal("#modalConferencia");
					});
				}
			}
		}
	});

	$.key("f6", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if ($(".modal:visible").length > 0) {
			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f6]:visible:enabled").first().trigger('click');
		} else {
			$("[data-hotkey=f6]:visible:enabled").first().trigger('click');
		}
	});

	$.key("f7", function (e) {
		if ($(".modal:visible").length > 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f7]:visible:enabled").first().trigger('click');
		}
	});

	$.key("f9", function (e) {
		if ($(".modal:visible").length > 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f9]:visible:enabled").first().trigger('click');
		}
	});

	$.key("f10", function (e) {
		if ($(".modal:visible").length > 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f10]:visible:enabled").first().trigger('click');
		}
	});

	$.key("f12", function (e) {
		if ($(".modal:visible").length > 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f12]:visible:enabled").first().trigger('click');
		}
	});


	$.key("up", function (e) {


		if ($("#tableConsulta tbody tr.selected").length == 1) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			var elementConsulta = $("#tableConsulta tbody tr.selected");

			$(elementConsulta.prev()[0]).focus();
		} else {
			if ($(".modal#modalConferencia").is(':visible')) {

				if (vm.ConferenciaItens.DADOS.length > 0 && $(".modal#modalConferenciaItens:visible").length == 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();


					if ($("#dataTableConferenciaItens tbody tr.row_selected").length == 0) {
						$("#dataTableConferenciaItens tbody tr").first().addClass('row_selected');
						$("#dataTableConferenciaItens tbody tr").first().focus();
					} else {

						var element = $("#dataTableConferenciaItens tbody tr.row_selected");

						vm.ConferenciaItens.DATATABLE.$('tr.row_selected').removeClass('row_selected');

						if (element.prev().is('tr')) {
							$(element.prev()[0]).addClass('row_selected');

							$(element.prev()[0]).focus();
						} else {
							$("#dataTableConferenciaItens tbody tr").first().addClass('row_selected');
							$("#dataTableConferenciaItens tbody tr").first().focus();
						}
					}
				}
			} else if ($(".modal:visible").length == 0) {

				if (vm.Conferencia.DADOS.length > 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#dataTableConferencia tbody tr.row_selected").length == 0) {
						$("#dataTableConferencia tbody tr").first().addClass('row_selected');
						$("#dataTableConferencia tbody tr").first().focus();
					} else {

						var element = $("#dataTableConferencia tbody tr.row_selected");

						element.removeClass('row_selected');

						if (element.prev().is('tr')) {
							$(element.prev()[0]).addClass('row_selected');

							$(element.prev()[0]).focus();
						} else {
							$("#dataTableConferencia tbody tr").first().addClass('row_selected');
							$("#dataTableConferencia tbody tr").first().focus();
						}
					}
				}

			}
		}

	});

	$.key("down", function (e) {

		if ($("#tableConsulta tbody tr.selected").length == 1) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var elementConsulta = $("#tableConsulta tbody tr.selected");

			$(elementConsulta.next()[0]).focus();
		} else {
			if ($(".modal#modalConferencia").is(':visible')) {

				if (vm.ConferenciaItens.DADOS.length > 0 && $(".modal#modalConferenciaItens:visible").length == 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();


					if ($("#dataTableConferenciaItens tbody tr.row_selected").length == 0) {
						$("#dataTableConferenciaItens tbody tr").first().addClass('row_selected');
						$("#dataTableConferenciaItens tbody tr").first().focus();
					} else {

						var element = $("#dataTableConferenciaItens tbody tr.row_selected");

						vm.ConferenciaItens.DATATABLE.$('tr.row_selected').removeClass('row_selected');

						if (element.next().is('tr')) {
							$(element.next()[0]).addClass('row_selected');

							$(element.next()[0]).focus();
						} else {
							$("#dataTableConferenciaItens tbody tr").first().addClass('row_selected');
							$("#dataTableConferenciaItens tbody tr").first().focus();
						}
					}
				}
			} else if ($(".modal:visible").length == 0) {
				if (vm.Conferencia.DADOS.length > 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#dataTableConferencia tbody tr.row_selected").length == 0) {
						$("#dataTableConferencia tbody tr").first().addClass('row_selected');
						$("#dataTableConferencia tbody tr").first().focus();
					} else {

						var element = $("#dataTableConferencia tbody tr.row_selected");

						element.removeClass('row_selected');

						if (element.next().is('tr')) {
							$(element.next()[0]).addClass('row_selected');

							$(element.next()[0]).focus();
						} else {
							$("#dataTableConferencia tbody tr").first().addClass('row_selected');
							$("#dataTableConferencia tbody tr").first().focus();
						}
					}
				}

			}
		}

	});
}

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('Conferencia', Conferencia);

	Conferencia.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function Conferencia($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function Conferencia($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.Conferencia';

			obj.url_consultar = urlhost + '/funcionalidades/conferencia/get';
			obj.url_gravar = urlhost + '/funcionalidades/conferencia/post';
			obj.url_excluir = urlhost + '/funcionalidades/conferencia/delete';
			obj.url_imprimir_papel_termico = urlhost + '/funcionalidades/conferencia/impressao';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];
			obj.BACKUP_ITENS = [];
			obj.consultas = [];

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
			obj.visualizar = visualizar;
			obj.insertConsultas = insertConsultas;
			obj.setDadosConsultar = setDadosConsultar;
			obj.consultar = consultar;
			obj.compileDatatable = compileDatatable;
			obj.imprimirPapelTermico = imprimirPapelTermico;
			obj.setConsultasPadroesDisabled = setConsultasPadroesDisabled;
			obj.setConsultasPadroesEnabled = setConsultasPadroesEnabled;
		}

		function setDadosIncluir() {

			var dados = {
				ID: 0,
				CLIENTE_ID: 0,
				CLIENTE_CPF: '',
				TABELA_PRECO_ID: 0,
				OBSERVACAO: '',
				MOTIVO_ENCERRAMENTO: '' };


			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			gScope.ConferenciaItens.DADOS = [];
			gScope.ConferenciaItens.compileDatatable();


			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					consulta.OBJ.apagar();
					consulta.OBJ.Input.disabled = false;
					consulta.OBJ.btn_filtro.disabled = false;
				});
			}

			$("#modalConferencia").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalConferencia");
			}, 200);
		}

		function gravar() {

			var that = this;

			var check = true;

			if (gScope.ConsultaTabelaPreco.item.selected == false) {
				check = false;
				showErro("Selecione uma tabela de preço");
			}

			if (gScope.ConferenciaItens.DADOS.length == 0) {
				check = false;
				showErro("Conferência sem itens inseridos");
			}

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente gravar esse registro?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {
				},
				function (e, btn) {
					that.confirmarGravar();
				}]);

			}

		}

		function confirmarGravar() {
			var that = this;

			obj.SELECTED.GRAVAR_ITENS = gScope.ConferenciaItens.DADOS;
			obj.SELECTED.ITENS_EXCLUIDOS = gScope.ConferenciaItens.ITENS_EXCLUIDOS;

			obj.SELECTED.CLIENTE_ID = gScope.ConsultaCliente.item.dados.CODIGO;
			obj.SELECTED.TABELA_PRECO_ID = gScope.ConsultaTabelaPreco.item.dados.ID;
			obj.SELECTED.CLIENTE_CPF = gScope.ConsultaCliente.item.dados.CNPJ;


			var dados = {
				DADOS: obj.SELECTED,
				FILTRO: {} };




			return $q(function (resolve, reject) {

				$ajax.post(that.url_gravar, dados).then(function (response) {

					var msg = '';

					if (obj.INCLUINDO) {
						msg = 'Registro incluído com sucesso';

					} else {
						msg = 'Registro alterado com sucesso';
						var index = -1;

						angular.forEach(obj.DADOS, function (item, value) {
							if (item[obj.CAMPO_INDEX] == response.ID_RETURN) {
								index = value;
							}
						});

						if (index >= 0) {
							obj.DADOS.splice(index, 1);
						}
					}

					obj.SELECTED = response.DATA_RETURN[0];

					obj.DADOS.push(obj.SELECTED);

					showSuccess(msg);

					$("#modalConferencia").modal('hide');

					obj.INCLUINDO = false;
					obj.ALTERANDO = false;

					obj.compileDatatable();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});
		}

		function excluir(index) {
			var that = this;

			var item = obj.SELECTED;

			if (typeof index != 'undefined') {
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			var msg = gScope.Confirme.add(1, 'Confirmação',
			'Deseja realmente excluir esse registro?', [
			{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
			{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

			[
			function (e, btn) {
			},
			function (e, btn) {
				that.confirmarExcluir();
			}]);


		}

		function confirmarExcluir() {

			var that = this;

			var dados = {
				DADOS: obj.SELECTED };


			return $q(function (resolve, reject) {

				$ajax.post(that.url_excluir, dados).then(function (response) {

					var index = -1;

					angular.forEach(obj.DADOS, function (item, value) {
						if (item[obj.CAMPO_INDEX] == obj.SELECTED.ID) {
							index = value;
						}
					});

					if (index >= 0) {
						obj.DADOS.splice(index, 1);
					}

					obj.compileDatatable();

					obj.SELECTED = {};

					showSuccess("Registro excluído com sucesso");

					$("#modalConferencia").modal('hide');


					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function cancelar() {
			var that = this;

			var msg = gScope.Confirme.add(1, 'Confirmação',
			'Deseja realmente cancelar essa operação?', [
			{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
			{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

			[
			function (e, btn) {

			},
			function (e, btn) {
				that.confirmarCancelar();
			}]);

		}

		function confirmarCancelar() {
			var that = this;

			if (Object.keys(obj.BACKUP).length === 0) {
				obj.SELECTED = {};
			} else {
				obj.SELECTED = angular.copy(obj.BACKUP);
			}

			if (obj.INCLUINDO) {
				if (that.consultas.length > 0) {
					angular.forEach(that.consultas, function (consulta, key) {
						consulta.OBJ.apagar();
						consulta.OBJ.Input.disabled = false;
						consulta.OBJ.btn_filtro.disabled = false;
					});
				}

				$("#modalConferencia").modal('hide');
			} else {
				gScope.ConferenciaItens.DADOS = angular.copy(obj.BACKUP_ITENS);
				gScope.ConferenciaItens.ITENS_EXCLUIDOS = [];
				gScope.ConferenciaItens.compileDatatable();
				obj.insertConsultas();
			}

			gScope.ConferenciaItens.PRODUTOS = [];

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar() {
			var that = this;

			var check = true;

			if (obj.SELECTED.AMBIENTE == 1) {
				check = false;
				showErro("Não é possível alterar um registro de origem online");
			}

			if (check == true) {
				obj.INCLUINDO = false;
				obj.ALTERANDO = true;

				obj.BACKUP = angular.copy(obj.SELECTED);

				obj.BACKUP_ITENS = angular.copy(gScope.ConferenciaItens.DADOS);

				if (that.consultas.length > 0) {
					angular.forEach(that.consultas, function (consulta, key) {
						if (typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true) {
							consulta.OBJ.btn_apagar_filtro.disabled = false;
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;
						}
					});
				}

				gScope.ConferenciaItens.validateDisabledEnabledConsultas();

				$("#modalConferencia").modal('show');

				$timeout(function () {
					onFocusInputModal("#modalConferencia");
				}, 200);
			}
		}

		function visualizar(item) {
			var that = this;

			var item = obj.SELECTED;

			if (typeof index != 'undefined') {
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			obj.insertConsultas();

			gScope.ConferenciaItens.consultar();

			$("#modalConferencia").modal('show');

		}

		function insertConsultas() {
			var that = this;

			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					var nome = consulta.NOME;

					if (typeof that.SELECTED[nome + '_JSON'] != 'undefined' && that.SELECTED[nome + '_JSON'] != '' && that.SELECTED[nome + '_JSON'] != null) {
						consulta.OBJ.setSelected(JSON.parse(that.SELECTED[nome + '_JSON']));

						if (that.SELECTED[that.CAMPO_INDEX] <= 0) {
							consulta.OBJ.btn_apagar_filtro.disabled = false;
						} else {
							consulta.OBJ.btn_apagar_filtro.disabled = true;
						}

					} else {
						if (that.SELECTED[that.CAMPO_INDEX] <= 0 && that.disabled_consulta_on_visualizar == false) {
							consulta.OBJ.apagar();
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;
						} else {
							consulta.OBJ.apagar();
							consulta.OBJ.Input.disabled = true;
							consulta.OBJ.btn_filtro.disabled = true;
						}
					}
				});
			}

		}

		function setDadosConsultar(dados) {
			var that = this;

			dados.FILTRO.FILTRO_TABELA_PRECO = gScope.ConsultaTabelaPrecoFiltro.item.dados.ID;
			dados.FILTRO.FILTRO_CLIENTE = gScope.ConsultaClienteFiltro.item.dados.CODIGO;

			return dados;
		}

		function consultar() {

			var that = this;

			var dados = {
				FILTRO: {} };




			dados = obj.setDadosConsultar(dados);

			return $q(function (resolve, reject) {

				$ajax.post(that.url_consultar, dados).then(function (response) {

					obj.DADOS = response;

					obj.compileDatatable();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function compileDatatable() {

			var that = this;

			if (obj.DATATABLE == null) {
				obj.DATATABLE = $('#dataTableConferencia').DataTable({
					"order": [[0, 'desc']],
					"searching": false,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function drawCallback() {
						$('.popoverCFe').popover({
							"html": true });

					},
					"columns": [
					{ "data": "STATUS", "title": '', "className": "text-center",
						render: function render(data, type, row) {
							var html = '';

							if (data == 0) {
								html = '<div class="badge badge-green mr-3 text-small">ATIVA</div>';
							} else if (data == 2) {
								html = '<div class="badge badge-dark mr-3 text-small">ENCERRADA</div>';
							}

							return html;
						} },

					{ "data": "ID", "title": 'ID',
						render: function render(data, type, row) {
							return row.DESC_ID;
						} },

					{ "data": "TABELA", "title": 'Tabela de Preço',
						render: function render(data, type, row) {
							return row.DESC_TABELA;
						} },

					{ "data": "DESC_CLIENTE", "title": 'Cliente', "className": "text-center",
						render: function render(data, type, row) {
							var html = '';

							if (data != '' && data != null) {
								html = '<a class="popoverCFe" id="popCliente' + row.ID + '" href="javascript:void(0);" tabindex="-1" data-toggle="popover" data-trigger="hover" title="" data-placement="bottom" data-content="<b>' + row.RAZAOSOCIAL + '</b>">' + row.CLIENTE_ID_F + '</a>';
							}

							return html;
						} },

					{ "data": "DATAHORA", "title": 'Data/Hora',
						render: function render(data, type, row) {
							return row.DATAHORA_FORMATADA;
						} },

					{ "data": "OBSERVACAO", "title": 'Observação', "className": "text-center",
						render: function render(data, type, row) {
							var html = '<a class="popoverCFe" id="pop' + row.ID + '" href="javascript:void(0);" tabindex="-1" data-toggle="popover" data-trigger="hover" title="" data-placement="bottom" data-content="<b>' + data + '</b>"><i class="fas fa-info-circle"></i></a>';
							return html;
						} },

					{ "data": "QTD_PECAS", "title": 'Qtd.Peças', "className": "text-right",
						render: function render(data, type, row) {
							var qtdPecas = Number(data);
							return qtdPecas;
						} },

					{ "data": "VALOR_TOTAL", "className": "text-right", "title": 'Valor Total',
						render: function render(data, type, row) {
							var decimaisTotal = gScope.calcularQuantidadeDecimais(Number(data));
							var totalVisualizacao = 'R$ ' + number_format(Number(data), decimaisTotal, ',', '.');
							return totalVisualizacao;
						} },

					{ "data": "AMBIENTE", "title": 'Origem', "className": "text-center",
						render: function render(data, type, row) {
							var html = '';

							if (data == 1) {
								html = '<div class="badge badge-green mr-3 text-small">ONLINE</div>';
							} else {
								html = '<div class="badge badge-red mr-3 text-small">OFFLINE</div>';
							}

							return html;
						} },

					{ "data": "ACTIONS", "title": 'Opções',
						render: function render(data, type, full, meta) {
							var html = '';

							var index = meta.row;

							html = html + ' <div class="form-group no-print" style="display: contents;"> ' +
							'			<div class="dropdown acoes"> ' +
							'				<button type="button" class="btn btn-sm btn-warning toggle" ' +
							'					style="margin-left: 6px;" ' +
							'					data-toggle="dropdown" ng-dblclick="$event.stopPropagation();" aria-expanded="false" ' + 'ng-readonly="false"> ' +
							'					<span class="fas fa-th-list"></span> ' +
							'					 ' +
							' 				</button> ' +
							'					<ul class="dropdown-menu">	' +
							'						<li class="dropdown-header" style="text-transform: initial; font-weight: bold;"> ' +
							'							Ações Disponíveis </li>' +
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.Conferencia.imprimirPapelTermico(' + index + ');"> ' +
							'	 						<a style="text-transform: initial; cursor: pointer;"> ' +
							' 								<span class="fas fa-print"></span> Imprimir </a> ' +
							'						</li> ' +
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.Conferencia.excluir(' + index + ');"> ' +
							'	 						<a style="text-transform: initial; cursor: pointer;"> ' +
							' 								<span class="fas fa-trash"></span> Excluir</a> ' +
							'						</li> ' +
							'					</ul> ' +
							'				</div> ' +
							'			</div> ';

							return html;
						} }],


					createdRow: function createdRow(row, data, dataIndex) {

						// $(row).on('click', function () {
						// 	if ($(row).hasClass('row_selected') == false) {
						// 		obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
						// 		$(row).addClass('row_selected');
						// 	} else {
						// 		$(row).removeClass('row_selected');
						// 	}
						// });

						if (data[obj.CAMPO_INDEX] == obj.SELECTED[obj.CAMPO_INDEX]) {
							$(row).addClass('row_selected');
						}

						$(row).on('dblclick', function () {
							obj.SELECTED = data;
							obj.visualizar();

							obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
							$(row).addClass('row_selected');
						});

						$compile(angular.element(row).contents())(obj.scope);
					},
					"language": returnLanguageDatatable() });


			} else {
				obj.DATATABLE.clear();
				if (obj.DADOS.length > 0) {
					angular.forEach(obj.DADOS, function (item, value) {
						obj.DATATABLE.row.add(item).draw();
					});
				} else {
					obj.DATATABLE.draw();
				}
			}
		}

		function imprimirPapelTermico(index) {

			var that = this;

			var item = obj.DATATABLE.row(index).data();
			obj.SELECTED = item;

			var dados = {
				DADOS: obj.SELECTED };


			return $q(function (resolve, reject) {

				$ajax.post(that.url_imprimir_papel_termico, dados).then(function (response) {

					gScope.Devices.imprimirCupom(trim_null(response));

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setConsultasPadroesDisabled() {
			gScope.ConsultaTabelaPreco.btn_apagar_filtro.disabled = true;
			gScope.ConsultaTabelaPreco.Input.disabled = true;
			gScope.ConsultaTabelaPreco.btn_filtro.disabled = true;
		}

		function setConsultasPadroesEnabled() {
			gScope.ConsultaTabelaPreco.btn_apagar_filtro.disabled = false;
			gScope.ConsultaTabelaPreco.Input.disabled = false;
			gScope.ConsultaTabelaPreco.btn_filtro.disabled = false;
		}

		return Conferencia;
	};

})(window, window.angular);

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('ConferenciaItens', ConferenciaItens);

	ConferenciaItens.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function ConferenciaItens($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function ConferenciaItens($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.ConferenciaItens';

			obj.url_consultar = urlhost + '/funcionalidades/conferencia/getItens';
			obj.url_gravar = urlhost + '/funcionalidades/conferencia/post';
			obj.url_excluir = urlhost + '/funcionalidades/conferencia/delete';
			obj.url_get_products = urlhost + '/funcionalidades/conferencia/getProdutos';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];

			obj.ITENS_EXCLUIDOS = [];

			obj.PRODUTOS = [];

			obj.FILTRO_PRODUTO = '';

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.HABILITA_EAN = false;

			obj.HABILITA_PRODUTO = false;

			obj.DATATABLE = null;
			obj.DATATABLE_PRODUCTS = null;

			obj.setDadosIncluir = setDadosIncluir;
			obj.incluir = incluir;
			obj.openModalAndFocusInclusao = openModalAndFocusInclusao;
			obj.getNewProducts = getNewProducts;
			obj.enterOnCodigoEAN = enterOnCodigoEAN;
			obj.onValidarProduct = onValidarProduct;
			obj.returnSequence = returnSequence;
			obj.validateDisabledEnabledConsultas = validateDisabledEnabledConsultas;
			obj.calculateTotalItem = calculateTotalItem;
			obj.confirmarGravar = confirmarGravar;
			obj.excluir = excluir;
			obj.setDadosConsultar = setDadosConsultar;
			obj.cancelar = cancelar;
			obj.consultar = consultar;
			obj.compileDatatable = compileDatatable;
			obj.showProducts = showProducts;
			obj.compileDatatableProducts = compileDatatableProducts;
			obj.keyUPSearchProducts = keyUPSearchProducts;
			obj.plusQtd = plusQtd;
			obj.minusQtd = minusQtd;
			obj.convertStringToNumber = convertStringToNumber;
			obj.excluirAllItens = excluirAllItens;
			obj.confirmarExcluirAllItens = confirmarExcluirAllItens;
		}

		function setDadosIncluir() {

			var dados = {
				ID: 0,
				QUANTIDADE: 1,
				EAN: '' };


			return dados;
		}

		function incluir() {

			var check = true;

			if (gScope.ConsultaTabelaPreco.item.selected == false) {
				check = false;
				showErro("Selecione uma tabela de preço");

				gScope.ConsultaTabelaPreco.setFocusInput();

			}

			if (check == true) {

				obj.INCLUINDO = true;

				obj.SELECTED = obj.setDadosIncluir();

				if (obj.PRODUTOS.length > 0) {
					var tabelaPrecoAux = obj.PRODUTOS[0].TABELA_PRECO_ID;
					if (tabelaPrecoAux != gScope.ConsultaTabelaPreco.item.dados.ID) {
						obj.getNewProducts();
					} else {
						obj.openModalAndFocusInclusao();
					}

				} else {
					obj.getNewProducts();
				}
			}
		}

		function openModalAndFocusInclusao() {
			$("#modalConferenciaItens").modal('show');

			$timeout(function () {
				$("#codigoEANConferencia").first().focus();
			}, 200);
		}

		function getNewProducts() {

			var that = this;

			var dados = {
				DADOS: {
					TABELA_PRECO: gScope.ConsultaTabelaPreco.item.dados.ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_get_products, dados).then(function (response) {

					obj.PRODUTOS = response;
					// obj.compileDatatableProducts();

					obj.openModalAndFocusInclusao();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function enterOnCodigoEAN(event) {
			if (obj.SELECTED.EAN != '' && obj.SELECTED.EAN != null) {
				if (event.keyCode == 13) {
					event.stopImmediatePropagation();
					event.stopPropagation();
					event.preventDefault();
					obj.confirmarGravar();
				}
			}
		}

		function onValidarProduct(product) {
			var check = true;

			if (product.LOCALIZACAO_ID == null || product.LOCALIZACAO_ID <= 0) {
				check = false;
				showErro("Produto " + product.DESC_PRODUTO + " sem Localização configurada na Família", true);
			}

			if (product.EAN == null || product.EAN <= 0) {
				check = false;
				showErro("Produto " + product.DESC_PRODUTO + " sem código de barras", true);
			}

			if (product.CFOP_CODIGO == null || product.CFOP_CODIGO == '') {
				check = false;
				showErro("Produto " + product.DESC_PRODUTO + " sem CFOP configurado na Família", true);
			}

			if (product.VALOR_UNITARIO <= 0) {
				check = false;
				showErro("Produto " + product.DESC_PRODUTO + " sem valor unitário", true);
			}

			if (trim_null(product.TRIBUTACAO_PIS) == '' || trim_null(product.TRIBUTACAO_COFINS) == '') {
				check = false;
				showErro("Produto " + product.DESC_PRODUTO + " sem Tributação de PIS/COFINS configurada na Família", true);
			}

			if (trim_null(product.TRIBUTACAO_ICMS) == '' || trim_null(product.TRIBUTACAO_ICMS) == '') {
				check = false;
				showErro("Produto " + product.DESC_PRODUTO + " sem Tributação de ICMS configurada na Família", true);
			}

			return check;
		}

		function confirmarGravar(produtoDatatable) {

			var that = this;
			that.HABILITA_EAN = false;
			var product = {};
			var indice = -1;

			if (typeof produtoDatatable == 'undefined') {
				for (var index = 0; index < obj.PRODUTOS.length; index++) {
					var element = obj.PRODUTOS[index];

					if (trim_null(element.EAN) == trim_null(obj.SELECTED.EAN)) {
						product = element;
						indice = index;
						break;
					}
				}
			} else {
				product = produtoDatatable;
				indice = 0;
			}

			if (indice >= 0) {

				var check = obj.onValidarProduct(product);

				if (check == true) {
					product.ID = Number(obj.SELECTED.ID);
					product.SEQUENCIA = obj.returnSequence();
					product.DESC_SEQUENCIA = trim_null(product.SEQUENCIA).padStart(3, '0');
					product.QUANTIDADE = Number(obj.SELECTED.QUANTIDADE);
					product.VALOR_UNITARIO = Number(product.VALOR_UNITARIO);
					product.VALOR_DESCONTO = 0;
					obj.calculateTotalItem(product);

					obj.DADOS.push(angular.copy(product));
					obj.compileDatatable();
					showSuccess("Item Incluído");
					obj.validateDisabledEnabledConsultas();

					obj.incluir();

				}

			} else {
				showErro("Produto não encontrado para essa tabela de preço");
			}

			that.HABILITA_EAN = true;

		}

		function returnSequence() {
			var sequenciaReturn = 0;

			if (obj.DADOS.length > 0) {
				var array_seq = sort_by_key(obj.DADOS, "SEQUENCIA");
				var length = array_seq.length - 1;
				var sequencia = array_seq[length].SEQUENCIA;
				sequenciaReturn = Number(sequencia) + 1;
			} else {
				sequenciaReturn = 1;
			}

			return sequenciaReturn;
		}

		function sort_by_key(array, key) {
			return array.sort(function (a, b) {
				var x = a[key];var y = b[key];
				return x < y ? -1 : x > y ? 1 : 0;
			});
		}

		function validateDisabledEnabledConsultas() {

			if (obj.DADOS.length > 0) {
				gScope.Conferencia.setConsultasPadroesDisabled();
			} else {
				gScope.Conferencia.setConsultasPadroesEnabled();
			}

		}

		function calculateTotalItem(data) {

			data.VALOR_TOTAL = data.QUANTIDADE * data.VALOR_UNITARIO;
			data.VALOR_TOTAL = Number(Number(data.VALOR_TOTAL).toFixed(2));

			if (gScope.ConsultaCliente.item.selected == true && Number(gScope.ConsultaCliente.item.dados.PERCENTUAL_DESCONTO) > 0) {
				var percentualDesconto = Number(gScope.ConsultaCliente.item.dados.PERCENTUAL_DESCONTO);

				var valorDesconto = data.VALOR_TOTAL * (percentualDesconto / 100);
				valorDesconto = Number(Number(valorDesconto).toFixed(2));
				data.VALOR_DESCONTO = valorDesconto;
			}

			var auxTotal = numeral(angular.copy(data.VALOR_TOTAL));

			var newTotalWithDesconto = angular.copy(auxTotal).subtract(data.VALOR_DESCONTO);

			data.VALOR_LIQUIDO = newTotalWithDesconto.value();

		}

		function excluir(index) {
			var that = this;

			var item = obj.SELECTED;

			if (typeof index != 'undefined') {
				item = obj.DATATABLE.row(index).data();
				// obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');

				// obj.DATATABLE.row(index).addClass('row_selected');

			}

			obj.SELECTED = item;

			var msg = gScope.Confirme.add(1, 'Confirmação',
			'Deseja realmente excluir esse registro?', [
			{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
			{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

			[
			function (e, btn) {
			},
			function (e, btn) {
				var indice = -1;
				var boolean = false;
				var json = {};

				angular.forEach(obj.DADOS, function (item, value) {
					if (item.SEQUENCIA == obj.SELECTED.SEQUENCIA) {
						indice = value;
						boolean = true;
						json = angular.copy(item);
					}
				});

				if (boolean) {

					if (json.ID > 0) {
						obj.ITENS_EXCLUIDOS.push(json);
					}

					obj.DADOS.splice(indice, 1);

					angular.forEach(obj.DADOS, function (item, value) {
						item.SEQUENCIA = value + 1;
						item.DESC_SEQUENCIA = trim_null(item.SEQUENCIA).padStart(3, '0');
					});

					obj.compileDatatable();

					obj.validateDisabledEnabledConsultas();
				}
			}]);


		}

		function setDadosConsultar(dados) {
			var that = this;

			return dados;
		}

		function cancelar() {
			obj.SELECTED = obj.setDadosIncluir();

			$("#modalConferenciaItens").modal('hide');
		}

		function consultar() {

			var that = this;

			var dados = {
				FILTRO: {
					CONFERENCIA_ID: gScope.Conferencia.SELECTED.ID } };



			dados = obj.setDadosConsultar(dados);

			return $q(function (resolve, reject) {

				$ajax.post(that.url_consultar, dados).then(function (response) {

					obj.DADOS = response;

					obj.compileDatatable();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function compileDatatable() {

			var that = this;

			if (obj.DATATABLE == null) {
				obj.DATATABLE = $('#dataTableConferenciaItens').DataTable({
					"order": [[0, 'asc']],
					"searching": false,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function drawCallback() {
						$('.popoverCFeItens').popover({
							"html": true });

					},
					"columns": [
					{ "data": "SEQUENCIA", "title": 'Seq.',
						render: function render(data, type, row) {
							return row.DESC_SEQUENCIA;
						} },

					{ "data": "PRODUTO_DESCRICAO", "title": 'Produto', "className": "text-center",
						render: function render(data, type, row) {
							var html = '<a class="popoverCFeItens" id="popProduto' + row.ID + '" href="javascript:void(0);" tabindex="-1" data-toggle="popover" data-trigger="hover" title="" data-placement="bottom" data-content="<b>' + row.DESC_PRODUTO + '</b>">' + row.PRODUTO_ID + '</a>';
							return html;
						} },

					// { "data": "EAN", "title": 'EAN' },
					{ "data": "QUANTIDADE", "title": 'Qtd', "className": "text-right",
						render: function render(data, type, row) {
							var qtdPecas = Number(data);
							return qtdPecas;
						} },

					{ "data": "VALOR_UNITARIO", "className": "text-right", "title": 'Valor Unitário',
						render: function render(data, type, row) {
							var decimais = gScope.calcularQuantidadeDecimais(Number(data));
							var visualizacao = 'R$ ' + number_format(Number(data), decimais, ',', '.');
							return visualizacao;
						} },

					{ "data": "VALOR_TOTAL", "className": "text-right", "title": 'Valor Total',
						render: function render(data, type, row) {
							var decimais = gScope.calcularQuantidadeDecimais(Number(data));
							var visualizacao = 'R$ ' + number_format(Number(data), decimais, ',', '.');
							return visualizacao;
						} },

					{ "data": "VALOR_DESCONTO", "className": "text-right", "title": 'Valor Desconto',
						render: function render(data, type, row) {
							var decimais = gScope.calcularQuantidadeDecimais(Number(data));
							var visualizacao = 'R$ ' + number_format(Number(data), decimais, ',', '.');
							return visualizacao;
						} },

					{ "data": "VALOR_LIQUIDO", "className": "text-right", "title": 'Valor Líquido',
						render: function render(data, type, row) {
							var decimais = gScope.calcularQuantidadeDecimais(Number(data));
							var visualizacao = 'R$ ' + number_format(Number(data), decimais, ',', '.');
							return visualizacao;
						} },

					{ "data": "ACTIONS", "title": 'Opções', "className": "text-center",
						render: function render(data, type, full, meta) {
							var html = '';

							var index = meta.row;

							html = html + ' <div class="form-group no-print" style="display: contents;"> ' +
							'				<button type="button" class="btn btn-sm btn-danger" ' +
							'					style="margin-left: 6px;" ' +
							'					ng-click="vm.ConferenciaItens.excluir(' + index + ');" ng-disabled="vm.Conferencia.INCLUINDO == false && vm.Conferencia.ALTERANDO == false"> ' +
							'					<span class="fas fa-trash"></span> ' +
							'					 ' +
							' 				</button> ' +
							'			</div> ';

							return html;
						} }],


					createdRow: function createdRow(row, data, dataIndex) {

						$(row).on('click', function () {
							if ($(row).hasClass('row_selected') == false) {
								obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
								$(row).addClass('row_selected');
							} else {
								$(row).removeClass('row_selected');
							}
						});

						$compile(angular.element(row).contents())(obj.scope);
					},
					"language": returnLanguageDatatable() });


			} else {
				obj.DATATABLE.clear();
				if (obj.DADOS.length > 0) {
					angular.forEach(obj.DADOS, function (item, value) {
						obj.DATATABLE.row.add(item).draw();
					});
				} else {
					obj.DATATABLE.draw();
				}
			}
		}

		function showProducts() {

			obj.FILTRO_PRODUTO = '';

			obj.HABILITA_PRODUTO = true;

			obj.compileDatatableProducts();

			$timeout(function () {
				$("#filtroProduto").first().focus();
			});
		}

		function compileDatatableProducts() {

			if (obj.DATATABLE_PRODUCTS == null) {
				obj.DATATABLE_PRODUCTS = $('#dataTableProducts').DataTable({
					"order": [[1, 'asc']],
					"data": obj.PRODUTOS,
					"tabIndex": 0,
					"columns": [
					{ "data": "DESC_PRODUTO", "title": 'Produto' },
					{ "data": "VALOR_UNITARIO_VISUALIZACAO", "className": "text-right", "title": 'Valor Unitário' }],

					"language": returnLanguageDatatable(),
					"createdRow": function createdRow(row, data, dataIndex) {
						$(row).attr("tabindex", 0);

						$(row).on('dblclick', function () {
							obj.confirmarGravar(data);
						});

						$(row).on('click', function () {
							if ($(row).hasClass('row_selected') == false) {
								obj.DATATABLE_PRODUCTS.$('tr.row_selected').removeClass('row_selected');
								$(row).addClass('row_selected');
							} else {
								$(row).removeClass('row_selected');
							}
						});

					} });

			} else {
				obj.DATATABLE_PRODUCTS.search(obj.FILTRO_PRODUTO).draw();

				$("#dataTableProducts tbody tr").each(function () {
					$(this).removeClass('row_selected');
				});

			}
		}


		function keyUPSearchProducts(event) {
			var that = this;

			$timeout(function () {
				$rootScope.$apply(function () {
					obj.DATATABLE_PRODUCTS.search(that.FILTRO_PRODUTO).draw();
					$("#dataTableProducts tbody tr").each(function () {
						$(this).removeClass('row_selected');
					});

					$("#dataTableProducts tbody").find('tr').eq(0).addClass('row_selected');
				});
			});
		}

		function plusQtd() {
			var that = this;

			if (obj.INCLUINDO || obj.ALTERANDO == true && obj.INCLUINDO == false) {
				$timeout(function () {
					$rootScope.$apply(function () {
						that.SELECTED.QUANTIDADE = obj.convertStringToNumber(that.SELECTED.QUANTIDADE);

						that.SELECTED.QUANTIDADE = Number(that.SELECTED.QUANTIDADE) + 1;
					});
				});
			}
		}

		function minusQtd() {

			var that = this;

			if (obj.INCLUINDO || obj.ALTERANDO == true && obj.INCLUINDO == false) {
				$timeout(function () {
					$rootScope.$apply(function () {

						that.SELECTED.QUANTIDADE = obj.convertStringToNumber(that.SELECTED.QUANTIDADE);

						var auxQtd = that.SELECTED.QUANTIDADE - 1;
						if (auxQtd == 0) {
							that.SELECTED.QUANTIDADE = 1;
						} else {
							that.SELECTED.QUANTIDADE = auxQtd;
						}
					});
				});
			}
		}

		function convertStringToNumber(str) {
			var vls = '';

			if ((str + '').indexOf('.') > -1 && (str + '').indexOf(',') > -1) {
				var vlsNoPoint = (str + '').replace('.', '');
				var vlsVirguleToPoint = (vlsNoPoint + '').replace(',', '.');
				vls = vlsVirguleToPoint;
			} else if ((str + '').indexOf('.') > -1 && (str + '').indexOf(',') == -1) {
				vls = str;
			} else if ((str + '').indexOf('.') == -1 && (str + '').indexOf(',') > -1) {
				var vlsVirguleToPoint = (str + '').replace(',', '.');
				vls = vlsVirguleToPoint;
			} else {
				if (isNaN(str) == false) {
					vls = str;
				}
			}

			var b = Number(vls);

			if (isNaN(b)) {
				b = 0;
			}

			return b;
		}

		function excluirAllItens() {

			var that = this;

			var msg = gScope.Confirme.add(1, 'Confirmação',
			'Você deseja realmente excluir todos os itens dessa conferência?', [
			{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
			{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

			[
			function (e, btn) {
			},
			function (e, btn) {
				that.confirmarExcluirAllItens();
			}]);


		}

		function confirmarExcluirAllItens() {

			angular.forEach(obj.DADOS, function (item, value) {
				if (item.ID > 0) {
					obj.ITENS_EXCLUIDOS.push(angular.copy(item));
				}
			});

			obj.DADOS = [];
			obj.compileDatatable();
			obj.validateDisabledEnabledConsultas();
		}

		return ConferenciaItens;
	};

})(window, window.angular);

/***/ })

/******/ });