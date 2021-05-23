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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    /* istanbul ignore next */
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.StringMask = factory();
    }
}(this, function() {
    var tokens = {
        '0': {pattern: /\d/, _default: '0'},
        '9': {pattern: /\d/, optional: true},
        '#': {pattern: /\d/, optional: true, recursive: true},
        'A': {pattern: /[a-zA-Z0-9]/},
        'S': {pattern: /[a-zA-Z]/},
        'U': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleUpperCase(); }},
        'L': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleLowerCase(); }},
        '$': {escape: true}
    };

    function isEscaped(pattern, pos) {
        var count = 0;
        var i = pos - 1;
        var token = {escape: true};
        while (i >= 0 && token && token.escape) {
            token = tokens[pattern.charAt(i)];
            count += token && token.escape ? 1 : 0;
            i--;
        }
        return count > 0 && count % 2 === 1;
    }

    function calcOptionalNumbersToUse(pattern, value) {
        var numbersInP = pattern.replace(/[^0]/g,'').length;
        var numbersInV = value.replace(/[^\d]/g,'').length;
        return numbersInV - numbersInP;
    }

    function concatChar(text, character, options, token) {
        if (token && typeof token.transform === 'function') {
            character = token.transform(character);
        }
        if (options.reverse) {
            return character + text;
        }
        return text + character;
    }

    function hasMoreTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && !token.escape ? true : hasMoreTokens(pattern, pos + inc, inc);
    }

    function hasMoreRecursiveTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && token.recursive ? true : hasMoreRecursiveTokens(pattern, pos + inc, inc);
    }

    function insertChar(text, char, position) {
        var t = text.split('');
        t.splice(position, 0, char);
        return t.join('');
    }

    function StringMask(pattern, opt) {
        this.options = opt || {};
        this.options = {
            reverse: this.options.reverse || false,
            usedefaults: this.options.usedefaults || this.options.reverse
        };
        this.pattern = pattern;
    }

    StringMask.prototype.process = function proccess(value) {
        if (!value) {
            return {result: '', valid: false};
        }
        value = value + '';
        var pattern2 = this.pattern;
        var valid = true;
        var formatted = '';
        var valuePos = this.options.reverse ? value.length - 1 : 0;
        var patternPos = 0;
        var optionalNumbersToUse = calcOptionalNumbersToUse(pattern2, value);
        var escapeNext = false;
        var recursive = [];
        var inRecursiveMode = false;

        var steps = {
            start: this.options.reverse ? pattern2.length - 1 : 0,
            end: this.options.reverse ? -1 : pattern2.length,
            inc: this.options.reverse ? -1 : 1
        };

        function continueCondition(options) {
            if (!inRecursiveMode && !recursive.length && hasMoreTokens(pattern2, patternPos, steps.inc)) {
                // continue in the normal iteration
                return true;
            } else if (!inRecursiveMode && recursive.length &&
                hasMoreRecursiveTokens(pattern2, patternPos, steps.inc)) {
                // continue looking for the recursive tokens
                // Note: all chars in the patterns after the recursive portion will be handled as static string
                return true;
            } else if (!inRecursiveMode) {
                // start to handle the recursive portion of the pattern
                inRecursiveMode = recursive.length > 0;
            }

            if (inRecursiveMode) {
                var pc = recursive.shift();
                recursive.push(pc);
                if (options.reverse && valuePos >= 0) {
                    patternPos++;
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                } else if (!options.reverse && valuePos < value.length) {
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                }
            }
            return patternPos < pattern2.length && patternPos >= 0;
        }

        /**
         * Iterate over the pattern's chars parsing/matching the input value chars
         * until the end of the pattern. If the pattern ends with recursive chars
         * the iteration will continue until the end of the input value.
         *
         * Note: The iteration must stop if an invalid char is found.
         */
        for (patternPos = steps.start; continueCondition(this.options); patternPos = patternPos + steps.inc) {
            // Value char
            var vc = value.charAt(valuePos);
            // Pattern char to match with the value char
            var pc = pattern2.charAt(patternPos);

            var token = tokens[pc];
            if (recursive.length && token && !token.recursive) {
                // In the recursive portion of the pattern: tokens not recursive must be seen as static chars
                token = null;
            }

            // 1. Handle escape tokens in pattern
            // go to next iteration: if the pattern char is a escape char or was escaped
            if (!inRecursiveMode || vc) {
                if (this.options.reverse && isEscaped(pattern2, patternPos)) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this.options, token);
                    // skip escape token
                    patternPos = patternPos + steps.inc;
                    continue;
                } else if (!this.options.reverse && escapeNext) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this.options, token);
                    escapeNext = false;
                    continue;
                } else if (!this.options.reverse && token && token.escape) {
                    // mark to escape the next pattern char
                    escapeNext = true;
                    continue;
                }
            }

            // 2. Handle recursive tokens in pattern
            // go to next iteration: if the value str is finished or
            //                       if there is a normal token in the recursive portion of the pattern
            if (!inRecursiveMode && token && token.recursive) {
                // save it to repeat in the end of the pattern and handle the value char now
                recursive.push(pc);
            } else if (inRecursiveMode && !vc) {
                // in recursive mode but value is finished. Add the pattern char if it is not a recursive token
                formatted = concatChar(formatted, pc, this.options, token);
                continue;
            } else if (!inRecursiveMode && recursive.length > 0 && !vc) {
                // recursiveMode not started but already in the recursive portion of the pattern
                continue;
            }

            // 3. Handle the value
            // break iterations: if value is invalid for the given pattern
            if (!token) {
                // add char of the pattern
                formatted = concatChar(formatted, pc, this.options, token);
                if (!inRecursiveMode && recursive.length) {
                    // save it to repeat in the end of the pattern
                    recursive.push(pc);
                }
            } else if (token.optional) {
                // if token is optional, only add the value char if it matchs the token pattern
                //                       if not, move on to the next pattern char
                if (token.pattern.test(vc) && optionalNumbersToUse) {
                    formatted = concatChar(formatted, vc, this.options, token);
                    valuePos = valuePos + steps.inc;
                    optionalNumbersToUse--;
                } else if (recursive.length > 0 && vc) {
                    valid = false;
                    break;
                }
            } else if (token.pattern.test(vc)) {
                // if token isn't optional the value char must match the token pattern
                formatted = concatChar(formatted, vc, this.options, token);
                valuePos = valuePos + steps.inc;
            } else if (!vc && token._default && this.options.usedefaults) {
                // if the token isn't optional and has a default value, use it if the value is finished
                formatted = concatChar(formatted, token._default, this.options, token);
            } else {
                // the string value don't match the given pattern
                valid = false;
                break;
            }
        }

        return {result: formatted, valid: valid};
    };

    StringMask.prototype.apply = function(value) {
        return this.process(value).result;
    };

    StringMask.prototype.validate = function(value) {
        return this.process(value).valid;
    };

    StringMask.process = function(value, pattern, options) {
        return new StringMask(pattern, options).process(value);
    };

    StringMask.apply = function(value, pattern, options) {
        return new StringMask(pattern, options).apply(value);
    };

    StringMask.validate = function(value, pattern, options) {
        return new StringMask(pattern, options).validate(value);
    };

    return StringMask;
}));


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(56);
module.exports = __webpack_require__(57);


/***/ }),

/***/ 53:
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
'Lancamentos',
'LancamentoItens',
'LancamentoAlunos',
'LancamentoClientes',
'Confirmacao',
'Devices'];


function Ctrl(
$scope,
$timeout,
gScope,
Consulta,
Lancamentos,
LancamentoItens,
LancamentoAlunos,
LancamentoClientes,
Confirmacao,
Devices)
{

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.Lancamentos = new Lancamentos($scope);
	vm.LancamentoItens = new LancamentoItens($scope);
	vm.LancamentoAlunos = new LancamentoAlunos($scope);
	vm.LancamentoClientes = new LancamentoClientes($scope);
	vm.Confirmacao = new Confirmacao();
	vm.Devices = new Devices();
	vm.Confirme = vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme = vm.Confirme;
	gScope.Devices = vm.Devices;

	vm.Lancamentos.consultar();
	vm.LancamentoItens.compileDatatable();

	// Consulta Perfil
	vm.ConsultaPerfil = vm.Consulta.getNew(true);
	vm.ConsultaPerfil.componente = '.consulta-perfil';
	vm.ConsultaPerfil.option.class = 'consulta-perfil-c';
	vm.ConsultaPerfil.model = 'vm.ConsultaPerfil';
	vm.ConsultaPerfil.option.label_descricao = 'Perfil: ';
	vm.ConsultaPerfil.option.obj_consulta = '/admin/funcionalidades/consultas/Perfil';
	vm.ConsultaPerfil.option.tamanho_tabela = '100%';
	vm.ConsultaPerfil.option.required = false;
	vm.ConsultaPerfil.autoload = false;
	vm.ConsultaPerfil.cache = false;
	vm.ConsultaPerfil.option.infinite_scroll = true;
	vm.ConsultaPerfil.option.obj_ret = ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaPerfil.option.campos_tabela = [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO']];
	vm.ConsultaPerfil.option.filtro_sql = {};

	vm.ConsultaPerfil.compile();

	vm.Lancamentos.consultas.push({ OBJ: vm.ConsultaPerfil, NOME: 'PERFIL' });


	vm.ConsultaPerfil.onSelect = function (item) {

		if (vm.ConsultaPerfil.item.selected == true) {
			if (Number(item.VALOR) > 0) {
				vm.Lancamentos.SELECTED.VALOR_TOTAL = item.VALOR;
			}

			if (item.DESCRICAO_PADRAO != '' && item.DESCRICAO_PADRAO != null) {
				vm.Lancamentos.SELECTED.DESCRICAO = item.DESCRICAO_PADRAO;
			}

			vm.Lancamentos.SELECTED.TIPO = Number(item.TIPO_LANCAMENTO);

			if (item.MODULO_CONTA_JSON != '') {
				var jsonModuloConta = JSON.parse(item.MODULO_CONTA_JSON);

				if (typeof jsonModuloConta.DESC_ID != 'undefined' && jsonModuloConta.ID != '') {
					gScope.ConsultaModuloContaItem.setSelected(jsonModuloConta);
				}
			}

			if (item.TIPO_DOCUMENTO_JSON != '') {
				var jsonTipoDocumento = JSON.parse(item.TIPO_DOCUMENTO_JSON);

				if (typeof jsonTipoDocumento.DESC_ID != 'undefined' && jsonTipoDocumento.ID != '') {
					gScope.ConsultaTipoDocumento.setSelected(jsonTipoDocumento);
				}
			}

			if (item.CONTA_BANCARIA_JSON != '') {
				var jsonContaBancaria = JSON.parse(item.CONTA_BANCARIA_JSON);

				if (typeof jsonContaBancaria.DESC_ID != 'undefined' && jsonContaBancaria.ID != '') {
					gScope.ConsultaContaBancaria.setSelected(jsonContaBancaria);
				}
			}
		}

	};

	vm.ConsultaPerfil.onClear = function (item) {

	};

	gScope.ConsultaPerfil = vm.ConsultaPerfil;

	// Consulta Tipo Documento
	vm.ConsultaTipoDocumento = vm.Consulta.getNew(true);
	vm.ConsultaTipoDocumento.componente = '.consulta-tipo-documento';
	vm.ConsultaTipoDocumento.option.class = 'consulta-tipo-documento-c';
	vm.ConsultaTipoDocumento.model = 'vm.ConsultaTipoDocumento';
	vm.ConsultaTipoDocumento.option.label_descricao = 'Tipo Documento: ';
	vm.ConsultaTipoDocumento.option.obj_consulta = '/admin/funcionalidades/consultas/TipoDocumento';
	vm.ConsultaTipoDocumento.option.tamanho_tabela = '100%';
	vm.ConsultaTipoDocumento.option.required = true;
	vm.ConsultaTipoDocumento.autoload = false;
	vm.ConsultaTipoDocumento.cache = false;
	vm.ConsultaTipoDocumento.option.infinite_scroll = true;
	vm.ConsultaTipoDocumento.option.obj_ret = ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaTipoDocumento.option.campos_tabela = [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO']];
	vm.ConsultaTipoDocumento.option.filtro_sql = {};

	vm.ConsultaTipoDocumento.compile();
	vm.Lancamentos.consultas.push({ OBJ: vm.ConsultaTipoDocumento, NOME: 'TIPO_DOCUMENTO' });

	vm.ConsultaTipoDocumento.onSelect = function (item) {

	};

	vm.ConsultaTipoDocumento.onClear = function (item) {

	};

	gScope.ConsultaTipoDocumento = vm.ConsultaTipoDocumento;

	// Consulta Conta
	vm.ConsultaModuloContaItem = vm.Consulta.getNew(true);
	vm.ConsultaModuloContaItem.componente = '.consulta-modulo-conta-item';
	vm.ConsultaModuloContaItem.option.class = 'consulta-modulo-conta-item-c';
	vm.ConsultaModuloContaItem.model = 'vm.ConsultaModuloContaItem';
	vm.ConsultaModuloContaItem.option.label_descricao = 'Módulo de Conta: ';
	vm.ConsultaModuloContaItem.option.obj_consulta = '/admin/funcionalidades/consultas/ModuloContaItem';
	vm.ConsultaModuloContaItem.option.tamanho_tabela = '100%';
	vm.ConsultaModuloContaItem.option.required = true;
	vm.ConsultaModuloContaItem.autoload = false;
	vm.ConsultaModuloContaItem.cache = false;
	vm.ConsultaModuloContaItem.option.infinite_scroll = true;
	vm.ConsultaModuloContaItem.option.obj_ret = ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaModuloContaItem.option.campos_tabela = [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO'], ['DESC_MC', 'MODELO'], ['DESC_MC_TIPO', 'TIPO']];
	vm.ConsultaModuloContaItem.option.filtro_sql = {};

	vm.ConsultaModuloContaItem.compile();

	vm.Lancamentos.consultas.push({ OBJ: vm.ConsultaModuloContaItem, NOME: 'MODULO_CONTA_ITEM' });


	vm.ConsultaModuloContaItem.onSelect = function (item) {

	};

	vm.ConsultaModuloContaItem.onClear = function (item) {

	};

	gScope.ConsultaModuloContaItem = vm.ConsultaModuloContaItem;

	// Consulta Conta
	vm.ConsultaContaBancaria = vm.Consulta.getNew(true);
	vm.ConsultaContaBancaria.componente = '.consulta-conta-bancaria';
	vm.ConsultaContaBancaria.option.class = 'consulta-conta-bancaria-c';
	vm.ConsultaContaBancaria.model = 'vm.ConsultaContaBancaria';
	vm.ConsultaContaBancaria.option.label_descricao = 'Conta bancária: ';
	vm.ConsultaContaBancaria.option.obj_consulta = '/admin/funcionalidades/consultas/ContaBancaria';
	vm.ConsultaContaBancaria.option.tamanho_tabela = '100%';
	vm.ConsultaContaBancaria.option.required = false;
	vm.ConsultaContaBancaria.autoload = false;
	vm.ConsultaContaBancaria.cache = false;
	vm.ConsultaContaBancaria.option.infinite_scroll = true;
	vm.ConsultaContaBancaria.option.obj_ret = ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaContaBancaria.option.campos_tabela = [['DESC_ID', 'ID'], ['DESC_CONTA', 'DESCRIÇÃO']];
	vm.ConsultaContaBancaria.option.filtro_sql = {};

	vm.ConsultaContaBancaria.compile();

	vm.Lancamentos.consultas.push({ OBJ: vm.ConsultaContaBancaria, NOME: 'CONTA_BANCARIA' });


	vm.ConsultaContaBancaria.onSelect = function (item) {

	};

	vm.ConsultaContaBancaria.onClear = function (item) {

	};

	gScope.ConsultaContaBancaria = vm.ConsultaContaBancaria;



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
	gScope.Lancamentos = vm.Lancamentos;
	gScope.LancamentoItens = vm.LancamentoItens;
	gScope.LancamentoAlunos = vm.LancamentoAlunos;
	gScope.LancamentoClientes = vm.LancamentoClientes;


	$('.filter_on_enter').keyup(function (event) {
		var key = event.keyCode;

		if (key == 13) {
			vm.Lancamentos.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.Lancamentos.consultar();
		}
	});

	$.key("delete", function (e) {
		if (!$(".modal").is(':visible')) {
			if ($("#dataTableLancamentos tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.Lancamentos.DATATABLE.row("#dataTableLancamentos tbody tr.row_selected").data();
				vm.Lancamentos.SELECTED = data;

				$timeout(function () {
					$scope.$apply(function () {
						vm.Lancamentos.excluir();
					});
				});

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
		}

	});

	$.key("esc", function (e) {
		if ($(".modal.in.confirm:visible").length > 0) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			$(".modal.in.confirm button[data-hotkey=esc]:visible:enabled").first().trigger('click');

			$timeout(function () {
				onFocusInputModal("#modalLancamentos");
			});
		} else {
			if ($(".modal:visible").length > 0) {

				if ($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')) {
					var idModal = $(".modal:visible").last().attr("id");
					$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');

					$timeout(function () {
						onFocusInputModal("#modalLancamentos");
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
		}

	});

	$.key("down", function (e) {

		if ($("#tableConsulta tbody tr.selected").length == 1) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var elementConsulta = $("#tableConsulta tbody tr.selected");

			$(elementConsulta.next()[0]).focus();
		}
	});
}

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('Lancamentos', Lancamentos);

	Lancamentos.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function Lancamentos($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function Lancamentos($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.Lancamentos';

			obj.url_consultar = urlhost + '/admin/funcionalidades/lancamentos/get';
			obj.url_gravar = urlhost + '/admin/funcionalidades/lancamentos/post';
			obj.url_excluir = urlhost + '/admin/funcionalidades/lancamentos/delete';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];
			obj.BACKUP_ITENS = [];
			obj.consultas = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.MODAL = "#modalLancamentos";

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
		}

		function setDadosIncluir() {

			var dataAtual = new Date();

			var date = moment(dataAtual).toDate();

			var dados = {
				VALOR_TOTAL: 0,
				DESCRICAO: '',
				DATA: date,
				DATA_VENCIMENTO: date,
				DATA_RECEB_PAG: date,
				STATUS: 0,
				TIPO: 0 };


			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					consulta.OBJ.apagar();
					consulta.OBJ.Input.disabled = false;
					consulta.OBJ.btn_filtro.disabled = false;
				});
			}

			$(obj.MODAL).modal('show');

			$timeout(function () {
				onFocusInputModal(obj.MODAL);
			}, 200);
		}

		function gravar() {

			var that = this;

			var check = true;

			if (that.SELECTED.VALOR_TOTAL == 0) {
				check = false;
				showErro("Valor total obrigatório");
			}

			if (that.SELECTED.DESCRICAO == '' || that.SELECTED.DESCRICAO == null) {
				check = false;
				showErro("Descrição obrigatória");
			}

			if (gScope.ConsultaModuloContaItem.item.selected == false) {
				check = false;
				showErro("Módulo de conta obrigatório");
				gScope.ConsultaModuloContaItem.setFocusInput();
			}

			if (gScope.ConsultaTipoDocumento.item.selected == false) {
				check = false;
				showErro("Tipo do documento obrigatório");
				gScope.ConsultaTipoDocumento.setFocusInput();
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

			var perfilID = 0;
			if (gScope.ConsultaPerfil.item.selected == true) {
				perfilID = gScope.ConsultaPerfil.item.dados.ID;
			}

			var moduloContaItem = 0;
			if (gScope.ConsultaModuloContaItem.item.selected == true) {
				moduloContaItem = gScope.ConsultaModuloContaItem.item.dados.ID;
			}

			var tipoDocumento = 0;
			if (gScope.ConsultaTipoDocumento.item.selected == true) {
				tipoDocumento = gScope.ConsultaTipoDocumento.item.dados.ID;
			}

			var contaBancaria = 0;
			if (gScope.ConsultaContaBancaria.item.selected == true) {
				contaBancaria = gScope.ConsultaContaBancaria.item.dados.ID;
			}

			obj.SELECTED.PERFIL_ID = perfilID;
			obj.SELECTED.MODULO_CONTA_ITEM_ID = moduloContaItem;
			obj.SELECTED.MODULO_CONTA_TIPO_ID = gScope.ConsultaModuloContaItem.item.dados.MODULO_CONTA_TIPO_ID;
			obj.SELECTED.TIPO_DOCUMENTO_ID = tipoDocumento;
			obj.SELECTED.CONTA_BANCARIA_ID = contaBancaria;

			obj.SELECTED.FDATA = moment(obj.SELECTED.DATA).format('YYYY-MM-DD');
			obj.SELECTED.FDATA = obj.SELECTED.FDATA == 'Invalid date' ? null : obj.SELECTED.FDATA;

			obj.SELECTED.FDATA_VENCIMENTO = moment(obj.SELECTED.DATA_VENCIMENTO).format('YYYY-MM-DD');
			obj.SELECTED.FDATA_VENCIMENTO = obj.SELECTED.FDATA_VENCIMENTO == 'Invalid date' ? null : obj.SELECTED.FDATA_VENCIMENTO;

			obj.SELECTED.FDATA_RECEB_PAG = moment(obj.SELECTED.DATA_RECEB_PAG).format('YYYY-MM-DD');
			obj.SELECTED.FDATA_RECEB_PAG = obj.SELECTED.FDATA_RECEB_PAG == 'Invalid date' ? null : obj.SELECTED.FDATA_RECEB_PAG;

			obj.SELECTED.GRAVAR_ITENS = gScope.LancamentoItens.DADOS;
			obj.SELECTED.ITENS_EXCLUIDOS = gScope.LancamentoItens.ITENS_EXCLUIDOS;

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
							if (item[obj.CAMPO_INDEX] == response.ID) {
								index = value;
							}
						});

						if (index >= 0) {
							obj.DADOS.splice(index, 1);
						}
					}

					obj.SELECTED = response;

					obj.DADOS.push(obj.SELECTED);

					showSuccess(msg);

					$(obj.MODAL).modal('hide');

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

					$(obj.MODAL).modal('hide');
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

				$(obj.MODAL).modal('hide');
			} else {
				obj.insertConsultas();
			}

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar() {
			var that = this;

			var check = true;

			if (check == true) {
				obj.INCLUINDO = false;
				obj.ALTERANDO = true;

				obj.BACKUP = angular.copy(obj.SELECTED);

				if (that.consultas.length > 0) {
					angular.forEach(that.consultas, function (consulta, key) {
						if (typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true) {
							consulta.OBJ.btn_apagar_filtro.disabled = false;
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;
						}
					});
				}

				$(obj.MODAL).modal('show');

				$timeout(function () {
					onFocusInputModal(obj.MODAL);
				}, 200);
			}
		}

		function visualizar(index) {
			var that = this;

			var item = obj.SELECTED;

			if (typeof index != 'undefined') {
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			obj.insertConsultas();

			if (obj.SELECTED.TIPO != 0) {
				gScope.LancamentoItens.consultar();
			}

			$(obj.MODAL).modal('show');
		}

		function insertConsultas() {
			var that = this;

			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					var nome = consulta.NOME;

					if (typeof that.SELECTED[nome + '_JSON'] != 'undefined' && that.SELECTED[nome + '_JSON'] != '' && that.SELECTED[nome + '_JSON'] != null) {

						var jsonX = JSON.parse(that.SELECTED[nome + '_JSON']);

						if (typeof jsonX.ID != 'undefined' && jsonX.ID != '' && jsonX.ID != null) {
							consulta.OBJ.setSelected(jsonX);
						}

						consulta.OBJ.Input.disabled = true;
						consulta.OBJ.btn_filtro.disabled = true;

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

			// dados.FILTRO.FILTRO_TABELA_PRECO			= gScope.ConsultaTabelaPrecoFiltro.item.dados.ID;
			// dados.FILTRO.FILTRO_CLIENTE					= gScope.ConsultaClienteFiltro.item.dados.CODIGO;

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

			var StringMask = __webpack_require__(0);

			if (obj.DATATABLE == null) {
				obj.DATATABLE = $('#dataTableLancamentos').DataTable({
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
					{ "data": "ID", "title": 'ID',
						render: function render(data, type, row) {
							return trim_null(row.ID).padStart(5, '0');
						} },

					{ "data": "DESCRICAO", "title": 'Descrição',
						render: function render(data, type, row) {
							return row.DESCRICAO;
						} },

					{ "data": "MODULO_CONTA_ITEM_ID", "title": 'Conta',
						render: function render(data, type, row) {
							return row.DESC_MODULO_CONTA;
						} },

					{ "data": "VALOR_TOTAL", "title": 'Valor Total',
						render: function render(data, type, row) {
							return number_format(row.VALOR_TOTAL, 2, ',', '.');
						} },

					{ "data": "DATA", "title": 'Data',
						render: function render(data, type, row) {
							return moment(row.DATA).format('DD/MM/YYYY');
						} },

					{ "data": "STATUS", "title": 'Status',
						render: function render(data, type, row) {
							var html = '';

							if (data == 0) {
								html = '<div class="badge badge-green mr-3 text-small">PAGO</div>';
							} else if (data == 1) {
								html = '<div class="badge badge-danger mr-3 text-small">RECEBIDO</div>';
							}

							return html;
						} },

					{ "data": "ACTIONS", "title": 'Opções', 'className': 'text-center',
						render: function render(data, type, full, meta) {
							var html = '';

							var index = meta.row;

							html = html + '\n\t\t\t\t\t\t\t\t<button type="button" class="btn btn-sm btn-danger" ng-click="vm.Lancamentos.excluir(' +
							index + ');" ng-dblclick="$event.stopPropagation();">\n\t\t\t\t\t\t\t\t\t<span class="fas fa-trash"></span>\n\t\t\t\t\t\t\t\t</button>';



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

						// if(data[obj.CAMPO_INDEX] == obj.SELECTED[obj.CAMPO_INDEX]){
						// 	$(row).addClass('row_selected');
						// }

						$(row).on('dblclick', function () {
							obj.SELECTED = data;

							$timeout(function () {
								obj.visualizar();

								// obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
								// $(row).addClass('row_selected');
							});
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

		return Lancamentos;
	};

})(window, window.angular);

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('LancamentoItens', LancamentoItens);

	LancamentoItens.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function LancamentoItens($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function LancamentoItens($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.LancamentoItens';

			obj.url_consultar = urlhost + '/admin/funcionalidades/lancamento-itens/get';
			obj.url_gravar = urlhost + '/admin/funcionalidades/lancamento-itens/post';
			obj.url_excluir = urlhost + '/admin/funcionalidades/lancamento-itens/delete';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];
			obj.BACKUP_ITENS = [];
			obj.consultas = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.MODAL = "#modalLancamentoItens";

			obj.ITENS_EXCLUIDOS = [];

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
			obj.calculateNewTotal = calculateNewTotal;
		}

		function setDadosIncluir() {

			var dados = {
				DESCRICAO: '' };


			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					consulta.OBJ.apagar();
					consulta.OBJ.Input.disabled = false;
					consulta.OBJ.btn_filtro.disabled = false;
				});
			}

			$(obj.MODAL).modal('show');

			$timeout(function () {
				onFocusInputModal(obj.MODAL);
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

				that.confirmarGravar();

				// var msg = gScope.Confirme.add(1,'Confirmação',
				// 'Deseja realmente gravar esse registro?' , [
				// 	{desc:'Não' 	,	class:'btn-danger' ,	ret:'2',	hotkey:'esc' 	,	glyphicon:'fas fa-ban'       	},
				// 	{desc:'Sim'     ,	class:'btn-success',	ret:'1',	hotkey:'enter' 	,	glyphicon:'fas fa-check-circle' }

				// ],[
				// 	function (e, btn){ 
				// 	},
				// 	function (e, btn){ 

				// 	}
				// ]);
			}

		}

		function confirmarGravar() {
			var that = this;

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
							if (item[obj.CAMPO_INDEX] == response.ID) {
								index = value;
							}
						});

						if (index >= 0) {
							obj.DADOS.splice(index, 1);
						}
					}

					obj.SELECTED = response;

					obj.DADOS.push(obj.SELECTED);

					showSuccess(msg);

					$(obj.MODAL).modal('hide');

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

			var index = -1;
			var data = {};

			angular.forEach(obj.DADOS, function (item, value) {
				if (item[obj.CAMPO_INDEX] == obj.SELECTED.ID) {
					index = value;
					data = item;
				}
			});

			if (index >= 0) {
				if (typeof data.LANC_ID != 'undefined' && data.LANC_ID > 0) {
					obj.ITENS_EXCLUIDOS.push(angular.copy(data));
				}

				obj.DADOS.splice(index, 1);
			}

			obj.compileDatatable();

			obj.SELECTED = {};

			obj.calculateNewTotal();

			showSuccess("Registro excluído com sucesso");

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

				$(obj.MODAL).modal('hide');
			} else {
				obj.insertConsultas();
			}

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar() {
			var that = this;

			var check = true;

			if (check == true) {
				obj.INCLUINDO = false;
				obj.ALTERANDO = true;

				obj.BACKUP = angular.copy(obj.SELECTED);

				if (that.consultas.length > 0) {
					angular.forEach(that.consultas, function (consulta, key) {
						if (typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true) {
							consulta.OBJ.btn_apagar_filtro.disabled = false;
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;
						}
					});
				}

				$(obj.MODAL).modal('show');

				$timeout(function () {
					onFocusInputModal(obj.MODAL);
				}, 200);
			}
		}

		function visualizar(index) {
			var that = this;

			var item = obj.SELECTED;

			if (typeof index != 'undefined') {
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			obj.insertConsultas();

			$(obj.MODAL).modal('show');
		}

		function insertConsultas() {
			var that = this;

			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					var nome = consulta.NOME;

					if (typeof that.SELECTED[nome + '_JSON'] != 'undefined' && that.SELECTED[nome + '_JSON'] != '' && that.SELECTED[nome + '_JSON'] != null) {

						var jsonX = JSON.parse(that.SELECTED[nome + '_JSON']);

						if (typeof jsonX.ID != 'undefined' && jsonX.ID != '' && jsonX.ID != null) {
							consulta.OBJ.setSelected(jsonX);
						}

						consulta.OBJ.Input.disabled = true;
						consulta.OBJ.btn_filtro.disabled = true;

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

			dados.FILTRO.LANCAMENTO_ID = gScope.Lancamentos.SELECTED.ID;
			dados.DADOS.LANCAMENTO_ID = gScope.Lancamentos.SELECTED.ID;
			// dados.FILTRO.FILTRO_CLIENTE					= gScope.ConsultaClienteFiltro.item.dados.CODIGO;

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

			var StringMask = __webpack_require__(0);

			if (obj.DATATABLE == null) {
				obj.DATATABLE = $('#dataTableLancamentoItens').DataTable({
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
					{ "data": "LANC_ID", "title": 'ID',
						render: function render(data, type, row) {
							var str = '';

							if (row.DESC_LANC_ID != '') {
								str = trim_null(row.DESC_LANC_ID).padStart(4, '0');
							}

							return str;
						} },

					{ "data": "NOME", "title": 'Nome',
						render: function render(data, type, row) {
							return row.NOME;
						} },

					{ "data": "VALOR", "title": 'Valor',
						render: function render(data, type, row) {
							return 'R$ ' + number_format(row.VALOR, 2, ',', '.');
						} },

					{ "data": "ACTIONS", "title": 'Opções', 'className': 'text-center',
						render: function render(data, type, full, meta) {
							var html = '';

							var index = meta.row;

							html = html + '\n\t\t\t\t\t\t\t\t<button type="button" class="btn btn-sm btn-danger" ng-click="vm.LancamentoItens.excluir(' +
							index + ');" ng-dblclick="$event.stopPropagation();">\n\t\t\t\t\t\t\t\t\t<span class="fas fa-trash"></span>\n\t\t\t\t\t\t\t\t</button>';



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

						// if(data[obj.CAMPO_INDEX] == obj.SELECTED[obj.CAMPO_INDEX]){
						// 	$(row).addClass('row_selected');
						// }

						// $(row).on('dblclick', function () {
						// 	obj.SELECTED = data;

						// 	$timeout(function (){
						// 		obj.visualizar();

						// 		obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
						// 		$(row).addClass('row_selected');
						// 	});
						// });

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

		function calculateNewTotal() {
			var valorTotal = numeral(0);

			angular.forEach(obj.DADOS, function (item, value) {
				valorTotal = angular.copy(valorTotal).add(angular.copy(item.VALOR));
			});

			valorTotal = Number(Number(valorTotal.value()).toFixed(2));

			gScope.Lancamentos.SELECTED.VALOR_TOTAL = valorTotal;
		}

		return LancamentoItens;
	};

})(window, window.angular);

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('LancamentoAlunos', LancamentoAlunos);

	LancamentoAlunos.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function LancamentoAlunos($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function LancamentoAlunos($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.LancamentoAlunos';

			obj.url_consultar = urlhost + '/admin/funcionalidades/alunos/get';
			obj.url_gravar = urlhost + '/admin/funcionalidades/lancamento-alunos/post';
			obj.url_excluir = urlhost + '/admin/funcionalidades/lancamento-alunos/delete';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];
			obj.BACKUP_ITENS = [];
			obj.consultas = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.VALOR_PADRAO = 0;

			obj.FILTRO_ALUNO = '';

			obj.MODAL = "#modalLancamentoAlunos";

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
			obj.keyUPSearchAlunos = keyUPSearchAlunos;
		}

		function setDadosIncluir() {

			var dados = {
				DESCRICAO: '' };


			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.FILTRO_ALUNO = '';

			that.consultar();

			$(obj.MODAL).modal('show');

			$timeout(function () {
				onFocusInputModal(obj.MODAL);
			}, 200);
		}

		function gravar() {

			var that = this;

			var check = true;

			var rows_selected = obj.DATATABLE.rows('.selected').data();

			if (obj.VALOR_PADRAO == 0 || obj.VALOR_PADRAO == '' || obj.VALOR_PADRAO == null) {
				check = false;
				showErro("Valor padrão para alunos inválido");
			}

			if (rows_selected.length == 0) {
				check = false;
				showErro("Nenhum aluno selecionado");

			}

			if (check == true) {
				that.confirmarGravar();
			}

		}

		function confirmarGravar() {
			var that = this;

			var rows_selected = obj.DATATABLE.rows('.selected').data();

			angular.forEach(rows_selected, function (item, value) {
				item.DESC_LANC_ID = '';
				item.LANC_ID = -1;
				item.ALUNO_ID = angular.copy(item.ID);
				item.VALOR = angular.copy(obj.VALOR_PADRAO);
				gScope.LancamentoItens.DADOS.push(angular.copy(item));
			});

			obj.VALOR_PADRAO = 0;

			gScope.LancamentoItens.compileDatatable();

			that.FILTRO_ALUNO = '';

			obj.DADOS = [];

			obj.compileDatatable();

			gScope.LancamentoItens.calculateNewTotal();

			$(obj.MODAL).modal('hide');



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

					$(obj.MODAL).modal('hide');
					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function cancelar() {
			var that = this;

			obj.DADOS = [];

			obj.compileDatatable();

			$(obj.MODAL).modal('hide');

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			// var msg = gScope.Confirme.add(1,'Confirmação',
			// 'Deseja realmente cancelar essa operação?' , [
			// 	{desc:'Não' 	,	class:'btn-danger' ,	ret:'2',	hotkey:'esc' 	,	glyphicon:'fas fa-ban'       	},
			// 	{desc:'Sim'     ,	class:'btn-success',	ret:'1',	hotkey:'enter' 	,	glyphicon:'fas fa-check-circle' }

			//   ],[
			// 	function (e, btn){ 

			// 	},
			// 	function (e, btn){ 
			// 		that.confirmarCancelar();
			// 	}
			// ]);
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

				$(obj.MODAL).modal('hide');
			} else {
				obj.insertConsultas();
			}

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar() {
			var that = this;

			var check = true;

			if (check == true) {
				obj.INCLUINDO = false;
				obj.ALTERANDO = true;

				obj.BACKUP = angular.copy(obj.SELECTED);

				if (that.consultas.length > 0) {
					angular.forEach(that.consultas, function (consulta, key) {
						if (typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true) {
							consulta.OBJ.btn_apagar_filtro.disabled = false;
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;
						}
					});
				}

				$(obj.MODAL).modal('show');

				$timeout(function () {
					onFocusInputModal(obj.MODAL);
				}, 200);
			}
		}

		function visualizar(index) {
			var that = this;

			var item = obj.SELECTED;

			if (typeof index != 'undefined') {
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			obj.insertConsultas();

			$(obj.MODAL).modal('show');
		}

		function insertConsultas() {
			var that = this;

			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					var nome = consulta.NOME;

					if (typeof that.SELECTED[nome + '_JSON'] != 'undefined' && that.SELECTED[nome + '_JSON'] != '' && that.SELECTED[nome + '_JSON'] != null) {

						var jsonX = JSON.parse(that.SELECTED[nome + '_JSON']);

						if (typeof jsonX.ID != 'undefined' && jsonX.ID != '' && jsonX.ID != null) {
							consulta.OBJ.setSelected(jsonX);
						}

						consulta.OBJ.Input.disabled = true;
						consulta.OBJ.btn_filtro.disabled = true;

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

			if (gScope.LancamentoItens.DADOS.length > 0) {

			}
			// dados.FILTRO.MODULO_CONTA			= gScope.Lancamentos.SELECTED.ID;
			// dados.DADOS.MODULO_CONTA			= gScope.Lancamentos.SELECTED.ID;
			// dados.FILTRO.FILTRO_CLIENTE					= gScope.ConsultaClienteFiltro.item.dados.CODIGO;

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

			var StringMask = __webpack_require__(0);

			if (obj.DATATABLE == null) {
				obj.DATATABLE = $('#dataTableLancamentoAlunos').DataTable({
					"order": [[0, 'desc']],
					"searching": true,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function drawCallback() {
						$('.popoverCFe').popover({
							"html": true });

					},
					select: {
						style: 'multi',
						selector: 'td:first-child' },

					'columnDefs': [
					{
						orderable: false,
						className: 'select-checkbox',
						targets: 0,
						defaultContent: '' }],


					"columns": [
					{ "data": null },
					{ "data": "ID", "title": 'ID',
						render: function render(data, type, row) {
							return trim_null(row.ID).padStart(5, '0');
						} },

					{ "data": "NOME", "title": 'Nome',
						render: function render(data, type, row) {
							return row.NOME;
						} },

					{ "data": "CELULAR", "title": 'Celular',
						render: function render(data, type, row) {


							var formatter = {};

							formatter = new StringMask('(00) 00000-0000');

							var celular = formatter.apply(data);

							return celular;

						} }],


					createdRow: function createdRow(row, data, dataIndex) {

						// if(data[obj.CAMPO_INDEX] == obj.SELECTED[obj.CAMPO_INDEX]){
						// 	$(row).addClass('row_selected');
						// }

						// $(row).on('dblclick', function () {
						// 	obj.SELECTED = data;

						// 	$timeout(function (){
						// 		obj.visualizar();

						// 		obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
						// 		$(row).addClass('row_selected');
						// 	});
						// });

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

		function keyUPSearchAlunos(event) {
			var that = this;

			$timeout(function () {
				$rootScope.$apply(function () {
					obj.DATATABLE.search(that.FILTRO_ALUNO).draw();
				});
			});
		}

		return LancamentoAlunos;
	};

})(window, window.angular);

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('LancamentoClientes', LancamentoClientes);

	LancamentoClientes.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function LancamentoClientes($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function LancamentoClientes($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.LancamentoClientes';

			obj.url_consultar = urlhost + '/admin/funcionalidades/clientes/get';
			obj.url_gravar = urlhost + '/admin/funcionalidades/lancamento-clientes/post';
			obj.url_excluir = urlhost + '/admin/funcionalidades/lancamento-clientes/delete';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];
			obj.BACKUP_ITENS = [];
			obj.consultas = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.VALOR_PADRAO = 0;

			obj.FILTRO_CLIENTE = '';

			obj.MODAL = "#modalLancamentoClientes";

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
			obj.keyUPSearchClientes = keyUPSearchClientes;
		}

		function setDadosIncluir() {

			var dados = {
				DESCRICAO: '' };


			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.FILTRO_CLIENTE = '';

			that.consultar();

			$(obj.MODAL).modal('show');

			$timeout(function () {
				onFocusInputModal(obj.MODAL);
			}, 200);
		}

		function gravar() {

			var that = this;

			var check = true;

			var rows_selected = obj.DATATABLE.rows('.selected').data();

			if (obj.VALOR_PADRAO == 0 || obj.VALOR_PADRAO == '' || obj.VALOR_PADRAO == null) {
				check = false;
				showErro("Valor padrão para clientes inválido");
			}

			if (rows_selected.length == 0) {
				check = false;
				showErro("Nenhum aluno selecionado");

			}

			if (check == true) {
				that.confirmarGravar();
			}

		}

		function confirmarGravar() {
			var that = this;

			var rows_selected = obj.DATATABLE.rows('.selected').data();

			angular.forEach(rows_selected, function (item, value) {
				item.DESC_LANC_ID = '';
				item.LANC_ID = -1;
				item.CLIENTE_ID = angular.copy(item.ID);
				item.VALOR = angular.copy(obj.VALOR_PADRAO);
				gScope.LancamentoItens.DADOS.push(angular.copy(item));
			});

			obj.VALOR_PADRAO = 0;

			gScope.LancamentoItens.compileDatatable();

			that.FILTRO_CLIENTE = '';

			obj.DADOS = [];

			obj.compileDatatable();

			gScope.LancamentoItens.calculateNewTotal();

			$(obj.MODAL).modal('hide');



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

					$(obj.MODAL).modal('hide');
					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function cancelar() {
			var that = this;

			obj.DADOS = [];

			obj.compileDatatable();

			$(obj.MODAL).modal('hide');

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			// var msg = gScope.Confirme.add(1,'Confirmação',
			// 'Deseja realmente cancelar essa operação?' , [
			// 	{desc:'Não' 	,	class:'btn-danger' ,	ret:'2',	hotkey:'esc' 	,	glyphicon:'fas fa-ban'       	},
			// 	{desc:'Sim'     ,	class:'btn-success',	ret:'1',	hotkey:'enter' 	,	glyphicon:'fas fa-check-circle' }

			//   ],[
			// 	function (e, btn){ 

			// 	},
			// 	function (e, btn){ 
			// 		that.confirmarCancelar();
			// 	}
			// ]);
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

				$(obj.MODAL).modal('hide');
			} else {
				obj.insertConsultas();
			}

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar() {
			var that = this;

			var check = true;

			if (check == true) {
				obj.INCLUINDO = false;
				obj.ALTERANDO = true;

				obj.BACKUP = angular.copy(obj.SELECTED);

				if (that.consultas.length > 0) {
					angular.forEach(that.consultas, function (consulta, key) {
						if (typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true) {
							consulta.OBJ.btn_apagar_filtro.disabled = false;
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;
						}
					});
				}

				$(obj.MODAL).modal('show');

				$timeout(function () {
					onFocusInputModal(obj.MODAL);
				}, 200);
			}
		}

		function visualizar(index) {
			var that = this;

			var item = obj.SELECTED;

			if (typeof index != 'undefined') {
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			obj.insertConsultas();

			$(obj.MODAL).modal('show');
		}

		function insertConsultas() {
			var that = this;

			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					var nome = consulta.NOME;

					if (typeof that.SELECTED[nome + '_JSON'] != 'undefined' && that.SELECTED[nome + '_JSON'] != '' && that.SELECTED[nome + '_JSON'] != null) {

						var jsonX = JSON.parse(that.SELECTED[nome + '_JSON']);

						if (typeof jsonX.ID != 'undefined' && jsonX.ID != '' && jsonX.ID != null) {
							consulta.OBJ.setSelected(jsonX);
						}

						consulta.OBJ.Input.disabled = true;
						consulta.OBJ.btn_filtro.disabled = true;

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

			if (gScope.LancamentoItens.DADOS.length > 0) {

			}
			// dados.FILTRO.MODULO_CONTA			= gScope.Lancamentos.SELECTED.ID;
			// dados.DADOS.MODULO_CONTA			= gScope.Lancamentos.SELECTED.ID;
			// dados.FILTRO.FILTRO_CLIENTE					= gScope.ConsultaClienteFiltro.item.dados.CODIGO;

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

			var StringMask = __webpack_require__(0);

			if (obj.DATATABLE == null) {
				obj.DATATABLE = $('#dataTableLancamentoClientes').DataTable({
					"order": [[0, 'desc']],
					"searching": true,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function drawCallback() {
						$('.popoverCFe').popover({
							"html": true });

					},
					select: {
						style: 'multi',
						selector: 'td:first-child' },

					'columnDefs': [
					{
						orderable: false,
						className: 'select-checkbox',
						targets: 0,
						defaultContent: '' }],


					"columns": [
					{ "data": null },
					{ "data": "ID", "title": 'ID',
						render: function render(data, type, row) {
							return trim_null(row.ID).padStart(5, '0');
						} },

					{ "data": "NOME", "title": 'Nome',
						render: function render(data, type, row) {
							return row.NOME;
						} },

					{ "data": "CELULAR", "title": 'Celular',
						render: function render(data, type, row) {


							var formatter = {};

							formatter = new StringMask('(00) 00000-0000');

							var celular = formatter.apply(data);

							return celular;

						} }],


					createdRow: function createdRow(row, data, dataIndex) {

						// if(data[obj.CAMPO_INDEX] == obj.SELECTED[obj.CAMPO_INDEX]){
						// 	$(row).addClass('row_selected');
						// }

						// $(row).on('dblclick', function () {
						// 	obj.SELECTED = data;

						// 	$timeout(function (){
						// 		obj.visualizar();

						// 		obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
						// 		$(row).addClass('row_selected');
						// 	});
						// });

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

		function keyUPSearchClientes(event) {
			var that = this;

			$timeout(function () {
				$rootScope.$apply(function () {
					obj.DATATABLE.search(that.FILTRO_CLIENTE).draw();
				});
			});
		}

		return LancamentoClientes;
	};

})(window, window.angular);

/***/ })

/******/ });