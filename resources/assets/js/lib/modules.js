var AngularFindModule = {};



(function (window, angular) {
    'use strict';

    var ajax = function ($q) {

        var vm = this;

        vm.ajax = null;

        var sanitize = function (type, url, params, options, resolve, reject) {

            params = (typeof (params) === "undefined") ? null : params;
            options = (typeof (options) === "undefined") ? {} : options;
            options.complete = (typeof (options.complete) === "undefined") ? null : options.complete;
            options.progress = (typeof (options.progress) === "undefined") ? true : options.progress;
            options.async = (typeof (options.async) === "undefined") ? true : options.async;
            options.cache = (typeof (options.cache) === "undefined") ? true : options.cache;
            options.contentType = (typeof (options.contentType) === "undefined") ? null : options.contentType;

            if (params != null && typeof (params) == 'object') {

                params = JSON.stringify(params);

                options.contentType = 'application/json';
            }

            return {
                type: type,
                url: url,
                params: params,
                options: options,
                resolve: resolve,
                reject: reject
            }
        };

        var objectToFormData = function (obj) {

            var formData = new FormData();
            var rootName = '';
            var ignoreList = [];

            function appendFormData(data, root) {
                if (!ignore(root)) {
                    root = root || '';
                    if (data instanceof File) {
                        formData.append(root, data);
                    } else if (Array.isArray(data)) {
                        for (var i = 0; i < data.length; i++) {
                            appendFormData(data[i], root + '[' + i + ']');
                        }
                    } else if (typeof data === 'object' && data) {
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                if (root === '') {
                                    appendFormData(data[key], key);
                                } else {
                                    appendFormData(data[key], root + '[' + key + ']');
                                }
                            }
                        }
                    } else {
                        if (data !== null && typeof data !== 'undefined') {
                            formData.append(root, data);
                        }
                    }
                }
            }

            function ignore(root) {
                return Array.isArray(ignoreList)
                    && ignoreList.some(function (x) { return x === root; });
            }

            appendFormData(obj, rootName);

            return formData;

        }

        var xhr2 = function (type, url, params, options) {
            return $q(function (resolve, reject) {

                var data = sanitize(type, url, params, options, resolve, reject);
                var dados = objectToFormData(params);

				/*
				$.ajax({
					url: url,
					data: dados,
					type: 'POST',
					contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
					processData: false, // NEEDED, DON'T OMIT THIS
					// ... Other options like success and etc
				});
				*/

                vm.ajax = execAjaxFile(
                    data.type,
                    data.url,
                    dados,
                    data.resolve,
                    data.reject,
                    data.options.complete,
                    data.options.progress,
                    data.options.async,
                    data.options.cache,
                    false,
                    false
                );


            });
        }

        var xhr = function (type, url, params, options) {
            return $q(function (resolve, reject) {

                var data = sanitize(type, url, params, options, resolve, reject);

                vm.ajax = execAjax1(
                    data.type,
                    data.url,
                    data.params,
                    data.resolve,
                    data.reject,
                    data.options.complete,
                    data.options.progress,
                    data.options.async,
                    data.options.cache,
                    data.options.contentType
                );
            });
        }

        vm.postFile = function (url, params, options) {
            return xhr2('POST', url, params, options);
        };

        vm.post = function (url, params, options) {
            return xhr('POST', url, params, options);
        };

        vm.get = function (url, options) {
            return xhr('GET', url, null, options);
        };

        vm.abort = function () {
            vm.ajax.abort();
        }
    };

    ajax.$inject = ['$q'];

    var ajaxModule = angular.module('ajax', []);

    ajaxModule.service('$ajax', ajax);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ajaxModule.name;
    }


    var GcUtils = angular.module('gc-utils', []);

    GcUtils.directive('ngAtalho', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
				//se for campo data e apertar t vai setar a data de hoje
				if(event.target.type == 'date'){
					if(event.which === 84) {
						var element = event.currentTarget //angular.element(event.currentTarget);
						var readonly = element.getAttribute('readonly');
						var disabled = element.getAttribute('disabled');
						// console.log(readonly);
						// console.log(disabled);
						if(readonly === null && disabled === null){
							console.log(attrs.ngModel);
							var date = moment().toDate();
							scope.$eval(attrs.ngModel + "=d", {d: new Date(date)});
							scope.$apply();
						}                    
					}
				}else if(event.target.type == 'datetime'){
					if(event.which === 84) {
						var element = event.currentTarget //angular.element(event.currentTarget);
						var readonly = element.getAttribute('readonly');
						var disabled = element.getAttribute('disabled');
						// console.log(readonly);
						// console.log(disabled);
						if(readonly === null && disabled === null){
							console.log(attrs.ngModel);
							var date = moment().toDate();
							scope.$eval(attrs.ngModel + "=d", {d: new Date(date)});
							scope.$apply();
						}                    
					}
				}else if(event.target.type == 'datetime-local'){
					if(event.which === 84) {
						var element = event.currentTarget //angular.element(event.currentTarget);
						var readonly = element.getAttribute('readonly');
						var disabled = element.getAttribute('disabled');
						// console.log(readonly);
						// console.log(disabled);
						if(readonly === null && disabled === null){
							console.log(attrs.ngModel);
							var date = moment().seconds(0).milliseconds(0).toDate();
							
							scope.$eval(attrs.ngModel + "=d", {d: new Date(date)});
							scope.$apply();
						}                    
					}
				}else if(event.target.type == 'time'){
					if(event.which === 84) {
						var element = event.currentTarget //angular.element(event.currentTarget);
						var readonly = element.getAttribute('readonly');
						var disabled = element.getAttribute('disabled');
						// console.log(readonly);
						// console.log(disabled);
						if(readonly === null && disabled === null){
							console.log(attrs.ngModel);
							var date = moment().toDate();
							var horamin = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),0,0);
							scope.$eval(attrs.ngModel + "=d", {d: horamin});
							scope.$apply();
						}                    
					}
				}                
            });
        };
    });
    
    GcUtils.directive('onlyDigits', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9]/g, '');

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return digits;
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
            }
        };
    });

    GcUtils.directive('onScrollToBottom', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                $(elem).on('scroll', function (evt) {
                    var doc = evt.currentTarget;
                    // método anterior: if(doc.scrollHeight - doc.scrollTop === doc.clientHeight){
                    if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 1) {
                        // console.log('a',doc.scrollHeight,'b',doc.scrollTop,'c',doc.clientHeight);
                        scope.$apply(attrs.onScrollToBottom);
                    }
                });

				/*$(elem).on('mousewheel', function(e){
					if(e.originalEvent.wheelDelta /120 > 0) {
						console.log('scrolling up !');
						scope.$apply(attrs.onScrollUP);
					}else{
						if(e.originalEvent.wheelDelta == -120){
							var doc = e.currentTarget;
							if(doc.scrollHeight - doc.scrollTop === doc.clientHeight){
								console.log('scrolled to bottom!');
								scope.$apply(attrs.onScrollDown);	
							}
						}
					}	
				})*/
            }
        }
    });

    GcUtils.directive('onScrollUp', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                $(elem).on('mousewheel', function (e) {
                    if (e.originalEvent.wheelDelta / 120 > 0) {
                        // console.log('scrolling up !');
                        scope.$apply(attrs.onScrollUp);
                    }
                })
            }
        }
    });

    GcUtils.directive('onScrollDown', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                $(elem).on('mousewheel', function (e) {
                    if (e.originalEvent.wheelDelta == -120) {
                        var doc = e.currentTarget;
                        // if(doc.scrollHeight - doc.scrollTop === doc.clientHeight){
                        // if(doc.scrollTop === (doc.scrollHeight - doc.offsetHeight)){
                        if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 1) {
                            // console.log('scrolled to bottom!');
                            scope.$apply(attrs.onScrollDown);
                        }
                    }
                })
            }
        }
    });


    ////////////////////////////////////////////////////// INICIO - ngNumberFormat

    function setInputValue(event, scope, element, attrs, ctrl, timeout, tipo, onFormat, onFormatErro) {
        var element = event;
        var mask = Number(attrs.ngNumberFormat);
        var tmp = (element.value + '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.');
        tmp = tmp == '' ? '0' : tmp;

        try {
            tmp = num_trunc(tmp, mask);
        } catch (error) {
            tmp = 0;
        }

        var vlr = Number(tmp);

        if (!isNaN(vlr) && isNumber(vlr) && isFinite(vlr)) {

            /*
            ctrl.$setViewValue(vlr);
            ctrl.$render();

            element.value = number_format(vlr, mask, ',', '.');
            $(element).removeClass('has-error-number');
            */


            if (tipo == 2) {
                var min = Number(element.getAttribute('min'));
                var max = Number(element.getAttribute('max'));

                if (!isNaN(min) && isNumber(min) && isFinite(min)) {
                    if (vlr < min) {
                        vlr = min;
                    }
                }

                if (!isNaN(max) && isNumber(max) && isFinite(max)) {
                    if (vlr > max && max > 0) {
                        vlr = max;
                    }
                }
            }

            timeout(function () {
                scope.$eval(attrs.ngModel + "=d", { d: vlr });
                scope.$apply();
                element.value = number_format(vlr, mask, ',', '.');
                $(element).removeClass('has-error-number');

                try { scope.$eval(onFormat); } catch (error) { console.log(error); }

            }, 1);

        } else {
            $(element).addClass('has-error-number');
            console.log('Erro no numero (' + vlr + ') (' + element.value + ')');

            try { scope.$eval(onFormatErro); } catch (error) { console.log(error); }
        }

        //var readonly = element.getAttribute('readonly');
        //var disabled = element.getAttribute('disabled');     
    }

    function tratInputValue(event, scope, element, attrs, ctrl) {
        var element = event;
        var mask = Number(attrs.ngNumberFormat);
        var tmp = (element.value + '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '');

        var vlr = Number(tmp.replace(',', '.'));

        element.value = (vlr + '').replace('.', ',');

        if (isNaN(vlr) || !isNumber(vlr) || !isFinite(vlr)) {
            $(element).addClass('has-error-number');
        } else {
            $(element).removeClass('has-error-number');
        }
    }

    GcUtils.directive('ngNumberFormat', ['$timeout', function ($timeout) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {

                var timeout = $timeout;
                var onFormat = attrs.ngOnformat
                var onFormatErro = attrs.ngOnformaterro;

                ctrl.$formatters.push(function (value) {

                    value = isNumber(value) ? (value + '').replace('.', ',') : value;

                    value = typeof value == 'undefined' ? '0' : value;

                    var mask = Number(attrs.ngNumberFormat);

                    var vld = (value + '').replace(/[^0-9\,-]/g, '');

                    var tmp = (vld + '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.');
                    tmp = tmp == '' ? '0' : tmp;

                    vld = (tmp + '').replace(/[^0-9]/g, '');

                    if (vld != '') {
                        tmp = num_trunc(tmp, mask);
                    } else {
                        tmp = 0;
                    }

                    /*
                    var forme  = scope[element[0].form.name];
                    var item_f = forme[element[0].name];

                    item_f.$error.min = true;
                    item_f.$error.max = true;
                    */


                    var vlr = Number(tmp);

                    if (!isNaN(vlr) && isNumber(vlr) && isFinite(vlr)) {
                        var ret = number_format(vlr, mask, ',', '.');
                    } else {
                        var ret = '0';
                    }

                    return ret;
                });

                ctrl.$parsers.push(function (val) {

                    if (val) {
                        var digits = (val + '').replace(/[^0-9\,-]/g, '');

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        } else {
                            if (',' == val) {
                                ctrl.$setViewValue('0,');
                                ctrl.$render();
                            } else {
                                if ('-,' == val) {
                                    ctrl.$setViewValue('-0,');
                                    ctrl.$render();
                                }
                            }
                        }

                        var ele = event.currentTarget
                        var tmp = (ele.value + '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '');
                        tmp = Number((tmp + '').replace(',', '.'));

                        if (isNaN(tmp) || !isNumber(tmp) || !isFinite(tmp)) {
                            $(ele).addClass('has-error-number');
                            //try {scope.$eval(onFormatErro);} catch (error) {console.log(error); }
                        } else {
                            $(ele).removeClass('has-error-number');
                            //try {scope.$eval(onFormat);} catch (error) {console.log(error); }
                        }

                        timeout(function () { try { scope.$eval(onFormat); } catch (error) { console.log(error); } }, 100);

                        return digits;
                    }

                    timeout(function () { try { scope.$eval(onFormatErro); } catch (error) { console.log(error); } }, 100);

                    return undefined;
                });

                element.bind("change", function (event) {
                    element[0].setAttribute("editando", false);
                    setInputValue(event.currentTarget, scope, element, attrs, ctrl, timeout, 1, onFormat, onFormatErro);
                });

                element.bind("click", function (event) {
                    element[0].setAttribute("editando", true);
                    tratInputValue(event.currentTarget, scope, element, attrs, ctrl);
                });

                element.bind("blur", function (event) {
                    element[0].setAttribute("editando", false);
                    setInputValue(event.currentTarget, scope, element, attrs, ctrl, timeout, 2, onFormat, onFormatErro);
                });
            }
        };
    }]);

    GcUtils.directive('ngMaskDiaMes', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                var addSpaces = function (value) {
                    if (typeof (value) == typeof (undefined))
                        return value;

                    var normal = /([0-9]{2}[0-9]{2})/;
                    var replaced = (value + '').replace(/[^\w]/g, '');

                    var p1 = (replaced + '').substring(0, 2) || '';
                    var p2 = (replaced + '').substring(2, 4) || '';

                    p1 = (p1 + '').replace(/[^0-9]/g, '');
                    p2 = (p2 + '').replace(/[^0-9]/g, '');

                    if(Number(p2) > 12){
                        p2 = '';
                    }

                    var parsedValue = (p1 + ((p1 + p2).length > 2 ? '/' : '') + p2)
                        .toUpperCase()
                        .replace(/-$/, '');

                    return parsedValue;
                }

                var removeSpaces = function (value) {
                    if (typeof (value) == typeof (undefined))
                        return value;
                    var parsedValue = value.toString().replace(/\s/g, '').replace(/-/g, '');
                    return parsedValue;
                }

                var parseViewValue = function (value) {

                    var viewValue = addSpaces(value);
                    $timeout(function () {
                        ngModel.$viewValue = viewValue;
                        ngModel.$render();
                    });

                    return removeSpaces(viewValue);
                }

                var formatModelValue = function (value) {
                    var modelValue = removeSpaces(value);
                    return addSpaces(modelValue);
                }

                ngModel.$parsers.push(parseViewValue);
                ngModel.$formatters.push(formatModelValue);

                element.bind("blur", function (event) {
                    parseViewValue(ngModel.$modelValue);
                });

                element.bind("change", function (event) {
                    parseViewValue(ngModel.$modelValue);
                });

                element.bind("keydown", function (event) {
                    parseViewValue(ngModel.$modelValue);
                });
            }
        };
    }]);

    GcUtils.directive('bsPopover', function() {
        return function(scope, element, attrs) {
            element.find("a[data-toggle='popover']").popover({html: true});
        };
    });
    

})(window, window.angular);




// Virtual Scroll
!function (a, b) { "use strict"; function c() { if ("pageYOffset" in a) return { scrollTop: pageYOffset, scrollLeft: pageXOffset }; var b, c, d = document, e = d.documentElement, f = d.body; return b = e.scrollLeft || f.scrollLeft || 0, c = e.scrollTop || f.scrollTop || 0, { scrollTop: c, scrollLeft: b } } function d(b, c) { return b === a ? "clientWidth" === c ? a.innerWidth : a.innerHeight : b[c] } function e(b, d) { return b === a ? c()[d] : b[d] } function f(b, d, e) { return b.getBoundingClientRect()[e ? "left" : "top"] - (d === a ? 0 : d.getBoundingClientRect()[e ? "left" : "top"]) + (d === a ? c() : d)[e ? "scrollLeft" : "scrollTop"] } var g = document.documentElement, h = g.matches ? "matches" : g.matchesSelector ? "matchesSelector" : g.webkitMatches ? "webkitMatches" : g.webkitMatchesSelector ? "webkitMatchesSelector" : g.msMatches ? "msMatches" : g.msMatchesSelector ? "msMatchesSelector" : g.mozMatches ? "mozMatches" : g.mozMatchesSelector ? "mozMatchesSelector" : null, i = b.element.prototype.closest || function (a) { for (var c = this[0].parentNode; c !== document.documentElement && null != c && !c[h](a);)c = c.parentNode; return c && c[h](a) ? b.element(c) : b.element() }, j = b.module("vs-repeat", []).directive("vsRepeat", ["$compile", "$parse", function (c, g) { return { restrict: "A", scope: !0, compile: function (h, j) { var k, l, m, n, o, p, q = b.isDefined(j.vsRepeatContainer) ? b.element(h[0].querySelector(j.vsRepeatContainer)) : h, r = q.children().eq(0), s = r[0].outerHTML, t = "$vs_collection", u = !1, v = { vsRepeat: "elementSize", vsOffsetBefore: "offsetBefore", vsOffsetAfter: "offsetAfter", vsScrolledToEndOffset: "scrolledToEndOffset", vsScrolledToBeginningOffset: "scrolledToBeginningOffset", vsExcess: "excess", vsScrollMargin: "scrollMargin" }; if (r.attr("ng-repeat")) p = "ng-repeat", k = r.attr("ng-repeat"); else if (r.attr("data-ng-repeat")) p = "data-ng-repeat", k = r.attr("data-ng-repeat"); else if (r.attr("ng-repeat-start")) u = !0, p = "ng-repeat-start", k = r.attr("ng-repeat-start"); else { if (!r.attr("data-ng-repeat-start")) throw new Error("angular-vs-repeat: no ng-repeat directive on a child element"); u = !0, p = "data-ng-repeat-start", k = r.attr("data-ng-repeat-start") } if (l = /^\s*(\S+)\s+in\s+([\S\s]+?)(track\s+by\s+\S+)?$/.exec(k), m = l[1], n = l[2], o = l[3], u) for (var w = 0, x = q.children().eq(0); null == x.attr("ng-repeat-end") && null == x.attr("data-ng-repeat-end");)w++ , x = q.children().eq(w), s += x[0].outerHTML; return q.empty(), { pre: function (h, j, k) { function l() { if (!G || G.length < 1) h[t] = [], C = 0, h.sizesCumulative = [0]; else if (C = G.length, L) { h.sizes = G.map(function (a) { var c = h.$new(!1); b.extend(c, a), c[m] = a; var d = k.vsSize || k.vsSizeProperty ? c.$eval(k.vsSize || k.vsSizeProperty) : h.elementSize; return c.$destroy(), d }); var a = 0; h.sizesCumulative = h.sizes.map(function (b) { var c = a; return a += b, c }), h.sizesCumulative.push(a) } else q(); y() } function q() { K && h.$$postDigest(function () { if (D[0].offsetHeight || D[0].offsetWidth) { for (var a = D.children(), b = 0, c = !1, d = !1; b < a.length;) { if (null != a[b].attributes[p] || d) { if (c || (h.elementSize = 0), c = !0, a[b][P] && (h.elementSize += a[b][P]), !u) break; if (null != a[b].attributes["ng-repeat-end"] || null != a[b].attributes["data-ng-repeat-end"]) break; d = !0 } b++ } c && (y(), K = !1, h.$root && !h.$root.$$phase && h.$apply()) } else var e = h.$watch(function () { (D[0].offsetHeight || D[0].offsetWidth) && (e(), q()) }) }) } function r() { var a = "tr" === F ? "" : "min-"; return H ? a + "width" : a + "height" } function w() { if (B()) { h.$digest(); var a = L ? h.sizesCumulative[C] : h.elementSize * C; a !== j[0].clientHeight && console.warn("vsRepeat: size mismatch. Expected size " + a + "px whereas actual size is " + j[0].clientHeight + "px. Fix vsSize on element:", j[0]) } } function x() { void 0 !== k.vsAutoresize && (K = !0, q(), h.$root && !h.$root.$$phase && h.$apply()), B() && h.$apply() } function y() { R = void 0, S = void 0, T = C, U = 0, z(L ? h.sizesCumulative[C] : h.elementSize * C), B(), h.$emit("vsRepeatReinitialized", h.startIndex, h.endIndex) } function z(a) { h.totalSize = h.offsetBefore + a + h.offsetAfter } function A() { var a = d(M[0], O); a !== V && (y(), h.$root && !h.$root.$$phase && h.$apply()), V = a } function B() { var a = e(M[0], Q), b = d(M[0], O), c = D[0] === M[0] ? 0 : f(D[0], M[0], H), i = h.startIndex, j = h.endIndex; if (L) { for (i = 0; h.sizesCumulative[i] < a - h.offsetBefore - c - h.scrollMargin;)i++; for (i > 0 && i-- , i = Math.max(Math.floor(i - h.excess / 2), 0), j = i; h.sizesCumulative[j] < a - h.offsetBefore - c + h.scrollMargin + b;)j++; j = Math.min(Math.ceil(j + h.excess / 2), C) } else i = Math.max(Math.floor((a - h.offsetBefore - c) / h.elementSize) - h.excess / 2, 0), j = Math.min(i + Math.ceil(b / h.elementSize) + h.excess, C); T = Math.min(i, T), U = Math.max(j, U), h.startIndex = N.latch ? T : i, h.endIndex = N.latch ? U : j, U < h.startIndex && (h.startIndex = U); var l = !1; if (null == R ? l = !0 : null == S && (l = !0), l || (N.hunked ? Math.abs(h.startIndex - R) >= h.excess / 2 || 0 === h.startIndex && 0 !== R ? l = !0 : (Math.abs(h.endIndex - S) >= h.excess / 2 || h.endIndex === C && S !== C) && (l = !0) : l = h.startIndex !== R || h.endIndex !== S), l) { h[t] = G.slice(h.startIndex, h.endIndex), h.$emit("vsRepeatInnerCollectionUpdated", h.startIndex, h.endIndex, R, S); var m; k.vsScrolledToEnd && (m = G.length - (h.scrolledToEndOffset || 0), (h.endIndex >= m && S < m || G.length && h.endIndex === G.length) && h.$eval(k.vsScrolledToEnd)), k.vsScrolledToBeginning && (m = h.scrolledToBeginningOffset || 0, h.startIndex <= m && R > h.startIndex && h.$eval(k.vsScrolledToBeginning)), R = h.startIndex, S = h.endIndex; var n = L ? "(sizesCumulative[$index + startIndex] + offsetBefore)" : "(($index + startIndex) * elementSize + offsetBefore)", o = g(n), p = o(h, { $index: 0 }), q = o(h, { $index: h[t].length }), s = h.totalSize; I.css(r(), p + "px"), J.css(r(), s - q + "px") } return l } var C, D = b.isDefined(k.vsRepeatContainer) ? b.element(j[0].querySelector(k.vsRepeatContainer)) : j, E = b.element(s), F = E[0].tagName.toLowerCase(), G = [], H = void 0 !== k.vsHorizontal, I = b.element("<" + F + ' class="vs-repeat-before-content"></' + F + ">"), J = b.element("<" + F + ' class="vs-repeat-after-content"></' + F + ">"), K = !k.vsRepeat, L = !!k.vsSize || !!k.vsSizeProperty, M = k.vsScrollParent ? "window" === k.vsScrollParent ? b.element(a) : i.call(D, k.vsScrollParent) : D, N = "vsOptions" in k ? h.$eval(k.vsOptions) : {}, O = H ? "clientWidth" : "clientHeight", P = H ? "offsetWidth" : "offsetHeight", Q = H ? "scrollLeft" : "scrollTop"; if (h.totalSize = 0, !("vsSize" in k) && "vsSizeProperty" in k && console.warn("vs-size-property attribute is deprecated. Please use vs-size attribute which also accepts angular expressions."), 0 === M.length) throw "Specified scroll parent selector did not match any element"; h.$scrollParent = M, L && (h.sizesCumulative = []), h.elementSize = +k.vsRepeat || d(M[0], O) || 50, h.offsetBefore = 0, h.offsetAfter = 0, h.scrollMargin = 0, h.excess = 2, H ? (I.css("height", "100%"), J.css("height", "100%")) : (I.css("width", "100%"), J.css("width", "100%")), Object.keys(v).forEach(function (a) { k[a] && k.$observe(a, function (b) { h[v[a]] = +b, y() }) }), h.$watchCollection(n, function (a) { G = a || [], l() }), E.eq(0).attr(p, m + " in " + t + (o ? " " + o : "")), E.addClass("vs-repeat-repeated-element"), D.append(I), D.append(E), c(E)(h), D.append(J), h.startIndex = 0, h.endIndex = 0, M.on("scroll", w), b.element(a).on("resize", x), h.$on("$destroy", function () { b.element(a).off("resize", x), M.off("scroll", w) }), h.$on("vsRepeatTrigger", l), h.$on("vsRepeatResize", function () { K = !0, q() }); var R, S, T, U; h.$on("vsRenderAll", function () { N.latch && setTimeout(function () { var a = C; U = Math.max(a, U), h.endIndex = N.latch ? U : a, h[t] = G.slice(h.startIndex, h.endIndex), S = h.endIndex, h.$$postDigest(function () { I.css(r(), 0), J.css(r(), 0) }), h.$apply(function () { h.$emit("vsRenderAllDone") }) }) }); var V; h.$watch(function () { "function" == typeof a.requestAnimationFrame ? a.requestAnimationFrame(A) : A() }) } } } } }]); "undefined" != typeof module && module.exports && (module.exports = j.name) }(window, window.angular);


/* ng-infinite-scroll - v1.3.0 - 2016-06-30 */
angular.module("infinite-scroll", []).value("THROTTLE_MILLISECONDS", null).directive("infiniteScroll", ["$rootScope", "$window", "$interval", "THROTTLE_MILLISECONDS", function (a, b, c, d) { return { scope: { infiniteScroll: "&", infiniteScrollContainer: "=", infiniteScrollDistance: "=", infiniteScrollDisabled: "=", infiniteScrollUseDocumentBottom: "=", infiniteScrollListenForEvent: "@" }, link: function (e, f, g) { var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z; return z = angular.element(b), u = null, v = null, j = null, k = null, r = !0, y = !1, x = null, i = !1, q = function (a) { return a = a[0] || a, isNaN(a.offsetHeight) ? a.document.documentElement.clientHeight : a.offsetHeight }, s = function (a) { if (a[0].getBoundingClientRect && !a.css("none")) return a[0].getBoundingClientRect().top + t(a) }, t = function (a) { return a = a[0] || a, isNaN(window.pageYOffset) ? a.document.documentElement.scrollTop : a.ownerDocument.defaultView.pageYOffset }, p = function () { var b, d, g, h, l; return k === z ? (b = q(k) + t(k[0].document.documentElement), g = s(f) + q(f)) : (b = q(k), d = 0, void 0 !== s(k) && (d = s(k)), g = s(f) - d + q(f)), y && (g = q((f[0].ownerDocument || f[0].document).documentElement)), h = g - b, l = h <= q(k) * u + 1, l ? (j = !0, v ? e.$$phase || a.$$phase ? e.infiniteScroll() : e.$apply(e.infiniteScroll) : void 0) : (i && c.cancel(i), j = !1) }, w = function (a, b) { var d, e, f; return f = null, e = 0, d = function () { return e = (new Date).getTime(), c.cancel(f), f = null, a.call() }, function () { var g, h; return g = (new Date).getTime(), h = b - (g - e), h <= 0 ? (c.cancel(f), f = null, e = g, a.call()) : f ? void 0 : f = c(d, h, 1) } }, null != d && (p = w(p, d)), e.$on("$destroy", function () { if (k.unbind("scroll", p), null != x && (x(), x = null), i) return c.cancel(i) }), n = function (a) { return u = parseFloat(a) || 0 }, e.$watch("infiniteScrollDistance", n), n(e.infiniteScrollDistance), m = function (a) { if (v = !a, v && j) return j = !1, p() }, e.$watch("infiniteScrollDisabled", m), m(e.infiniteScrollDisabled), o = function (a) { return y = a }, e.$watch("infiniteScrollUseDocumentBottom", o), o(e.infiniteScrollUseDocumentBottom), h = function (a) { if (null != k && k.unbind("scroll", p), k = a, null != a) return k.bind("scroll", p) }, h(z), e.infiniteScrollListenForEvent && (x = a.$on(e.infiniteScrollListenForEvent, p)), l = function (a) { if (null != a && 0 !== a.length) { if (a.nodeType && 1 === a.nodeType ? a = angular.element(a) : "function" == typeof a.append ? a = angular.element(a[a.length - 1]) : "string" == typeof a && (a = angular.element(document.querySelector(a))), null != a) return h(a); throw new Error("invalid infinite-scroll-container attribute.") } }, e.$watch("infiniteScrollContainer", l), l(e.infiniteScrollContainer || []), null != g.infiniteScrollParent && h(angular.element(f.parent())), null != g.infiniteScrollImmediateCheck && (r = e.$eval(g.infiniteScrollImmediateCheck)), i = c(function () { return r && p(), c.cancel(i) }) } } }]), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "infinite-scroll");