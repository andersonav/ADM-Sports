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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('EmissorCFeComunicacaoSefaz', EmissorCFeComunicacaoSefaz);

	EmissorCFeComunicacaoSefaz.$inject = [
	'$ajax',
	'$q',
	'$timeout',
	'gScope'];


	function EmissorCFeComunicacaoSefaz($ajax, $q, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function EmissorCFeComunicacaoSefaz() {

			obj = this;
			obj.model = 'vm.EmissorCFeComunicacaoSefaz';
			obj.statusOperacional = statusOperacional;
			obj.execComando = execComando;
			obj.emitirCFE = emitirCFE;
			obj.enviarCFE = enviarCFE;
			obj.printText = printText;
			obj.cancelarCFE = cancelarCFE;
			obj.imprimirCFE = imprimirCFE;
			obj.getCaixa = getCaixa;
			obj.execPagamentoEtapa1 = execPagamentoEtapa1;
			obj.execPagamentoEtapa2 = execPagamentoEtapa2;
			obj.execEnviarRespostaFiscalCupom = execEnviarRespostaFiscalCupom;

			obj.LOG = '';
			obj.XML = '';
			obj.STATUS = 'E';
			obj.IDPagamento = '';

			obj.url_datasnap = 'http://localhost:8080/datasnap/rest/TServerMethods1/';
			// obj.url_datasnap		= 'http://192.168.0.179:8080/datasnap/rest/TServerMethods1/';

		}

		function getCaixa(paran) {
			var that = this;

			var url = that.url_datasnap + 'getCaixa';

			return $q(function (resolve, reject) {

				that.execComando(url, paran).then(function (dados) {

					if (dados.valido == true) {
						dados = dados.retorno;

						resolve(dados);
					} else {
						reject(dados.retorno);
					}

				}, function (dados) {
					reject(dados);
				});
			});

		}

		function execEnviarRespostaFiscalCupom(paran) {
			var that = this;

			var url = that.url_datasnap + 'execEnviarRespostaFiscalCupom';

			return $q(function (resolve, reject) {

				that.execComando(url, paran).then(function (dados) {

					if (dados.valido == true) {
						resolve(dados);
					} else {
						reject(dados.retorno);
					}

				}, function (dados) {
					reject(dados);
				});
			});

		}

		function execPagamentoEtapa1(paran) {
			var that = this;

			var url = that.url_datasnap + 'execPagamentoEtapa1';


			return $q(function (resolve, reject) {

				that.execComando(url, paran).then(function (dados) {

					if (dados.valido == true) {
						dados = dados.retorno;

						resolve(dados);

					} else {
						// showErro(dados.retorno.error);
						reject(dados.retorno);
					}

				}, function (dados) {
					reject(dados);
				});
			});

		}

		function execPagamentoEtapa2(paran) {
			var that = this;

			var url = that.url_datasnap + 'execPagamentoEtapa2';

			return $q(function (resolve, reject) {

				that.execComando(url, paran).then(function (dados) {

					if (dados.valido == true) {
						dados = dados.retorno;

						resolve(dados);
					} else {
						reject(dados.retorno);
					}

				}, function (dados) {
					reject(dados);
				});
			});

		}

		function cancelarCFE(paran) {
			var that = this;

			var url = that.url_datasnap + 'cancelarCFE';
			return $q(function (resolve, reject) {
				that.execComando(url, paran).then(function (dados) {

					if (dados.valido == true) {
						dados = dados.retorno;
						var xml = atob(dados.xml);
						dados.xml = xml;
						resolve(dados);
					} else {
						reject(dados.retorno);
					}

				}, function (dados) {
					reject(dados);
				});
			});

		}

		function imprimirCFE(paran) {
			var that = this;

			var url = that.url_datasnap + 'imprimirCFE';
			return $q(function (resolve, reject) {
				that.execComando(url, paran).then(function (dados) {

					if (dados.valido == true) {
						resolve(dados);
					} else {
						reject(dados.retorno);
					}

				}, function (dados) {
					reject(dados);
				});
			});
		}

		/* executa antes de gravar*/
		function emitirCFE(paran) {
			var that = this;

			var url = that.url_datasnap + 'emitirCFE';

			return $q(function (resolve, reject) {

				that.execComando(url, paran).then(function (dados) {

					if (dados.valido == true) {
						dados = dados.retorno;
						var xml = atob(dados.xml);
						dados.xml = xml;

						resolve(dados);
					} else {
						reject(dados.retorno);
					}

				}, function (dados) {

					reject(dados);

				});
			});

		}

		/* executa antes de gravar*/
		function printText(dados) {
			var that = this;

			that.LOG = '';
			that.LOG = that.LOG + 'NSERIE.........:0000000000000' + "\n";
			that.LOG = that.LOG + 'LAN_MAC........:0000000000000' + "\n";
			that.LOG = that.LOG + 'STATUS_LAN.....:0000000000000' + "\n";
			that.LOG = that.LOG + 'NIVEL_BATERIA..:0000000000000' + "\n";
			that.LOG = that.LOG + 'MT_TOTAL.......:0000000000000' + "\n";
			that.LOG = that.LOG + 'MT_USADA.......:0000000000000' + "\n";
			that.LOG = that.LOG + 'DH_ATUAL.......:0000000000000' + "\n";
			that.LOG = that.LOG + 'VER_SB.........:0000000000000' + "\n";

			var url = that.url_datasnap + 'printText';
			var paran = { "TEXT": that.LOG };

			that.execComando(url, paran).then(function (dados) {

				if (dados.valido == true) {
					console.log(dados.retorno);
				} else {
					showErro(dados.retorno.error);
				}

			}, function (dados) {

			});

		}

		/* executa antes de gravar*/
		function execComando(url, parans) {
			var that = this;
			var urlparan = '';

			if (typeof parans == 'undefined') {
				parans = [];
			} else {
				urlparan = '/' + encodeURIComponent(JSON.stringify(parans));
			}

			return $q(function (resolve, reject) {


				fetch(url + urlparan).
				then(function (response) {return response.text();}).
				then(function (contents) {

					var dados = JSON.parse(contents);

					if (typeof dados.error == 'undefined' || dados.error == '') {

						dados = JSON.parse(dados.result[0]);

						if (typeof dados.error == 'undefined' || dados.error == '') {
							resolve({ valido: true, retorno: dados });
						} else {
							resolve({ valido: false, retorno: dados });
						}

					} else {
						resolve({ valido: false, retorno: dados });
					}

				}).catch(function () {return resolve({ valido: false, retorno: 'erro' });});
			});

		}


		/* executa antes de gravar*/
		function statusOperacional(dados) {
			var that = this;

			var url = that.url_datasnap + 'StatusOperacional';

			that.execComando(url).then(function (dados) {


				if (dados.valido == true) {
					dados = dados.retorno;

					that.LOG = '';
					that.LOG = that.LOG + 'NSERIE.........:' + dados.NSERIE + "\n";
					that.LOG = that.LOG + 'LAN_MAC........:' + dados.LAN_MAC + "\n";
					that.LOG = that.LOG + 'STATUS_LAN.....:' + dados.STATUS_LAN + "\n";
					that.LOG = that.LOG + 'NIVEL_BATERIA..:' + dados.NIVEL_BATERIA + "\n";
					that.LOG = that.LOG + 'MT_TOTAL.......:' + dados.MT_TOTAL + "\n";
					that.LOG = that.LOG + 'MT_USADA.......:' + dados.MT_USADA + "\n";
					that.LOG = that.LOG + 'DH_ATUAL.......:' + dados.DH_ATUAL + "\n";
					that.LOG = that.LOG + 'VER_SB.........:' + dados.VER_SB + "\n";
					that.LOG = that.LOG + 'VER_LAYOUT.....:' + dados.VER_LAYOUT + "\n";
					that.LOG = that.LOG + 'ULTIMO_CFe.....:' + dados.ULTIMO_CFe + "\n";
					that.LOG = that.LOG + 'LISTA_INICIAL..:' + dados.LISTA_INICIAL + "\n";
					that.LOG = that.LOG + 'DH_CFe.........:' + dados.DH_CFe + "\n";
					that.LOG = that.LOG + 'DH_ULTIMA......:' + dados.DH_ULTIMA + "\n";
					that.LOG = that.LOG + 'CERT_EMISSAO...:' + dados.CERT_EMISSAO + "\n";
					that.LOG = that.LOG + 'CERT_VENCIMENTO:' + dados.CERT_VENCIMENTO + "\n";
					that.LOG = that.LOG + 'ESTADO_OPERACAO:' + dados.ESTADO_OPERACAO + "\n";
				} else {
					showErro(dados.retorno.error);
				}

				console.log(dados);
			}, function (dados) {

			});

		}

		/* executa antes de gravar*/
		function enviarCFE(dados) {
			var that = this;

			var url = that.url_datasnap + 'enviar';

			that.execComando(url).then(function (dados) {

				if (dados.valido == true) {
					dados = dados.retorno;

					var xml = atob(dados.xml);

					that.LOG = '';
					that.LOG = that.LOG + 'cfe_id.....:' + dados.cfe_id + "\n";
					that.LOG = that.LOG + 'cod_ret....:' + dados.cod_ret + "\n";
					that.LOG = that.LOG + 'cfe_id.....:' + dados.cfe_id + "\n";
					that.LOG = that.LOG + 'dh_emi.....:' + dados.dh_emi + "\n";
					that.LOG = that.LOG + 'ms_ret.....:' + dados.ms_ret + "\n";
					that.LOG = that.LOG + 'ncfe.......:' + dados.ncfe + "\n";
					that.LOG = that.LOG + 'nserie.....:' + dados.nserie + "\n";
					that.LOG = that.LOG + 'numero.....:' + dados.numero + "\n";
					that.LOG = that.LOG + 'serie......:' + dados.serie + "\n";
					that.LOG = that.LOG + 'XML........:' + xml + "\n";

					console.log(dados);
				} else {
					showErro(dados.retorno.error);
				}

			}, function (dados) {

			});

		}

		return EmissorCFeComunicacaoSefaz;
	};

})(window, window.angular);

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(20);
module.exports = __webpack_require__(0);


/***/ }),

/***/ 19:
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
'Sincronizacao',
'EmissorCFeComunicacaoSefaz',
'Confirmacao'];


function Ctrl(
$scope,
$timeout,
gScope,
Consulta,
Sincronizacao,
EmissorCFeComunicacaoSefaz,
Confirmacao)
{

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.Sincronizacao = new Sincronizacao($scope);
	vm.EmissorCFeComunicacaoSefaz = new EmissorCFeComunicacaoSefaz();
	vm.Confirmacao = new Confirmacao();
	vm.Confirme = vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme = vm.Confirme;


	var data_atual = new Date();
	var data_final = data_atual;
	data_final = moment(moment(data_atual).subtract(1, 'week')).toDate();

	vm.Sincronizacao.DATA_EMISSAO_INICIAL = data_final;
	vm.Sincronizacao.DATA_EMISSAO_FINAL = data_atual;
	vm.Sincronizacao.FILTRO_SITUACAO = '';
	vm.Sincronizacao.FILTRO_STATUS = '';
	vm.Sincronizacao.FILTRO_NUMERO_CFE = '';

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
	gScope.Sincronizacao = vm.Sincronizacao;
	gScope.EmissorCFeComunicacaoSefaz = vm.EmissorCFeComunicacaoSefaz;

	vm.Sincronizacao.getCaixa();

	vm.Sincronizacao.consultar();

	$('.filter_on_enter').keyup(function (event) {
		var key = event.keyCode;

		if (key == 13) {
			vm.Sincronizacao.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.Sincronizacao.consultar();
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
		}

	});

	$('table').on('click', function (e) {
		if ($('.popoverCFe').length > 1) {
			$('.popoverCFe').popover('hide');
			$(e.target).popover('toggle');
		}
	});

	$.key("esc", function (e) {
		if ($(".modal.in.confirm:visible").length > 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			$(".modal.in.confirm button[data-hotkey=esc]:visible:enabled").first().trigger('click');
		}
	});

	// WEB SOCKET

	var metodos = [
	{
		METHOD: 'progressoSincronizacaoCFeTotal',
		scope: $scope,
		vm: vm,
		FUNCTION: function FUNCTION(ret) {
			var that = this;

			that.scope.$apply(function () {

				vm.Sincronizacao.DESC_SINC_CFE_TOT = ret.MENSAGE.DADOS.STATUS;

				var calcTamanhoBarra = Number(ret.MENSAGE.DADOS.POS) * 100 / ret.MENSAGE.DADOS.QTD_TOTAL;
				var tamanhoBarra = trim_null(calcTamanhoBarra + '%');

				if (ret.MENSAGE.DADOS.POS == ret.MENSAGE.DADOS.QTD_TOTAL) {
					$("#progressoBarCFe").removeClass("progress-bar-striped");
				} else {
					if (!$("#progressoBarCFe").hasClass("progress-bar-striped")) {
						$("#progressoBarCFe").addClass("progress-bar-striped");
					}
				}

				vm.Sincronizacao.setDadosProgressoSincronizacaoCFe(tamanhoBarra);

			});
		} },

	{
		METHOD: 'progressoSincronizacaoTotal',
		scope: $scope,
		vm: vm,
		FUNCTION: function FUNCTION(ret) {
			var that = this;

			that.scope.$apply(function () {
				var calcTamanhoBarra = Number(ret.MENSAGE.DADOS.POS) * 100 / ret.MENSAGE.DADOS.QTD_TOTAL;
				var tamanhoBarra = trim_null(calcTamanhoBarra + '%');
				var status = ret.MENSAGE.DADOS.STATUS;
				if (ret.MENSAGE.DADOS.POS == ret.MENSAGE.DADOS.QTD_TOTAL) {
					status = 'Processados ' + ret.MENSAGE.DADOS.POS + ' de ' + ret.MENSAGE.DADOS.QTD_TOTAL;
					$("#progressoBarTotal").removeClass("progress-bar-striped");
				} else {
					if (!$("#progressoBarTotal").hasClass("progress-bar-striped")) {
						$("#progressoBarTotal").addClass("progress-bar-striped");
					}
				}

				vm.Sincronizacao.setDadosProgressoSincronizacaoTotal(status, tamanhoBarra);

			});
		} },
	{
		METHOD: 'progressoSincronizacaoDetalhado',
		scope: $scope,
		vm: vm,
		FUNCTION: function FUNCTION(ret) {
			var that = this;

			that.scope.$apply(function () {

				var calcTamanhoBarra = Number(ret.MENSAGE.DADOS.POS) * 100 / ret.MENSAGE.DADOS.QTD_TOTAL_DETALHADO;
				var tamanhoBarra = trim_null(calcTamanhoBarra + '%');

				vm.Sincronizacao.setDadosProgressoSincronizacaoUnico(ret.MENSAGE.DADOS.STATUS_UNICO, ret.MENSAGE.DADOS.STATUS_DETALHADO, tamanhoBarra);

				if (ret.MENSAGE.DADOS.POS == ret.MENSAGE.DADOS.QTD_TOTAL_DETALHADO) {
					$("#progressoBarUnico").removeClass("progress-bar-striped");
				} else {
					if (!$("#progressoBarUnico").hasClass("progress-bar-striped")) {
						$("#progressoBarUnico").addClass("progress-bar-striped");
					}
				}
			});
		} }];



	SocketWeb.addMetode(metodos);
}

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('Sincronizacao', Sincronizacao);

	Sincronizacao.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function Sincronizacao($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function Sincronizacao($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.Sincronizacao';

			obj.url_consultar = urlhost + '/funcionalidades/sincronizacao/get';
			obj.url_sincronizar_tudo = urlhost + '/funcionalidades/sincronizacao/postSincronizarTudo';
			obj.url_gravar = urlhost + '/funcionalidades/sincronizacao/';
			obj.url_excluir = urlhost + '/funcionalidades/sincronizacao/';
			obj.url_set_adquirentes = urlhost + '/funcionalidades/sincronizacao/adquirentes';
			obj.url_set_bandeiras_cartao = urlhost + '/funcionalidades/sincronizacao/bandeirasCartao';
			obj.url_set_cfops = urlhost + '/funcionalidades/sincronizacao/cfop';
			obj.url_set_condicao_pagamento = urlhost + '/funcionalidades/sincronizacao/condicaoPagamento';
			obj.url_set_estabelecimento = urlhost + '/funcionalidades/sincronizacao/estabelecimento';
			obj.url_set_formas_pagamento = urlhost + '/funcionalidades/sincronizacao/formaPagamento';
			obj.url_set_pos = urlhost + '/funcionalidades/sincronizacao/pos';
			obj.url_set_representantes = urlhost + '/funcionalidades/sincronizacao/representante';
			obj.url_set_tabelas_preco = urlhost + '/funcionalidades/sincronizacao/tabelaPreco';
			obj.url_set_vendedor = urlhost + '/funcionalidades/sincronizacao/vendedor';
			obj.url_set_cidades = urlhost + '/funcionalidades/sincronizacao/cidade';
			obj.url_set_ufs = urlhost + '/funcionalidades/sincronizacao/uf';
			obj.url_set_clientes = urlhost + '/funcionalidades/sincronizacao/cliente';
			obj.url_set_colaboradores = urlhost + '/funcionalidades/sincronizacao/colaborador';
			obj.url_set_pedidos = urlhost + '/funcionalidades/sincronizacao/pedido';
			obj.url_set_produtos = urlhost + '/funcionalidades/sincronizacao/produto';
			obj.url_set_ibpt = urlhost + '/funcionalidades/sincronizacao/ibpt';
			obj.url_set_caixas = urlhost + '/funcionalidades/sincronizacao/caixa';
			obj.url_set_operadores = urlhost + '/funcionalidades/sincronizacao/operador';
			obj.url_set_pdv = urlhost + '/funcionalidades/sincronizacao/pdv';
			obj.url_set_devolucoes = urlhost + '/funcionalidades/sincronizacao/devolucao';
			obj.url_set_upload_conferencias = urlhost + '/funcionalidades/sincronizacao/upload-conferencias';
			obj.url_set_download_conferencias = urlhost + '/funcionalidades/sincronizacao/download-conferencias';
			obj.url_set_movimentos = urlhost + '/funcionalidades/sincronizacao/movimento';
			obj.url_set_pdv_usuarios = urlhost + '/funcionalidades/sincronizacao/usuario';

			obj.url_update_formas_pagamento = '/funcionalidades/emissor/postUpdateFormasPagamento';
			obj.url_situacao_cancelado = urlhost + '/funcionalidades/sincronizacao/postUpdateSituacaoCancelado';
			obj.url_get_logs_atualizacao = urlhost + '/funcionalidades/sincronizacao/logs-atualizacao';

			obj.SELECTED = {};
			obj.AUX_SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.setDadosIncluir = setDadosIncluir;
			obj.incluir = incluir;
			obj.gravar = gravar;
			obj.confirmarGravar = confirmarGravar;
			obj.sincronizarTudo = sincronizarTudo;
			obj.confirmSincronizarTudo = confirmSincronizarTudo;
			obj.setAdquirentes = setAdquirentes;
			obj.confirmSetAdquirentes = confirmSetAdquirentes;
			obj.setBandeiraCartao = setBandeiraCartao;
			obj.confirmSetBandeiraCartao = confirmSetBandeiraCartao;
			obj.setCFOPs = setCFOPs;
			obj.confirmSetCFOPs = confirmSetCFOPs;
			obj.setCondicaoPagamento = setCondicaoPagamento;
			obj.confirmSetCondicaoPagamento = confirmSetCondicaoPagamento;
			obj.setEstabelecimento = setEstabelecimento;
			obj.confirmSetEstabelecimento = confirmSetEstabelecimento;
			obj.setFormasPagamento = setFormasPagamento;
			obj.confirmSetFormasPagamento = confirmSetFormasPagamento;
			obj.setPOS = setPOS;
			obj.confirmSetPOS = confirmSetPOS;
			obj.setRepresentantes = setRepresentantes;
			obj.confirmSetRepresentantes = confirmSetRepresentantes;
			obj.setTabelasPreco = setTabelasPreco;
			obj.confirmSetTabelasPreco = confirmSetTabelasPreco;
			obj.setVendedor = setVendedor;
			obj.confirmSetVendedor = confirmSetVendedor;
			obj.setCidades = setCidades;
			obj.confirmSetCidades = confirmSetCidades;
			obj.setUFs = setUFs;
			obj.confirmSetUFs = confirmSetUFs;
			obj.setClientes = setClientes;
			obj.confirmSetClientes = confirmSetClientes;
			obj.setColaboradores = setColaboradores;
			obj.confirmSetColaboradores = confirmSetColaboradores;
			obj.setPedidos = setPedidos;
			obj.confirmSetPedidos = confirmSetPedidos;
			obj.setProdutos = setProdutos;
			obj.confirmSetProdutos = confirmSetProdutos;
			obj.setTabelaIBPT = setTabelaIBPT;
			obj.confirmSetTabelaIBPT = confirmSetTabelaIBPT;
			obj.setCaixas = setCaixas;
			obj.confirmSetCaixas = confirmSetCaixas;
			obj.setOperadores = setOperadores;
			obj.confirmSetOperadores = confirmSetOperadores;
			obj.setPDV = setPDV;
			obj.confirmSetPDV = confirmSetPDV;
			obj.setPDVUsuarios = setPDVUsuarios;
			obj.confirmSetPDVUsuarios = confirmSetPDVUsuarios;
			obj.setDevolucoes = setDevolucoes;
			obj.confirmSetDevolucoes = confirmSetDevolucoes;
			obj.setUploadConferencias = setUploadConferencias;
			obj.confirmSetUploadConferencias = confirmSetUploadConferencias;
			obj.setDownloadConferencias = setDownloadConferencias;
			obj.confirmSetDownloadConferencias = confirmSetDownloadConferencias;
			obj.setMovimentos = setMovimentos;
			obj.confirmSetMovimentos = confirmSetMovimentos;
			obj.limparSincronizacaoCadastros = limparSincronizacaoCadastros;
			obj.setDadosProgressoSincronizacaoCFe = setDadosProgressoSincronizacaoCFe;
			obj.setDadosProgressoSincronizacaoTotal = setDadosProgressoSincronizacaoTotal;
			obj.setDadosProgressoSincronizacaoUnico = setDadosProgressoSincronizacaoUnico;
			obj.fecharModalSincronizacao = fecharModalSincronizacao;
			obj.fecharModalSincronizacaoCadastros = fecharModalSincronizacaoCadastros;
			obj.setDadosConsultar = setDadosConsultar;
			obj.consultar = consultar;
			obj.compileDatatable = compileDatatable;
			obj.sendRespostaFiscal = sendRespostaFiscal;
			obj.confirmSendRespostaFiscal = confirmSendRespostaFiscal;
			obj.envioRespostaFiscalCupom = envioRespostaFiscalCupom;
			obj.updateFormasPagamento = updateFormasPagamento;
			obj.cancelarCupomFiscal = cancelarCupomFiscal;
			obj.confirmCancelarCupomFiscal = confirmCancelarCupomFiscal;
			obj.envioEventCancelamento = envioEventCancelamento;
			obj.updateSituacaoCancelado = updateSituacaoCancelado;
			obj.printSegundaViaCupomFiscal = printSegundaViaCupomFiscal;
			obj.confirmPrintSegundaViaCupomFiscal = confirmPrintSegundaViaCupomFiscal;
			obj.envioImprimirCupomFiscal = envioImprimirCupomFiscal;
			obj.verXmlCupomFiscal = verXmlCupomFiscal;
			obj.verPDFCupomFiscal = verPDFCupomFiscal;
			obj.setDadosEstabelecimento = setDadosEstabelecimento;
			obj.getCaixa = getCaixa;
			obj.getLogsAtualizacao = getLogsAtualizacao;
			obj.validacaoCaixa = validacaoCaixa;
			obj.execGetCaixaAndTryAgain = execGetCaixaAndTryAgain;

			obj.DATATABLE = null;

			obj.HABILITA_PROGRESS = false;

			obj.ARRAY_SINCRONIZACAO = [];

			obj.ARRAY_SINCRONIZACAO_CONF = [];
			obj.LOGS = [];

			obj.DADOS_CAIXA = {};

			obj.HABILITA_FECHAR_SINC = false;
			obj.HABILITA_FECHAR_SINC_CONF = false;

			obj.TIPO_SINCRONIZACAO = '';
			obj.HABILITA_FECHAR_MODAL_SINC_CAD = false;
			obj.DESC_PROGRESSO_UNICO = 'Processando Requisição...';
			obj.DESC_PROGRESSO_UNICO_DET = '';

			obj.DESC_PROGRESSO_TOTAL = 'Calculando...';

			obj.DESC_SINC_CFE_TOT = 'Carregando Sincronização...';

			obj.DESC_SINC_CFE_CONF_TOT = 'Carregando Sincronização...';

		}

		function setDadosIncluir() {

			var dados = {
				DESCRICAO: '',
				DESC_RESUMIDA: '' };


			return dados;
		}

		function incluir() {
			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			$("#modalSincronizacao").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalSincronizacao");
			}, 200);
		}

		function gravar() {

			var that = this;

			var check = true;

		}

		function confirmarGravar() {
			var that = this;

			var dados = {
				DADOS: obj.SELECTED };


			return $q(function (resolve, reject) {

				$ajax.post(that.url_gravar, dados).then(function (response) {

					obj.INCLUINDO = false;
					obj.ALTERANDO = false;
					obj.SELECTED = {};

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});
		}

		function sincronizarTudo() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar todos os cupons fiscais não sincronizados?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {
				},
				function (e, btn) {
					that.confirmSincronizarTudo();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.sincronizarTudo);
			}
		}

		function confirmSincronizarTudo() {

			var that = this;

			obj.DESC_SINC_CFE_TOT = 'Carregando Sincronização...';

			obj.HABILITA_FECHAR_SINC = false;

			$('#progressoBarCFe').css('width', '0%');
			$('#progressoBarCFe').addClass('active');

			$("#modalProcessoSincronizacao").modal('show');

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID },

				FILTRO: {} };




			return $q(function (resolve, reject) {

				$ajax.post(that.url_sincronizar_tudo, dados).then(function (response) {
					if (response.JA_SINCRONIZADOS == 0) {

						obj.DESC_SINC_CFE_TOT = 'Sincronização Finalizada';

						obj.HABILITA_FECHAR_SINC = true;

						showSuccess("Sincronização de cupons fiscais realizada com sucesso");

						$("#modalProcessoSincronizacao").modal('hide');

					} else {
						$("#modalProcessoSincronizacao").modal('hide');
						showSuccess("Cupons fiscais já sincronizados");
					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_SINC = true;
					$("#modalProcessoSincronizacao").modal('hide');

					reject(e);
				});
			});

		}

		function setAdquirentes() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os adquirentes?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {
				},
				function (e, btn) {
					that.confirmSetAdquirentes();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setAdquirentes);
			}
		}

		function confirmSetAdquirentes() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_adquirentes, dados).then(function (response) {

					showSuccess("Atualização de adquirentes realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setBandeiraCartao() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar as bandeiras de cartão?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetBandeiraCartao();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setBandeiraCartao);
			}
		}

		function confirmSetBandeiraCartao() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_bandeiras_cartao, dados).then(function (response) {

					showSuccess("Atualização de bandeiras de cartão realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setCFOPs() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {

				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os CFOPs?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetCFOPs();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setCFOPs);
			}
		}

		function confirmSetCFOPs() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_cfops, dados).then(function (response) {

					showSuccess("Atualização de CFOPs realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setCondicaoPagamento() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {

				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar as condições de pagamento?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetCondicaoPagamento();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setCondicaoPagamento);
			}

		}

		function confirmSetCondicaoPagamento() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_condicao_pagamento, dados).then(function (response) {

					showSuccess("Atualização de condições de pagamento realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setEstabelecimento() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os estabelecimentos?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetEstabelecimento();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setEstabelecimento);
			}
		}

		function confirmSetEstabelecimento() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_estabelecimento, dados).then(function (response) {

					showSuccess("Atualização de estabelecimentos realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setFormasPagamento() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar as formas de pagamento?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetFormasPagamento();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setFormasPagamento);
			}

		}

		function confirmSetFormasPagamento() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_formas_pagamento, dados).then(function (response) {

					showSuccess("Atualização de formas de pagamento realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setPOS() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os POS?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetPOS();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setPOS);
			}

		}

		function confirmSetPOS() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_pos, dados).then(function (response) {

					showSuccess("Atualização de POS realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setRepresentantes() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();


			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os representantes?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetRepresentantes();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setRepresentantes);
			}

		}

		function confirmSetRepresentantes() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_representantes, dados).then(function (response) {

					showSuccess("Atualização de representantes realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setTabelasPreco() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar as tabelas de preço?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetTabelasPreco();
				}]);


			} else {
				obj.execGetCaixaAndTryAgain(that.setTabelasPreco);
			}
		}

		function confirmSetTabelasPreco() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_tabelas_preco, dados).then(function (response) {

					showSuccess("Atualização de tabelas de preço realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setVendedor() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os vendedores?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetVendedor();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setVendedor);
			}
		}

		function confirmSetVendedor() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_vendedor, dados).then(function (response) {

					showSuccess("Atualização de vendedores realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setCidades() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar as cidades?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetCidades();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setCidades);
			}
		}

		function confirmSetCidades() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_cidades, dados).then(function (response) {

					showSuccess("Atualização de cidades realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setUFs() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar as UFs?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetUFs();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setUFs);
			}


		}

		function confirmSetUFs() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_ufs, dados).then(function (response) {

					showSuccess("Atualização de UFs realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setClientes() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os clientes?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetClientes();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setClientes);
			}
		}

		function confirmSetClientes() {

			var that = this;

			that.limparSincronizacaoCadastros();

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			obj.TIPO_SINCRONIZACAO = 'Sincronização de clientes';

			$("#modalProcessoSincronizacaoCadastros").modal('show');

			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_clientes, dados).then(function (response) {

					if (response.JA_ATUALIZADOS == 0) {
						obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;

						$('#progressoBarUnico').removeClass('active');
						$('#progressoBarTotal').removeClass('active');

						showSuccess("Atualização de clientes realizada com sucesso");
					} else {

						$("#modalProcessoSincronizacaoCadastros").modal('hide');

						showSuccess("Clientes já estão sincronizados");

					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;
					reject(e);
				});
			});

		}

		function setColaboradores() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os colaboradores?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetColaboradores();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setColaboradores);
			}
		}

		function confirmSetColaboradores() {

			var that = this;

			that.limparSincronizacaoCadastros();

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			obj.TIPO_SINCRONIZACAO = 'Sincronização de colaboradores';

			$("#modalProcessoSincronizacaoCadastros").modal('show');

			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_colaboradores, dados).then(function (response) {

					if (response.JA_ATUALIZADOS == 0) {
						obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;

						$('#progressoBarUnico').removeClass('active');
						$('#progressoBarTotal').removeClass('active');

						showSuccess("Atualização de Colaboradores Realizada com Sucesso");
					} else {

						$("#modalProcessoSincronizacaoCadastros").modal('hide');

						showSuccess("Colaboradores já estão sincronizados");

					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;
					reject(e);
				});
			});

		}

		function setPedidos() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os pedidos?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetPedidos();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setPedidos);
			}
		}

		function confirmSetPedidos() {

			var that = this;

			that.limparSincronizacaoCadastros();

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			obj.TIPO_SINCRONIZACAO = 'Sincronização de pedidos';

			$("#modalProcessoSincronizacaoCadastros").modal('show');

			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_pedidos, dados).then(function (response) {

					if (response.JA_ATUALIZADOS == 0) {
						obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;

						$('#progressoBarUnico').removeClass('active');
						$('#progressoBarTotal').removeClass('active');

						showSuccess("Atualização de pedidos realizada com sucesso");
					} else {

						$("#modalProcessoSincronizacaoCadastros").modal('hide');

						showSuccess("Pedidos já estão sincronizados");

					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;
					reject(e);
				});
			});

		}

		function setProdutos() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os produtos?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetProdutos();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setProdutos);
			}
		}

		function confirmSetProdutos() {

			var that = this;

			that.limparSincronizacaoCadastros();

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			obj.TIPO_SINCRONIZACAO = 'Sincronização de produtos';

			$("#modalProcessoSincronizacaoCadastros").modal('show');

			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_produtos, dados).then(function (response) {

					if (response.JA_ATUALIZADOS == 0) {
						obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;

						$('#progressoBarUnico').removeClass('active');
						$('#progressoBarTotal').removeClass('active');

						showSuccess("Atualização de produtos Realizada com Sucesso");
					} else {

						$("#modalProcessoSincronizacaoCadastros").modal('hide');

						showSuccess("Produtos já estão sincronizados");

					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;
					reject(e);
				});
			});

		}

		function setTabelaIBPT() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar a tabela IBPT?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetTabelaIBPT();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setTabelaIBPT);
			}
		}

		function confirmSetTabelaIBPT() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_ibpt, dados).then(function (response) {

					showSuccess("Atualização de Tabela IBPTX Realizada com Sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setCaixas() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os caixas?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetCaixas();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setCaixas);
			}
		}

		function confirmSetCaixas() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_caixas, dados).then(function (response) {

					showSuccess("Atualização de Caixas Realizada com Sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setOperadores() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os operadores?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetOperadores();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setOperadores);
			}

		}

		function confirmSetOperadores() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_operadores, dados).then(function (response) {

					showSuccess("Atualização de Operadores Realizada com Sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setPDVUsuarios() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os usuários?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetPDVUsuarios();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setPDVUsuarios);
			}
		}

		function confirmSetPDVUsuarios() {

			var that = this;

			that.limparSincronizacaoCadastros();

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			obj.TIPO_SINCRONIZACAO = 'Sincronização de usuários';

			$("#modalProcessoSincronizacaoCadastros").modal('show');

			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_pdv_usuarios, dados).then(function (response) {

					if (response.JA_ATUALIZADOS == 0) {
						obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;

						$('#progressoBarUnico').removeClass('active');
						$('#progressoBarTotal').removeClass('active');

						showSuccess("Atualização de usuários realizada com sucesso");
					} else {

						$("#modalProcessoSincronizacaoCadastros").modal('hide');

						showSuccess("Pedidos já estão sincronizados");

					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;
					reject(e);
				});
			});
		}

		function setDevolucoes() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar as devoluções?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetDevolucoes();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setDevolucoes);
			}
		}

		function confirmSetDevolucoes() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_devolucoes, dados).then(function (response) {

					showSuccess("Atualização de devoluções do PDV realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setUploadConferencias() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente realizar upload de conferências?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetUploadConferencias();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setUploadConferencias);
			}
		}

		function confirmSetUploadConferencias() {

			var that = this;

			that.limparSincronizacaoCadastros();

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			obj.TIPO_SINCRONIZACAO = 'Upload de conferências';

			$("#modalProcessoSincronizacaoCadastros").modal('show');

			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_upload_conferencias, dados).then(function (response) {

					if (response.JA_ATUALIZADOS == 0) {
						obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;

						$('#progressoBarUnico').removeClass('active');
						$('#progressoBarTotal').removeClass('active');

						showSuccess("Upload de conferências realizada com sucesso");
					} else {

						$("#modalProcessoSincronizacaoCadastros").modal('hide');

						showSuccess("Conferências já estão sincronizadas");

					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;
					reject(e);
				});
			});

		}

		function setDownloadConferencias() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente realizar download de conferências?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetDownloadConferencias();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setDownloadConferencias);
			}
		}

		function confirmSetDownloadConferencias() {

			var that = this;

			that.limparSincronizacaoCadastros();

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			obj.TIPO_SINCRONIZACAO = 'Download de conferências';

			$("#modalProcessoSincronizacaoCadastros").modal('show');

			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_download_conferencias, dados).then(function (response) {

					if (response.JA_ATUALIZADOS == 0) {
						obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;

						$('#progressoBarUnico').removeClass('active');
						$('#progressoBarTotal').removeClass('active');

						showSuccess("Download de conferências realizada com sucesso");
					} else {

						$("#modalProcessoSincronizacaoCadastros").modal('hide');

						showSuccess("Conferências já estão sincronizadas");

					}

					resolve(response);
				}, function (e) {
					obj.HABILITA_FECHAR_MODAL_SINC_CAD = true;
					reject(e);
				});
			});

		}

		function setMovimentos() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os movimentos?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetMovimentos();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setMovimentos);
			}
		}

		function confirmSetMovimentos() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_movimentos, dados).then(function (response) {

					showSuccess("Atualização de movimentações do PDV realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setPDV() {
			var that = obj;

			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				var msg = gScope.Confirme.add(1, 'Confirmação',
				'Deseja realmente sincronizar os dados do PDV?', [
				{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
				{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

				[
				function (e, btn) {

				},
				function (e, btn) {
					that.confirmSetPDV();
				}]);

			} else {
				obj.execGetCaixaAndTryAgain(that.setPDV);
			}
		}

		function confirmSetPDV() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_set_pdv, dados).then(function (response) {

					showSuccess("Atualização de PDV realizada com sucesso");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function limparSincronizacaoCadastros() {
			obj.TIPO_SINCRONIZACAO = '';
			obj.DESC_PROGRESSO_UNICO = 'Processando Requisição...';
			obj.DESC_PROGRESSO_UNICO_DET = '';
			obj.DESC_PROGRESSO_TOTAL = 'Calculando...';
			obj.HABILITA_FECHAR_MODAL_SINC_CAD = false;
			$('#progressoBarUnico').css('width', '0%');
			$('#progressoBarTotal').css('width', '0%');
			$('#progressoBarUnico').addClass('active');
			$('#progressoBarTotal').addClass('active');
		}

		function setDadosProgressoSincronizacaoCFe(tamanhoBarra) {
			$('#progressoBarCFe').css('width', tamanhoBarra);
		}

		function setDadosProgressoSincronizacaoTotal(statusTotal, tamanhoBarra) {
			obj.DESC_PROGRESSO_TOTAL = statusTotal;
			$('#progressoBarTotal').css('width', tamanhoBarra);
		}

		function setDadosProgressoSincronizacaoUnico(statusUnico, statusUnicoDet, tamanhoBarra) {

			obj.DESC_PROGRESSO_UNICO = statusUnico;

			obj.DESC_PROGRESSO_UNICO_DET = statusUnicoDet;

			$('#progressoBarUnico').css('width', tamanhoBarra);
		}

		function fecharModalSincronizacao() {
			$("#modalProcessoSincronizacao").modal('hide');
		}

		function fecharModalSincronizacaoCadastros() {
			$("#modalProcessoSincronizacaoCadastros").modal('hide');
		}

		function setDadosConsultar(dados) {
			var that = this;

			dados.FILTRO.DATA_EMISSAO_INICIAL = moment(obj.DATA_EMISSAO_INICIAL).format('DD.MM.YYYY');
			dados.FILTRO.DATA_EMISSAO_INICIAL = dados.FILTRO.DATA_EMISSAO_INICIAL == 'Invalid date' ? null : dados.FILTRO.DATA_EMISSAO_INICIAL;

			dados.FILTRO.DATA_EMISSAO_FINAL = moment(obj.DATA_EMISSAO_FINAL).format('DD.MM.YYYY');
			dados.FILTRO.DATA_EMISSAO_FINAL = dados.FILTRO.DATA_EMISSAO_FINAL == 'Invalid date' ? null : dados.FILTRO.DATA_EMISSAO_FINAL;

			dados.FILTRO.NUMERO_CFE = Number(obj.FILTRO_NUMERO_CFE);
			dados.FILTRO.STATUS = Number(obj.FILTRO_STATUS);

			dados.FILTRO.SITUACAO = Number(obj.FILTRO_SITUACAO);

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
				obj.DATATABLE = $('#dataTableCFe').DataTable({
					"order": [[1, 'asc']],
					"searching": false,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function drawCallback() {
						$('.popoverCFe').popover({
							"html": true });

					},
					"columns": [
					{ "data": "SITUACAO", "title": '', "className": "text-center",
						render: function render(data, type, row) {
							var html = '';

							if (data == 2) {
								html = '<div class="badge badge-green mr-3 text-small">AUTORIZADO</div>';
							} else if (data == 3) {
								html = '<div class="badge badge-red mr-3 text-small">CANCELADO</div>';
							}

							return html;
						} },

					{ "data": "ID", "title": 'ID',
						render: function render(data, type, row) {
							return row.DESC_ID;
						} },

					{ "data": "DATA_EMISSAO", "title": 'Dt.Emissão',
						render: function render(data, type, row) {
							return row.FDATA_EMISSAO;
						} },

					{ "data": "NUMERO_CFE", "title": 'Número CFe',
						render: function render(data, type, row) {
							return row.DESC_NUMERO_CFE;
						} },

					{ "data": "SERIE", "title": 'Série',
						render: function render(data, type, row) {
							return row.DESC_SERIE;
						} },

					{ "data": "DESC_CAIXA", "title": 'Caixa' },
					{ "data": "DESC_CLIENTE", "title": 'Cliente', "className": "text-center",
						render: function render(data, type, row) {
							var html = '';

							if (data != '' && data != null) {
								html = '<a class="popoverCFe" id="popCliente' + row.ID + '" href="javascript:void(0);" tabindex="-1" data-toggle="popover" data-trigger="hover" title="" data-placement="bottom" data-content="<b>' + row.CLIENTE_NOME + '</b>">' + row.CLIENTE_CPF_MASK + '</a>';
							}

							return html;
						} },

					{ "data": "CHAVE_ACESSO", "title": 'Chave de Acesso', "className": "text-center",
						render: function render(data, type, row) {
							var html = '<a class="popoverCFe" id="pop' + row.ID + '" href="javascript:void(0);" tabindex="-1" data-toggle="popover" data-trigger="hover" title="" data-placement="bottom" data-content="<b>' + data + '</b>"><i class="fas fa-info-circle"></i></a>';
							return html;
						} },

					{ "data": "QTD_TOTAL", "title": 'Qtd.Itens', "className": "text-right" },
					{ "data": "VALOR_TOTAL", "className": "text-right", "title": 'Valor Total',
						render: function render(data, type, row) {
							var decimaisTotal = gScope.calcularQuantidadeDecimais(Number(data));
							var totalVisualizacao = 'R$ ' + number_format(Number(data), decimaisTotal, ',', '.');
							return totalVisualizacao;
						} },

					{ "data": "ACTIONS", "title": 'Opções',
						render: function render(data, type, full, meta) {
							var html = '';

							var index = meta.row;

							html = html + ' <div class="form-group no-print" style="display: contents;"> ' +
							'			<div class="dropdown acoes"> ' +
							'				<button type="button" class="btn btn-sm btn-warning toggle" ' +
							'					style="margin-left: 6px;" ' +
							'					data-toggle="dropdown" aria-expanded="false" ' + 'ng-readonly="false"> ' +
							'					<span class="fas fa-th-list"></span> ' +
							'					 ' +
							' 				</button> ' +
							'					<ul class="dropdown-menu">	' +
							'						<li class="dropdown-header" style="text-transform: initial; font-weight: bold;"> ' +
							'							Ações Disponíveis </li>' +
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.Sincronizacao.sendRespostaFiscal(' + index + ');"> ' +
							'	 						<a style="text-transform: initial; cursor: pointer;"> ' +
							' 								<span class="fas fa-cloud-upload-alt"></span> Enviar resposta fiscal</a> ' +
							'						</li> ' +
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.Sincronizacao.cancelarCupomFiscal(' + index + ');"> ' +
							'	 						<a style="text-transform: initial; cursor: pointer;"> ' +
							' 								<span class="fas fa-ban"></span> Cancelar cupom fiscal</a> ' +
							'						</li> ' +
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.Sincronizacao.printSegundaViaCupomFiscal(' + index + ');"> ' +
							'	 						<a style="text-transform: initial; cursor: pointer;"> ' +
							' 								<span class="fas fa-print"></span> Imprimir 2ª via do cupom fiscal</a> ' +
							'						</li> ' +
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.Sincronizacao.verXmlCupomFiscal(' + index + ');" > ' +
							'	 						<a style="text-transform: initial; cursor: pointer;"> ' +
							' 								<span class="fas fa-file-code"></span> Ver xml</a> ' +
							'						</li> ' +
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.Sincronizacao.verPDFCupomFiscal(' + index + ');"> ' +
							'	 						<a style="text-transform: initial; cursor: pointer;"> ' +
							' 								<span class="fas fa-file-pdf"></span> Ver espelho</a> ' +
							'						</li> ' +
							'					</ul> ' +
							'				</div> ' +
							'			</div> ';

							return html;
						} }],


					createdRow: function createdRow(row, data, dataIndex) {

						if (data.PENDENTE_FISCAL > 0) {
							$(row).addClass('redClass');
						}

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

		function sendRespostaFiscal(index) {
			var item = obj.DATATABLE.row(index).data();
			obj.SELECTED = item;

			var check = true;

			if (obj.SELECTED.SITUACAO == 1) {
				check = false;
				showErro("Cupom fiscal não processado pela SEFAZ");
			}

			if (obj.SELECTED.SITUACAO == 3) {
				check = false;
				showErro("Cupom fiscal já cancelado");
			}

			if (obj.SELECTED.PENDENTE_FISCAL == 0) {
				check = false;
				showErro("Cupom fiscal sem pendências de resposta fiscal");
			}

			if (check == true) {
				$("#modalConfirmRespostaFiscal").modal('show');
			}

		}

		function confirmSendRespostaFiscal() {
			var dadosRespostaFiscal = {};
			obj.HABILITA_PROGRESS = true;
			dadosRespostaFiscal.ESTABELECIMENTO = obj.setDadosEstabelecimento();

			dadosRespostaFiscal.PAGAMENTOS = obj.SELECTED.PAGAMENTOS;

			dadosRespostaFiscal.DADOS_GERAIS = {};
			dadosRespostaFiscal.DADOS_GERAIS.XML = obj.SELECTED.XML;
			dadosRespostaFiscal.DADOS_GERAIS.PDV_CFE_ID = obj.SELECTED.ID;
			dadosRespostaFiscal.DADOS_GERAIS.NUMERO = obj.SELECTED.NUMERO_CFE;

			obj.envioRespostaFiscalCupom(dadosRespostaFiscal);
		}

		function envioRespostaFiscalCupom(paran) {
			var that = this;

			gScope.EmissorCFeComunicacaoSefaz.execEnviarRespostaFiscalCupom(paran).then(function (dados) {
				obj.updateFormasPagamento(dados).then(function (ret) {
					obj.HABILITA_PROGRESS = false;
					showSuccess("Resposta fiscal realizada com sucesso", true);
					obj.SELECTED.PENDENTE_FISCAL = 0;
					obj.DATATABLE.draw();
					$("#modalConfirmRespostaFiscal").modal('hide');

				}, function (ret) {

				});

			}, function (dados) {
				obj.HABILITA_PROGRESS = false;
				obj.SELECTED.PENDENTE_FISCAL = 1;
				obj.DATATABLE.draw();
				showErro("Erro no envio da resposta fiscal. MFE não conectado");
				$("#modalConfirmRespostaFiscal").modal('hide');
			});

		}

		function updateFormasPagamento(dados) {

			var that = this;

			return $q(function (resolve, reject) {

				$ajax.post(that.url_update_formas_pagamento, dados).then(function (response) {

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});
		}

		function cancelarCupomFiscal(index) {
			var item = obj.DATATABLE.row(index).data();
			obj.SELECTED = item;

			var check = true;

			if (obj.SELECTED.SITUACAO == 1) {
				check = false;
				showErro("Cupom fiscal não processado pela SEFAZ");
			}

			if (obj.SELECTED.SITUACAO == 3) {
				check = false;
				showErro("Cupom fiscal já cancelado");
			}

			if (check == true) {
				$("#modalConfirmCancelarCupomFiscal").modal('show');

			}
		}

		function confirmCancelarCupomFiscal() {

			var dadosCancelamento = {};
			var dadosEstabelecimento = obj.setDadosEstabelecimento();

			obj.HABILITA_PROGRESS = true;

			dadosCancelamento.CNPJ = dadosEstabelecimento.CNPJ;
			dadosCancelamento.IE = dadosEstabelecimento.IE;
			dadosCancelamento.IM = dadosEstabelecimento.IM;
			dadosCancelamento.CRT = dadosEstabelecimento.CRT;
			dadosCancelamento.XML = obj.SELECTED.XML;
			dadosCancelamento.PDV_CFE_ID = obj.SELECTED.ID;

			obj.envioEventCancelamento(dadosCancelamento);
		}

		function envioEventCancelamento(paran) {
			var that = this;

			gScope.EmissorCFeComunicacaoSefaz.cancelarCFE(paran).then(function (dados) {
				dados.PDV_CFE_ID = paran.PDV_CFE_ID;
				dados.CHAVE_ACESSO = obj.SELECTED.CHAVE_ACESSO;

				obj.updateSituacaoCancelado(dados).then(function (ret) {
					obj.HABILITA_PROGRESS = false;
					showSuccess("Cancelamento realizado com sucesso", true);
					obj.SELECTED.SITUACAO = 3;
					obj.DATATABLE.draw();
					$("#modalConfirmCancelarCupomFiscal").modal('hide');

				}, function (ret) {

				});

			}, function (dados) {
				obj.HABILITA_PROGRESS = false;
				obj.SELECTED.SITUACAO = 2;
				obj.DATATABLE.draw();
				$("#modalConfirmCancelarCupomFiscal").modal('hide');
				showErro("Erro no cancelamento do cupom fiscal. MFE não conectado");
			});

		}

		function updateSituacaoCancelado(dados) {

			var that = this;

			return $q(function (resolve, reject) {

				$ajax.post(that.url_situacao_cancelado, dados).then(function (response) {
					resolve(response);
				}, function (e) {
					reject(e);
				});
			});
		}


		function printSegundaViaCupomFiscal(index) {
			var item = obj.DATATABLE.row(index).data();
			obj.SELECTED = item;
			var check = true;

			if (obj.SELECTED.SITUACAO == 1) {
				check = false;
				showErro("Cupom fiscal não processado pela SEFAZ");
			}

			if (check == true) {
				$("#modalConfirmImprimirCupomFiscal").modal('show');
			}
		}

		function confirmPrintSegundaViaCupomFiscal() {

			var dadosCancelamento = {};
			var dadosEstabelecimento = obj.setDadosEstabelecimento();

			obj.HABILITA_PROGRESS = true;

			dadosCancelamento.CNPJ = dadosEstabelecimento.CNPJ;
			dadosCancelamento.IE = dadosEstabelecimento.IE;
			dadosCancelamento.IM = dadosEstabelecimento.IM;
			dadosCancelamento.CRT = dadosEstabelecimento.CRT;
			dadosCancelamento.XML = obj.SELECTED.SITUACAO == 2 ? obj.SELECTED.XML : obj.SELECTED.XML_CANCELAMENTO;
			dadosCancelamento.STATUS = obj.SELECTED.SITUACAO == 2 ? 'E' : 'C';
			dadosCancelamento.PDV_CFE_ID = obj.SELECTED.ID;

			obj.envioImprimirCupomFiscal(dadosCancelamento);
		}

		function envioImprimirCupomFiscal(paran) {
			var that = this;

			gScope.EmissorCFeComunicacaoSefaz.imprimirCFE(paran).then(function (dados) {
				obj.HABILITA_PROGRESS = false;
				showSuccess("Impressão realizada com sucesso", true);
				$("#modalConfirmImprimirCupomFiscal").modal('hide');

			}, function (dados) {
				obj.HABILITA_PROGRESS = false;
				$("#modalConfirmImprimirCupomFiscal").modal('hide');
				showErro("Erro na impressão do cupom fiscal.");
			});

		}

		function verXmlCupomFiscal(index) {
			var item = obj.DATATABLE.row(index).data();
			obj.SELECTED = item;

			var check = true;

			if (obj.SELECTED.SITUACAO == 1) {
				check = false;
				showErro("Cupom fiscal não processado pela SEFAZ");
			}

			if (check == true) {
				var fileData = obj.SELECTED.SITUACAO == 2 ? obj.SELECTED.XML : obj.SELECTED.XML_CANCELAMENTO;

				var blob = new Blob([fileData], {
					type: "application/xml;charset=utf-8;" });


				var fileUrl = URL.createObjectURL(blob);

				window.open(fileUrl, '_blank');
			}

		}

		function verPDFCupomFiscal(index) {
			var item = obj.DATATABLE.row(index).data();
			obj.SELECTED = item;

			var check = true;

			if (obj.SELECTED.SITUACAO == 1) {
				check = false;
				showErro("Cupom fiscal não processado pela SEFAZ");
			}

			if (check == true) {
				window.open('https://cfe.sefaz.ce.gov.br:8443/portalcfews/public/mfe/fiscal-coupons/pdf/' + obj.SELECTED.CHAVE_ACESSO, '_blank');
			}
		}

		function setDadosEstabelecimento() {

			var json = {};
			json.CNPJ = obj.SELECTED.ESTABELECIMENTO_CNPJ;
			// json.CNPJ = '08723218000186';
			json.IE = obj.SELECTED.ESTABELECIMENTO_IE;
			// json.IE = '562377111111';
			json.IM = obj.SELECTED.ESTABELECIMENTO_IM;
			// json.IM = '';
			json.CRT = trim_null(obj.SELECTED.ESTABELECIMENTO_CRT);

			return json;

		}

		function getCaixa() {
			return $q(function (resolve, reject) {
				gScope.EmissorCFeComunicacaoSefaz.getCaixa().then(function (dados) {
					obj.DADOS_CAIXA.CAIXA_ID = dados.CAIXA_ID;
					resolve(dados);
				}, function (dados) {
					showErro("Não foi possível acessar configurações do caixa. <br> MFE não conectado", true);
					reject(dados);
				});
			});
		}

		function validacaoCaixa() {
			var check = true;

			if (typeof obj.DADOS_CAIXA.CAIXA_ID == 'undefined') {
				check = false;
				showAlert("Caixa não configurado");
			}

			return check;
		}

		function getLogsAtualizacao() {
			var that = obj;
			var check = true;

			check = obj.validacaoCaixa();

			if (check == true) {
				that.LOGS = [];

				var dados = {
					DADOS: {
						CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



				return $q(function (resolve, reject) {

					$ajax.post(that.url_get_logs_atualizacao, dados).then(function (response) {

						obj.LOGS = response;

						$("#modalLogsAtualizacao").modal('show');

						resolve(response);
					}, function (e) {
						reject(e);
					});
				});
			} else {
				obj.execGetCaixaAndTryAgain(that.getLogsAtualizacao);
			}
		}

		function execGetCaixaAndTryAgain(fn) {
			var that = this;

			var msg = gScope.Confirme.add(1, 'Confirmação',
			'Deseja realizar conexão com o caixa e tentar novamente?', [
			{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
			{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

			[
			function (e, btn) {

			},
			function (e, btn) {

				that.getCaixa().then(function (dados) {
					fn();
				}, function (dados) {

				});
			}]);


		}

		return Sincronizacao;
	};

})(window, window.angular);

/***/ })

/******/ });