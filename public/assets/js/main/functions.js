// Variáveis Globais
var urlhost = document.location.origin;

ajaxSetup();

function returnLanguageDatatable() {
    var language = {
        "emptyTable": "Nenhum registro encontrado",
        "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 até 0 de 0 registros",
        "infoFiltered": "(Filtrados de _MAX_ registros)",
        "infoThousands": ".",
        "loadingRecords": "Carregando...",
        "processing": "Processando...",
        "zeroRecords": "Nenhum registro encontrado",
        "search": "",
        "paginate": {
            "next": "Próximo",
            "previous": "Anterior",
            "first": "Primeiro",
            "last": "Último"
        },
        "aria": {
            "sortAscending": ": Ordenar colunas de forma ascendente",
            "sortDescending": ": Ordenar colunas de forma descendente"
        },
        "select": {
            "rows": {
                "_": "Selecionado %d linhas",
                "0": "Nenhuma linha selecionada",
                "1": "Selecionado 1 linha"
            },
            "1": "%d linha selecionada",
            "_": "%d linhas selecionadas",
            "cells": {
                "1": "",
                "_": ""
            },
            "columns": {
                "1": "",
                "_": ""
            }
        },
        "buttons": {
            "copySuccess": {
                "1": "Uma linha copiada com sucesso",
                "_": "%d linhas copiadas com sucesso"
            },
            "collection": "Coleção  <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
            "colvis": "Visibilidade da Coluna",
            "colvisRestore": "Restaurar Visibilidade",
            "copy": "Copiar",
            "copyKeys": "Pressione ctrl ou u2318 + C para copiar os dados da tabela para a área de transferência do sistema. Para cancelar, clique nesta mensagem ou pressione Esc..",
            "copyTitle": "Copiar para a Área de Transferência",
            "csv": "CSV",
            "excel": "Excel",
            "pageLength": {
                "-1": "Mostrar todos os registros",
                "1": "Mostrar 1 registro",
                "_": "Mostrar %d registros"
            },
            "pdf": "PDF",
            "print": "Imprimir"
        },
        "autoFill": {
            "cancel": "Cancelar",
            "fill": "Preencher todas as células com",
            "fillHorizontal": "Preencher células horizontalmente",
            "fillVertical": "Preencher células verticalmente"
        },
        "lengthMenu": "Exibir _MENU_ resultados por página",
        "searchBuilder": {
            "add": "Adicionar Condição",
            "button": {
                "0": "Construtor de Pesquisa",
                "_": "Construtor de Pesquisa (%d)"
            },
            "clearAll": "Limpar Tudo",
            "condition": "Condição",
            "conditions": {
                "date": {
                    "after": "Depois",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vazio",
                    "equals": "Igual",
                    "not": "Não",
                    "notBetween": "Não Entre",
                    "notEmpty": "Não Vazio"
                },
                "moment": {
                    "after": "Depois",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vazio",
                    "equals": "Igual",
                    "not": "Não",
                    "notBetween": "Não Entre",
                    "notEmpty": "Não Vazio"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vazio",
                    "equals": "Igual",
                    "gt": "Maior Que",
                    "gte": "Maior ou Igual a",
                    "lt": "Menor Que",
                    "lte": "Menor ou Igual a",
                    "not": "Não",
                    "notBetween": "Não Entre",
                    "notEmpty": "Não Vazio"
                },
                "string": {
                    "contains": "Contém",
                    "empty": "Vazio",
                    "endsWith": "Termina Com",
                    "equals": "Igual",
                    "not": "Não",
                    "notEmpty": "Não Vazio",
                    "startsWith": "Começa Com"
                }
            },
            "data": "Data",
            "deleteTitle": "Excluir regra de filtragem",
            "logicAnd": "E",
            "logicOr": "Ou",
            "title": {
                "0": "Construtor de Pesquisa",
                "_": "Construtor de Pesquisa (%d)"
            },
            "value": "Valor"
        },
        "searchPanes": {
            "clearMessage": "Limpar Tudo",
            "collapse": {
                "0": "Painéis de Pesquisa",
                "_": "Painéis de Pesquisa (%d)"
            },
            "count": "{total}",
            "countFiltered": "{shown} ({total})",
            "emptyPanes": "Nenhum Painel de Pesquisa",
            "loadMessage": "Carregando Painéis de Pesquisa...",
            "title": "Filtros Ativos"
        },
        "searchPlaceholder": "Pesquisar",
        "thousands": "."
    };

    return language;
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + "").replace(",", "").replace(" ", "");
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "." : thousands_sep,
        dec = typeof dec_point === "undefined" ? "," : dec_point,
        s = "",
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return "" + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
}

/**
 * Setar valor do progressbar.
 * @param {event} e
 */
function progressPagina(e) {

    var percentual = 100;
    var socket = parseFloat($('._socket_token').val());

    // if (socket > 0) {
    //     $('.progress-bar').css('transition', '10s');
    //     percentual = 30;
    // }


    if (e.lengthComputable) {
        $('.carregando-pagina .progress-bar')
            .attr({ 'aria-valuenow': e.loaded, 'aria-valuemax': e.total })
            .css('width', (e.loaded * percentual) / e.total + '%');

    }
}

/** 
 * Definir o crsf token para o ajax
 */
function ajaxSetup() {
    var token = $('meta[name="csrf-token"]').attr('content');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': token
        }
    });

    $.ajaxPrefilter(function (options, originalOptions, xhr) { // this will run before each request


        var socket_con = $('[name="_socket_token"]').val();
        if (socket_con != undefined && socket_con != "") {
            xhr.setRequestHeader('SOCKET-TOKEN', socket_con);
        }

        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) {
            return xhr.setRequestHeader('X-CSRF-TOKEN', token); // adds directly to the XmlHttpRequest Object
        }
    });
}

/**
 * Executa ação ajax, com progressbar.
 * 
 * @param type Tipo de consulta. Ex.: POST, GET
 * @param url_action Rota da consulta
 * @param data Dados a ser enviado
 * @param funcSuccess Função a ser executada no sucesso | Default = null
 * @param funcErro Função a ser executada no erro | Default = null
 * @param funcComplete Função a ser executada no complete | Default = null
 * @param progress
 * @param async Assincrono | Default = true
 * @param cache Default = true
 * @param contentType Default = 'application/x-www-form-urlencoded; charset=UTF-8'
 * @param processData Default = true
 */
function execAjax1(type, url_action, data, funcSuccess, funcErro, funcComplete, progress, async, cache, contentType, processData) {

    requestRunning = 1;

    if (typeof (progress) === "undefined") {
        progress = true;
    }

    var upload = true;

    var socket = parseFloat($('._socket_token').val());

    if (socket > 0 && progress == 'manual') {
        $('.progress-bar').css('transition', '0s');
        $('.progress-bar').css('background-color', 'rgb(0, 150, 136)');
    }

    if (progress == 'manual') {
        progress = true;
        ajax_tipo = 'manual';
        //        upload   = false;
    }



    async = (async !== null && typeof (async) !== 'undefined') ? async : true;
    cache = (cache !== null && typeof (cache) !== 'undefined') ? cache : true;
    contentType = (contentType !== null && typeof (contentType) !== 'undefined') ? contentType : 'application/x-www-form-urlencoded; charset=UTF-8';
    return $.ajax({
        async: async,
        type: type,
        url: url_action,
        data: data,
        cache: cache,
        contentType: contentType,
        processData: processData,
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload && upload) {
                if (progress) {
                    myXhr.upload.addEventListener('progress', progressPagina, false);
                }
            }

            return myXhr;
        },
        beforeSend: function () {
            if (progress) {
                $('.carregando-pagina').fadeIn(200);
            } else {
                $('.carregando-pagina2').fadeIn(200);
            }
        },
        success: function (data) {

            funcSuccess ? funcSuccess(data) : null;

            var msg = data.SUCCESS_MSG || data.success_msg;
            if (msg != undefined) {
                showSuccess(msg);
            }
        },
        error: function (xhr) {
            if (xhr.status === 503 || (typeof xhr.responseText !== 'undefined' && xhr.responseText == '')) {
                showAlert('Ops! Não obtivemos resposta do nosso servidor por motivo de manutenção ou sobrecarga. Mas não se preocupe, estamos reprocessando sua solicitação em 5 segundos... ' + $('#MENSAGEM_ERRO').val());
                setTimeout(function () {
                    execAjax1(type, url_action, data, funcSuccess, funcErro, funcComplete, progress, async, cache, contentType, processData);
                }, 5000);
                return;
            }


            if (xhr.statusText != 'abort') {
                showErro(xhr);
                funcErro ? funcErro(xhr) : null;
            }

            //sessão expirada
            if (xhr.status === 401) {

                if (win_login != null && !win_login.closed) {

                    setTimeout(function () {
                        win_login.close();
                        win_login = winPopUp(document.location.origin, 'login-modal', { width: 400, height: 560 });
                    }, 500);

                } else {

                    setTimeout(function () {
                        win_login = winPopUp(document.location.origin, 'login-modal', { width: 400, height: 560 });
                    }, 500);

                }
            }

        },
        complete: function () {

            //progress 1
            $('.carregando-pagina').fadeOut(200);
            $('.carregando-pagina2').fadeOut(200);

            setTimeout(function () {
                $('.carregando-pagina .progress .progress-bar')
                    .attr({ 'aria-valuenow': 0, 'aria-valuemax': 0 })
                    .css('width', 0);

                $('.carregando-pagina2 .progress .progress-bar')
                    .attr({ 'aria-valuenow': 0, 'aria-valuemax': 0 })
                    .css('width', 0);
            }, 300);

            funcComplete ? funcComplete() : null;

            //$(window).trigger('resize');  

            requestRunning = 0;
            requestAjax = false;
            ajax_tipo = 'auto';
        }
    });
}


function showErro(xhr) {

    var msg = '';

    if (typeof xhr !== 'undefined') {

        if (typeof xhr.responseText !== 'undefined') {
            msg = xhr.responseText;
        } else {
            msg = xhr;
        }

        if (msg == '') {
            msg = 'Ops! Não obtivemos resposta do nosso servidor. Por favor, tente novamente.<br/>';
        } else {

            if (typeof xhr.responseJSON !== 'undefined') {
                msg = xhr.responseJSON.message;
            }
        }

    } else {
        msg = xhr;
    }

    addBalao(msg, 'danger', 2);
}

/**
 * Alerta para mensagem de sucesso.
 * @param {string} msg
 */
function showSuccess(msg) {
    addBalao(msg, 'success', 1);
}

function showAlert(msg) {
    addBalao(msg, 'warning', 3);
}

$(document).on('click', '.msg-balao-fechar', function () {
    $(this).closest('.balao').find('.balao-fechar').click();
});

$(document).on('click', '.balao-fechar', function () {
    $(this).closest('.balao').slideUp(100, function () { $(this).remove(); });
});

/**
 * Alerta para mensagem de sucesso.
 * @param {string} msg
 */
function addBalao(msg, tipo, tipoInt) {

    if (typeof msg == "object") {
        msg = '';
    }

    var tipo = 'alert-' + (tipo || 'default');

    var class_hash = 'class-' + moment().format('YYYYMMDDHHmmssms') + Math.floor(Math.random() * 500) + 1;

    var msgTitle = '';

    if (tipoInt == 1) {
        msgTitle = 'Sucesso';
    } else if (tipoInt == 2) {
        msgTitle = 'Erro';
    } else if (tipoInt == 3) {
        msgTitle = 'Alerta';
    }

    var balao = '<div class="' + class_hash + ' alert ' + tipo + ' alert-dismissible fade show" role="alert" style="display: none;">' +
        '<h5 class="alert-heading">' + msgTitle + '</h5>' +
        msg +
        '<button class="close" type="button" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">×</span>' +
        '</button>' +
        '</div>';

    setTimeout(function () {
        $('.' + class_hash).slideDown();
    }, 100);

    setTimeout(function () {
        if (!$('.' + class_hash).hasClass('balao-fixo')) {
            $('.' + class_hash).slideUp(100, function () { $(this).remove(); });
        }
    }, 7000);

    $('.baloes').prepend(balao);
}

function trim_null(valor) {
    if (valor !== null && typeof valor !== 'undefined') {
        valor = ((valor + '').trim());
    } else {
        valor = '';
    }
    return valor;
}

function onFocusInputModal(modal) {
    $(modal).find('input,select,textarea,div[contenteditable=true]').not('.not_tab_enter').filter(":not([readonly]):visible:enabled:first").focus();
}


function getEnderecoByCepJS(cep) {

    var cepFormatted = trim_null(cep);
    var cepNoFormattedPonto = cepFormatted.replace('.', '');
    var cepNoFormattedTraco = cepNoFormattedPonto.replace('-', '');
    var cepNoFormatted = cepNoFormattedTraco;

    return $.getJSON("https://viacep.com.br/ws/" + cepNoFormatted + "/json/?callback=?").then(function (dados) {

        var dadosToGet = {};

        if (!("erro" in dados)) {
            dadosToGet.ENDERECO = dados.logradouro;
            dadosToGet.BAIRRO = dados.bairro;
            dadosToGet.CIDADE = dados.localidade;
            dadosToGet.UF = dados.uf;
            dadosToGet.ERROR = false;

        } else {
            dadosToGet.ERROR = true;
        }

        return dadosToGet;
    });

}

function sweetAlert(tipo, mensagem, that) {
    Swal.fire({
        title: mensagem,
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {
            if (tipo == 1) {
                that.confirmarGravar();
            } else if (tipo == 2) {
                that.confirmarCancelar();
            } else if (tipo == 3) {
                that.confirmarExcluir();
            }
        }
    });
}


function findNextField(event, consulta) {
    if (consulta) {
        //se o alvo do evento for uma consulta...
        var a = $(event).nextAll();
    } else {
        //se o alvo do evento não for uma consulta...
        var a = $(event.currentTarget).nextAll();
    }

    for (var index = 0; index < a.length; index++) {
        var z = $(a[index]);
        if (z.is('div')) {
            var b = z.find('input:focusable:not(:disabled):not([readonly])');
            var c = z.find('select:focusable:not(:disabled):not([readonly])');
            var d = z.find('textarea:focusable:not(:disabled):not([readonly])');
            var e = z.find('div.consulta:not(' + event + ')');
            if (b.length > 0) {
                b.first().focus();
                b.first().select();
                break;
            } else if (c.length > 0) {
                c.first().focus();
                c.first().select();
                break;
            } else if (d.length > 0) {
                d.first().focus();
                d.first().select();
                break;
            } else if (e.length > 0) {
                if (e.find('button.btn-apagar-filtro-consulta:enabled')) {
                    var x = e.find('input:focusable')
                    if (x.length > 0) {
                        e.find('input:focusable').first().focus();
                        e.find('input:focusable').first().select();
                        break;
                    }
                }
            }
        } else {
            if (z.is('input:focusable:not(:disabled):not([readonly])')) {
                z.focus();
                z.select();
                break;
            } else if (z.is('select:focusable:not(:disabled):not([readonly])')) {
                z.focus();
                z.select();
                break;
            } else if (z.is('textarea:focusable:not(:disabled):not([readonly])')) {
                z.focus();
                z.select();
                break;
            }
        }
    }

    if (a.length == 0 && consulta == true) {
        var zw = $(event).parent().nextAll();
        for (var index = 0; index < zw.length; index++) {
            var z = $(zw[index]);
            if (z.is('div')) {
                var b = z.find('input:focusable:not(:disabled):not([readonly])');
                var c = z.find('select:focusable:not(:disabled):not([readonly])');
                var d = z.find('textarea:focusable:not(:disabled):not([readonly])');
                if (b.length > 0) {
                    b.first().focus();
                    b.first().select();
                    break;
                } else if (c.length > 0) {
                    c.first().focus();
                    c.first().select();
                    break;
                } else if (d.length > 0) {
                    d.first().focus();
                    d.first().select();
                    break;
                }
            } else {
                if (z.is('input:focusable:not(:disabled):not([readonly])')) {
                    z.focus();
                    z.select();
                    break;
                } else if (z.is('select:focusable:not(:disabled):not([readonly])')) {
                    z.focus();
                    z.select();
                    break;
                } else if (z.is('textarea:focusable:not(:disabled):not([readonly])')) {
                    z.focus();
                    z.select();
                    break;
                }
            }
        }
    }
}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


// Função para truncar números
// Retorno: String
function num_trunc(num, fixed) {

    if (!isNumber(num) || isNaN(num) || !isFinite(num)) {
        num = 0;
    }

    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function isMobile() {
    var userAgent = navigator.userAgent.toLowerCase();
    //console.log('Navegador utilizado',userAgent);
    //alert('Navegador utilizado',userAgent);
    if (userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1) {
        return true;
    }
}