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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
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

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(23);
module.exports = __webpack_require__(0);


/***/ }),

/***/ 22:
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
'EmissorCFe',
'EmissorCFeComunicacaoSefaz',
'Confirmacao'];


function Ctrl(
$scope,
$timeout,
gScope,
Consulta,
EmissorCFe,
EmissorCFeComunicacaoSefaz,
Confirmacao)
{

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.EmissorCFe = new EmissorCFe();
	vm.EmissorCFeComunicacaoSefaz = new EmissorCFeComunicacaoSefaz();
	vm.Confirmacao = new Confirmacao();
	vm.Confirme = vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme = vm.Confirme;

	// CONSULTAS

	vm.ConsultaColaborador = vm.Consulta.getConsultaPadrao('COLABORADOR', 'consulta-colaborador');
	vm.ConsultaColaborador.model = 'vm.ConsultaColaborador';
	vm.ConsultaColaborador.option.required = false;
	vm.ConsultaColaborador.option.obj_consulta = '/funcionalidades/consultas/getColaboradores';
	vm.ConsultaColaborador.cache = false;
	// vm.ConsultaColaborador.compile();

	vm.ConsultaColaborador.onSelect = function (item) {
		if (vm.ConsultaColaborador.item.selected == true) {
			var id = 0;
			var nome = trim_null(item.DESCRICAO);
			var cpf = trim_null(item.DOCUMENTO_CPF);
			var telefone = trim_null(item.PESSOAL_FONE);
			var cep = trim_null(item.ENDERECO_CEP);
			var uf = trim_null(item.UF_JSON);
			var endereco = trim_null(item.ENDERECO_LOGRADOURO);
			var numero = '';
			var bairro = trim_null(item.ENDERECO_BAIRRO);
			var cidade = trim_null(item.CIDADE_JSON);
			var complemento = '';

			var email = '';

			var dtNascimento = trim_null(item.FDATA_NASCIMENTO);

			$timeout(function () {
				$scope.$apply(function () {
					vm.EmissorCFe.setDadosCliente(id, nome, cpf, telefone, cep, uf, endereco, numero, bairro, cidade, complemento, email, dtNascimento);
				});
			});

		}
	};

	vm.ConsultaColaborador.onClear = function (item) {

		if (typeof vm.EmissorCFe.VENDA.CLIENTE_CPF != 'undefined' && vm.EmissorCFe.VENDA.CLIENTE_CPF != '') {
			vm.EmissorCFe.resetDadosVenda();

		}
	};

	gScope.ConsultaColaborador = vm.ConsultaColaborador;

	vm.ConsultaCliente = vm.Consulta.getConsultaPadrao('CLIENTES', 'consulta-cliente');
	vm.ConsultaCliente.model = 'vm.ConsultaCliente';
	vm.ConsultaCliente.option.required = false;
	vm.ConsultaCliente.option.tamanho_tabela = '100%';
	vm.ConsultaCliente.option.obj_consulta = '/funcionalidades/consultas/getClientes';
	vm.ConsultaCliente.cache = false;
	vm.ConsultaCliente.option.campos_tabela = [['ID', 'ID'], ['RAZAOSOCIAL', 'NOME'], ['CNPJ_F', 'CNPJ/CPF'], ['UF', 'UF']];
	// vm.ConsultaCliente.compile();

	vm.ConsultaCliente.onSelect = function (item) {
		if (vm.ConsultaCliente.item.selected == true) {

			var id = item.CODIGO;
			var nome = trim_null(item.RAZAOSOCIAL);
			var cpf = trim_null(item.CNPJ);
			var telefone = trim_null(item.PESSOAL_FONE);
			var cep = trim_null(item.CEP);
			var uf = trim_null(item.UF_JSON);
			var endereco = trim_null(item.ENDERECO);
			var numero = trim_null(item.NUMERO);
			var bairro = trim_null(item.BAIRRO);
			var cidade = trim_null(item.CIDADE_JSON);
			var complemento = trim_null(item.COMPLEMENTO);
			var email = trim_null(item.EMAIL);

			var dtNascimento = trim_null(item.FDATA_NASCIMENTO);

			$timeout(function () {
				$scope.$apply(function () {
					vm.EmissorCFe.setDadosCliente(id, nome, cpf, telefone, cep, uf, endereco, numero, bairro, cidade, complemento, email, dtNascimento);
				});
			});


			if (vm.EmissorCFe.CLIENTE_PEDIDO > 0) {
				$timeout(function () {
					gScope.ConsultaCliente.btn_apagar_filtro.disabled = true;
					gScope.ConsultaCliente.Input.disabled = true;
					gScope.ConsultaCliente.btn_filtro.disabled = true;

					vm.EmissorCFe.HABILITA_LOADING = false;

					$timeout(function () {
						$(':input:enabled:visible:first').focus();
					});
				});
			}

			if (item.REPRESENTANTE_JSON != '' && item.REPRESENTANTE_JSON != null) {
				var jsonRepresentante = JSON.parse(item.REPRESENTANTE_JSON);

				if (typeof jsonRepresentante.ID != 'undefined' && jsonRepresentante.ID != '' && jsonRepresentante.ID != null) {
					gScope.ConsultaRepresentante.setSelected(jsonRepresentante);
				}
			}

			if (item.VENDEDOR_JSON != '' && item.VENDEDOR_JSON != null) {
				var jsonVendedor = JSON.parse(item.VENDEDOR_JSON);

				if (typeof jsonVendedor.ID != 'undefined' && jsonVendedor.ID != '' && jsonVendedor.ID != null) {
					gScope.ConsultaVendedor.setSelected(jsonVendedor);
				}
			}

			vm.EmissorCFe.validacaoRepresentante();

		}
	};

	vm.ConsultaCliente.onClear = function (item) {
		if (typeof vm.EmissorCFe.VENDA.CLIENTE_CPF != 'undefined' && vm.EmissorCFe.VENDA.CLIENTE_CPF != '') {
			vm.EmissorCFe.resetDadosVenda();

		}
	};

	gScope.ConsultaCliente = vm.ConsultaCliente;

	// CONSULTA CLIENTE INICIAL
	vm.ConsultaClienteInicial = angular.copy(gScope.ConsultaCliente);
	vm.ConsultaClienteInicial.consulta_id = 'consulta_' + Math.floor(Math.random() * 9999999 + 1);
	vm.ConsultaClienteInicial.componente = '.consulta-cliente-ini';
	vm.ConsultaClienteInicial.option.class = 'consulta-cliente-ini-c';
	vm.ConsultaClienteInicial.option.tamanho_tabela = '100%';
	vm.ConsultaClienteInicial.model = 'vm.ConsultaClienteInicial';
	vm.ConsultaClienteInicial.key_object_scop = -1;

	vm.ConsultaClienteInicial.onSelect = function (item) {

	};

	vm.ConsultaClienteInicial.onClear = function (item) {

	};
	vm.ConsultaClienteInicial.compile();

	gScope.ConsultaClienteInicial = vm.ConsultaClienteInicial;

	vm.ConsultaUF = vm.Consulta.getConsultaPadrao('UF', 'consulta-uf');
	vm.ConsultaUF.model = 'vm.ConsultaUF';
	vm.ConsultaUF.option.required = false;
	vm.ConsultaUF.option.tamanho_tabela = '100%';
	vm.ConsultaUF.option.label_descricao = 'UF: <small class="opcional">(opcional)</small>';
	vm.ConsultaUF.btn_apagar_filtro.disabled = true;
	vm.ConsultaUF.Input.disabled = true;
	vm.ConsultaUF.btn_filtro.disabled = true;

	vm.ConsultaUF.cache = false;
	vm.ConsultaUF.onSelect = function (item) {

	};

	vm.ConsultaUF.onClear = function (item) {

	};

	// vm.ConsultaUF.compile();
	gScope.ConsultaUF = vm.ConsultaUF;

	vm.ConsultaCidade = vm.Consulta.getConsultaPadrao('CIDADE', 'consulta-cidade');
	vm.ConsultaCidade.model = 'vm.ConsultaCidade';
	vm.ConsultaCidade.option.required = false;
	vm.ConsultaCidade.option.label_descricao = 'Cidade: <small class="opcional">(opcional)</small>';
	vm.ConsultaCidade.option.tamanho_tabela = '100%';
	vm.ConsultaCidade.cache = false;

	vm.ConsultaCidade.require = vm.ConsultaUF;
	vm.ConsultaCidade.vincular("Selecione uma UF");
	// vm.ConsultaCidade.compile();

	vm.ConsultaCidade.onSelect = function (item) {

	};

	vm.ConsultaCidade.onClear = function (item) {

	};

	gScope.ConsultaCidade = vm.ConsultaCidade;

	// Consulta Representante 
	vm.ConsultaRepresentante = vm.Consulta.getConsultaPadrao('REPRESENTANTES', 'consulta-representante');
	vm.ConsultaRepresentante.model = 'vm.ConsultaRepresentante';
	vm.ConsultaRepresentante.option.required = false;
	vm.ConsultaRepresentante.option.tamanho_tabela = '100%';
	vm.ConsultaRepresentante.cache = false;
	vm.ConsultaRepresentante.option.campos_tabela = [['ID', 'ID'], ['RAZAOSOCIAL', 'NOME'], ['NOMEFANTASIA', 'NOME FANTASIA'], ['CNPJ_F', 'CNPJ/CPF'], ['UF', 'UF']];

	vm.ConsultaRepresentante.compile();

	vm.ConsultaRepresentante.onSelect = function (item) {

		if (vm.ConsultaRepresentante.item.selected == true) {
			$timeout(function () {
				vm.ConsultaVendedor.setFocusInput();
			});
		}

	};

	vm.ConsultaRepresentante.onClear = function (item) {

	};
	gScope.ConsultaRepresentante = vm.ConsultaRepresentante;

	// Consulta Vendedor
	vm.ConsultaVendedor = vm.Consulta.getNew(true);
	vm.ConsultaVendedor.componente = '.consulta-vendedor';
	vm.ConsultaVendedor.option.class = 'consulta-vendedor-c';
	vm.ConsultaVendedor.model = 'vm.ConsultaVendedor';
	vm.ConsultaVendedor.option.label_descricao = 'Vendedor: ';
	vm.ConsultaVendedor.option.obj_consulta = '/funcionalidades/consultas/getVendedor';
	vm.ConsultaVendedor.option.tamanho_tabela = '100%';
	vm.ConsultaVendedor.option.required = false;
	vm.ConsultaVendedor.autoload = false;
	vm.ConsultaVendedor.cache = false;
	vm.ConsultaVendedor.option.infinite_scroll = true;
	vm.ConsultaVendedor.option.obj_ret = ['DESC_ID', 'NOME'];
	vm.ConsultaVendedor.option.campos_tabela = [['DESC_ID', 'ID'], ['NOME', 'NOME']];
	vm.ConsultaVendedor.option.filtro_sql = {};

	vm.ConsultaVendedor.compile();

	vm.ConsultaVendedor.onSelect = function (item) {

	};

	vm.ConsultaVendedor.onClear = function (item) {

	};

	gScope.ConsultaVendedor = vm.ConsultaVendedor;

	// CONSULTA CRÉDITO POS
	vm.ConsultaCreditoPOS = vm.Consulta.getNew(true);
	vm.ConsultaCreditoPOS.componente = '.consulta-credito-pos';
	vm.ConsultaCreditoPOS.option.class = 'consulta-credito-pos-c';
	vm.ConsultaCreditoPOS.model = 'vm.ConsultaCreditoPOS';
	vm.ConsultaCreditoPOS.option.label_descricao = 'POS: ';
	vm.ConsultaCreditoPOS.option.obj_consulta = '/funcionalidades/consultas/getParametrosPOS';
	vm.ConsultaCreditoPOS.option.tamanho_tabela = '100%';
	vm.ConsultaCreditoPOS.option.required = false;
	vm.ConsultaCreditoPOS.autoload = false;
	vm.ConsultaCreditoPOS.cache = false;
	vm.ConsultaCreditoPOS.option.infinite_scroll = true;
	vm.ConsultaCreditoPOS.option.obj_ret = ['DESC_ID', 'MAQUINA'];
	vm.ConsultaCreditoPOS.option.campos_tabela = [['DESC_ID', 'ID'], ['DESC_EMPRESA', 'EMPRESA'], ['MAQUINA', 'POS']];
	vm.ConsultaCreditoPOS.option.filtro_sql = {};

	vm.ConsultaCreditoPOS.onSelect = function (item) {

		if (vm.ConsultaCreditoPOS.item.selected == true) {
			$timeout(function () {
				$("#inputValor").first().focus();
				$("#inputValor").first().select();
			}, 100);
		}


	};

	vm.ConsultaCreditoPOS.onClear = function (item) {

	};

	gScope.ConsultaCreditoPOS = vm.ConsultaCreditoPOS;

	// CONSULTA DEBITO POS
	vm.ConsultaDebitoPOS = angular.copy(gScope.ConsultaCreditoPOS);
	vm.ConsultaDebitoPOS.consulta_id = 'consulta_' + Math.floor(Math.random() * 9999999 + 1);
	vm.ConsultaDebitoPOS.componente = '.consulta-debito-pos';
	vm.ConsultaDebitoPOS.option.class = 'consulta-debito-pos-c';
	vm.ConsultaDebitoPOS.model = 'vm.ConsultaDebitoPOS';
	vm.ConsultaDebitoPOS.key_object_scop = -1;
	vm.ConsultaDebitoPOS.onSelect = function (item) {

		if (vm.ConsultaDebitoPOS.item.selected == true) {
			$timeout(function () {
				$("#inputValor").first().focus();
				$("#inputValor").first().select();
			}, 100);
		}

	};

	vm.ConsultaDebitoPOS.onClear = function (item) {

	};
	gScope.ConsultaDebitoPOS = vm.ConsultaDebitoPOS;

	// vm.EmissorCFe.VENDA.CLIENTE_ID = 0;

	// Consulta Devoluções
	vm.ConsultaDevolucoes = vm.Consulta.getNew(true);
	vm.ConsultaDevolucoes.componente = '.consulta-devolucao';
	vm.ConsultaDevolucoes.option.class = 'consulta-devolucao-c';
	vm.ConsultaDevolucoes.model = 'vm.ConsultaDevolucoes';
	vm.ConsultaDevolucoes.option.label_descricao = 'Devoluções: ';
	vm.ConsultaDevolucoes.option.obj_consulta = '/funcionalidades/consultas/getDevolucoes';
	vm.ConsultaDevolucoes.option.tamanho_tabela = '100%';
	vm.ConsultaDevolucoes.option.required = false;
	vm.ConsultaDevolucoes.autoload = false;
	vm.ConsultaDevolucoes.cache = false;
	vm.ConsultaDevolucoes.option.infinite_scroll = true;
	vm.ConsultaDevolucoes.option.obj_ret = ['DESC_ID', 'DESC_EMPRESA'];
	vm.ConsultaDevolucoes.option.campos_tabela = [['DESC_ID', 'ID'], ['DESC_EMPRESA', 'CLIENTE'], ['DESC_DOCUMENTO', 'DOCUMENTO'], ['VALOR_SALDO', 'SALDO']];

	vm.ConsultaDevolucoes.option.align_right = ['VALOR_SALDO'];

	vm.ConsultaDevolucoes.option.filtro_sql = {
		FORMAS_PAGAMENTO_ESCOLHIDAS: vm.EmissorCFe.FORMAS_PAGAMENTO_ESCOLHIDAS,
		TIPO_CLIENTE: vm.EmissorCFe.TIPO_CLIENTE,
		CLIENTE_ID: vm.EmissorCFe.VENDA.CLIENTE_ID };


	vm.ConsultaDevolucoes.onSelect = function (item) {

		if (vm.ConsultaDevolucoes.item.selected == true) {
			vm.EmissorCFe.VALOR_PARCIAL = angular.copy(Number(item.VALOR_SALDO));

			$timeout(function () {
				$("#inputValor").first().focus();
				$("#inputValor").first().select();
			}, 100);

		}

	};

	vm.ConsultaDevolucoes.onClear = function (item) {

	};

	gScope.ConsultaDevolucoes = vm.ConsultaDevolucoes;

	// Consulta Depósitos Antecipados
	vm.ConsultaDepositoAntecipado = vm.Consulta.getNew(true);
	vm.ConsultaDepositoAntecipado.componente = '.consulta-deposito-antecipado';
	vm.ConsultaDepositoAntecipado.option.class = 'consulta-deposito-antecipado-c';
	vm.ConsultaDepositoAntecipado.model = 'vm.ConsultaDepositoAntecipado';
	vm.ConsultaDepositoAntecipado.option.label_descricao = 'Depósitos Antecipados: ';
	vm.ConsultaDepositoAntecipado.option.obj_consulta = '/funcionalidades/consultas/getDepositoAntecipado';
	vm.ConsultaDepositoAntecipado.option.tamanho_tabela = '100%';
	vm.ConsultaDepositoAntecipado.option.required = false;
	vm.ConsultaDepositoAntecipado.autoload = false;
	vm.ConsultaDepositoAntecipado.cache = false;
	vm.ConsultaDepositoAntecipado.option.infinite_scroll = true;
	vm.ConsultaDepositoAntecipado.option.obj_ret = ['DESC_ID', 'DATA_FORMATADA'];
	vm.ConsultaDepositoAntecipado.option.campos_tabela = [['DESC_ID', 'ID'], ['DATA_FORMATADA', 'DATA'], ['DESC_OPERACAO', 'OPERAÇÃO'], ['OBSERVACAO', 'OBSERVAÇÃO'], ['VALOR_SALDO', 'SALDO']];

	vm.ConsultaDepositoAntecipado.option.align_right = ['VALOR_SALDO'];

	vm.ConsultaDepositoAntecipado.onSelect = function (item) {

		if (vm.ConsultaDepositoAntecipado.item.selected == true) {
			vm.EmissorCFe.VALOR_PARCIAL = angular.copy(Number(item.VALOR_SALDO));

			$timeout(function () {
				$("#inputValor").first().focus();
				$("#inputValor").first().select();
			}, 100);

		}

	};

	vm.ConsultaDepositoAntecipado.onClear = function (item) {

	};

	gScope.ConsultaDepositoAntecipado = vm.ConsultaDepositoAntecipado;

	// Consulta Formas de Pagamento
	vm.ConsultaFormasPagamento = vm.Consulta.getNew(true);
	vm.ConsultaFormasPagamento.componente = '.consulta-formas-pagamento';
	vm.ConsultaFormasPagamento.option.class = 'consulta-formas-pagamento-c';
	vm.ConsultaFormasPagamento.model = 'vm.ConsultaFormasPagamento';
	vm.ConsultaFormasPagamento.option.label_descricao = 'Formas de Pagamento: ';
	vm.ConsultaFormasPagamento.option.obj_consulta = '/funcionalidades/consultas/getFormasPagamento';
	vm.ConsultaFormasPagamento.option.tamanho_tabela = '100%';
	vm.ConsultaFormasPagamento.option.required = false;
	vm.ConsultaFormasPagamento.autoload = false;
	vm.ConsultaFormasPagamento.cache = false;
	vm.ConsultaFormasPagamento.option.infinite_scroll = true;
	vm.ConsultaFormasPagamento.option.obj_ret = ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaFormasPagamento.option.campos_tabela = [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO']];

	// vm.ConsultaFormasPagamento.compile();

	vm.ConsultaFormasPagamento.onSelect = function (item) {

		if (vm.ConsultaFormasPagamento.item.selected == true) {
			var tipoPag = trim_null(item.NFE_TIPPAG);

			vm.EmissorCFe.onSelectFormaPagamento(tipoPag);
		}

	};

	vm.ConsultaFormasPagamento.onClear = function (item) {

		vm.EmissorCFe.HABILITA_CONSULTA_CREDITO = false;
		vm.EmissorCFe.HABILITA_CONSULTA_DEBITO = false;
		vm.EmissorCFe.HABILITA_CONSULTA_DEVOLUCAO = false;
		vm.EmissorCFe.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO = false;

	};

	gScope.ConsultaFormasPagamento = vm.ConsultaFormasPagamento;

	vm.EmissorCFe.QUANTIDADE = 1;
	vm.EmissorCFe.CODIGO_EAN = '';
	vm.EmissorCFe.FILTRO_PRODUTO = '';
	vm.EmissorCFe.CODIGO_OPERADOR = '';
	vm.EmissorCFe.TIPO_CLIENTE = '-1';
	vm.EmissorCFe.TIPO_DESCONTO_ALL = '2';
	vm.EmissorCFe.VARIANCIA_DESCONTO_ALL = 0;
	vm.EmissorCFe.PEDIDO_IMPORTACAO = 0;
	vm.EmissorCFe.FORMAS_PAGAMENTO_ESCOLHIDAS = [];
	vm.EmissorCFe.CAIXA_ABERTO = false;
	vm.EmissorCFe.PRODUTOS = [];

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

	vm.GerarConsulta = function (consulta) {
		if (typeof vm[consulta + 'CP'] == 'undefined' || typeof vm[consulta + 'CP'] != 'undefined' && vm[consulta + 'CP'] == false) {
			vm[consulta].compile();
			vm[consulta + 'CP'] = true;
		}
	};

	gScope.calcularQuantidadeDecimais = vm.calcularQuantidadeDecimais;
	gScope.countDecimals = vm.countDecimals;
	gScope.GerarConsulta = vm.GerarConsulta;
	gScope.EmissorCFe = vm.EmissorCFe;
	gScope.EmissorCFeComunicacaoSefaz = vm.EmissorCFeComunicacaoSefaz;


	var caixaAberto = localStorage.getItem('CAIXA_ABERTO');

	if (caixaAberto != null) {
		if (Number(caixaAberto) == 1) {
			vm.EmissorCFe.DADOS_CAIXA = JSON.parse(localStorage.getItem('DADOS_CAIXA'));

			vm.EmissorCFe.abrirCaixa();

		}
	}


	if (vm.EmissorCFe.CAIXA_ABERTO == true) {
		var objetoSelecionado = localStorage.getItem('OBJ_SELECTED');
		if (objetoSelecionado != null && objetoSelecionado != '') {
			var obj = JSON.parse(objetoSelecionado);
			if (typeof obj.ITENS != 'undefined') {
				vm.EmissorCFe.SELECTED = JSON.parse(objetoSelecionado);
			}
		}

		vm.EmissorCFe.PRODUTOS = JSON.parse(localStorage.getItem('PRODUTOS'));

		$timeout(function () {
			$("#pesquisaProduto").first().focus();
		});
	} else {
		vm.EmissorCFe.getCaixa();
	}


	// Atalhos

	$(document).ready(function () {
		$('body').keydown(function (e) {
			//Alt + L
			var key = e.keyCode;

			// Tecla +
			if (key == 107 && $(".modal:visible").length == 0) {
				vm.EmissorCFe.plusQtd();
			}

			// Tecla -
			if (key == 109 && $(".modal:visible").length == 0) {
				vm.EmissorCFe.minusQtd();
			}

			if (key == 106) {
				if ($(".modal#modalProdutos").is(':visible')) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					$("#filtroProduto").first().focus();
				} else if (!$(".modal").is(':visible')) {
					$("#pesquisaProduto").first().focus();
				}
			}
		});

		$('#modalProdutos').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			$timeout(function () {
				$("#pesquisaProduto").first().focus();
				vm.EmissorCFe.CANCELAR_VENDA = true;
			}, 200);
		});

		$('#modalVisualizarItem').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			vm.EmissorCFe.cancelarVisualizacaoItem();

			$timeout(function () {
				vm.EmissorCFe.CANCELAR_VENDA = true;
			});

		});

		$('#modalConfirmExclusaoItem').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			vm.EmissorCFe.fecharModalExcluirItem();
			$timeout(function () {
				vm.EmissorCFe.CANCELAR_VENDA = true;
			});
		});

		$('#modalExclusaoItem').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			vm.EmissorCFe.cancelarExclusaoItem();
			$timeout(function () {
				vm.EmissorCFe.CANCELAR_VENDA = true;
			});
		});

		$('#modalImportacaoConferencia').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			vm.EmissorCFe.cancelarImportacaoConferencia();
			$timeout(function () {
				vm.EmissorCFe.CANCELAR_VENDA = true;
			});
		});

		$('#modalImportacaoPedido').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			vm.EmissorCFe.cancelarImportacaoPedido();
			$timeout(function () {
				vm.EmissorCFe.CANCELAR_VENDA = true;
			});
		});

		$('#modalCancelarVenda').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			$timeout(function () {
				$("#pesquisaProduto").first().focus();
				vm.EmissorCFe.CANCELAR_VENDA = true;
			});
		});

		$('#modalCancelarFinalizacaoVenda').on('hidden.bs.modal', function () {
			$timeout(function () {
				if ($(".modal#modalFinalizarVenda").is(':visible')) {
					vm.EmissorCFe.onFocusInputModal("#modalFinalizarVenda");
				} else {
					$("#pesquisaProduto").first().focus();
				}
			});
		});

		$('#modalDescontoTodosItens').on('hidden.bs.modal', function () {
			vm.EmissorCFe.CANCELAR_VENDA = false;
			vm.EmissorCFe.cancelarDescontoAllItens();
			$timeout(function () {
				$("#pesquisaProduto").first().focus();
				vm.EmissorCFe.CANCELAR_VENDA = true;
			});
		});

		$('#modalFormasPagamento').on('hidden.bs.modal', function () {
			vm.EmissorCFe.clearAddFormasPagamento();
		});

	});


	$.key("alt+p", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if (!$(".modal").is(':visible') && vm.EmissorCFe.CAIXA_ABERTO == true) {
			if (vm.EmissorCFe.SELECTED.ITENS.length == 0) {
				vm.EmissorCFe.importarPedido();
			}
		}
	});

	$.key("alt+c", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if (!$(".modal").is(':visible') && vm.EmissorCFe.CAIXA_ABERTO == true) {
			if (vm.EmissorCFe.SELECTED.ITENS.length == 0) {
				vm.EmissorCFe.importarConferencia();
			}
		}
	});

	$.key("alt+d", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if (!$(".modal").is(':visible') && vm.EmissorCFe.CAIXA_ABERTO == true) {
			if (vm.EmissorCFe.SELECTED.ITENS.length > 0) {
				vm.EmissorCFe.onDescontoItens();
			}
		}
	});

	$.key("f3", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if ($(".modal").is(':visible')) {
			$(".modal [data-hotkey=f3]:visible:enabled").first().trigger('click');
		} else {
			$("[data-hotkey=f3]:visible:enabled").first().trigger('click');
		}
	});

	$.key("f1", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if (!$(".modal").is(':visible')) {
			vm.EmissorCFe.onFinalizarVenda();
		}
	});

	$.key("f6", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if ($(".modal#modalFinalizarVenda").is(':visible') && $(".modal:visible").length == 1) {
			vm.EmissorCFe.validacaoStepAnterior();
		}
	});

	$.key("f4", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if ($(".modal#modalFinalizarVenda").is(':visible') && $(".modal:visible").length == 1) {
			$("#btnTentarNovamente").first().trigger('click');
		}
	});

	$.key("f7", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if ($(".modal#modalFinalizarVenda").is(':visible') && $(".modal:visible").length == 1) {
			vm.EmissorCFe.validacaoStep();
		}
	});

	$.key("f2", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if ($(".modal#modalFinalizarVenda").is(':visible') && $(".modal:visible").length == 1) {
			vm.EmissorCFe.onAddFormaPagamento();
		}
	});

	$.key("esc", function (e) {
		if (vm.EmissorCFe.CANCELAR_VENDA && $("#tableConsulta:visible").length == 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			vm.EmissorCFe.onCancelarVenda();
		} else if ($(".modal#modalFinalizarVenda:visible").length == 1 && $("#tableConsulta:visible").length == 0 && $(".modal:visible").length == 1) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			$("#btnCancelarFinalizacaoVenda:visible:enabled").first().trigger('click');
		} else if ($("#tableConsulta:visible").length == 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');
		}
	});

	$.key("enter", function (e) {
		if ($(".modal#modalProdutos").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			if ($("#dataTableProducts tbody tr.row_selected").length == 1) {
				var data = vm.EmissorCFe.DATATABLE_PRODUCTS.row("#dataTableProducts tbody tr.row_selected").data();
				vm.EmissorCFe.ENTER_ON_ITEM = false;

				vm.EmissorCFe.selectProduto(data, 1);
			}
		} else if ($(".modal").is(':visible')) {
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


	$.key("up", function (e) {
		if ($(".modal#modalProdutos").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();


			if ($("#dataTableProducts tbody tr.row_selected").length == 0) {
				$("#dataTableProducts tbody tr").first().addClass('row_selected');
				$("#dataTableProducts tbody tr").first().focus();
			} else {

				var element = $("#dataTableProducts tbody tr.row_selected");

				vm.EmissorCFe.DATATABLE_PRODUCTS.$('tr.row_selected').removeClass('row_selected');

				if (element.prev().is('tr')) {
					$(element.prev()[0]).addClass('row_selected');

					$(element.prev()[0]).focus();
				} else {
					$("#filtroProduto").first().focus();
				}
			}
		} else {
			if ($("#tableConsulta tbody tr.selected").length == 1) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();


				var elementConsulta = $("#tableConsulta tbody tr.selected");

				// $(elementConsulta.prev()[0]).focus((e) => {
				// 	e.preventDefault();
				// 	e.target.focus({preventScroll: true});
				// });

				$(elementConsulta.prev()[0]).focus();
			} else {
				if ($(".modal:visible").length == 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#tabelaItens tbody tr.selected").length == 0) {
						$("#tabelaItens tbody tr").first().addClass('selected');
						$("#tabelaItens tbody tr").first().focus();
					} else {

						var element = $("#tabelaItens tbody tr.selected");

						element.removeClass('selected');

						if (element.prev().is('tr')) {
							$(element.prev()[0]).addClass('selected');

							$(element.prev()[0]).focus();
						} else {
							$("#pesquisaProduto").first().focus();
						}
					}

				}
			}
		}

	});

	$.key("down", function (e) {
		if ($(".modal#modalProdutos").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();


			if ($("#dataTableProducts tbody tr.row_selected").length == 0) {
				$("#dataTableProducts tbody tr").first().addClass('row_selected');
				$("#dataTableProducts tbody tr").first().focus();
			} else {

				var element = $("#dataTableProducts tbody tr.row_selected");

				vm.EmissorCFe.DATATABLE_PRODUCTS.$('tr.row_selected').removeClass('row_selected');

				if (element.next().is('tr')) {
					$(element.next()[0]).addClass('row_selected');

					$(element.next()[0]).focus();
				} else {
					$("#filtroProduto").first().focus();
				}
			}
		} else {
			if ($("#tableConsulta tbody tr.selected").length == 1) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var elementConsulta = $("#tableConsulta tbody tr.selected");

				// $(elementConsulta.next()[0]).focus((e) => {
				// 	e.preventDefault();
				// 	e.target.focus({preventScroll: true});
				// });

				$(elementConsulta.next()[0]).focus();
			} else {
				if ($(".modal:visible").length == 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#tabelaItens tbody tr.selected").length == 0) {
						$("#tabelaItens tbody tr").first().addClass('selected');
						$("#tabelaItens tbody tr").first().focus();
					} else {

						var element = $("#tabelaItens tbody tr.selected");

						element.removeClass('selected');

						if (element.next().is('tr')) {
							$(element.next()[0]).addClass('selected');

							$(element.next()[0]).focus();
						} else {
							$("#pesquisaProduto").first().focus();
						}
					}

				}
			}
		}

	});
}

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('EmissorCFe', EmissorCFe);

	EmissorCFe.$inject = [
	'$ajax',
	'$q',
	'$rootScope',
	'$timeout',
	'gScope'];


	function EmissorCFe($ajax, $q, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function EmissorCFe() {

			obj = this;
			obj.model = 'vm.EmissorCFe';

			obj.url_get_detalhes_caixa = '/funcionalidades/emissor/getDetalhesCaixa';
			obj.url_get_uf = '/funcionalidades/emissor/getDadosUFClientePDV';
			obj.url_get_cliente_pdv_by_cpf = '/funcionalidades/emissor/getClientePDVByCPF';
			obj.url_gravar = '/funcionalidades/emissor/postEmissorCFe';
			obj.url_update_dados_cfe = '/funcionalidades/emissor/postUpdateFielsCFe';
			obj.url_update_formas_pagamento = '/funcionalidades/emissor/postUpdateFormasPagamento';
			obj.url_get_errors_resposta_fiscal = '/funcionalidades/emissor/getErrorsRespostaFiscal';
			obj.url_validar_operador = '/funcionalidades/emissor/postValidarOperador';
			obj.url_validar_gerente = '/funcionalidades/emissor/postValidarGerente';
			obj.url_get_pedido = '/funcionalidades/emissor/getPedido';
			obj.url_get_conferencia = '/funcionalidades/emissor/getConferencia';


			obj.incluir = incluir;
			obj.setDadosIncluir = setDadosIncluir;
			obj.setDadosConsultar = setDadosConsultar;
			obj.formatDataMerge = formatDataMerge;
			obj.setDadosFiltro = setDadosFiltro;
			obj.getCaixa = getCaixa;
			obj.getDetalhesCaixa = getDetalhesCaixa;
			obj.formatProdutos = formatProdutos;
			obj.fnDescStatus = fnDescStatus;
			obj.enterOnCodigoOperador = enterOnCodigoOperador;
			obj.abrirSessaoCaixa = abrirSessaoCaixa;
			obj.abrirCaixa = abrirCaixa;
			obj.showProducts = showProducts;
			obj.compileDatatableProducts = compileDatatableProducts;
			obj.keyUPSearchProducts = keyUPSearchProducts;
			obj.selectProduto = selectProduto;
			obj.atalhosTableItens = atalhosTableItens;
			obj.abrirDetalheItem = abrirDetalheItem;
			obj.cancelarVisualizacaoItem = cancelarVisualizacaoItem;
			obj.gravarVisualizacaoItem = gravarVisualizacaoItem;
			obj.changeOpcaoDesconto = changeOpcaoDesconto;
			obj.calculateValorTotalItemCFe = calculateValorTotalItemCFe;
			obj.onValidarDeleteItem = onValidarDeleteItem;
			obj.cancelarExclusaoItem = cancelarExclusaoItem;
			obj.deleteItemNoOperador = deleteItemNoOperador;
			obj.deleteItem = deleteItem;
			obj.fecharModalExcluirItem = fecharModalExcluirItem;
			obj.onCancelarVenda = onCancelarVenda;
			obj.cancelarVenda = cancelarVenda;
			obj.importarPedido = importarPedido;
			obj.importarConferencia = importarConferencia;
			obj.cancelarImportacaoPedido = cancelarImportacaoPedido;
			obj.cancelarImportacaoConferencia = cancelarImportacaoConferencia;
			obj.gravarImportacaoPedido = gravarImportacaoPedido;
			obj.validatePedidoAndCliente = validatePedidoAndCliente;
			obj.confirmTrocaClienteByPedido = confirmTrocaClienteByPedido;
			obj.checkClienteAndPedido = checkClienteAndPedido;
			obj.gravarImportacaoConferencia = gravarImportacaoConferencia;
			obj.validateConferenciaAndCliente = validateConferenciaAndCliente;
			obj.confirmTrocaClienteByConferencia = confirmTrocaClienteByConferencia;
			obj.checkClienteAndConferencia = checkClienteAndConferencia;
			obj.onDescontoItens = onDescontoItens;
			obj.gravarDescontoAllItens = gravarDescontoAllItens;
			obj.cancelarDescontoAllItens = cancelarDescontoAllItens;

			obj.onFocusInputModal = onFocusInputModal;
			obj.convertStringToNumber = convertStringToNumber;
			obj.plusQtd = plusQtd;
			obj.minusQtd = minusQtd;
			obj.enterOnCodigoEAN = enterOnCodigoEAN;
			obj.onValidarProduct = onValidarProduct;
			obj.getProdutoByEAN = getProdutoByEAN;
			obj.calculateInsertItem = calculateInsertItem;
			obj.calcularCSTIcms = calcularCSTIcms;
			obj.calcularCSTPis = calcularCSTPis;
			obj.calcularCSTCofins = calcularCSTCofins;
			obj.reducaoBasePisCof = reducaoBasePisCof;
			obj.verifyInserido = verifyInserido;
			obj.setFocusTableItem = setFocusTableItem;
			obj.calculateTotalizadores = calculateTotalizadores;
			obj.onFinalizarVenda = onFinalizarVenda;
			obj.resetDadosVenda = resetDadosVenda;
			obj.preencherRepresentanteAndVendedor = preencherRepresentanteAndVendedor;
			obj.validacaoRepresentante = validacaoRepresentante;
			obj.setStep = setStep;
			obj.setDadosCliente = setDadosCliente;
			obj.getClientePDVByCPF = getClientePDVByCPF;
			obj.clearFieldsClient = clearFieldsClient;
			obj.getEnderecoByCep = getEnderecoByCep;
			obj.getUF = getUF;
			obj.validacaoStep = validacaoStep;
			obj.validacaoStepAnterior = validacaoStepAnterior;
			obj.validacaoCliente = validacaoCliente;
			obj.validacaoFormaPagamento = validacaoFormaPagamento;
			obj.nextStep = nextStep;
			obj.previousStep = previousStep;
			obj.onAddFormaPagamento = onAddFormaPagamento;
			obj.clearAddFormasPagamento = clearAddFormasPagamento;
			obj.onSelectFormaPagamento = onSelectFormaPagamento;
			obj.onValidarFormaPagamento = onValidarFormaPagamento;
			obj.addFormaPagamento = addFormaPagamento;
			obj.enabledDisabledConsultas = enabledDisabledConsultas;
			obj.addFormaPagamentoCreditoLoja = addFormaPagamentoCreditoLoja;
			obj.addFormaPagamentoDepositoAntecipado = addFormaPagamentoDepositoAntecipado;
			obj.addFormaPagamentoDinheiro = addFormaPagamentoDinheiro;
			obj.validarFormaPagamentoCartao = validarFormaPagamentoCartao;
			obj.executePagamentoEtapa1 = executePagamentoEtapa1;
			obj.executePagamentoEtapa2 = executePagamentoEtapa2;
			obj.confirmarFormaPagamentoCartao = confirmarFormaPagamentoCartao;
			obj.onCancelarFinalizarVenda = onCancelarFinalizarVenda;
			obj.deleteFormaPagamento = deleteFormaPagamento;
			obj.cancelarFinalizarVenda = cancelarFinalizarVenda;
			obj.validacaoTroco = validacaoTroco;
			obj.addListFormaPagamento = addListFormaPagamento;
			obj.finalizarVenda = finalizarVenda;
			obj.setDadosClienteBeforeGravar = setDadosClienteBeforeGravar;
			obj.emitirCFE = emitirCFE;
			obj.updateDadosCFe = updateDadosCFe;
			obj.envioRespostaFiscalCupom = envioRespostaFiscalCupom;
			obj.updateFormasPagamento = updateFormasPagamento;
			obj.finallyImpressaoAndRepsFiscal = finallyImpressaoAndRepsFiscal;
			obj.finallyVenda = finallyVenda;
			obj.getErrorsRespostaFiscal = getErrorsRespostaFiscal;
			obj.setDadosWebService = setDadosWebService;
			obj.setProgressEmissao = setProgressEmissao;
			obj.setDadosEstabelecimento = setDadosEstabelecimento;
			obj.setDadosGerais = setDadosGerais;
			obj.fecharCaixa = fecharCaixa;

			obj.event_focus_item = {
				function: function _function(item) {
					obj.SELECTED_ITEM_CFE = item;
				} };


			obj.CAMPO_INDEX = 'ID';

			obj.CAIXA = 0;

			obj.DADOS_CAIXA = {};

			obj.SELECTED_ITEM_CFE = {};

			obj.BKP_SELECTED_ITEM_CFE = {};

			obj.VENDA = {};

			obj.DATA_REDUCAO_PIS_COF = '';

			obj.DATATABLE_PRODUCTS = null;

			obj.INDEX_TO_DELETE = -1;

			obj.CODIGO_OPERADOR_EXCLUSAO = '';

			obj.CLIENTE_PEDIDO = 0;

			obj.REPRESENTANTE_JSON = {};

			obj.VENDEDOR_JSON = {};

			obj.PEDIDO_IMPORTACAO = 0;

			obj.RESPONSE_PEDIDO = [];

			obj.CONFERENCIA_IMPORTACAO = 0;

			obj.RESPONSE_CONFERENCIA = [];

			obj.ENTER_ON_ITEM = true;

			obj.DESC_MODAL = '';
			obj.DESC_CLIENTE_INICIAL = '';
			obj.DESC_CLIENTE_AUX = '';

			obj.HABILITA_PEDIDO = true;

			obj.HABILITA_CONFERENCIA = true;

			obj.CANCELAR_VENDA = true;

			obj.PROGRESS_FINAL = false;
			obj.DESC_PERCENTUAL = '';
			obj.DETALHES_EMISSAO = '';

			obj.HABILITA_LOADING = false;

			obj.HABILITA_LOADING_ON = false;

			obj.VALOR_CREDITO = 0;

			obj.INDEX_FORMA_PAG = -1;

			obj.HABILITA_PROXIMO = true;

			obj.HABILITA_ANTERIOR = false;

			obj.HABILITA_GRAVACAO = false;

			obj.HABILITA_BTN_TENTAR_NOVAMENTE = false;

			obj.HABILITA_CONSULTA_CREDITO = false;
			obj.HABILITA_CONSULTA_DEBITO = false;
			obj.HABILITA_CONSULTA_DEVOLUCAO = false;
			obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO = false;
			obj.HABILITA_DINHEIRO = false;
			obj.HABILITA_CONFIRMAR_PAGAMENTO = false;
			obj.HABILITA_PROGRESS = false;
			obj.MENSAGEM_PROGRESS = '';


			obj.DADOS_POS = {};
			obj.VALOR_PARCIAL = 0;

			obj.STEPPER = '';

			obj.RESPONSE_GRAVACAO = {};
		}


		function incluir() {
			var that = this;

			that.SELECTED = that.setDadosIncluir();
		}

		/* executa ao clicar em incluir*/
		function setDadosIncluir() {
			var that = this;

			var dados = {
				QTD_ITENS: 0,
				TOTAL_PAGO: 0,
				TOTAL_PAGO_VISUALIZACAO: 'R$ 0,00',
				TOTAL_PAGAR: 0,
				TOTAL_PAGAR_VISUALIZACAO: 'R$ 0,00',
				TROCO: 0,
				TROCO_VISUALIZACAO: 'R$ 0,00',
				QUANTIDADE: 0,
				QUANTIDADE_VISUALIZACAO: '0,00',
				SUBTOTAL: 0,
				SUBTOTAL_VISUALIZACAO: 'R$ 0,00',
				DESCONTO: 0,
				DESCONTO_VISUALIZACAO: 'R$ 0,00',
				ACRESCIMO: 0,
				ACRESCIMO_VISUALIZACAO: 'R$ 0,00',
				TOTAL: 0,
				TOTAL_VISUALIZACAO: 'R$ 0,00',
				ITENS: [] };


			return dados;
		}

		/* executa antes de consultar*/
		function setDadosConsultar(dados) {
			var that = this;

			dados.DADOS.CFe_ID = gScope.EmissorCFe.SELECTED.ID;
			dados.FILTRO.CFe_ID = gScope.EmissorCFe.SELECTED.ID;
		}

		/* executa no merge*/
		function formatDataMerge() {
			var that = this;

			/*
                    	angular.forEach(obj.DADOS, function(value, key) {
                    		value.DATA  = moment(value.DATA).toDate();
                    	});
                    */
		}

		/* executa antes de gravar*/
		function setDadosFiltro(dados) {
			var that = this;

			dados.DADOS.CFe_ID = gScope.EmissorCFe.SELECTED.ID;
			dados.FILTRO.CFe_ID = gScope.EmissorCFe.SELECTED.ID;

			//dados.DADOS.ITENS_MARCADOS = obj.BACKUP_ITENS_MARCADOS;

			//obj.SELECTED.FDATA = moment(obj.SELECTED.DATA  ).format('DD.MM.YYYY');
			//obj.SELECTED.FDATA = obj.SELECTED.FDATA == 'Invalid date' ? null : obj.SELECTED.FDATA;

			return dados;
		}

		function getCaixa() {

			obj.DADOS_CAIXA = {};

			obj.DADOS_CAIXA.HABILITA_LOADER = true;

			obj.CAIXA_ABERTO = false;

			obj.PRODUTOS = [];

			gScope.EmissorCFeComunicacaoSefaz.getCaixa().then(function (dados) {

				obj.DADOS_CAIXA.CAIXA_ID = dados.CAIXA_ID;

				obj.getDetalhesCaixa();

			}, function (dados) {
				obj.DADOS_CAIXA.HABILITA_LOADER = false;
				showErro("Não foi possível acessar configurações do caixa. <br> MFE não conectado", true);

			});

		}

		function getDetalhesCaixa() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.CAIXA_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_get_detalhes_caixa, dados).then(function (response) {

					if (response.DETALHES_CAIXA.length > 0) {

						obj.DADOS_CAIXA = response.DETALHES_CAIXA[0];

						var descStatus = obj.fnDescStatus(response);
						obj.DADOS_CAIXA.DESC_STATUS_CAIXA = descStatus;

						obj.PRODUTOS = obj.formatProdutos(response.PRODUTOS);

						localStorage.setItem('PRODUTOS', JSON.stringify(obj.PRODUTOS));

					} else {

						obj.DADOS_CAIXA.DESCRICAO = 'Caixa ' + obj.DADOS_CAIXA.CAIXA_ID;
						obj.DADOS_CAIXA.STATUS = 0;
						obj.DADOS_CAIXA.DESC_STATUS_CAIXA = 'Esse caixa não está aberto para movimentações';

					}

					$timeout(function () {
						$("#codigoOperador").first().focus();
					}, 200);

					resolve(response);
				}, function (e) {

					obj.DADOS_CAIXA.HABILITA_LOADER = false;
					showErro("Não foi possível acessar configurações do caixa. <br> Falha na busca por movimentação do caixa", true);

					reject(e);
				});
			});

		}

		function formatProdutos(produtos) {

			angular.forEach(produtos, function (item, value) {

				var decimaisUnitario = gScope.calcularQuantidadeDecimais(Number(item.VALOR_UNITARIO));

				item.VALOR_UNITARIO_VISUALIZACAO = "R$ " + number_format(Number(item.VALOR_UNITARIO), decimaisUnitario, ',', '.');

				var decimaisSaldo = gScope.calcularQuantidadeDecimais(Number(item.SALDO));

				item.SALDO_VISUALIZACAO = number_format(Number(item.SALDO), decimaisSaldo, ',', '.');

			});

			return produtos;
		}

		function fnDescStatus(response) {

			var descStatus = '';

			if (obj.DADOS_CAIXA.STATUS == 0) {
				descStatus = 'Esse caixa está com abertura pendente';
			} else if (obj.DADOS_CAIXA.STATUS == 1) {
				descStatus = 'Esse caixa está aberto para movimentações';
			} else if (obj.DADOS_CAIXA.STATUS == 2) {
				descStatus = 'Esse caixa está fechado para movimentações';
			}

			if (response.IBPT.length == 0) {
				descStatus = 'Produtos não possuem tabela IBPTX configurada';

				obj.DADOS_CAIXA.STATUS = 0;

			}

			if (obj.DADOS_CAIXA.ESTABELECIMENTO_ID == null || obj.DADOS_CAIXA.ESTABELECIMENTO_ID == 0) {
				descStatus = 'Não existem estabelecimentos vinculados ao caixa';

				obj.DADOS_CAIXA.STATUS = 0;

			}

			return descStatus;

		}

		function enterOnCodigoOperador(event) {
			if (obj.CODIGO_OPERADOR != '' && obj.CODIGO_OPERADOR != null) {
				if (event.keyCode == 13) {
					obj.abrirSessaoCaixa();
					event.stopImmediatePropagation();
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}

		function abrirSessaoCaixa() {
			var that = this;

			var check = true;

			if (obj.CODIGO_OPERADOR == '' || obj.CODIGO_OPERADOR == null) {
				check = false;
				showErro("Código do Operador Inválido");
			}

			if (check == true) {
				var dados = {
					DADOS: {
						CODIGO_OPERADOR: obj.CODIGO_OPERADOR,
						PDV_ID: obj.DADOS_CAIXA.PDV_ID } };



				return $q(function (resolve, reject) {

					$ajax.post(that.url_validar_operador, dados).then(function (response) {

						if (response.length > 0) {
							obj.DADOS_CAIXA.OPERADOR = trim_null(response[0].OPERADOR);
							obj.DADOS_CAIXA.OPERADOR_ID = response[0].ID;
							obj.DADOS_CAIXA.TIPO_OPERADOR = trim_null(response[0].TIPO_OPERADOR);

							obj.abrirCaixa();

							obj.CODIGO_OPERADOR = '';

						} else {
							showErro("Operador não cadastrado para esse PDV");
						}

						resolve(response);
					}, function (e) {
						reject(e);
					});
				});
			}
		}

		function abrirCaixa() {
			obj.CAIXA_ABERTO = true;

			obj.incluir();

			localStorage.setItem('CAIXA_ABERTO', 1);

			localStorage.setItem('DADOS_CAIXA', JSON.stringify(obj.DADOS_CAIXA));

			$timeout(function () {
				$("#pesquisaProduto").first().focus();
			});

			$timeout(function () {
				// gScope.ConsultaClienteInicial.compile();

				gScope.ConsultaClienteInicial.option.filtro_sql = {
					PDV_ID: obj.DADOS_CAIXA.PDV_ID };


			}, 200);
		}

		function showProducts() {

			obj.FILTRO_PRODUTO = '';

			obj.compileDatatableProducts();

			$("#modalProdutos").modal('show');

			$timeout(function () {
				obj.onFocusInputModal("#modalProdutos");
			});
		}

		function compileDatatableProducts() {

			if (obj.DATATABLE_PRODUCTS == null) {
				// obj.DATATABLE_PRODUCTS.destroy();
				// $('#dataTableProducts').empty();
				obj.DATATABLE_PRODUCTS = $('#dataTableProducts').DataTable({
					"order": [[1, 'asc']],
					"data": obj.PRODUTOS,
					"tabIndex": 0,
					"columns": [
					{ "data": "EAN", "title": 'EAN' },
					{ "data": "DESC_PRODUTO", "title": 'Produto' },
					{ "data": "VALOR_UNITARIO_VISUALIZACAO", "className": "text-right", "title": 'Valor Unitário' }],

					"language": returnLanguageDatatable(),
					"createdRow": function createdRow(row, data, dataIndex) {
						$(row).attr("tabindex", 0);

						$(row).on('dblclick', function () {
							obj.selectProduto(data);
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

		function selectProduto(product, e) {

			var check = obj.onValidarProduct(product);

			if (check == true) {
				$timeout(function () {
					$rootScope.$apply(function () {
						obj.calculateInsertItem(product);
						$("#modalProdutos").modal('hide');
					});
				});



			}

			if (typeof e != 'undefined') {
				$timeout(function () {
					obj.ENTER_ON_ITEM = true;
				}, 200);
			}
		}

		function atalhosTableItens(item, index, event) {
			var that = this;

			if (obj.ENTER_ON_ITEM == true) {
				if (event.keyCode == 13) {
					event.stopImmediatePropagation();
					event.stopPropagation();

					obj.abrirDetalheItem(item, index);
				} else if (event.keyCode == 46) {
					obj.onValidarDeleteItem(item, index);
				}
			}
		}

		function abrirDetalheItem(product, index) {
			obj.SELECTED_ITEM_CFE = product;
			obj.SELECTED_ITEM_CFE.SEQUENCIA = index;
			var descSequencia = Number(index) + 1;

			obj.SELECTED_ITEM_CFE.DESC_SEQUENCIA = trim_null(descSequencia).padStart(3, '0');

			obj.BKP_SELECTED_ITEM_CFE = angular.copy(obj.SELECTED_ITEM_CFE);

			$("#modalVisualizarItem").modal('show');

			obj.CANCELAR_VENDA = false;

			$timeout(function () {
				obj.onFocusInputModal("#modalVisualizarItem");
			});
		}

		function cancelarVisualizacaoItem() {
			var that = this;

			var selected = angular.toJson(that.SELECTED_ITEM_CFE);
			var backup = angular.toJson(that.BKP_SELECTED_ITEM_CFE);

			if (selected != backup) {

				Object.assign(that.SELECTED_ITEM_CFE, that.BKP_SELECTED_ITEM_CFE);

			}

			obj.setFocusTableItem();

		}

		function gravarVisualizacaoItem() {
			var that = this;

			var check = true;

			obj.ENTER_ON_ITEM = false;

			if (that.SELECTED_ITEM_CFE.VALOR_TOTAL <= 0 && trim_null(that.SELECTED_ITEM_CFE.TIPO_DESCONTO) == '1') {
				check = false;
				showErro("Desconto Aplicado Superior ao Valor Total do Item", true);
			}

			if (that.SELECTED_ITEM_CFE.VARIANCIA_DESCONTO > 100 && trim_null(that.SELECTED_ITEM_CFE.TIPO_DESCONTO) == '2') {
				check = false;
				showErro("% Desconto Aplicado Superior A 100%", true);
			}

			if (check == true) {
				var decimaisDesconto = gScope.calcularQuantidadeDecimais(Number(that.SELECTED_ITEM_CFE.VALOR_DESCONTO));

				that.SELECTED_ITEM_CFE.VL_DESCONTO_VISUALIZACAO = 'R$ ' + number_format(Number(that.SELECTED_ITEM_CFE.VALOR_DESCONTO), decimaisDesconto, ',', '.');

				that.SELECTED_ITEM_CFE.TOTAL_VISUALIZACAO = 'R$ ' + number_format(Number(that.SELECTED_ITEM_CFE.VALOR_LIQUIDO), 2, ',', '.');

				that.BKP_SELECTED_ITEM_CFE = angular.copy(that.SELECTED_ITEM_CFE);

				$("#modalVisualizarItem").modal('hide');

				obj.calculateTotalizadores();

				obj.setFocusTableItem();
			}

			$timeout(function () {
				obj.ENTER_ON_ITEM = true;
			}, 200);
		}

		function changeOpcaoDesconto() {
			var that = this;

			var formatterVariancia = obj.convertStringToNumber(that.SELECTED_ITEM_CFE.VARIANCIA_DESCONTO);

			if (that.SELECTED_ITEM_CFE.TIPO_DESCONTO == '1') {

				that.SELECTED_ITEM_CFE.VALOR_DESCONTO = angular.copy(formatterVariancia);

			} else {
				var valorDesconto = that.SELECTED_ITEM_CFE.VALOR_TOTAL * (formatterVariancia / 100);
				valorDesconto = Number(Number(valorDesconto).toFixed(2));

				that.SELECTED_ITEM_CFE.VALOR_DESCONTO = valorDesconto;

			}

			var decimaisDesconto = gScope.calcularQuantidadeDecimais(that.SELECTED_ITEM_CFE.VALOR_DESCONTO);

			that.SELECTED_ITEM_CFE.VL_DESCONTO_VISUALIZACAO = 'R$ ' + number_format(that.SELECTED_ITEM_CFE.VALOR_DESCONTO, decimaisDesconto, ',', '.');

			obj.calculateValorTotalItemCFe();

		}

		function calculateValorTotalItemCFe() {

			var that = this;

			var auxAcrescimo = numeral(angular.copy(that.SELECTED_ITEM_CFE.VALOR_TOTAL));

			var newTotalWithAcrescimo = auxAcrescimo.add(that.SELECTED_ITEM_CFE.VALOR_ACRESCIMO);

			var newTotalWithAcrescimoAndDesconto = angular.copy(newTotalWithAcrescimo).subtract(that.SELECTED_ITEM_CFE.VALOR_DESCONTO);

			that.SELECTED_ITEM_CFE.VALOR_LIQUIDO = newTotalWithAcrescimoAndDesconto.value();

			var valorContabil = 0;

			if (trim_null(that.SELECTED_ITEM_CFE.OPERACAO_TIPO_DESCONTO) == 'I') {
				valorContabil = angular.copy(newTotalWithAcrescimo).subtract(that.SELECTED_ITEM_CFE.VALOR_DESCONTO).value();
			} else {
				valorContabil = angular.copy(newTotalWithAcrescimo).value();
			}

			that.SELECTED_ITEM_CFE.TOTAL_VISUALIZACAO = 'R$ ' + number_format(that.SELECTED_ITEM_CFE.VALOR_LIQUIDO, 2, ',', '.');

			that.SELECTED_ITEM_CFE.VALOR_CONTABIL = valorContabil;

			that.SELECTED_ITEM_CFE.VALOR_OUTRAS_ICMS = Number(that.SELECTED_ITEM_CFE.VALOR_CONTABIL) - Number(that.SELECTED_ITEM_CFE.BASECALCULO_ICMS);
			that.SELECTED_ITEM_CFE.VALOR_OUTRAS_ICMS = Number(Number(that.SELECTED_ITEM_CFE.VALOR_OUTRAS_ICMS).toFixed(2));
		}

		function onValidarDeleteItem(item, index) {
			obj.INDEX_TO_DELETE = index;

			if (trim_null(obj.DADOS_CAIXA.TIPO_OPERADOR) == '1') {
				$("#modalConfirmExclusaoItem").modal('show');

			} else {

				if (obj.DADOS_CAIXA.REQUIRED_PASS == 1) {
					$("#modalExclusaoItem").modal('show');

					$timeout(function () {
						obj.onFocusInputModal("#modalExclusaoItem");
					}, 200);

				} else {
					$("#modalConfirmExclusaoItem").modal('show');
				}
			}

		}

		function cancelarExclusaoItem() {
			obj.INDEX_TO_DELETE = -1;
			obj.CODIGO_OPERADOR_EXCLUSAO = '';

			$("#modalExclusaoItem").modal('hide');

			obj.setFocusTableItem();
		}

		function deleteItemNoOperador(item, index) {

			var that = this;

			var dados = {
				DADOS: {
					CODIGO_OPERADOR: obj.CODIGO_OPERADOR_EXCLUSAO,
					PDV_ID: obj.DADOS_CAIXA.PDV_ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_validar_gerente, dados).then(function (response) {

					if (response.length > 0) {

						obj.CODIGO_OPERADOR_EXCLUSAO = '';

						obj.deleteItem(1);

						$("#modalExclusaoItem").modal('hide');

						obj.setFocusTableItem();

					} else {
						showErro("Gerente não Cadastrado Para Esse PDV", true);
					}

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function deleteItem(e) {
			var that = this;

			that.SELECTED.ITENS.splice(obj.INDEX_TO_DELETE, 1);

			obj.SELECTED_ITEM_CFE = {};
			obj.BKP_SELECTED_ITEM_CFE = {};

			obj.calculateTotalizadores();

			obj.INDEX_TO_DELETE = -1;

			if (typeof e == 'undefined') {
				$("#modalConfirmExclusaoItem").modal('hide');
			}

		}

		function fecharModalExcluirItem() {
			$("#modalConfirmExclusaoItem").modal('hide');

			obj.setFocusTableItem();
		}


		function onCancelarVenda() {
			var that = this;

			$("#modalCancelarVenda").modal('show');

		}

		function cancelarVenda() {
			var that = this;

			obj.incluir();

			obj.FORMAS_PAGAMENTO_ESCOLHIDAS = [];

			$timeout(function () {
				$("#pesquisaProduto").first().focus();
			});

			$("#modalCancelarVenda").modal('hide');

			if ($('#modalFinalizarVenda').hasClass('show')) {
				$("#modalFinalizarVenda").modal('hide');
			}

			obj.TIPO_CLIENTE = '-1';

			obj.CLIENTE_PEDIDO = 0;

			obj.REPRESENTANTE_JSON = {};

			obj.VENDEDOR_JSON = {};

			obj.SELECTED_ITEM_CFE = {};

			obj.BKP_SELECTED_ITEM_CFE = {};

			gScope.ConsultaCliente.option.filtro_sql = {};


			localStorage.removeItem('OBJ_SELECTED');

			$timeout(function () {
				$("#pesquisaProduto").filter(":not([readonly]):visible:enabled:first").focus();
			});

		}

		function importarPedido() {
			var that = this;

			that.HABILITA_PEDIDO = true;

			$("#modalImportacaoPedido").modal('show');

			$timeout(function () {
				$("#numeroPedidoImportacao").first().focus();

				$timeout(function () {
					$("#numeroPedidoImportacao").first().select();

				});

			});
		}

		function importarConferencia() {
			var that = this;

			that.HABILITA_CONFERENCIA = true;

			$("#modalImportacaoConferencia").modal('show');


			$timeout(function () {
				$("#numeroConferenciaImportacao").first().focus();

				$timeout(function () {
					$("#numeroConferenciaImportacao").first().select();

				});
			});
		}

		function cancelarImportacaoPedido() {
			obj.PEDIDO_IMPORTACAO = 0;
			$("#modalImportacaoPedido").modal('hide');

			$timeout(function () {
				$("#pesquisaProduto").filter(":not([readonly]):visible:enabled:first").focus();
			});

		}

		function cancelarImportacaoConferencia() {
			obj.CONFERENCIA_IMPORTACAO = 0;
			$("#modalImportacaoConferencia").modal('hide');

			$timeout(function () {
				$("#pesquisaProduto").filter(":not([readonly]):visible:enabled:first").focus();
			});
		}

		function gravarImportacaoPedido() {
			var that = this;
			var check = true;

			if (obj.PEDIDO_IMPORTACAO <= 0 || obj.PEDIDO_IMPORTACAO == '') {
				check = false;
				showErro("Pedido inválido");
			}

			if (check == true) {

				that.HABILITA_PEDIDO = false;

				obj.RESPONSE_PEDIDO = [];

				var dados = {
					DADOS: {
						PEDIDO: obj.PEDIDO_IMPORTACAO,
						ESTABELECIMENTO_ID: obj.DADOS_CAIXA.ESTABELECIMENTO_ID,
						TABELA_PRECO_ID: obj.DADOS_CAIXA.TABELA_PRECO_ID } };



				return $q(function (resolve, reject) {

					$ajax.post(that.url_get_pedido, dados).then(function (response) {

						if (response.length > 0) {
							obj.RESPONSE_PEDIDO = response;

							if (gScope.ConsultaClienteInicial.item.selected == false) {
								obj.validatePedidoAndCliente();
							} else {
								obj.checkClienteAndPedido();
							}

							$("#modalImportacaoPedido").modal('hide');

						} else {
							that.HABILITA_PEDIDO = true;

							showAlert("Pedido não encontrado", true);

							$timeout(function () {
								$timeout(function () {
									$("#numeroPedidoImportacao").first().focus();

									$timeout(function () {
										$("#numeroPedidoImportacao").first().select();

									});
								});
							});
						}

						resolve(response);
					}, function (e) {

						that.HABILITA_PEDIDO = true;

						$timeout(function () {
							$timeout(function () {
								$("#numeroPedidoImportacao").first().focus();

								$timeout(function () {
									$("#numeroPedidoImportacao").first().select();

								});
							});
						});

						reject(e);
					});
				});
			}

		}

		function validatePedidoAndCliente() {
			var boolean = false;

			angular.forEach(obj.RESPONSE_PEDIDO, function (item, value) {

				var booleanItem = obj.onValidarProduct(item);

				if (booleanItem == true) {
					if (Number(item.QUANTIDADE) != 0) {
						boolean = true;
						obj.calculateInsertItem(item, false);
					}
				}
			});

			if (boolean == true) {
				obj.cancelarImportacaoPedido();
				obj.calculateTotalizadores();

			} else {
				showErro("Saldo alocado não disponível para esse pedido", true);
			}

			obj.RESPONSE_PEDIDO = [];
			obj.DESC_MODAL = '';
			obj.DESC_CLIENTE_INICIAL = '';
			obj.DESC_CLIENTE_AUX = '';
		}

		function checkClienteAndPedido() {
			var clientePedido = Number(obj.RESPONSE_PEDIDO[0].CLIENTE_CODIGO);

			var clienteInicial = Number(gScope.ConsultaClienteInicial.item.dados.CODIGO);


			if (clientePedido != clienteInicial) {
				obj.DESC_CLIENTE_INICIAL = trim_null(gScope.ConsultaClienteInicial.item.dados.ID) + ' - ' + trim_null(gScope.ConsultaClienteInicial.item.dados.RAZAOSOCIAL);
				var jsonClientePedido = JSON.parse(obj.RESPONSE_PEDIDO[0].CLIENTE_JSON);

				obj.DESC_CLIENTE_AUX = trim_null(jsonClientePedido.ID) + ' - ' + trim_null(jsonClientePedido.RAZAOSOCIAL);

				obj.DESC_MODAL = 'ao pedido ' + obj.RESPONSE_PEDIDO[0].PEDIDO;

				$("#modalValidacaoPedidoCliente").modal('show');
			} else {
				obj.validatePedidoAndCliente(response);
			}

		}

		function confirmTrocaClienteByPedido() {
			var jsonClientePedido = JSON.parse(obj.RESPONSE_PEDIDO[0].CLIENTE_JSON);
			gScope.ConsultaClienteInicial.setSelected(jsonClientePedido);
			obj.validatePedidoAndCliente();
			$("#modalValidacaoPedidoCliente").modal('hide');
		}

		function gravarImportacaoConferencia() {
			var that = this;
			var check = true;

			if (obj.CONFERENCIA_IMPORTACAO <= 0 || obj.CONFERENCIA_IMPORTACAO == '') {
				check = false;
				showErro("Conferência inválida");
			}

			if (check == true) {

				that.HABILITA_CONFERENCIA = false;

				var dados = {
					DADOS: {
						CONFERENCIA: obj.CONFERENCIA_IMPORTACAO,
						TABELA_PRECO_ID: obj.DADOS_CAIXA.TABELA_PRECO_ID,
						PDV_ID: obj.DADOS_CAIXA.PDV_ID } };



				return $q(function (resolve, reject) {

					$ajax.post(that.url_get_conferencia, dados).then(function (response) {

						if (response.length > 0) {

							obj.RESPONSE_CONFERENCIA = response;

							if (gScope.ConsultaClienteInicial.item.selected == false) {
								obj.validateConferenciaAndCliente();
							} else {
								obj.checkClienteAndConferencia();
							}

							$("#modalImportacaoConferencia").modal('hide');

						} else {
							that.HABILITA_CONFERENCIA = true;

							showAlert("Conferência não encontrada", true);


							$timeout(function () {
								$timeout(function () {
									$("#numeroConferenciaImportacao").first().focus();

									$timeout(function () {
										$("#numeroConferenciaImportacao").first().select();

									});
								});
							});
						}


						resolve(response);
					}, function (e) {
						that.HABILITA_CONFERENCIA = true;

						$timeout(function () {
							$timeout(function () {
								$("#numeroConferenciaImportacao").first().focus();

								$timeout(function () {
									$("#numeroConferenciaImportacao").first().select();

								});
							});
						});

						reject(e);
					});
				});
			}

		}

		function validateConferenciaAndCliente() {
			var boolean = false;

			angular.forEach(obj.RESPONSE_CONFERENCIA, function (item, value) {

				if (Number(item.QUANTIDADE) != 0) {
					boolean = true;
					obj.calculateInsertItem(item, false);
				}

			});

			if (boolean == true) {
				obj.cancelarImportacaoConferencia();
				obj.calculateTotalizadores();
			}

			obj.RESPONSE_CONFERENCIA = [];

			obj.DESC_MODAL = '';
			obj.DESC_CLIENTE_INICIAL = '';
			obj.DESC_CLIENTE_AUX = '';
		}

		function checkClienteAndConferencia() {
			var clienteConferencia = Number(obj.RESPONSE_CONFERENCIA[0].CLIENTE_ID);

			var clienteInicial = Number(gScope.ConsultaClienteInicial.item.dados.CODIGO);

			if (clienteConferencia != clienteInicial) {
				obj.DESC_CLIENTE_INICIAL = trim_null(gScope.ConsultaClienteInicial.item.dados.ID) + ' - ' + trim_null(gScope.ConsultaClienteInicial.item.dados.RAZAOSOCIAL);
				var jsonClienteConferencia = JSON.parse(obj.RESPONSE_CONFERENCIA[0].CLIENTE_JSON);

				obj.DESC_CLIENTE_AUX = trim_null(jsonClienteConferencia.ID) + ' - ' + trim_null(jsonClientePedido.RAZAOSOCIAL);

				obj.DESC_MODAL = 'a conferência ' + obj.RESPONSE_CONFERENCIA[0].CONFERENCIA;

				$("#modalValidacaoConferenciaCliente").modal('show');
			} else {
				obj.validateConferenciaAndCliente(response);
			}

		}

		function confirmTrocaClienteByConferencia() {
			var jsonClienteConferencia = JSON.parse(obj.RESPONSE_CONFERENCIA[0].CLIENTE_JSON);
			gScope.ConsultaClienteInicial.setSelected(jsonClienteConferencia);
			obj.validateConferenciaAndCliente();
			$("#modalValidacaoConferenciaCliente").modal('hide');
		}

		function onDescontoItens() {
			$("#modalDescontoTodosItens").modal('show');

			$timeout(function () {
				obj.onFocusInputModal("#modalDescontoTodosItens");
			});
		}

		function gravarDescontoAllItens() {
			var that = this;

			var check = true;


			var formatterVariancia = obj.convertStringToNumber(that.VARIANCIA_DESCONTO_ALL);

			if (formatterVariancia > 100 && trim_null(that.TIPO_DESCONTO_ALL) == '2') {
				check = false;
				showErro("% Desconto Aplicado Superior A 100%", true);
			}

			if (check == true) {

				angular.forEach(that.SELECTED.ITENS, function (item, value) {

					that.SELECTED_ITEM_CFE = item;
					that.SELECTED_ITEM_CFE.TIPO_DESCONTO = angular.copy(that.TIPO_DESCONTO_ALL);
					that.SELECTED_ITEM_CFE.VARIANCIA_DESCONTO = angular.copy(formatterVariancia);

					if (that.SELECTED_ITEM_CFE.VALOR_TOTAL < that.SELECTED_ITEM_CFE.VARIANCIA_DESCONTO && trim_null(that.TIPO_DESCONTO_ALL) == '1') {

					} else {

						if (trim_null(that.TIPO_DESCONTO_ALL) == '2') {
							var valorDesconto = angular.copy(that.SELECTED_ITEM_CFE.VALOR_TOTAL) * (formatterVariancia / 100);
							valorDesconto = Number(Number(valorDesconto).toFixed(2));

							if (that.SELECTED_ITEM_CFE.VALOR_TOTAL >= valorDesconto) {
								obj.changeOpcaoDesconto();

								Object.assign(item, that.SELECTED_ITEM_CFE);
							}

						} else {
							obj.changeOpcaoDesconto();

							Object.assign(item, that.SELECTED_ITEM_CFE);
						}

					}

				});

				$("#modalDescontoTodosItens").modal('hide');

				obj.calculateTotalizadores();

			}
		}

		function cancelarDescontoAllItens() {
			var that = this;

			that.VARIANCIA_DESCONTO_ALL = 0;
			that.TIPO_DESCONTO_ALL = '2';
			$("#modalDescontoTodosItens").modal('hide');

		}

		function onFocusInputModal(modal) {
			$(modal).find('input,select,textarea,div[contenteditable=true]').not('.not_tab_enter').filter(":not([readonly]):visible:enabled:first").focus();
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

		function plusQtd() {

			if (obj.CAIXA_ABERTO == true && typeof obj.DADOS_CAIXA.BLOQUEIAR_QTD != 'undefined' && obj.DADOS_CAIXA.BLOQUEIAR_QTD == 0) {
				$timeout(function () {
					$rootScope.$apply(function () {
						obj.QUANTIDADE = obj.convertStringToNumber(obj.QUANTIDADE);

						obj.QUANTIDADE = Number(obj.QUANTIDADE) + 1;
					});
				});
			}

		}

		function minusQtd() {
			if (obj.CAIXA_ABERTO == true && typeof obj.DADOS_CAIXA.BLOQUEIAR_QTD != 'undefined' && obj.DADOS_CAIXA.BLOQUEIAR_QTD == 0) {
				$timeout(function () {
					$rootScope.$apply(function () {

						obj.QUANTIDADE = obj.convertStringToNumber(obj.QUANTIDADE);

						var auxQtd = obj.QUANTIDADE - 1;
						if (auxQtd == 0) {
							obj.QUANTIDADE = 1;
						} else {
							obj.QUANTIDADE = auxQtd;
						}
					});
				});
			}

		}

		function enterOnCodigoEAN(event) {
			if (obj.CODIGO_EAN != '' && obj.CODIGO_EAN != null) {
				if (event.keyCode == 13) {
					event.stopImmediatePropagation();
					event.stopPropagation();
					event.preventDefault();
					obj.getProdutoByEAN();
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

		function getProdutoByEAN() {

			var product = {};
			var indice = -1;
			for (var index = 0; index < obj.PRODUTOS.length; index++) {
				var element = obj.PRODUTOS[index];

				if (trim_null(element.EAN) == obj.CODIGO_EAN) {
					product = element;
					indice = index;
					break;
				}

			}

			if (indice >= 0) {
				var check = obj.onValidarProduct(product);

				obj.ENTER_ON_ITEM = false;

				if (check == true) {
					$timeout(function () {
						$rootScope.$apply(function () {
							obj.calculateInsertItem(product);
						});
					});

					$timeout(function () {
						obj.CODIGO_EAN = '';

						$("#pesquisaProduto").first().focus();

						obj.ENTER_ON_ITEM = true;

					}, 200);
				}

			} else {
				showErro("Código de barras não encontrado", true);
			}

		}


		function calculateInsertItem(item, calcTotalizadores) {
			var that = this;

			var copy = angular.copy(item);

			var json = {};

			if (typeof copy.PEDIDO != 'undefined') {
				json.PEDIDO = copy.PEDIDO;
				json.PEDIDO_ITEM_ID = copy.PEDIDO_ITEM_ID;

				obj.CLIENTE_PEDIDO = copy.CLIENTE_CODIGO;

				if (copy.REPRESENTANTE_JSON != '' && copy.REPRESENTANTE_JSON != null) {
					var jsonRepresentante = JSON.parse(copy.REPRESENTANTE_JSON);

					if (typeof jsonRepresentante.ID != 'undefined' && jsonRepresentante.ID != '' && jsonRepresentante.ID != null) {
						obj.REPRESENTANTE_JSON = jsonRepresentante;
					}
				}

				if (copy.VENDEDOR_JSON != '' && copy.VENDEDOR_JSON != null) {
					var jsonVendedor = JSON.parse(copy.VENDEDOR_JSON);

					if (typeof jsonVendedor.ID != 'undefined' && jsonVendedor.ID != '' && jsonVendedor.ID != null) {
						obj.VENDEDOR_JSON = jsonVendedor;
					}
				}

			} else if (typeof copy.CONFERENCIA != 'undefined') {
				json.CONFERENCIA = copy.CONFERENCIA;
				json.CONFERENCIA_ITEM_ID = copy.CONFERENCIA_ITEM_ID;

				obj.CLIENTE_PEDIDO = copy.CLIENTE_ID;
			}

			json.OPERACAO_TIPO_DESCONTO = trim_null(copy.TIPO_DESCONTO);
			json.TIPO_DESCONTO = '2';
			json.VARIANCIA_DESCONTO = 0;
			json.CFOP_CODIGO = copy.CFOP_CODIGO;
			json.OPERACAO_CODIGO = copy.OPERACAO_CODIGO;
			json.PRODUTO_ID = copy.PRODUTO_ID;
			json.PRODUTO_DESCRICAO = copy.PRODUTO_DESCRICAO;
			json.UM = copy.UM;
			var descProduto = '';

			if (typeof copy.PEDIDO != 'undefined' || typeof copy.CONFERENCIA != 'undefined') {
				descProduto = copy.DESC_PROD_ID + ' - ' + copy.PRODUTO_DESCRICAO;

			} else {
				descProduto = trim_null(copy.DESC_PRODUTO);
			}
			json.DESC_PROD_ID = trim_null(json.PRODUTO_ID).padStart(7, '0');
			json.DESC_MODELO = trim_null(copy.MODELO_ID).padStart(6, '0');
			json.DESC_COR = trim_null(copy.COR_DESCRICAO);
			json.DESC_PRODUTO = descProduto;
			json.LOCALIZACAO_ID = copy.LOCALIZACAO_ID;
			json.NCM_CODIGO = copy.NCM;
			json.TAMANHO = copy.TAMANHO;
			json.EAN = copy.EAN;

			json.REDUCAO_BASE_PISCOF = trim_null(copy.REDUCAO_BASE_PISCOF);

			var quantidade = 0;

			if (typeof copy.PEDIDO != 'undefined' || typeof copy.CONFERENCIA != 'undefined') {
				quantidade = Number(copy.QUANTIDADE);
			} else {
				quantidade = Number(angular.copy(obj.QUANTIDADE));
			}

			json.QUANTIDADE = quantidade;

			var decimaisQuantidade = gScope.calcularQuantidadeDecimais(json.QUANTIDADE);

			json.QUANTIDADE_VISUALIZACAO = number_format(json.QUANTIDADE, decimaisQuantidade, ',', '.') + ' ' + json.UM;

			var vlUnitario = 0;

			if (typeof copy.VALOR_UNITARIO_PROMOCIONAL != 'undefined') {
				copy.VALOR_UNITARIO_PROMOCIONAL = Number(copy.VALOR_UNITARIO_PROMOCIONAL);
				copy.QUANTIDADE_MINIMA = Number(copy.QUANTIDADE_MINIMA);

				if (copy.QUANTIDADE_MINIMA > 0) {
					if (json.QUANTIDADE >= copy.QUANTIDADE) {
						vlUnitario = Number(copy.VALOR_UNITARIO_PROMOCIONAL);
					} else {
						vlUnitario = Number(copy.VALOR_UNITARIO);
					}
				} else {
					vlUnitario = Number(copy.VALOR_UNITARIO);
				}
			} else {
				vlUnitario = Number(copy.VALOR_UNITARIO);
			}

			json.VALOR_UNITARIO = vlUnitario;

			var decimaisVlUnitario = gScope.calcularQuantidadeDecimais(json.QUANTIDADE);

			json.VALOR_UNITARIO_VISUALIZACAO = number_format(json.VALOR_UNITARIO, decimaisVlUnitario, ',', '.') + ' ' + json.UM;

			json.VALOR_DESCONTO = 0;


			json.VALOR_DESCONTO_RATEIO = 0;
			json.VALOR_ACRESCIMO = 0;

			if (typeof copy.VALOR_ACRESCIMO != 'undefined' && copy.VALOR_ACRESCIMO > 0) {
				json.VALOR_ACRESCIMO = Number(copy.VALOR_ACRESCIMO);
			}

			json.VALOR_ACRESCIMO_RATEIO = 0;

			json.VALOR_TOTAL = json.QUANTIDADE * json.VALOR_UNITARIO;
			json.VALOR_TOTAL = Number(Number(json.VALOR_TOTAL).toFixed(2));


			if (gScope.ConsultaClienteInicial.item.selected == true && Number(gScope.ConsultaClienteInicial.item.dados.PERCENTUAL_DESCONTO) > 0) {
				var percentualDesconto = Number(gScope.ConsultaClienteInicial.item.dados.PERCENTUAL_DESCONTO);

				var valorDesconto = json.VALOR_TOTAL * (percentualDesconto / 100);
				valorDesconto = Number(Number(valorDesconto).toFixed(2));
				json.VALOR_DESCONTO = valorDesconto;
			}

			if (typeof copy.VALOR_DESCONTO != 'undefined' && copy.VALOR_DESCONTO > 0) {
				json.VALOR_DESCONTO = Number(copy.VALOR_DESCONTO);
			}

			var decimaisDesconto = gScope.calcularQuantidadeDecimais(json.VALOR_DESCONTO);

			json.VL_DESCONTO_VISUALIZACAO = 'R$ ' + number_format(json.VALOR_DESCONTO, decimaisDesconto, ',', '.');

			var auxAcrescimo = numeral(angular.copy(json.VALOR_TOTAL));

			var newTotalWithAcrescimo = auxAcrescimo.add(json.VALOR_ACRESCIMO);

			var newTotalWithAcrescimoAndDesconto = angular.copy(newTotalWithAcrescimo).subtract(json.VALOR_DESCONTO).value();

			var valorContabil = 0;

			if (trim_null(json.OPERACAO_TIPO_DESCONTO) == 'I') {
				valorContabil = angular.copy(newTotalWithAcrescimo).subtract(json.VALOR_DESCONTO).value();
			} else {
				valorContabil = angular.copy(newTotalWithAcrescimo).value();
			}

			json.VALOR_LIQUIDO = newTotalWithAcrescimoAndDesconto;

			json.VALOR_CONTABIL = valorContabil;

			json.TOTAL_VISUALIZACAO = 'R$ ' + number_format(json.VALOR_LIQUIDO, 2, ',', '.');

			json.TRIBUTACAO_ORIGEM = trim_null(copy.TRIBUTACAO_ORIGEM);

			// TRIBUTAÇÃO ICMS
			json.TRIBUTACAO_ICMS = trim_null(copy.TRIBUTACAO_ICMS);
			json.PERCENTUAL_BASECALCULO_ICMS = copy.PERCENTUAL_BASECALCULO_ICMS;
			json.ALIQUOTA_ICMS = Number(copy.ICMS_ALIQUOTA);
			// Calcular Base de Cálculo do ICMS
			json.BASECALCULO_ICMS = 0;
			json.VALOR_ICMS = 0;

			json = obj.calcularCSTIcms(json);

			// TRIBUTAÇÃO PIS
			json.TRIBUTACAO_PIS = trim_null(copy.TRIBUTACAO_PIS);
			json.ALIQUOTA_PIS = Number(copy.PIS_ALIQUOTA);
			// Calcular Base de Cálculo do PIS
			json.BASECALCULO_PIS = 0;
			json.VALOR_PIS = 0;

			json = obj.calcularCSTPis(json);

			// TRIBUTAÇÃO COFINS
			json.TRIBUTACAO_COFINS = trim_null(copy.TRIBUTACAO_COFINS);
			json.ALIQUOTA_COFINS = Number(copy.COFINS_ALIQUOTA);
			// Calcular Base de Cálculo do COFINS
			json.BASECALCULO_COFINS = 0;
			json.VALOR_COFINS = 0;

			json = obj.calcularCSTCofins(json);

			json.INFORMACOES_COMPLEMENTARES = '';

			json.VALOR_OUTRAS_ICMS = Number(json.VALOR_CONTABIL) - Number(json.BASECALCULO_ICMS);
			json.VALOR_OUTRAS_ICMS = Number(Number(json.VALOR_OUTRAS_ICMS).toFixed(2));

			obj.verifyInserido(json);

			if (typeof calcTotalizadores == 'undefined') {
				obj.calculateTotalizadores();
			}

			obj.QUANTIDADE = 1;

		}

		function calcularCSTIcms(item) {

			var valorDesconto = 0;

			if (trim_null(item.OPERACAO_TIPO_DESCONTO) == 'I') {
				valorDesconto = Number(item.VALOR_DESCONTO);
			}

			if (item.TRIBUTACAO_ICMS == '0' || item.TRIBUTACAO_ICMS == '00' || item.TRIBUTACAO_ICMS == '10' || item.TRIBUTACAO_ICMS == '101' || item.TRIBUTACAO_ICMS == '201') {
				item.BASECALCULO_ICMS = Number(Number(item.VALOR_TOTAL + Number(item.VALOR_ACRESCIMO) - Number(valorDesconto))) * (item.PERCENTUAL_BASECALCULO_ICMS / 100);
				item.BASECALCULO_ICMS = Number(Number(item.BASECALCULO_ICMS).toFixed(2));

			} else if (item.TRIBUTACAO_ICMS == '90' || item.TRIBUTACAO_ICMS == '900') {
				item.BASECALCULO_ICMS = Number(Number(item.BASECALCULO_ICMS).toFixed(2));

			} else if (item.TRIBUTACAO_ICMS == '20' || item.TRIBUTACAO_ICMS == '70') {
				item.BASECALCULO_ICMS = Number(Number(item.VALOR_TOTAL + Number(item.VALOR_ACRESCIMO) - Number(valorDesconto))) * (item.PERCENTUAL_BASECALCULO_ICMS / 100);
				item.BASECALCULO_ICMS = Number(Number(item.BASECALCULO_ICMS).toFixed(2));

			} else {
				item.ALIQUOTA_ICMS = 0;
			}

			item.VALOR_ICMS = Number(item.BASECALCULO_ICMS) * (Number(item.ALIQUOTA_ICMS) / 100);
			item.VALOR_ICMS = Number(Number(item.VALOR_ICMS).toFixed(2));

			return item;

		}

		function calcularCSTPis(item) {

			var valorDesconto = 0;

			if (trim_null(item.OPERACAO_TIPO_DESCONTO) == 'I') {
				valorDesconto = Number(item.VALOR_DESCONTO);
			}

			var vReducaoBasePisCof = obj.reducaoBasePisCof(item);

			if (item.TRIBUTACAO_PIS == '01' ||
			item.TRIBUTACAO_PIS == '02' ||
			item.TRIBUTACAO_PIS == '50' ||
			item.TRIBUTACAO_PIS == '51' ||
			item.TRIBUTACAO_PIS == '52' ||
			item.TRIBUTACAO_PIS == '53' ||
			item.TRIBUTACAO_PIS == '54' ||
			item.TRIBUTACAO_PIS == '55' ||
			item.TRIBUTACAO_PIS == '56' ||
			item.TRIBUTACAO_PIS == '60' ||
			item.TRIBUTACAO_PIS == '61' ||
			item.TRIBUTACAO_PIS == '62' ||
			item.TRIBUTACAO_PIS == '63' ||
			item.TRIBUTACAO_PIS == '64' ||
			item.TRIBUTACAO_PIS == '65' ||
			item.TRIBUTACAO_PIS == '66') {

				item.BASECALCULO_PIS = Number(Number(Number(item.VALOR_TOTAL) +
				Number(item.VALOR_ACRESCIMO) - Number(vReducaoBasePisCof) - Number(valorDesconto)));
				item.BASECALCULO_PIS = Number(Number(item.BASECALCULO_PIS).toFixed(2));

			} else if (item.TRIBUTACAO_PIS == '04' ||
			item.TRIBUTACAO_PIS == '06' ||
			item.TRIBUTACAO_PIS == '07' ||
			item.TRIBUTACAO_PIS == '08' ||
			item.TRIBUTACAO_PIS == '09' ||
			item.TRIBUTACAO_PIS == '70' ||
			item.TRIBUTACAO_PIS == '71' ||
			item.TRIBUTACAO_PIS == '72' ||
			item.TRIBUTACAO_PIS == '73' ||
			item.TRIBUTACAO_PIS == '74') {

				item.BASECALCULO_PIS = 0;
				item.PERCENTUAL_PIS = 0;
			} else if (item.TRIBUTACAO_PIS == '98' || item.TRIBUTACAO_PIS == '99') {
				item.BASECALCULO_PIS = Number(Number(obj.SELECTED.BASECALCULO_PIS).toFixed(2));
			}

			item.VALOR_PIS = Number(item.BASECALCULO_PIS) * (Number(item.ALIQUOTA_PIS) / 100);
			item.VALOR_PIS = Number(Number(item.VALOR_PIS).toFixed(2));

			return item;
		}

		function calcularCSTCofins(item) {

			var valorDesconto = 0;

			if (trim_null(item.OPERACAO_TIPO_DESCONTO) == 'I') {
				valorDesconto = Number(item.VALOR_DESCONTO);
			}

			var vReducaoBasePisCof = obj.reducaoBasePisCof(item);


			if (item.TRIBUTACAO_COFINS == '01' ||
			item.TRIBUTACAO_COFINS == '02' ||
			item.TRIBUTACAO_COFINS == '50' ||
			item.TRIBUTACAO_COFINS == '51' ||
			item.TRIBUTACAO_COFINS == '52' ||
			item.TRIBUTACAO_COFINS == '53' ||
			item.TRIBUTACAO_COFINS == '54' ||
			item.TRIBUTACAO_COFINS == '55' ||
			item.TRIBUTACAO_COFINS == '56' ||
			item.TRIBUTACAO_COFINS == '60' ||
			item.TRIBUTACAO_COFINS == '61' ||
			item.TRIBUTACAO_COFINS == '62' ||
			item.TRIBUTACAO_COFINS == '63' ||
			item.TRIBUTACAO_COFINS == '64' ||
			item.TRIBUTACAO_COFINS == '65' ||
			item.TRIBUTACAO_COFINS == '66') {
				item.BASECALCULO_COFINS = Number(Number(Number(item.VALOR_TOTAL) +
				Number(item.VALOR_ACRESCIMO) - Number(vReducaoBasePisCof) - Number(valorDesconto)));
				item.BASECALCULO_COFINS = Number(Number(item.BASECALCULO_COFINS).toFixed(2));

			} else if (item.TRIBUTACAO_COFINS == '04' ||
			item.TRIBUTACAO_COFINS == '06' ||
			item.TRIBUTACAO_COFINS == '07' ||
			item.TRIBUTACAO_COFINS == '08' ||
			item.TRIBUTACAO_COFINS == '09' ||
			item.TRIBUTACAO_COFINS == '70' ||
			item.TRIBUTACAO_COFINS == '71' ||
			item.TRIBUTACAO_COFINS == '72' ||
			item.TRIBUTACAO_COFINS == '73' ||
			item.TRIBUTACAO_COFINS == '74') {
				item.BASECALCULO_COFINS = 0;
				item.PERCENTUAL_COFINS = 0;
			} else if (item.TRIBUTACAO_COFINS == '98' || item.TRIBUTACAO_COFINS == '99') {
				item.BASECALCULO_COFINS = Number(Number(obj.SELECTED.BASECALCULO_COFINS).toFixed(2));
			}

			item.VALOR_COFINS = Number(item.BASECALCULO_COFINS) * (Number(item.ALIQUOTA_COFINS) / 100);
			item.VALOR_COFINS = Number(Number(item.VALOR_COFINS).toFixed(2));

			return item;
		}

		function reducaoBasePisCof(json) {
			var vReducaoBasePisCof = 0;

			if (obj.DATA_REDUCAO_PIS_COF != '' && obj.DATA_REDUCAO_PIS_COF != null) {
				// var dataHoraServidor = $("#_hora-servidor").val();
				var dataHoraServidor = new Date();

				var dataAtual = moment(dataHoraServidor).toDate();

				var dataAuxReducao = '';
				if (trim_null(obj.DATA_REDUCAO_PIS_COF).indexOf('/') > -1) {
					var parts = trim_null(obj.DATA_REDUCAO_PIS_COF).split('/');

					dataAuxReducao = parts[2] + '-' + parts[1] + '-' + parts[0];

				} else {
					var parts2 = trim_null(obj.DATA_REDUCAO_PIS_COF).split('-');

					dataAuxReducao = parts2[2] + '-' + parts2[1] + '-' + parts2[0];
				}

				var auxDate = moment(dataAuxReducao).format("YYYY-MM-DD");

				var dateReducao = moment(auxDate).toDate();

				if (moment(dataAtual).isAfter(dateReducao, 'day')) {
					if (trim_null(json.REDUCAO_BASE_PISCOF) == '1') {
						vReducaoBasePisCof = json.VALOR_ICMS;
					}
				}
			}

			return vReducaoBasePisCof;
		}

		function verifyInserido(item) {
			var that = this;

			that.SELECTED.ITENS.push(item);

			obj.SELECTED_ITEM_CFE = item;

			obj.setFocusTableItem();

			// $("#divTableOver").animate({scrollTop: $('#tabelaItens tbody tr:last').offset().top - 30});
		}

		function setFocusTableItem() {
			$timeout(function () {
				var selecter = $("#tabelaItens").find('.selected:focusable');

				selecter.last().focus();
			});
		}

		function calculateTotalizadores() {
			var that = this;

			var valorTotal = numeral(0);
			var desconto = numeral(0);
			var quantidade = numeral(0);
			var baseCalculoIcmsTotal = numeral(0);
			var baseCalculoPisTotal = numeral(0);
			var baseCalculoCofinsTotal = numeral(0);

			if (that.SELECTED.ITENS.length > 0) {
				angular.forEach(that.SELECTED.ITENS, function (item, value) {
					quantidade = angular.copy(quantidade).add(item.QUANTIDADE);
					valorTotal = angular.copy(valorTotal).add(item.VALOR_TOTAL);
					desconto = angular.copy(desconto).add(item.VALOR_DESCONTO);
					baseCalculoIcmsTotal = angular.copy(baseCalculoIcmsTotal).add(item.BASECALCULO_ICMS);
					baseCalculoPisTotal = angular.copy(baseCalculoPisTotal).add(item.BASECALCULO_PIS);
					baseCalculoCofinsTotal = angular.copy(baseCalculoCofinsTotal).add(item.BASECALCULO_COFINS);
				});
			}

			that.SELECTED.QUANTIDADE = Number(quantidade.value());

			var decimaisQuantidade = gScope.calcularQuantidadeDecimais(Number(that.SELECTED.QUANTIDADE));

			that.SELECTED.QUANTIDADE_VISUALIZACAO = number_format(that.SELECTED.QUANTIDADE, decimaisQuantidade, ',', '.');

			that.SELECTED.SUBTOTAL = Number(valorTotal.value());
			that.SELECTED.SUBTOTAL_VISUALIZACAO = 'R$ ' + number_format(that.SELECTED.SUBTOTAL, 2, ',', '.');

			that.SELECTED.DESCONTO = Number(desconto.value());
			that.SELECTED.DESCONTO_VISUALIZACAO = 'R$ ' + number_format(that.SELECTED.DESCONTO, 2, ',', '.');

			var total = angular.copy(valorTotal).subtract(angular.copy(desconto).value());

			that.SELECTED.TOTAL = Number(total.value());
			that.SELECTED.TOTAL_VISUALIZACAO = 'R$ ' + number_format(that.SELECTED.TOTAL, 2, ',', '.');

			that.SELECTED.BASECALCULO_ICMS_TOTAL = Number(baseCalculoIcmsTotal.value());
			that.SELECTED.BASECALCULO_PIS_TOTAL = Number(baseCalculoPisTotal.value());
			that.SELECTED.BASECALCULO_COFINS_TOTAL = Number(baseCalculoCofinsTotal.value());

			localStorage.setItem('OBJ_SELECTED', JSON.stringify(that.SELECTED));
		}

		function onFinalizarVenda() {
			var that = this;

			var check = true;

			if (that.SELECTED.TOTAL <= 0) {
				check = false;
				showErro("Não é possível finalizar uma venda com valor zerado", true);
			}

			if (check == true) {
				$("#modalFinalizarVenda").modal('show');

				gScope.GerarConsulta('ConsultaColaborador');
				gScope.GerarConsulta('ConsultaCliente');
				gScope.GerarConsulta('ConsultaUF');
				gScope.GerarConsulta('ConsultaCidade');
				// gScope.GerarConsulta('ConsultaRepresentante');
				// gScope.GerarConsulta('ConsultaVendedor');
				gScope.GerarConsulta('ConsultaFormasPagamento');
				that.CANCELAR_VENDA = false;
				that.HABILITA_GRAVACAO = false;

				that.PROGRESS_FINAL = false;
				obj.setProgressEmissao('', '0%');

				obj.TIPO_CLIENTE = '-1';
				gScope.ConsultaCreditoPOS.apagar();
				gScope.ConsultaDebitoPOS.apagar();
				gScope.ConsultaDevolucoes.apagar();
				gScope.ConsultaDepositoAntecipado.apagar();

				gScope.ConsultaRepresentante.apagar();
				gScope.ConsultaVendedor.apagar();

				obj.INDEX_FORMA_PAG = -1;
				obj.resetDadosVenda();

				if (obj.STEPPER != '') {
					obj.STEPPER.reset();
				} else {
					obj.setStep();
				}

				$("#list-tab a").each(function () {
					$(this).removeClass('active');
				});

				$("#nav-tabContent .tab-pane").each(function () {
					$(this).removeClass('active');
					$(this).removeClass('show');
				});

				obj.HABILITA_LOADING = false;

				obj.HABILITA_PROXIMO = true;

				obj.HABILITA_ANTERIOR = false;

				that.SELECTED.TOTAL_PAGAR = angular.copy(that.SELECTED.TOTAL);

				that.SELECTED.TOTAL_PAGAR_VISUALIZACAO = angular.copy(that.SELECTED.TOTAL_VISUALIZACAO);

				if (obj.CLIENTE_PEDIDO > 0) {

					obj.HABILITA_LOADING = true;

					obj.TIPO_CLIENTE = '1';

					gScope.ConsultaCliente.option.filtro_sql = {
						CLIENTE_ID: obj.CLIENTE_PEDIDO,
						PDV_ID: obj.DADOS_CAIXA.PDV_ID };


					$timeout(function () {
						gScope.ConsultaCliente.filtrar();
					});


					obj.preencherRepresentanteAndVendedor();

				} else {
					gScope.ConsultaCliente.option.filtro_sql = {
						PDV_ID: obj.DADOS_CAIXA.PDV_ID };

				}

				if (gScope.ConsultaClienteInicial.item.selected == true) {

					var clienteInicial = gScope.ConsultaClienteInicial.item.dados;

					if (clienteInicial.REPRESENTANTE_JSON != '' && clienteInicial.REPRESENTANTE_JSON != null) {
						obj.REPRESENTANTE_JSON = JSON.parse(clienteInicial.REPRESENTANTE_JSON);
					} else {
						obj.REPRESENTANTE_JSON = {};
					}

					if (clienteInicial.VENDEDOR_JSON != '' && clienteInicial.VENDEDOR_JSON != null) {
						obj.VENDEDOR_JSON = JSON.parse(clienteInicial.VENDEDOR_JSON);
					} else {
						obj.VENDEDOR_JSON = {};
					}

					obj.preencherRepresentanteAndVendedor();

					gScope.ConsultaCliente.setSelected(gScope.ConsultaClienteInicial.item.dados);

					obj.HABILITA_LOADING = true;

					obj.TIPO_CLIENTE = '1';

					$timeout(function () {
						gScope.ConsultaCliente.onSelect(gScope.ConsultaClienteInicial.item.dados);


						obj.HABILITA_LOADING = false;

					}, 100);
				}

				$timeout(function () {
					obj.onFocusInputModal("#modalFinalizarVenda");

				}, 300);
			}
		}

		function preencherRepresentanteAndVendedor() {
			if (typeof obj.REPRESENTANTE_JSON.ID != 'undefined') {
				gScope.ConsultaRepresentante.setSelected(obj.REPRESENTANTE_JSON);

				obj.validacaoRepresentante();

			}

			if (typeof obj.VENDEDOR_JSON.ID != 'undefined') {
				gScope.ConsultaVendedor.setSelected(obj.VENDEDOR_JSON);
			}
		}

		function resetDadosVenda() {
			obj.VENDA = {};

			obj.VENDA.CLIENTE_NOME = '';
			obj.VENDA.CLIENTE_CPF = '';
			obj.VENDA.CLIENTE_FONE = '';
			obj.VENDA.CLIENTE_CEP = '';
			obj.VENDA.CLIENTE_ENDERECO = '';
			obj.VENDA.CLIENTE_NUMERO = '';
			obj.VENDA.CLIENTE_BAIRRO = '';
			obj.VENDA.CLIENTE_COMPLEMENTO = '';
			obj.VENDA.CLIENTE_EMAIL = '';
			obj.VENDA.CLIENTE_PREENCHIDO = false;

			gScope.ConsultaColaborador.apagar();
			gScope.ConsultaCliente.apagar();
			gScope.ConsultaUF.apagar();
			gScope.ConsultaCidade.apagar();

			$timeout(function () {
				if (obj.TIPO_CLIENTE != '2') {
					gScope.ConsultaUF.btn_apagar_filtro.disabled = true;
					gScope.ConsultaUF.Input.disabled = true;
					gScope.ConsultaUF.btn_filtro.disabled = true;

					gScope.ConsultaCidade.btn_apagar_filtro.disabled = true;
					gScope.ConsultaCidade.Input.disabled = true;
					gScope.ConsultaCidade.btn_filtro.disabled = true;
				}

				obj.validacaoRepresentante();
			});
		}

		function validacaoRepresentante() {

			if (trim_null(obj.TIPO_CLIENTE) == '1') {
				if (obj.DADOS_CAIXA.ALTERAR_REPRESENTANTE_CFE == 1) {
					gScope.ConsultaRepresentante.btn_apagar_filtro.disabled = false;
					gScope.ConsultaRepresentante.Input.disabled = false;
					gScope.ConsultaRepresentante.btn_filtro.disabled = false;
				} else {
					gScope.ConsultaRepresentante.btn_apagar_filtro.disabled = true;
					gScope.ConsultaRepresentante.Input.disabled = true;
					gScope.ConsultaRepresentante.btn_filtro.disabled = true;

				}
			} else {
				gScope.ConsultaRepresentante.btn_apagar_filtro.disabled = false;
				gScope.ConsultaRepresentante.Input.disabled = false;
				gScope.ConsultaRepresentante.btn_filtro.disabled = false;
			}

		}

		function setStep() {

			obj.STEPPER = new Stepper(document.querySelector('#stepper'), {
				linear: true,
				animation: true });


		}

		function setDadosCliente(id, nome, cpf, telefone, cep, uf, endereco, numero, bairro, cidade, complemento, email, dtNascimento) {

			obj.VENDA.CLIENTE_ID = id;
			obj.VENDA.CLIENTE_NOME = nome;
			obj.VENDA.CLIENTE_CPF = cpf;
			obj.VENDA.CLIENTE_FONE = telefone;
			obj.VENDA.CLIENTE_CEP = cep;
			obj.VENDA.CLIENTE_ENDERECO = endereco;
			obj.VENDA.CLIENTE_NUMERO = numero;
			obj.VENDA.CLIENTE_BAIRRO = bairro;
			obj.VENDA.CLIENTE_COMPLEMENTO = complemento;
			obj.VENDA.CLIENTE_EMAIL = email;
			obj.VENDA.CLIENTE_DT_NASCIMENTO = dtNascimento;
			obj.VENDA.CLIENTE_PREENCHIDO = true;

			if (uf != null && uf != null) {
				var jsonUF = JSON.parse(uf);
				if (typeof jsonUF.ID != 'undefined' && jsonUF.ID != null && jsonUF.ID != '') {
					gScope.ConsultaUF.setSelected(jsonUF);
				}
			}

			if (cidade != null && cidade != null) {
				var jsonCidade = JSON.parse(cidade);
				if (typeof jsonCidade.ID != 'undefined' && jsonCidade.ID != null && jsonCidade.ID != '') {
					gScope.ConsultaCidade.setSelected(jsonCidade);
				}
			}

			$timeout(function () {
				if (obj.TIPO_CLIENTE != '2') {
					gScope.ConsultaUF.btn_apagar_filtro.disabled = true;
					gScope.ConsultaUF.Input.disabled = true;
					gScope.ConsultaUF.btn_filtro.disabled = true;

					gScope.ConsultaCidade.btn_apagar_filtro.disabled = true;
					gScope.ConsultaCidade.Input.disabled = true;
					gScope.ConsultaCidade.btn_filtro.disabled = true;
				}
			});


		}

		function getClientePDVByCPF() {
			var that = this;

			if (typeof obj.VENDA.CLIENTE_CPF != 'undefined') {

				if (obj.VENDA.CLIENTE_CPF.length == 11 && obj.TIPO_CLIENTE == '2') {

					obj.HABILITA_LOADING = true;

					var dados = {
						DADOS: {
							CPF: obj.VENDA.CLIENTE_CPF } };



					return $q(function (resolve, reject) {

						$ajax.post(that.url_get_cliente_pdv_by_cpf, dados).then(function (response) {


							if (response.length > 0) {

								var item = response[0];

								var id = 0;
								var nome = trim_null(item.NOME);
								var cpf = trim_null(item.CPF);
								var telefone = trim_null(item.TELEFONE);
								var cep = trim_null(item.CEP);
								var uf = trim_null(item.UF_JSON);
								var endereco = trim_null(item.ENDERECO);
								var numero = trim_null(item.NUMERO);
								var bairro = trim_null(item.BAIRRO);
								var cidade = trim_null(item.CIDADE_JSON);
								var complemento = trim_null(item.COMPLEMENTO);
								var email = trim_null(item.EMAIL);
								var dtNascimento = trim_null(item.DATA_NASCIMENTO);

								$timeout(function () {
									$rootScope.$apply(function () {
										obj.HABILITA_LOADING = false;
										obj.setDadosCliente(id, nome, cpf, telefone, cep, uf, endereco, numero, bairro, cidade, complemento, email, dtNascimento);
									});
								});
							} else {
								obj.clearFieldsClient();

								$timeout(function () {
									$("#nomeCliente").first().focus();
								});
							}

							resolve(response);
						}, function (e) {

							obj.HABILITA_LOADING = true;

							reject(e);
						});
					});
				}
			} else {
				obj.clearFieldsClient();
			}
		}

		function clearFieldsClient() {

			obj.HABILITA_LOADING = false;
			obj.VENDA.CLIENTE_NOME = '';
			obj.VENDA.CLIENTE_FONE = '';
			obj.VENDA.CLIENTE_CEP = '';
			obj.VENDA.CLIENTE_ENDERECO = '';
			obj.VENDA.CLIENTE_NUMERO = '';
			obj.VENDA.CLIENTE_BAIRRO = '';
			obj.VENDA.CLIENTE_COMPLEMENTO = '';
			obj.VENDA.CLIENTE_EMAIL = '';
			obj.VENDA.CLIENTE_DT_NASCIMENTO = '';
			obj.VENDA.CLIENTE_PREENCHIDO = false;

			gScope.ConsultaUF.apagar();
			gScope.ConsultaCidade.apagar();

		}

		function getEnderecoByCep() {
			var that = this;

			if (typeof obj.VENDA.CLIENTE_CEP != 'undefined') {
				if (obj.VENDA.CLIENTE_CEP.length == 8) {
					obj.HABILITA_LOADING = true;

					getEnderecoByCepJS(obj.VENDA.CLIENTE_CEP).then(function (dadosRetornados) {

						$timeout(function () {
							if (dadosRetornados.ERROR == true) {
								showErro("Nenhum endereço encontrado para esse CEP");
							} else {

								$rootScope.$apply(function () {

									obj.getUF(dadosRetornados).then(function (data) {

										var ret = data[0];

										obj.VENDA.CLIENTE_ENDERECO = dadosRetornados.ENDERECO;
										obj.VENDA.CLIENTE_BAIRRO = dadosRetornados.BAIRRO;

										if (ret.UF_JSON != '' && ret.UF_JSON != null) {
											var jsonUF = JSON.parse(ret.UF_JSON);
											if (jsonUF.ID != '' && jsonUF.ID != null) {
												gScope.ConsultaUF.setSelected(jsonUF);
											} else {
												showAlert("UF não Encontrada");
											}

										} else {
											showAlert("UF não Encontrada");
										}


										if (ret.CIDADE_JSON != '' && ret.CIDADE_JSON != null) {
											var jsonCidade = JSON.parse(ret.CIDADE_JSON);
											if (jsonCidade.ID != '' && jsonCidade.ID != null) {
												gScope.ConsultaCidade.setSelected(jsonCidade);
											} else {
												showAlert("Cidade não Encontrada");
											}

										} else {
											showAlert("Cidade não Encontrada");
										}

										obj.HABILITA_LOADING = false;

									}, function (dados) {

									});
								});

							}
						}, 200);
					});
				}

			}
		}

		function getUF(dados) {
			var that = this;


			return $q(function (resolve, reject) {

				$ajax.post(that.url_get_uf, dados).then(function (response) {

					resolve(response);
				});

			});
		}

		function validacaoStep() {

			if ($(".step#stepCliente").hasClass('active')) {
				obj.validacaoCliente();
			}

		}

		function validacaoStepAnterior() {

			obj.previousStep();

			$timeout(function () {
				$rootScope.$apply(function () {
					if ($(".step#stepCliente").hasClass('active')) {

						obj.HABILITA_ANTERIOR = false;
						obj.HABILITA_PROXIMO = true;

					} else if ($(".step#stepFormaPagamento").hasClass('active')) {
						obj.HABILITA_ANTERIOR = true;
						obj.HABILITA_PROXIMO = false;
					}

					$timeout(function () {
						obj.onFocusInputModal("#modalFinalizarVenda");
					});
				});
			});

		}

		function validacaoCliente() {
			var next = true;

			if (obj.TIPO_CLIENTE != '-1') {

				if (typeof obj.VENDA.CLIENTE_NOME == 'undefined') {
					next = false;
					showErro("Nome inválido para esse tipo de cliente", true);
				}

				if (typeof obj.VENDA.CLIENTE_NOME != 'undefined' && obj.VENDA.CLIENTE_NOME == '') {
					next = false;
					showErro("Nome inválido para esse tipo de cliente", true);
				}

				if (typeof obj.VENDA.CLIENTE_CPF == 'undefined') {
					next = false;
					showErro("CPF inválido para esse tipo de cliente", true);
				}

				if (typeof obj.VENDA.CLIENTE_CPF != 'undefined' && obj.VENDA.CLIENTE_CPF == '') {
					next = false;
					showErro("CPF inválido para esse tipo de cliente", true);
				}

			}

			if (next == true) {

				$timeout(function () {
					gScope.ConsultaDevolucoes.option.filtro_sql = {
						FORMAS_PAGAMENTO_ESCOLHIDAS: obj.FORMAS_PAGAMENTO_ESCOLHIDAS,
						TIPO_CLIENTE: obj.TIPO_CLIENTE,
						CLIENTE_ID: obj.VENDA.CLIENTE_ID };


					gScope.ConsultaDepositoAntecipado.option.filtro_sql = {
						TIPO_CLIENTE: obj.TIPO_CLIENTE,
						CLIENTE_ID: obj.VENDA.CLIENTE_ID };


					obj.nextStep();

					obj.HABILITA_ANTERIOR = true;
					obj.HABILITA_PROXIMO = false;


					if (obj.FORMAS_PAGAMENTO_ESCOLHIDAS.length == 0) {
						obj.onAddFormaPagamento();
					}

				});
			}
		}

		function validacaoFormaPagamento() {
			var next = true;

			if (obj.FORMAS_PAGAMENTO_ESCOLHIDAS.length <= 0) {
				next = false;
				showErro("Nenhuma Forma de Pagamento Informada", true);
			} else {

				var auxVerificacao = numeral(obj.SELECTED.TOTAL_PAGO);

				var auxSubtract = angular.copy(auxVerificacao).subtract(obj.SELECTED.TROCO);

				if (auxSubtract.value() != obj.SELECTED.TOTAL) {
					next = false;
					showErro("Existem divergências entre as formas de pagamento e o total da venda", true);
				}
			}

			return next;
		}

		function nextStep() {
			obj.STEPPER.next();
		}

		function previousStep() {
			obj.STEPPER.previous();
		}

		function onAddFormaPagamento() {
			var check = true;

			if (obj.SELECTED.TOTAL_PAGAR == 0) {
				check = false;
				showErro("Não é possível adicionar novas formas de pagamentos. <br> Saldo a pagar zerado.");
			}

			if (check == true) {
				$("#modalFormasPagamento").modal('show');

				obj.VALOR_PARCIAL = angular.copy(obj.SELECTED.TOTAL_PAGAR);

				$timeout(function () {
					gScope.ConsultaFormasPagamento.filtrar();
					// obj.onFocusInputModal("#modalFormasPagamento");
				});
			}
		}

		function clearAddFormasPagamento() {
			obj.HABILITA_CONSULTA_CREDITO = false;
			obj.HABILITA_CONSULTA_DEBITO = false;
			obj.HABILITA_CONSULTA_DEVOLUCAO = false;
			obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO = false;
			obj.HABILITA_DINHEIRO = false;
			obj.HABILITA_CONFIRMAR_PAGAMENTO = false;
			obj.HABILITA_PROGRESS = false;
			obj.MENSAGEM_PROGRESS = '';

			gScope.ConsultaCreditoPOS.apagar();
			gScope.ConsultaDebitoPOS.apagar();
			gScope.ConsultaDevolucoes.apagar();
			gScope.ConsultaDepositoAntecipado.apagar();
			gScope.ConsultaFormasPagamento.apagar();
			obj.VALOR_PARCIAL = 0;
		}

		function onSelectFormaPagamento(tipoPag) {
			if (tipoPag == '03') {
				obj.HABILITA_CONSULTA_CREDITO = true;
				obj.HABILITA_CONSULTA_DEBITO = false;
				obj.HABILITA_CONSULTA_DEVOLUCAO = false;
				obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO = false;
				obj.HABILITA_DINHEIRO = false;

				// gScope.ConsultaCreditoPOS.compile();
				gScope.GerarConsulta('ConsultaCreditoPOS');
				gScope.ConsultaCreditoPOS.apagar();

				$timeout(function () {
					gScope.ConsultaCreditoPOS.filtrar();
				}, 200);
			} else if (tipoPag == '04') {
				obj.HABILITA_CONSULTA_DEBITO = true;
				obj.HABILITA_CONSULTA_CREDITO = false;
				obj.HABILITA_CONSULTA_DEVOLUCAO = false;
				obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO = false;
				obj.HABILITA_DINHEIRO = false;

				// gScope.ConsultaDebitoPOS.compile();
				gScope.GerarConsulta('ConsultaDebitoPOS');
				gScope.ConsultaDebitoPOS.apagar();

				$timeout(function () {
					gScope.ConsultaDebitoPOS.filtrar();
				}, 200);
			} else if (tipoPag == '05') {
				obj.HABILITA_CONSULTA_CREDITO = false;
				obj.HABILITA_CONSULTA_DEBITO = false;
				obj.HABILITA_CONSULTA_DEVOLUCAO = true;
				obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO = false;
				obj.HABILITA_DINHEIRO = false;

				// gScope.ConsultaDevolucoes.compile();
				gScope.GerarConsulta('ConsultaDevolucoes');

				gScope.ConsultaDevolucoes.apagar();

				$timeout(function () {
					gScope.ConsultaDevolucoes.filtrar();
				}, 200);

			} else if (tipoPag == '99') {
				obj.HABILITA_CONSULTA_CREDITO = false;
				obj.HABILITA_CONSULTA_DEBITO = false;
				obj.HABILITA_CONSULTA_DEVOLUCAO = false;
				obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO = true;
				obj.HABILITA_DINHEIRO = false;

				// gScope.ConsultaDepositoAntecipado.compile();
				gScope.GerarConsulta('ConsultaDepositoAntecipado');

				gScope.ConsultaDepositoAntecipado.apagar();

				$timeout(function () {
					gScope.ConsultaDepositoAntecipado.filtrar();
				}, 200);
			} else if (tipoPag == '01') {
				obj.HABILITA_DINHEIRO = true;
				$timeout(function () {
					$("#inputValor").first().focus();
					$("#inputValor").first().select();
				}, 100);
			}
		}

		function onValidarFormaPagamento(valor) {
			var check = true;

			var decimaisValor = gScope.calcularQuantidadeDecimais(Number(valor));

			var valorVisualizacao = 'R$ ' + number_format(Number(valor), decimaisValor, ',', '.');

			if (gScope.ConsultaFormasPagamento.item.selected == false) {
				check = false;
				showErro("Forma de pagamento inválida");

				$timeout(function () {
					gScope.ConsultaFormasPagamento.setFocusInput();
				}, 100);
			}

			if (valor <= 0) {
				check = false;
				showErro("Valor inválido");

				$timeout(function () {
					$("#inputValor").first().focus();
					$("#inputValor").first().select();
				}, 100);
			}

			if (obj.HABILITA_DINHEIRO == false) {
				if (valor > obj.SELECTED.TOTAL_PAGAR) {
					check = false;
					showErro("Valor " + valorVisualizacao + ' maior do que saldo a pagar de ' + obj.SELECTED.TOTAL_PAGAR_VISUALIZACAO, true);
				}
			}

			if (obj.HABILITA_CONSULTA_CREDITO == true && gScope.ConsultaCreditoPOS.item.selected == false) {
				check = false;
				showErro("POS obrigatório para cartão de crédito");

				$timeout(function () {
					gScope.ConsultaCreditoPOS.setFocusInput();
				}, 100);

			}

			if (obj.HABILITA_CONSULTA_DEBITO == true && gScope.ConsultaDebitoPOS.item.selected == false) {
				check = false;
				showErro("POS obrigatório para cartão de débito");

				$timeout(function () {
					gScope.ConsultaDebitoPOS.setFocusInput();
				}, 100);
			}

			if (obj.HABILITA_CONSULTA_DEVOLUCAO == true) {

				if (gScope.ConsultaDevolucoes.item.selected == false) {
					check = false;
					showErro("Selecione uma devolução");

					$timeout(function () {
						gScope.ConsultaDevolucoes.setFocusInput();
					}, 100);
				} else {
					var valorSaldoCredito = Number(gScope.ConsultaDevolucoes.item.dados.VALOR_SALDO);

					if (valor > Number(gScope.ConsultaDevolucoes.item.dados.VALOR_SALDO)) {
						check = false;
						showErro("Valor R$ " + valor + " maior que o saldo do crédito R$ " + valorSaldoCredito, true);
					}
				}
			}

			if (obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO == true) {
				if (gScope.ConsultaDepositoAntecipado.item.selected == false) {
					check = false;
					showErro("Selecione um depósito antecipado");

					$timeout(function () {
						gScope.ConsultaDepositoAntecipado.setFocusInput();
					}, 100);
				} else {

					var valorSaldoDeposito = Number(gScope.ConsultaDepositoAntecipado.item.dados.VALOR_SALDO);

					if (valor > Number(gScope.ConsultaDepositoAntecipado.item.dados.VALOR_SALDO)) {
						check = false;
						showErro("Valor R$ " + valor + " maior que o saldo do depósito antecipado R$ " + valorSaldoDeposito, true);
					}

				}

			}

			return check;
		}

		function addFormaPagamento() {

			var valor = obj.convertStringToNumber(obj.VALOR_PARCIAL);

			var check = obj.onValidarFormaPagamento(valor);

			var copyFormaPagamento = gScope.ConsultaFormasPagamento.item.dados;

			if (check == true) {
				if (obj.HABILITA_CONSULTA_DEVOLUCAO == true) {
					obj.addFormaPagamentoCreditoLoja(copyFormaPagamento, valor);
				} else if (obj.HABILITA_CONSULTA_DEPOSITO_ANTECIPADO == true) {
					obj.addFormaPagamentoDepositoAntecipado(copyFormaPagamento, valor);
				} else {
					obj.addFormaPagamentoDinheiro(copyFormaPagamento, valor);

				}

				obj.validacaoTroco();

				if (obj.SELECTED.TOTAL_PAGAR > 0) {
					obj.clearAddFormasPagamento();
					obj.onAddFormaPagamento();
				} else {
					$("#modalFormasPagamento").modal('hide');
				}
			}

		}

		function validarFormaPagamentoCartao() {

			var that = this;

			var valor = obj.convertStringToNumber(obj.VALOR_PARCIAL);

			var check = obj.onValidarFormaPagamento(valor);

			var copyFormaPagamento = gScope.ConsultaFormasPagamento.item.dados;

			if (check == true) {

				that.HABILITA_PROGRESS = true;
				that.MENSAGEM_PROGRESS = 'Processando ID do Pagamento na SEFAZ...';

				var numeroSerie = '';
				var chaveRequisicao = '';
				var merchantID = '';
				var idPOS = 0;
				var idAdquirente = 0;
				var adquirente = '';

				var paran = {
					TIPO_PAGAMENTO: 'POS',
					VALOR: valor,
					VALOR_TOTAL: obj.SELECTED.TOTAL,
					ICMS_BASE: obj.SELECTED.BASECALCULO_ICMS_TOTAL,
					MOEDA: 'BRL',
					ORIGEM_PAGAMENTO: 'PDV_1',
					DESCRICAO: 'Pagamento',
					CHAVE_ACESSO_VALIDADOR: trim_null(obj.DADOS_CAIXA.CHAVE_ACESSO_VALIDADOR) };



				paran.ESTABELECIMENTO = obj.setDadosEstabelecimento();

				var consulta = null;

				if (obj.HABILITA_CONSULTA_CREDITO == true) {
					consulta = 'ConsultaCreditoPOS';
				} else if (obj.HABILITA_CONSULTA_DEBITO == true) {
					consulta = 'ConsultaDebitoPOS';
				}

				numeroSerie = gScope[consulta].item.dados.NUMERO_SERIE;
				chaveRequisicao = gScope[consulta].item.dados.CHAVE_REQUISICAO;
				merchantID = gScope[consulta].item.dados.MERCHANTID;
				idPOS = gScope[consulta].item.dados.ID;
				idAdquirente = trim_null(gScope[consulta].item.dados.ADQ_ID);
				adquirente = trim_null(gScope[consulta].item.dados.EMPRESA);

				paran.SERIAL_POS = numeroSerie;
				paran.CHAVE_REQUISICAO = chaveRequisicao;
				paran.ESTABELECIMENTO_POS = merchantID;

				obj.enabledDisabledConsultas('ConsultaFormasPagamento', true);
				obj.enabledDisabledConsultas(consulta, true);

				obj.executePagamentoEtapa1(paran, copyFormaPagamento, valor, consulta, idPOS, merchantID, chaveRequisicao, numeroSerie, idAdquirente, adquirente);

			}

		}

		function executePagamentoEtapa1(paran, copyFormaPagamento, valor, consulta, idPOS, merchantID, chaveRequisicao, numeroSerie, idAdquirente, adquirente) {
			var that = this;

			gScope.EmissorCFeComunicacaoSefaz.execPagamentoEtapa1(paran).then(function (dados) {

				obj.DADOS_POS = {};

				obj.DADOS_POS.FORMA_PAGAMENTO = copyFormaPagamento.CODIGO;
				obj.DADOS_POS.DESC_FORMA_PAGAMENTO = copyFormaPagamento.DESC_ID + ' - ' + copyFormaPagamento.DESCRICAO;
				obj.DADOS_POS.VALOR = valor;
				obj.DADOS_POS.TIPO_PAG = trim_null(copyFormaPagamento.NFE_TIPPAG);
				obj.DADOS_POS.ID_ADQUIRENTE = idAdquirente;
				obj.DADOS_POS.ADQUIRENTE = adquirente;
				obj.DADOS_POS.SERIAL_POS = trim_null(numeroSerie);
				obj.DADOS_POS.CHAVE_REQUISICAO = trim_null(chaveRequisicao);
				obj.DADOS_POS.CHAVE_ACESSO_VALIDADOR = trim_null(obj.DADOS_CAIXA.CHAVE_ACESSO_VALIDADOR);
				obj.DADOS_POS.ESTABELECIMENTO_POS = trim_null(merchantID);
				obj.DADOS_POS.ID_PAGAMENTO = trim_null(dados.IDPagamento);
				obj.DADOS_POS.PDV_POS_ID = idPOS;

				that.MENSAGEM_PROGRESS = 'ID ' + obj.DADOS_POS.ID_PAGAMENTO + ' gerado';

				obj.executePagamentoEtapa2();

			}, function (dados) {

				that.HABILITA_PROGRESS = false;

				obj.enabledDisabledConsultas('ConsultaFormasPagamento', false);
				obj.enabledDisabledConsultas(consulta, false);

				console.log(dados);
				showErro(dados.error);

			});

		}

		function executePagamentoEtapa2() {
			var that = this;

			var paran = {
				IDPagamento: obj.DADOS_POS.ID_PAGAMENTO };


			paran.ESTABELECIMENTO = obj.setDadosEstabelecimento();

			that.MENSAGEM_PROGRESS = 'Executando segunda etapa...';

			gScope.EmissorCFeComunicacaoSefaz.execPagamentoEtapa2(paran).then(function (dados) {
				var ret = dados;

				if (ret.IDFila > 0) {
					obj.DADOS_POS.FILA_ID = ret.IDFila;
					obj.DADOS_POS.BIN = ret.Bin;
					obj.DADOS_POS.ULTIMOS_QUATRO_DIGITOS = trim_null(ret.UltimosQuatroDigitos);
					obj.DADOS_POS.DATA_EXPIRACAO = trim_null(ret.DataExpiracao);
					obj.DADOS_POS.DONO_CARTAO = trim_null(ret.DonoCartao);
					obj.DADOS_POS.BANDEIRA = trim_null(ret.Tipo);
					obj.DADOS_POS.INSTITUICAO_FINANCEIRA = trim_null(ret.InstituicaoFinanceira);
					obj.DADOS_POS.VALOR_PAGAMENTO = Number(ret.ValorPagamento);
					obj.DADOS_POS.NSU = trim_null(ret.CodigoPagamento);
					obj.DADOS_POS.CODIGO_AUTORIZACAO = trim_null(ret.CodigoAutorizacao);
					obj.DADOS_POS.PARCELAS = Number(ret.Parcelas);

					obj.DADOS_POS.MFE_MENSAGEM = ret.MFE_VALOR;
					obj.DADOS_POS.MFE_CODIGO = ret.MFE_CODIGO;
					obj.DADOS_POS.MFE_ID = ret.MFE_ID;

				} else {
					obj.DADOS_POS.FILA_ID = 0;
					obj.DADOS_POS.BIN = 0;
					obj.DADOS_POS.ULTIMOS_QUATRO_DIGITOS = '';
					obj.DADOS_POS.DATA_EXPIRACAO = '';
					obj.DADOS_POS.DONO_CARTAO = '';
					obj.DADOS_POS.BANDEIRA = '';
					obj.DADOS_POS.INSTITUICAO_FINANCEIRA = '';
					obj.DADOS_POS.VALOR_PAGAMENTO = obj.DADOS_POS.VALOR;
					obj.DADOS_POS.NSU = '';
					obj.DADOS_POS.CODIGO_AUTORIZACAO = '';
					obj.DADOS_POS.PARCELAS = 1;
					obj.DADOS_POS.MFE_MENSAGEM = '';
					obj.DADOS_POS.MFE_CODIGO = '';
					obj.DADOS_POS.MFE_ID = '';

				}

				if (trim_null(obj.DADOS_POS.TIPO_PAG) == '04') {
					obj.DADOS_POS.PARCELAS = 1;
				}

				that.HABILITA_PROGRESS = false;

				obj.HABILITA_CONFIRMAR_PAGAMENTO = true;

				$timeout(function () {
					obj.onFocusInputModal("#modalFormasPagamento");
				}, 100);

			}, function (dados) {
				obj.HABILITA_CONFIRMAR_PAGAMENTO = false;
				that.HABILITA_PROGRESS = false;

				console.log(dados);
				showErro(dados.error);

			});


		}

		function confirmarFormaPagamentoCartao() {

			var check = true;

			if (typeof obj.DADOS_POS.BANDEIRA == 'undefined' || typeof obj.DADOS_POS.BANDEIRA != 'undefined' && obj.DADOS_POS.BANDEIRA == '') {
				check = false;
				showErro("Bandeira inválida", true);
			}

			if (typeof obj.DADOS_POS.VALOR_PAGAMENTO == 'undefined' || typeof obj.DADOS_POS.VALOR_PAGAMENTO != 'undefined' && obj.DADOS_POS.VALOR_PAGAMENTO <= 0) {
				check = false;
				showErro("Valor do pagamento inválido", true);
			}

			if (typeof obj.DADOS_POS.PARCELAS == 'undefined' || typeof obj.DADOS_POS.PARCELAS != 'undefined' && obj.DADOS_POS.PARCELAS == '') {
				check = false;
				showErro("Quantidade de parcelas do pagamento inválida", true);
			}

			if (typeof obj.DADOS_POS.NSU == 'undefined' || typeof obj.DADOS_POS.NSU != 'undefined' && (obj.DADOS_POS.NSU == '' || obj.DADOS_POS.NSU <= 0)) {
				check = false;
				showErro("NSU do pagamento inválido", true);
			}

			if (typeof obj.DADOS_POS.CODIGO_AUTORIZACAO == 'undefined' || typeof obj.DADOS_POS.CODIGO_AUTORIZACAO != 'undefined' && (obj.DADOS_POS.CODIGO_AUTORIZACAO == '' || obj.DADOS_POS.CODIGO_AUTORIZACAO <= 0)) {
				check = false;
				showErro("Código de autorização do pagamento inválido", true);
			}

			if (check == true) {

				obj.DADOS_POS.VALOR = obj.convertStringToNumber(obj.DADOS_POS.VALOR_PAGAMENTO);

				obj.addListFormaPagamento(angular.copy(obj.DADOS_POS));

				obj.DADOS_POS = {};

				obj.validacaoTroco();

				if (obj.SELECTED.TOTAL_PAGAR > 0) {
					obj.clearAddFormasPagamento();
					obj.onAddFormaPagamento();
				} else {
					$("#modalFormasPagamento").modal('hide');
				}

			}
		}

		function enabledDisabledConsultas(consulta, boolean) {
			gScope[consulta].btn_apagar_filtro.disabled = boolean;
			gScope[consulta].Input.disabled = boolean;
			gScope[consulta].btn_filtro.disabled = boolean;
		}

		function addFormaPagamentoCreditoLoja(copyFormaPagamento, valor) {
			var json = {};
			json.FORMA_PAGAMENTO = copyFormaPagamento.CODIGO;
			json.DESC_FORMA_PAGAMENTO = copyFormaPagamento.DESC_ID + ' - ' + copyFormaPagamento.DESCRICAO;
			json.VALOR = valor;
			json.PARCELAS = 1;
			json.TIPO_PAG = trim_null(copyFormaPagamento.NFE_TIPPAG);
			json.ID_ADQUIRENTE = 0;
			json.PDV_DEVOLUCAO_TROCA_ID = gScope.ConsultaDevolucoes.item.dados.ID;

			var decimaisValor = gScope.calcularQuantidadeDecimais(Number(json.VALOR));

			json.VALOR_VISUALIZACAO = 'R$ ' + number_format(Number(json.VALOR), decimaisValor, ',', '.');

			obj.addListFormaPagamento(json);
		}

		function addFormaPagamentoDepositoAntecipado(copyFormaPagamento, valor) {
			var json = {};
			json.FORMA_PAGAMENTO = copyFormaPagamento.CODIGO;
			json.DESC_FORMA_PAGAMENTO = copyFormaPagamento.DESC_ID + ' - ' + copyFormaPagamento.DESCRICAO;
			json.VALOR = valor;
			json.PARCELAS = 1;
			json.TIPO_PAG = trim_null(copyFormaPagamento.NFE_TIPPAG);
			json.ID_ADQUIRENTE = 0;
			json.PDV_MOVIMENTO_DETALHE_ID = gScope.ConsultaDepositoAntecipado.item.dados.ID;

			var decimaisValor = gScope.calcularQuantidadeDecimais(Number(json.VALOR));

			json.VALOR_VISUALIZACAO = 'R$ ' + number_format(Number(json.VALOR), decimaisValor, ',', '.');

			obj.addListFormaPagamento(json);

		}

		function addFormaPagamentoDinheiro(copyFormaPagamento, valor) {
			var json = {};
			json.FORMA_PAGAMENTO = copyFormaPagamento.CODIGO;
			json.DESC_FORMA_PAGAMENTO = copyFormaPagamento.DESC_ID + ' - ' + copyFormaPagamento.DESCRICAO;
			json.VALOR = valor;
			json.PARCELAS = 1;
			json.TIPO_PAG = trim_null(copyFormaPagamento.NFE_TIPPAG);
			json.ID_ADQUIRENTE = 0;

			var boolean = true;

			angular.forEach(obj.FORMAS_PAGAMENTO_ESCOLHIDAS, function (item, value) {
				if (trim_null(item.FORMA_PAGAMENTO) == trim_null(json.FORMA_PAGAMENTO)) {
					boolean = false;
					var valorAux = numeral(item.VALOR);
					var sum = angular.copy(valorAux).add(valor);
					item.VALOR = sum.value();

					var decimaisValor = gScope.calcularQuantidadeDecimais(Number(item.VALOR));

					item.VALOR_VISUALIZACAO = 'R$ ' + number_format(Number(item.VALOR), decimaisValor, ',', '.');

				}
			});

			if (boolean == true) {
				obj.addListFormaPagamento(json);
			}
		}

		function deleteFormaPagamento(item, index) {
			obj.FORMAS_PAGAMENTO_ESCOLHIDAS.splice(index, 1);

			obj.validacaoTroco();

			$timeout(function () {
				obj.onFocusInputModal("#modalFinalizarVenda");
			});
		}

		function onCancelarFinalizarVenda() {
			$("#modalCancelarFinalizacaoVenda").modal('show');
		}

		function cancelarFinalizarVenda() {
			obj.FORMAS_PAGAMENTO_ESCOLHIDAS = [];

			obj.CANCELAR_VENDA = true;

			obj.validacaoTroco();

			$("#modalCancelarFinalizacaoVenda").modal('hide');

			$("#modalFinalizarVenda").modal('hide');

			$timeout(function () {
				$("#pesquisaProduto").filter(":not([readonly]):visible:enabled:first").focus();
			});

		}

		function validacaoTroco() {

			var that = this;

			var valoresNaoDinheiro = numeral(0);

			var boolean = false;
			var valorDinheiro = numeral(0);

			var valorTotalPago = numeral(0);

			var valorTroco = numeral(0);

			angular.forEach(obj.FORMAS_PAGAMENTO_ESCOLHIDAS, function (item, value) {
				if (trim_null(item.TIPO_PAG) == '01') {
					boolean = true;

					valorDinheiro = numeral(item.VALOR);
				} else {
					valoresNaoDinheiro = angular.copy(valoresNaoDinheiro).add(item.VALOR);
				}

				valorTotalPago = angular.copy(valorTotalPago).add(item.VALOR);
			});

			var valorTotalVenda = numeral(that.SELECTED.TOTAL);

			if (boolean == true) {
				var aux = angular.copy(valorTotalVenda).subtract(valoresNaoDinheiro.value());

				if (aux.value() <= valorDinheiro.value()) {
					valorTroco = angular.copy(valorDinheiro).subtract(aux.value());
				}

			}


			that.SELECTED.TROCO = valorTroco.value();

			var decimaisValorTroco = gScope.calcularQuantidadeDecimais(valorTroco.value());

			that.SELECTED.TROCO_VISUALIZACAO = 'R$ ' + number_format(valorTroco.value(), decimaisValorTroco, ',', '.');

			that.SELECTED.TOTAL_PAGO = valorTotalPago.value();

			var decimaisValorTotalPago = gScope.calcularQuantidadeDecimais(valorTotalPago.value());

			that.SELECTED.TOTAL_PAGO_VISUALIZACAO = 'R$ ' + number_format(valorTotalPago.value(), decimaisValorTotalPago, ',', '.');

			var auxTotalPagar = angular.copy(valorTotalVenda).subtract(valorTotalPago.value());

			var vlTotalPagar = 0;
			if (auxTotalPagar.value() >= 0) {
				vlTotalPagar = auxTotalPagar.value();
			}

			that.SELECTED.TOTAL_PAGAR = vlTotalPagar;

			var decimaisValorTotalSaldoPagar = gScope.calcularQuantidadeDecimais(vlTotalPagar);

			that.SELECTED.TOTAL_PAGAR_VISUALIZACAO = 'R$ ' + number_format(vlTotalPagar, decimaisValorTotalSaldoPagar, ',', '.');

		}

		function addListFormaPagamento(formaPagamento) {

			var decimaisValor = gScope.calcularQuantidadeDecimais(Number(formaPagamento.VALOR));

			formaPagamento.VALOR_VISUALIZACAO = 'R$ ' + number_format(Number(formaPagamento.VALOR), decimaisValor, ',', '.');

			obj.FORMAS_PAGAMENTO_ESCOLHIDAS.push(formaPagamento);

		}

		function finalizarVenda() {
			var that = this;

			var check = obj.validacaoFormaPagamento();

			if (check == true) {

				that.HABILITA_GRAVACAO = true;

				that.PROGRESS_FINAL = true;
				obj.setProgressEmissao('Gravando registro no banco de dados...', '20%');

				var dados = obj.setDadosWebService();
				dados.DADOS_CLIENTE = {};

				dados.TOTALIZADORES = {};
				dados.TOTALIZADORES.TROCO = obj.SELECTED.TROCO;
				dados.TOTALIZADORES.TOTAL_VENDA = obj.SELECTED.TOTAL;

				if (typeof obj.VENDA.CLIENTE_CPF != 'undefined') {
					obj.setDadosClienteBeforeGravar();

				} else {
					obj.VENDA.CLIENTE_NOME = '';
					obj.VENDA.CLIENTE_CPF = '';
					obj.VENDA.CLIENTE_FONE = '';
					obj.VENDA.CLIENTE_CEP = '';
					obj.VENDA.CLIENTE_ENDERECO = '';
					obj.VENDA.CLIENTE_NUMERO = '';
					obj.VENDA.CLIENTE_BAIRRO = '';
					obj.VENDA.CLIENTE_COMPLEMENTO = '';
					obj.VENDA.CLIENTE_EMAIL = '';
					obj.VENDA.CLIENTE_PREENCHIDO = false;
				}

				dados.DADOS_CLIENTE = obj.VENDA;

				dados.DADOS_CAIXA = obj.DADOS_CAIXA;

				return $q(function (resolve, reject) {

					$ajax.post(that.url_gravar, dados).then(function (response) {

						if (response.ID_RETURN > 0) {

							obj.setProgressEmissao('Registro gravado...', '40%');

							obj.RESPONSE_GRAVACAO = response;

							obj.emitirCFE();
						}

						resolve(response);
					}, function (e) {
						showErro("Cupom fiscal não gravado no banco de dados. <br> Tente novamente executar a operação", true);

						that.HABILITA_GRAVACAO = false;

						reject(e);
					});
				});

			}
		}

		function setDadosClienteBeforeGravar() {

			if (gScope.ConsultaCidade.item.selected == true) {
				var jsonCidade = gScope.ConsultaCidade.item.dados;
				obj.VENDA.CLIENTE_CIDADE = jsonCidade.CODIGO;

			}

			if (gScope.ConsultaUF.item.selected == true) {
				var jsonUF = gScope.ConsultaUF.item.dados;
				obj.VENDA.CLIENTE_UF = jsonUF.ID;

			}

		}

		function emitirCFE() {

			var that = this;

			var paran = obj.setDadosWebService(1);

			var cfe = obj.RESPONSE_GRAVACAO.CFE[0];


			that.HABILITA_BTN_TENTAR_NOVAMENTE = false;


			obj.setProgressEmissao('Emitindo cupom fiscal...', '60%');
			$("#progressoEmissaoFinal").addClass("progress-bar-striped");

			paran.DADOS_GERAIS.PDV_CFE_ID = obj.RESPONSE_GRAVACAO.ID_RETURN;
			paran.DADOS_GERAIS.VL_IN_FEDERAL = Number(cfe.VL_IN_FEDERAL);
			paran.DADOS_GERAIS.VL_IN_ESTADUAL = Number(cfe.VL_IN_ESTADUAL);
			paran.DADOS_GERAIS.VL_IN_MUNICIPAL = Number(cfe.VL_IN_MUNICIPAL);

			angular.forEach(obj.RESPONSE_GRAVACAO.ITENS, function (data, value) {

				data.TRIBUTACAO_ORIGEM = trim_null(data.TRIBUTACAO_ORIGEM);
				data.TRIBUTACAO_ICMS = trim_null(data.TRIBUTACAO_ICMS).padStart(2, '0');
				data.TRIBUTACAO_PIS = trim_null(data.TRIBUTACAO_PIS).padStart(2, '0');
				data.TRIBUTACAO_COFINS = trim_null(data.TRIBUTACAO_COFINS).padStart(2, '0');

				data.QUANTIDADE = Number(data.QUANTIDADE);
				data.VALOR_UNITARIO = Number(data.VALOR_UNITARIO);
				data.VALOR_TOTAL = Number(data.VALOR_TOTAL);
				data.VALOR_DESCONTO = Number(data.VALOR_DESCONTO);
				data.VALOR_ACRESCIMO = Number(data.VALOR_ACRESCIMO);
				data.VALOR_DESCONTO_RATEIO = Number(data.VALOR_DESCONTO_RATEIO);
				data.VALOR_ACRESCIMO_RATEIO = Number(data.VALOR_ACRESCIMO_RATEIO);
				data.BASECALCULO_ICMS = Number(data.BASECALCULO_ICMS);
				data.PERCENTUAL_BASECALCULO_ICMS = Number(data.PERCENTUAL_BASECALCULO_ICMS);
				data.ALIQUOTA_ICMS = Number(data.ALIQUOTA_ICMS);
				data.ALIQUOTA_PIS = Number(data.ALIQUOTA_PIS);
				data.BASECALCULO_PIS = Number(data.BASECALCULO_PIS);
				data.ALIQUOTA_COFINS = Number(data.ALIQUOTA_COFINS);
				data.BASECALCULO_COFINS = Number(data.BASECALCULO_COFINS);

				data.IN_VL_FEDERAL = Number(data.IN_VL_FEDERAL);
				data.IN_VL_ESTADUAL = Number(data.IN_VL_ESTADUAL);
				data.IN_VL_MUNICIPAL = Number(data.IN_VL_MUNICIPAL);

			});

			paran.ITENS = obj.RESPONSE_GRAVACAO.ITENS;

			gScope.EmissorCFeComunicacaoSefaz.emitirCFE(paran).then(function (dados) {

				that.HABILITA_BTN_TENTAR_NOVAMENTE = false;

				var dadosAtualizar = {};
				dadosAtualizar.PDV_CFE_ID = obj.RESPONSE_GRAVACAO.ID_RETURN;
				dadosAtualizar.XML = dados.xml;
				dadosAtualizar.NUMERO_CFE = dados.ncfe;
				dadosAtualizar.SERIE_MFE = dados.nserie;
				dadosAtualizar.CHAVE_ACESSO = dados.cfe_id;
				dadosAtualizar.DATA_EMISSAO = dados.dt_emi;
				dadosAtualizar.HORA_EMISSAO = dados.hr_emi;

				obj.setProgressEmissao('Cupom fiscal emitido...', '60%');

				obj.updateDadosCFe(dadosAtualizar).then(function (data) {
					obj.finallyImpressaoAndRepsFiscal(dados);
				}, function (dados) {

				});

			}, function (dados) {
				obj.setProgressEmissao('Erro ao emitir cupom fiscal...', '60%');
				that.HABILITA_BTN_TENTAR_NOVAMENTE = true;
				showErro(dados.error);
				$("#progressoEmissaoFinal").removeClass("progress-bar-striped");

				console.log(dados);


			});

		}

		function updateDadosCFe(dados) {

			var that = this;

			return $q(function (resolve, reject) {

				$ajax.post(that.url_update_dados_cfe, dados).then(function (response) {

					console.log("Atualização de Dados do CF-e Realizada");

					resolve(response);
				}, function (e) {

					reject(e);
				});
			});
		}

		function envioRespostaFiscalCupom(paran) {
			var that = this;

			gScope.EmissorCFeComunicacaoSefaz.execEnviarRespostaFiscalCupom(paran).then(function (dados) {
				obj.updateFormasPagamento(dados).then(function (ret) {

					obj.setProgressEmissao('Resposta fiscal realizada com sucesso', '80%');

					obj.setProgressEmissao('Venda realizada com sucesso', '100%');

					showSuccess("Venda realizada com sucesso", true);

					that.finallyVenda();

				}, function (ret) {

					obj.setProgressEmissao('Erro na atualização da resposta fiscal', '80%');

					obj.setProgressEmissao('Venda realizada com sucesso', '100%');

					that.finallyVenda();

				});

			}, function (dados) {

				obj.setProgressEmissao('Erro no envio da resposta fiscal', '80%');

				obj.setProgressEmissao('Venda realizada com sucesso', '100%');

				that.finallyVenda();

			});

		}

		function updateFormasPagamento(dados) {

			var that = this;

			return $q(function (resolve, reject) {

				$ajax.post(that.url_update_formas_pagamento, dados).then(function (response) {

					console.log("Atualização de Resposta Fiscal Realizada");

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});
		}

		function finallyImpressaoAndRepsFiscal(dadosRet) {
			var that = this;

			var paran = {};
			var dadosEstabelecimento = obj.setDadosEstabelecimento();
			paran.CNPJ = dadosEstabelecimento.CNPJ;
			paran.IE = dadosEstabelecimento.IE;
			paran.IM = dadosEstabelecimento.IM;
			paran.CRT = dadosEstabelecimento.CRT;
			paran.XML = dadosRet.xml;
			paran.STATUS = 'E';
			paran.PDV_CFE_ID = obj.RESPONSE_GRAVACAO.ID_RETURN;

			gScope.EmissorCFeComunicacaoSefaz.imprimirCFE(paran).then(function (data) {
				obj.setProgressEmissao('Verificando envio de resposta fiscal...', '80%');

				if (obj.RESPONSE_GRAVACAO.PAGAMENTOS.length > 0) {
					var dadosRespostaFiscal = {};
					dadosRespostaFiscal.ESTABELECIMENTO = obj.setDadosEstabelecimento();

					dadosRespostaFiscal.PAGAMENTOS = obj.RESPONSE_GRAVACAO.PAGAMENTOS;

					dadosRespostaFiscal.DADOS_GERAIS = {};
					dadosRespostaFiscal.DADOS_GERAIS.XML = dadosRet.xml;
					dadosRespostaFiscal.DADOS_GERAIS.PDV_CFE_ID = obj.RESPONSE_GRAVACAO.ID_RETURN;
					dadosRespostaFiscal.DADOS_GERAIS.NUMERO = dadosRet.ncfe;

					obj.envioRespostaFiscalCupom(dadosRespostaFiscal);

				} else {

					obj.setProgressEmissao('Venda realizada com sucesso', '100%');

					showSuccess("Venda realizada com sucesso", true);

					that.finallyVenda();
				}

			}, function (dados) {
				showErro("Erro na impressão do cupom fiscal");
				that.finallyVenda();
				console.log(dados);
			});
		}

		function finallyVenda() {
			var that = this;

			that.RESPONSE_GRAVACAO = {};

			that.SELECTED_ITEM_CFE = {};

			that.PROGRESS_FINAL = false;

			that.HABILITA_GRAVACAO = false;

			obj.setProgressEmissao('', '0%');

			that.cancelarVenda();

			gScope.ConsultaClienteInicial.apagar();

			localStorage.removeItem('OBJ_SELECTED');

			obj.getErrorsRespostaFiscal();
		}

		function getErrorsRespostaFiscal() {

			var that = this;

			var dados = {
				DADOS: {
					CAIXA_ID: obj.DADOS_CAIXA.ID } };



			return $q(function (resolve, reject) {

				$ajax.post(that.url_get_errors_resposta_fiscal, dados).then(function (response) {

					if (response.length > 0) {
						showErro("Existem Cupons Fiscal Pendentes de Resposta Fiscal", true);
					}

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setProgressEmissao(detalhes, percentual) {
			var that = this;

			that.DESC_PERCENTUAL = percentual;
			that.DETALHES_EMISSAO = detalhes;

			$("#progressoEmissaoFinal").css("width", percentual);
		}

		/* DEFINIR DADOS PARA WEBSERVICE */

		function setDadosWebService(e) {
			var dados = {};

			dados.ESTABELECIMENTO = obj.setDadosEstabelecimento();

			dados.DADOS_GERAIS = obj.setDadosGerais();

			dados.PAGAMENTOS = obj.FORMAS_PAGAMENTO_ESCOLHIDAS;

			if (typeof e == 'undefined') {
				dados.ITENS = obj.SELECTED.ITENS;
			}

			return dados;
		}

		function setDadosEstabelecimento() {

			var json = {};
			json.CNPJ = obj.DADOS_CAIXA.CNPJ;
			// json.CNPJ = '08723218000186';
			json.IE = obj.DADOS_CAIXA.IE;
			// json.IE = '562377111111';
			json.IM = obj.DADOS_CAIXA.IM;
			// json.IM = '';
			json.CRT = trim_null(obj.DADOS_CAIXA.REGIME_TRIBUTARIO);

			return json;

		}

		function setDadosGerais() {
			var json = {};
			json.NUMERO = 0;
			json.SERIE = 1;
			json.DESCRICAO_CAIXA = obj.DADOS_CAIXA.DESC_CAIXA_ID + ' - ' + obj.DADOS_CAIXA.DESCRICAO;
			json.DESCRICAO_OPERADOR = obj.DADOS_CAIXA.OPERADOR_ID + ' - ' + obj.DADOS_CAIXA.OPERADOR;
			json.NUMEROCAIXA = obj.DADOS_CAIXA.ID;

			var cpf = '';
			var nome = '';

			if (typeof obj.VENDA.CLIENTE_CPF != 'undefined') {
				cpf = obj.VENDA.CLIENTE_CPF;
				nome = obj.VENDA.CLIENTE_NOME;
			}

			json.PESSOA_CNPJ_CPF = trim_null(cpf);
			json.PESSOA_NOME = trim_null(nome);

			json.TIPO_CLIENTE = obj.TIPO_CLIENTE;

			if (gScope.ConsultaRepresentante.item.selected == true) {
				var representante = gScope.ConsultaRepresentante.item.dados;

				json.REPRESENTANTE_ID = representante.CODIGO;
				json.REPRESENTANTE_COMISSAO = representante.COMISSAO;

			}

			if (gScope.ConsultaVendedor.item.selected == true) {
				var vendedor = gScope.ConsultaVendedor.item.dados;

				json.VENDEDOR_ID = vendedor.CODIGO;
				json.VENDEDOR_COMISSAO = vendedor.COMISSAO;

			}

			var dataHoraServidor = $("#_hora-servidor").val();

			var dateAux = moment(dataHoraServidor);

			json.DATA_EMISSAO = moment(angular.copy(dateAux)).toDate();
			json.FDATA_EMISSAO = moment(json.DATA_EMISSAO).format("DD.MM.YYYY");

			return json;
		}

		function fecharCaixa() {
			var that = this;

			var msg = gScope.Confirme.add(1, 'Confirmação',
			'Deseja realmente fechar esse caixa?', [
			{ desc: 'Não', class: 'btn-danger', ret: '2', hotkey: 'esc', glyphicon: 'fas fa-ban' },
			{ desc: 'Sim', class: 'btn-success', ret: '1', hotkey: 'enter', glyphicon: 'fas fa-check-circle' }],

			[
			function (e, btn) {

			},
			function (e, btn) {
				that.getCaixa();
				obj.SELECTED_ITEM_CFE = {};
				obj.SELECTED = that.setDadosIncluir();
				localStorage.clear();

			}]);

		}

		return EmissorCFe;
	};

})(window, window.angular);

/***/ })

/******/ });