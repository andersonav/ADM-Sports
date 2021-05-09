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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
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

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(35);
module.exports = __webpack_require__(36);


/***/ }),

/***/ 34:
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
'ModuloConta',
'ModuloContaItens',
'Confirmacao',
'Devices'];


function Ctrl(
$scope,
$timeout,
gScope,
Consulta,
ModuloConta,
ModuloContaItens,
Confirmacao,
Devices)
{

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.ModuloConta = new ModuloConta($scope);
	vm.ModuloContaItens = new ModuloContaItens($scope);
	vm.Confirmacao = new Confirmacao();
	vm.Devices = new Devices();
	vm.Confirme = vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme = vm.Confirme;
	gScope.Devices = vm.Devices;


	vm.ModuloConta.consultar();
	vm.ModuloContaItens.compileDatatable();

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
	gScope.ModuloConta = vm.ModuloConta;
	gScope.ModuloContaItens = vm.ModuloContaItens;

	$('.filter_on_enter').keyup(function (event) {
		var key = event.keyCode;

		if (key == 13) {
			vm.ModuloConta.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.ModuloConta.consultar();
		}
	});

	$.key("delete", function (e) {
		if (!$(".modal").is(':visible')) {
			if ($("#dataTableModuloConta tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.ModuloConta.DATATABLE.row("#dataTableModuloConta tbody tr.row_selected").data();
				vm.ModuloConta.SELECTED = data;

				$timeout(function () {
					$scope.$apply(function () {
						vm.ModuloConta.excluir();
					});
				});

			}
		} else {
			if ($(".modal#modalModuloConta").is(':visible')) {
				if (vm.ModuloContaItens.DADOS.length > 0 && $(".modal#modalModuloContaItens:visible").length == 0) {
					if ($("#dataTableModuloContaItens tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0 && (vm.ModuloConta.ALTERANDO == true || vm.ModuloConta.INCLUINDO == true)) {
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();

						var data = vm.ModuloContaItens.DATATABLE.row("#dataTableModuloContaItens tbody tr.row_selected").data();
						vm.ModuloContaItens.SELECTED = data;

						$timeout(function () {
							$scope.$apply(function () {
								vm.ModuloContaItens.excluir();
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
			if ($("#dataTableModuloConta tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.ModuloConta.DATATABLE.row("#dataTableModuloConta tbody tr.row_selected").data();
				vm.ModuloConta.SELECTED = data;

				$timeout(function () {
					$scope.$apply(function () {
						vm.ModuloConta.visualizar();
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
				onFocusInputModal("#modalModuloConta");
			});
		} else {
			if ($(".modal:visible").length > 0) {

				if ($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')) {
					var idModal = $(".modal:visible").last().attr("id");
					$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');

					$timeout(function () {
						onFocusInputModal("#modalModuloConta");
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
			if ($(".modal#modalModuloConta").is(':visible')) {

				if (vm.ModuloContaItens.DADOS.length > 0 && $(".modal#modalModuloContaItens:visible").length == 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();


					if ($("#dataTableModuloContaItens tbody tr.row_selected").length == 0) {
						$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
						$("#dataTableModuloContaItens tbody tr").first().focus();
					} else {

						var element = $("#dataTableModuloContaItens tbody tr.row_selected");

						vm.ModuloContaItens.DATATABLE.$('tr.row_selected').removeClass('row_selected');

						if (element.prev().is('tr')) {
							$(element.prev()[0]).addClass('row_selected');

							$(element.prev()[0]).focus();
						} else {
							$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
							$("#dataTableModuloContaItens tbody tr").first().focus();
						}
					}
				}
			} else if ($(".modal:visible").length == 0) {

				if (vm.ModuloConta.DADOS.length > 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#dataTableModuloConta tbody tr.row_selected").length == 0) {
						$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
						$("#dataTableModuloConta tbody tr").first().focus();
					} else {

						var element = $("#dataTableModuloConta tbody tr.row_selected");

						element.removeClass('row_selected');

						if (element.prev().is('tr')) {
							$(element.prev()[0]).addClass('row_selected');

							$(element.prev()[0]).focus();
						} else {
							$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
							$("#dataTableModuloConta tbody tr").first().focus();
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
			if ($(".modal#modalModuloConta").is(':visible')) {

				if (vm.ModuloContaItens.DADOS.length > 0 && $(".modal#modalModuloContaItens:visible").length == 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();


					if ($("#dataTableModuloContaItens tbody tr.row_selected").length == 0) {
						$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
						$("#dataTableModuloContaItens tbody tr").first().focus();
					} else {

						var element = $("#dataTableModuloContaItens tbody tr.row_selected");

						vm.ModuloContaItens.DATATABLE.$('tr.row_selected').removeClass('row_selected');

						if (element.next().is('tr')) {
							$(element.next()[0]).addClass('row_selected');

							$(element.next()[0]).focus();
						} else {
							$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
							$("#dataTableModuloContaItens tbody tr").first().focus();
						}
					}
				}
			} else if ($(".modal:visible").length == 0) {
				if (vm.ModuloConta.DADOS.length > 0) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#dataTableModuloConta tbody tr.row_selected").length == 0) {
						$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
						$("#dataTableModuloConta tbody tr").first().focus();
					} else {

						var element = $("#dataTableModuloConta tbody tr.row_selected");

						element.removeClass('row_selected');

						if (element.next().is('tr')) {
							$(element.next()[0]).addClass('row_selected');

							$(element.next()[0]).focus();
						} else {
							$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
							$("#dataTableModuloConta tbody tr").first().focus();
						}
					}
				}

			}
		}

	});
}

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('ModuloConta', ModuloConta);

	ModuloConta.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function ModuloConta($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function ModuloConta($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.ModuloConta';

			obj.url_consultar = urlhost + '/admin/funcionalidades/modulos-conta/tipos/get';
			obj.url_gravar = urlhost + '/admin/funcionalidades/modulos-conta/tipos/post';
			obj.url_excluir = urlhost + '/admin/funcionalidades/modulos-conta/tipos/delete';
			obj.url_imprimir_papel_termico = urlhost + '/admin/funcionalidades/modulos-conta/tipos/impressao';

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
				DESCRICAO: '',
				DESC_RESUMIDA: '',
				OPERACAO: 0 };


			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			// gScope.ModuloContaItens.DADOS = [];
			// gScope.ModuloContaItens.compileDatatable();


			if (that.consultas.length > 0) {
				angular.forEach(that.consultas, function (consulta, key) {
					consulta.OBJ.apagar();
					consulta.OBJ.Input.disabled = false;
					consulta.OBJ.btn_filtro.disabled = false;
				});
			}

			$("#modalModuloConta").modal('show');

			$timeout(function () {
				onFocusInputModal("#modalModuloConta");
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

					// $("#modalModuloConta").modal('hide');

					obj.INCLUINDO = false;
					obj.ALTERANDO = false;

					obj.compileDatatable();

					gScope.ModuloContaItens.consultar();

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

					$("#modalModuloConta").modal('hide');


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

				$("#modalModuloConta").modal('hide');
			} else {
				gScope.ModuloContaItens.DADOS = angular.copy(obj.BACKUP_ITENS);
				gScope.ModuloContaItens.ITENS_EXCLUIDOS = [];
				gScope.ModuloContaItens.compileDatatable();
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

				obj.BACKUP_ITENS = angular.copy(gScope.ModuloContaItens.DADOS);

				if (that.consultas.length > 0) {
					angular.forEach(that.consultas, function (consulta, key) {
						if (typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true) {
							consulta.OBJ.btn_apagar_filtro.disabled = false;
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;
						}
					});
				}

				$timeout(function () {
					onFocusInputModal("#modalModuloConta");
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

			gScope.ModuloContaItens.consultar();

			$("#modalModuloConta").modal('show');

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
				obj.DATATABLE = $('#dataTableModuloConta').DataTable({
					"order": [[0, 'desc']],
					"searching": false,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function drawCallback() {
						$('.popoverCFe').popover({
							"html": true });

					},
					// select: {
					// 	style:    'single'
					// },
					"columns": [
					{ "data": "OPERACAO", "title": '', "className": "text-center",
						render: function render(data, type, row) {
							var html = '';

							if (data == 0) {
								html = '<div class="badge badge-green mr-3 text-small">ENTRADA</div>';
							} else if (data == 1) {
								html = '<div class="badge badge-danger mr-3 text-small">SAÍDA</div>';
							}

							return html;
						} },

					{ "data": "ID", "title": 'ID',
						render: function render(data, type, row) {
							return trim_null(row.ID).padStart(4, '0');
						} },

					{ "data": "DESC_RESUMIDA", "title": 'Descrição resumida',
						render: function render(data, type, row) {
							return row.DESC_RESUMIDA;
						} },

					{ "data": "DESCRICAO", "title": 'Descrição',
						render: function render(data, type, row) {
							return row.DESCRICAO;
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
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.ModuloConta.excluir(' + index + ');"> ' +
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

		return ModuloConta;
	};

})(window, window.angular);

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

(function (window, angular) {
	'use strict';

	angular.
	module('app').
	factory('ModuloContaItens', ModuloContaItens);

	ModuloContaItens.$inject = [
	'$ajax',
	'$q',
	'$compile',
	'$rootScope',
	'$timeout',
	'gScope'];


	function ModuloContaItens($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
                   * Constructor, with class name
                   */
		function ModuloContaItens($scope) {

			obj = this;
			obj.scope = $scope;
			obj.model = 'vm.ModuloContaItens';

			obj.url_consultar = urlhost + '/admin/funcionalidades/modulos-conta/itens/get';
			obj.url_gravar = urlhost + '/admin/funcionalidades/modulos-conta/itens/post';
			obj.url_excluir = urlhost + '/admin/funcionalidades/modulos-conta/itens/delete';

			obj.SELECTED = {};
			obj.BACKUP = {};
			obj.DADOS = [];
			obj.BACKUP_ITENS = [];
			obj.consultas = [];

			obj.CAMPO_INDEX = 'ID';

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;

			obj.MODAL = "#modalModuloContaItens";

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




			dados.DADOS.MODULO_CONTA = gScope.ModuloConta.SELECTED.ID;

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

			$(obj.MODAL).modal('show');
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

			dados.FILTRO.MODULO_CONTA = gScope.ModuloConta.SELECTED.ID;
			dados.DADOS.MODULO_CONTA = gScope.ModuloConta.SELECTED.ID;
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
				obj.DATATABLE = $('#dataTableModuloContaItens').DataTable({
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
							return trim_null(row.ID).padStart(4, '0');
						} },

					{ "data": "DESC_RESUMIDA", "title": 'Descrição resumida',
						render: function render(data, type, row) {
							return row.DESC_RESUMIDA;
						} },

					{ "data": "DESCRICAO", "title": 'Descrição',
						render: function render(data, type, row) {
							return row.DESCRICAO;
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
							'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.ModuloContaItens.excluir(' + index + ');"> ' +
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

		return ModuloContaItens;
	};

})(window, window.angular);

/***/ })

/******/ });