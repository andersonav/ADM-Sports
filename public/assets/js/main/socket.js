/**
 * WebSocket
 */

var SocketWeb = {
    CONNECTION: null,
    CONNECTION_ID: 0,
    QUERY_METHOD: [],
    ERROR_EVENT: null,
    SUCCESS_EVENT: null,
    SUCCESS_EVENT: null,
    SILENT: false,
    ERROS: 0,
    setStatus: function (status) {
        //0-não definido
        //1-conectado
        //2-desconectado
        var obj = $('.status-websocket');

        if (status == 1) {
            $(obj).find('.conectado').css('display', 'flex');
            $(obj).find('.desconectado').css('display', 'none');
        } else {
            $(obj).find('.conectado').css('display', 'none');
            $(obj).find('.desconectado').css('display', 'flex');
        }
    },
    create: function (methods) {

        var habilita_websocket = 0;

        var that = this;
        var wsUri = 'ws://admsports.app.br:7000';

        if (habilita_websocket == 1) {
            this.CONNECTION = new WebSocket(wsUri);
            this.QUERY_METHOD = methods;

            this.CONNECTION.onopen = function () {
                that.setStatus(1);
                that.ERROS = 0;

                socketLog(that.CONNECTION);
                that.sendMensage('DE', 'PARA', 'MSG', 'GETIDCOM', 'GETIDCOM', 'REQUEST');

                if (that.SUCCESS_EVENT != null) {
                    that.SUCCESS_EVENT();
                }
            };

            // Log errors
            this.CONNECTION.onerror = function (error) {
                socketLog(error);
                that.onError(error);
                //that = null;

                that.setStatus(2);
            };

            // Log errors
            this.CONNECTION.onclose = function (error) {
                socketLog(error);

                that.setStatus(2);

                if (that != null) {
                    that.onError(error);
                    //that = null;
                }
            };

            // Log messages from the server
            this.CONNECTION.onmessage = function (e) {
                socketLog(e);
                obj = $.parseJSON(e.data);

                socketLog(obj);

                var CHANEL = obj.CHANEL;
                var MSG = obj.MENSAGE;
                var VALIDE = obj.VALIDE;

                var TYPE = obj.MENSAGE.TYPE;
                var DADOS = obj.MENSAGE.DADOS;
                var METODO = obj.MENSAGE.METODO;

                if (VALIDE == true) {

                    socketLog(obj);

                    if (METODO == 'GETIDCOM') {

                        $('._socket_token').val(CHANEL);
                        that.CONNECTION_ID = CHANEL;
                    } else {
                        if (METODO == 'PROGRESS') {
                            $('.progress-bar').css('transition', '0.5s');
                            $('.progress-bar').css('background-color', 'rgba(169, 15, 15, 0.8);');

                            $('.progress-bar').css('width', DADOS);
                        } else {
                            that.onMensage(obj);
                        }
                    }


                } else {
                    alert('Erro ao conectar');
                }
            };
        }
    },
    addMetode: function (metodos) {

        for (var index = 0; index < metodos.length; index++) {
            var item = metodos[index];
            this.QUERY_METHOD.push(item);
        }

    },
    onError: function (error) {

        this.ERROS++;

        if (this.ERROR_EVENT == null) {
            if (!this.SILENT) {
                if (error.type == 'close') {
                    showErro('Servidor WebSocket desconectado.');
                }
                else {
                    showErro('Erro no servidor WebSocket.')
                }
            }
        }
        else {
            this.ERROR_EVENT(error);
        }
    },
    sendMensage: function (DE, PARA, MSG, TYPE, METODO, REQUEST) {

        var msg = {
            DE: DE,
            PARA: PARA,
            MENU: 2121,
            USER_ID: 3545,
            MENSAGE: {
                TYPE: TYPE,
                DADOS: MSG,
                METODO: METODO,
                REQUEST: REQUEST
            }
        };

        this.CONNECTION.send(JSON.stringify(msg));
    },
    onMensage: function (message) {
        
        for (var i in this.QUERY_METHOD) {

            var item = this.QUERY_METHOD[i];

            if (message.MENSAGE.METODO == item.METHOD) {
                item.FUNCTION ? item.FUNCTION(message) : null;
            }
        }

    },
    watchMethod: function (route, args, time) {

        var that = this;
        var si = setInterval(function () {

            if (that.CONNECTION_ID > 0) {

                clearInterval(si);

                var msg = {
                    DE: that.CONNECTION_ID,
                    PARA: that.CONNECTION_ID,
                    MENU: $('meta[menu]').attr('content'),
                    USER_ID: $('meta[user_id]').attr('content'),
                    MENSAGE: {
                        TYPE: 'WATCH_METHOD',
                        DADOS: {
                            ROUTE: route,
                            ARGS: args,
                            TIME: time
                        },
                        METODO: 'WATCH_METHOD',
                        REQUEST: []
                    }
                };

                that.CONNECTION.send(JSON.stringify(msg));
            }
        }, 1000);


    }
};



function socketLog(msg) {
}