/**
 * _11190 - Notificacao
 */

; (function (angular) {

    var Notificacao = function ($scope, $timeout) {

        var vm = this;
        vm.acaoContador = {};
        vm.acaoContador.tempo = 5;

        vm.acaoContador.fechar = function () {
            if (vm.contador.visivel == true) {
                vm.contador.visivel = false;
                $timeout.cancel(vm.contador.time);
                $timeout.cancel(vm.acaoContador.ftime);
                vm.contador.acao();
            }
        };

        vm.acaoContador.ftime = function () {

            vm.acaoContador.tempo = vm.acaoContador.tempo - 1;

            if (vm.acaoContador.tempo > 0) {
                $timeout(vm.acaoContador.ftime, 1000);
            } else {
                vm.acaoContador.fechar();
            }
        };

        vm.contador = {
            tempo: 5,
            acao: null,
            time: null,
            visivel: false,
            msg1: 'Sua tela sera atualizada em',
            msg2: 'Fechar o contador atualizara sua tela agora',
            fechar: function () {
                vm.contador.visivel = false;
            },
            iniciar: function () {
                var that = this;
                that.visivel = true;
                that.time = $timeout(vm.acaoContador.ftime, 1000);

                vm.acaoContador.tempo = that.tempo;
            }
        };

        // Funções para o web socket.
        var metodos = [
            {
                METHOD: 'NOTIFICACAO',
                FUNCTION: function (ret) {
                    var mensagem = ret.MENSAGE.DADOS.MENSAGEM;
                    var titulo = ret.MENSAGE.DADOS.TITULO;
                    var id = ret.MENSAGE.DADOS.MENSAGE_SOCKET_ID;
                    var agd_id = ret.MENSAGE.DADOS.AGENDAMENTO_ID;
                    var tipo = ret.MENSAGE.DADOS.TIPO;
                    var de = ret.MENSAGE.DADOS.DE;

                    addNotificacao(mensagem, titulo, id, 0, agd_id, tipo, de);
                }
            },
            {
                METHOD: 'UPDATETELA',
                FUNCTION: function (ret) {
                    vm.contador.acao = function () { location.reload(); };
                    vm.contador.msg1 = 'Sua tela sera atualizada em';
                    vm.contador.msg2 = 'Fechar o contador atualizara sua tela agora';
                    vm.contador.tempo = 5;
                    vm.contador.iniciar();
                }
            },
            {
                METHOD: 'UPDATEMENUS',
                FUNCTION: function (ret) {
                    vm.contador.acao = function () {
                        window.localStorage.removeItem('ngStorage-menus');
                        location.reload();
                    };
                    vm.contador.msg1 = 'Seus menus serão atualizados em';
                    vm.contador.msg2 = 'Fechar o contador atualizara seus menus agora';
                    vm.contador.tempo = 5;
                    vm.contador.iniciar();
                }
            }

        ];

        // Iniciar web socket.
        SocketWeb.SILENT = true;
        var reconet = null;

        SocketWeb.ERROR_EVENT = function (error) {

            SocketWeb.setStatus(2);

            reconet = setTimeout(function (e) {
                //if(SocketWeb.ERROS < 3){
                console.log('Tentando conectar...');
                SocketWeb.create(metodos);
                clearTimeout(reconet);
                //}
            }, 5000);

            if (error.type == 'close') {
                //showErro('Servidor WebSocket desconectado.');
            } else {
                //showErro('Erro no servidor WebSocket.');
            }

        };

        $(document).on('click', '.websocket-desconectado', function (event) {
            console.log('Tentando conectar...');
            clearTimeout(reconet);
            SocketWeb.create(metodos);
        });

        vm.init = function () {
            SocketWeb.create(metodos);
        }
    };

    Notificacao.$inject = [
        '$scope',
        '$timeout'
    ];

    angular
        .module('appNotificacao', [])
        .controller('CrtNotificacao', Notificacao);

    angular.bootstrap(document.getElementById('idNotificacao'), ['appNotificacao']);

})(angular);