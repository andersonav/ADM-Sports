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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ({

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
module.exports = __webpack_require__(58);


/***/ }),

/***/ 57:
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
'CapitalGiro',
'Confirmacao',
'Devices'];


function Ctrl(
$scope,
$timeout,
gScope,
Consulta,
CapitalGiro,
Confirmacao,
Devices)
{

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.CapitalGiro = new CapitalGiro($scope);
	vm.Confirmacao = new Confirmacao();
	vm.Devices = new Devices();
	vm.Confirme = vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme = vm.Confirme;
	gScope.Devices = vm.Devices;

	var today = new Date();
	var actual_month = today.getMonth();
	var actual_year = today.getFullYear();

	vm.ARRAY_ANOS = [];

	vm.ARRAY_MESES = [
	{ VALOR: 0, MES: 'Janeiro' },
	{ VALOR: 1, MES: 'Fevereiro' },
	{ VALOR: 2, MES: 'Março' },
	{ VALOR: 3, MES: 'Abril' },
	{ VALOR: 4, MES: 'Maio' },
	{ VALOR: 5, MES: 'Junho' },
	{ VALOR: 6, MES: 'Julho' },
	{ VALOR: 7, MES: 'Agosto' },
	{ VALOR: 8, MES: 'Setembro' },
	{ VALOR: 9, MES: 'Outubro' },
	{ VALOR: 10, MES: 'Novembro' },
	{ VALOR: 11, MES: 'Dezembro' }];


	gScope.ARRAY_MESES = vm.ARRAY_MESES;

	var tmp = actual_year + 20;

	for (var index = actual_year - 20; index <= tmp; index++) {
		vm.ARRAY_ANOS.push({ ANO: index });
	}

	gScope.ARRAY_ANOS = vm.ARRAY_ANOS;

	vm.CapitalGiro.MES = actual_month;
	vm.CapitalGiro.ANO = actual_year;


	vm.CapitalGiro.consultar();

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
	gScope.CapitalGiro = vm.CapitalGiro;


	$('.filter_on_enter').keyup(function (event) {
		var key = event.keyCode;

		if (key == 13) {
			vm.CapitalGiro.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.CapitalGiro.consultar();
		}
	});

}

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('CapitalGiro', CapitalGiro);

	CapitalGiro.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function CapitalGiro($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function CapitalGiro($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.CapitalGiro';

			obj.url_consultar = urlhost + '/admin/relatorios/capital-giro/get';
			obj.url_gravar = urlhost + '/admin/relatorios/capital-giro/post';
			obj.url_excluir = urlhost + '/admin/relatorios/capital-giro/delete';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];
			obj.BACKUP_ITENS = [];
			obj.consultas = [];
			obj.LABELS = [];
			obj.DATASET = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
			obj.CHART = null;

			obj.MODAL = "#modalCapitalGiro";

			obj.setDadosConsultar = setDadosConsultar;
			obj.consultar = consultar;
			obj.compileGrafics = compileGrafics;
		}

		function setDadosConsultar(dados) {
			var that = this;

			dados.FILTRO.MES = obj.MES + 1;
			dados.FILTRO.ANO = obj.ANO;

			return dados;
		}

		function consultar() {

			var that = this;

			var dados = {
				FILTRO: {},


				DADOS: {} };




			dados = obj.setDadosConsultar(dados);

			return $q(function (resolve, reject) {

				$ajax.post(that.url_consultar, dados).then(function (response) {

					obj.LABELS = [];

					obj.DATASET = [];

					var arrLabel = [];

					angular.forEach(response.LANCAMENTOS, function (item, value) {

						var json = {
							label: item.DESCRICAO,
							data: [],
							backgroundColor: '',
							pointRadius: 3 };


						if (item.OPERACAO == 0) {
							json.backgroundColor = '#36a2eb';
						} else {
							json.backgroundColor = '#ff6384';
						}

						for (var index = 0; index < item.LANCAMENTOS.length; index++) {
							var element = item.LANCAMENTOS[index];
							var valor = element.VALOR;
							var label = element.LABEL;

							json.data.push(valor);

							arrLabel.push(label);
						}

						obj.DATASET.push(angular.copy(json));

					});

					$.each(arrLabel, function (i, el) {
						if ($.inArray(el, obj.LABELS) === -1) obj.LABELS.push(el);
					});

					if (obj.DATASET.length > 0) {
						var jsonSaldoDiaro = {
							label: 'Saldo caixa',
							data: [],
							backgroundColor: '#4bc0c0',
							pointRadius: 3 };


						angular.forEach(response.SALDO_CAIXA, function (item, value) {
							jsonSaldoDiaro.data.push(Number(item.SALDO_CAIXA));
						});

						obj.DATASET.push(angular.copy(jsonSaldoDiaro));
					}

					obj.compileGrafics();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function compileGrafics() {

			var that = this;

			if (obj.CHART == null) {
				var ctx = document.getElementById("myAreaStacked");

				obj.CHART = new Chart(ctx, {
					type: "bar",
					data: {
						labels: obj.LABELS,
						datasets: obj.DATASET },

					options: {
						plugins: {
							title: {
								display: true,
								text: 'Capital de Giro' } },


						responsive: true,
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true } }],


							x: {
								stacked: true },


							y: {
								stacked: true } },



						tooltips: {
							callbacks: {
								label: function label(tooltipItem, chart) {
									var datasetLabel =
									chart.datasets[tooltipItem.datasetIndex].label || "";
									return datasetLabel + ": R$ " + number_format(tooltipItem.yLabel, 2);
								} } } } });




			} else {
				obj.CHART.data.datasets.pop();
				obj.CHART.data.datasets = obj.DATASET;

				obj.CHART.update();
			}

		}

		return CapitalGiro;
	};

})(window, window.angular);

/***/ })

/******/ });