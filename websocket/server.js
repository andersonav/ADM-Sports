var ip_server = '127.0.0.1';
var porta_server = '8091';

//*
var protocolo_server = 'http';
var porta = '7000';

var WebSocketServer = require('websocket').server;
var http = require(protocolo_server);
var xhr = require('node-xhr');
var mcache = require('memory-cache');

var options = {
    // key:  fs.readFileSync('/etc/letsencrypt/live/gc.delfa.com.br/privkey.pem'),
    // cert: fs.readFileSync('/etc/letsencrypt/live/gc.delfa.com.br/fullchain.pem')
};

var server = http.createServer(options, function (request, response) {
    console.log((new Date()) + ' Pedido recebido para ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(porta, function () {
    console.log((new Date()) + ' Servidor está escutando na porta ' + porta);
});

wsServer = new WebSocketServer({
    httpServer: server,
    // Você não deve usar autoAcceptConnections para produção
    // aplicações, como ele derrota todos os padrões de proteção de origem cruzada
    // instalações construídas no protocolo e no navegador. Você deve
    // * sempre * verificar a origem da conexão e decidir se ou não
    // para aceitá-lo.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    console.log((new Date()) + ' Origem: ' + origin);
    var ret = false;

    switch (origin) {
        case 'http://127.0.0.1':
            ret = true;
            break;
        case 'http://192.168.0.71:8000':
            ret = true;
            break;
        case 'http://192.168.0.71':
            ret = true;
            break;
        case 'INTERNO':
            ret = true;
            break;
        default:
            ret = true;
    }

    return true;
}

var clientes = [];
var cliente_id = 0;

var clientes_chat = [];

var convArrToObj = function (array) {
    var thisEleObj = new Object();
    if (typeof array == "object") {
        for (var i in array) {
            var thisEle = convArrToObj(array[i]);
            thisEleObj[i] = thisEle;
        }
    } else {
        thisEleObj = array;
    }
    return thisEleObj;
};

var oldJSONStringify = JSON.stringify;
JSON.stringify = function (input) {
    if (oldJSONStringify(input) == '[]')
        return oldJSONStringify(convArrToObj(input));
    else
        return oldJSONStringify(input);
};

function senMensage(obj, para) {

    clientes.forEach(
        function (con, index) {
            if (para == con.CLIENTE_ID_SOCKET) {
                console.log((new Date()) + ' Enviando mensagem para cliente ID:' + con.CLIENTE_ID_SOCKET);
                con.sendUTF(obj);
            }
        }
    );
}

function sendMensage(msg, para) {

    clientes.forEach(
        function (con, index) {
            if (para == con.USER_ID) {
                console.log((new Date()) + ' Enviando mensagem para cliente ID:' + con.CLIENTE_ID_SOCKET + ' Usuario:' + con.USER_ID);
                con.sendUTF(JSON.stringify(msg));
            }
        }
    );
}

/**
 * @param int tipoFuncao [0 = login, 1 = enviar msg]
 */
function sendMensageChat(obj, para, tipoFuncao) {

    var idConexao = [],
        idCon = {},
        contaUsuario = 0
        ;

    clientes_chat.forEach(
        function (cliente, i) {

            if (para == cliente.USUARIO_ID) {
                idConexao = cliente.CONEXOES;
            }
        }
    );

    clientes.forEach(
        function (con, index) {

            for (var i in idConexao) {

                idCon = idConexao[i];

                if (idCon == con.CLIENTE_ID_SOCKET) {

                    console.log((new Date()) + ' Enviando mensagem para cliente ID: ' + con.CLIENTE_ID_SOCKET);

                    // Notificar ao usuário somente 1 vez. (nao funciona)
                    if (contaUsuario == 0 && tipoFuncao == 1) {

                        obj = JSON.parse(obj);
                        obj.NOTIF_NOVA_MSG = 1;
                        obj = JSON.stringify(obj);
                    }

                    contaUsuario++;
                    con.sendUTF(obj);
                }
            }
        }
    );
}


function sendMensageCache(MSG, USUARIO_ID) {
    var envio = 0;
    var array_msg = [];
    var array_temp = [];
    var temp_cli = {};

    console.log((new Date()) + ' Mensagem recebida pra o usuario:' + USUARIO_ID);

    clientes.forEach(
        function (cli, i) {
            if (USUARIO_ID == cli.USER_ID) {
                envio = 1;
                console.log((new Date()) + ' Enviando mensagem para cliente ID:' + cli.CLIENTE_ID_SOCKET + ' Usuario:' + cli.USER_ID);
                cli.sendUTF(JSON.stringify(MSG));
                temp_cli = cli;
            }
        }
    );

    array_temp = mcache.get(USUARIO_ID);

    if (envio == 1) {

        if (array_temp) {
            array_temp.forEach(
                function (ms, i) {
                    console.log((new Date()) + ' Enviando mensagem para cliente ID:' + temp_cli.CLIENTE_ID_SOCKET + ' Usuario:' + temp_cli.USER_ID);
                    temp_cli.sendUTF(JSON.stringify(ms));
                }
            );

            mcache.put(USUARIO_ID, [], 900000 * 1000);
        }

    } else {

        if (array_temp) {
            array_msg = array_temp;
        }

        array_msg.push(MSG);
        mcache.put(USUARIO_ID, array_msg, 900000 * 1000);
    }
}

function sendCacheUser(USUARIO_ID) {
    var envio = 0;
    var array_msg = [];
    var array_temp = [];
    var temp_cli = {};

    clientes.forEach(
        function (cli, i) {
            if (USUARIO_ID == cli.USER_ID) {
                envio = 1;
                temp_cli = cli;
            }
        }
    );

    array_temp = mcache.get(USUARIO_ID);

    if (envio == 1) {

        if (array_temp) {
            array_temp.forEach(
                function (MSG, i) {
                    console.log((new Date()) + ' Enviando mensagem para cliente ID:' + temp_cli.CLIENTE_ID_SOCKET + ' Usuario:' + temp_cli.USER_ID);
                    temp_cli.sendUTF(JSON.stringify(MSG));
                }
            );

            mcache.put(USUARIO_ID, [], 900000 * 1000);
        }

    }
}

function sendBroadcastMenu(obj, para) {
    clientes.forEach(
        function (con, index) {
            if (para == con.MENU) {
                console.log((new Date()) + ' Enviando mensagem para cliente iD:' + con.CLIENTE_ID_SOCKET);
                con.sendUTF(obj);
            }
        }
    );
}

function connectInMethod(dados, para) {
    console.log('conect');
    console.log(para);
    clientes.forEach(
        function (cliente, index) {
            if (para == cliente.CLIENTE_ID_SOCKET) {

                var query = dados['MENSAGE']['DADOS'];

                cliente.METODO = setInterval(function () {

                    var tipo = dados['MENSAGE']['TYPE'];
                    var metodo = dados['MENSAGE']['METODO'];

                    dados['MENSAGE']['TYPE'] = metodo;
                    dados['MENSAGE']['METODO'] = tipo;



                    ajax(query.ROUTE, query.ARGS, function (res) {
                        console.log(res);
                        dados['MENSAGE']['DADOS'] = res;
                        cliente.sendUTF(JSON.stringify(dados));
                    },
                        function (e) {
                            console.log(e);
                        })

                }, query.TIME);
            }
        }
    );
}

function desconnectInMethod(dados, para) {
    clientes.forEach(
        function (cliente, index) {
            if (para == cliente.CLIENTE_ID_SOCKET) {
                clearInterval(cliente.METODO);
            }
        }
    );
}

function ajax(route, args, success, error) {

    var param = {
        url: protocolo_server + "://" + ip_server + ":" + porta_server + "/" + route,
        headers: { 'Content-Type': 'application/json' },
        params: args,
        body: {},
    };

    console.log(param);

    xhr.post(param, function (err, res) {
        console.log(err);
        console.log(res);
        if (err) {

            error ? error(err) : null;

        } else {
            success ? success(res.body) : null;
        }
    });
}

wsServer.on('request', function (request) {
    try {

        if (!originIsAllowed(request.origin)) {
            request.reject();
            console.log((new Date()) + ' Conexão de origem ' + request.origin + ' rejeitado 1.');
            return;
        }
        var connection = request.accept('', request.origin);
        connection.tipo_origin = request.origin;

        //console.log(request.origin);

        if (request.origin == 'INTERNO') {

        } else {
            cliente_id++;

            connection.CLIENTE_ID_SOCKET = cliente_id;
            connection.METODO = null;

            clientes.push(connection);

        }

        console.log((new Date()) + ' Conexão aceita.');

        connection.on('message', function (message) {
            if (message.type === 'utf8') {

                var cliente;

                var index = clientes.indexOf(connection);

                if (index !== -1 || connection.tipo_origin == 'INTERNO') {

                    if (connection.tipo_origin != 'INTERNO') {
                        cliente = clientes[index];
                    } else {
                        cliente = { CLIENTE_ID_SOCKET: 0, METODO: null };
                    }

                    console.log((new Date()) + ' Mensagem Recebida do Cliente de ID: ' + cliente.CLIENTE_ID_SOCKET);
                    var item = JSON.parse(message.utf8Data);

                    var de = item.DE;
                    var para = item.PARA;
                    var user_id = item.USER_ID;
                    var send = item.MENSAGE;

                    var tipo = send.TYPE;
                    var dado = send.DADOS;
                    var metod = send.METODO;
                    var request = send.REQUEST;
                    var menu = send.MENU;

                    var dados = [];

                    dados['CHANEL'] = cliente.CLIENTE_ID_SOCKET;
                    dados['VALIDE'] = true;
                    dados['MENSAGE'] = [];
                    dados['MENSAGE']['TYPE'] = tipo;
                    dados['MENSAGE']['METODO'] = metod;
                    dados['MENSAGE']['DADOS'] = dado;
                    dados['MENSAGE']['REQUEST'] = request;

                    switch (tipo) {
                        case 'senMensageSap':

                            console.log('Recebendo mensagem (SAP) para ' + para);
                            senMensageSap(para, dado.MENSAGEM);

                            break;
                        case 'sendUserNotfi':

                            for (var i = 0; i < dado.length; i++) {
                                var obj = dado[i];

                                var dados_envio = [];
                                dados_envio['MENSAGE'] = [];

                                dados_envio['MENSAGE']['DADOS'] = obj;
                                dados_envio['MENSAGE']['TYPE'] = metod;
                                dados_envio['MENSAGE']['METODO'] = metod;
                                dados_envio['VALIDE'] = true;

                                sendMensageCache(dados_envio, obj['USUARIO_ID']);

                            }

                            break;
                        case 'sendNotification':

                            var dados_envio = [];
                            dados_envio['MENSAGE'] = [];

                            dados_envio['MENSAGE']['DADOS'] = dado;
                            dados_envio['MENSAGE']['TYPE'] = metod;
                            dados_envio['MENSAGE']['METODO'] = metod;
                            dados_envio['VALIDE'] = true;

                            console.log('Recebendo mensagem para ' + para);

                            if (send.MSG_TYPE == 0 || send.MSG_TYPE == 5) {
                                sendMensageCache(dados_envio, para);
                            } else {
                                sendMensage(dados_envio, para);
                            }


                            break;
                        case 'GETIDCOM':

                            cliente.USER_ID = user_id;
                            cliente.MENU = menu;

                            if (cliente.USER_ID != undefined && cliente.USER_ID > 0) {
                                sendCacheUser(cliente.USER_ID);
                            }

                            var msg = JSON.stringify(dados);
                            senMensage(msg, cliente.CLIENTE_ID_SOCKET);

                            break;
                        case 'RESPONSE':

                            dados['TYPE'] = metod;
                            dados['METODO'] = tipo;

                            senMensage(JSON.stringify(dados), para);

                            break;
                        case 'BROADCAST_MENU':

                            dados['TYPE'] = metod;
                            dados['METODO'] = tipo;

                            sendBroadcastMenu(JSON.stringify(dados), para);
                            break;
                        case 'WATCH_METHOD':
                            console.log('começo metodo');
                            connectInMethod(dados, para);
                            break;
                        case 'STOP_WATCH_METHOD':
                            desconnectInMethod(dados, para);
                            break;
                        case 'LOGIN_CHAT':

                            var temp = {
                                'NOME': dados['MENSAGE']['DADOS']['NOME'],
                                'ID': dados['MENSAGE']['DADOS']['ID'],
                                'TYPO': dados['MENSAGE']['DADOS']['TYPO'],
                                'STATUS': dados['MENSAGE']['DADOS']['STATUS'],
                                'CLIENTE_ID': dados['MENSAGE']['DADOS']['CLIENTE_ID'],          // identificar se é cliente
                                'REPRESENTANTE_ID': dados['MENSAGE']['DADOS']['REPRESENTANTE_ID'],    // identificar se é representante
                                'REPRES_DO_CLIENTE': dados['MENSAGE']['DADOS']['REPRES_DO_CLIENTE'],
                                'NOTIF_NOVA_MSG': 0,
                                'USUARIO_ID': user_id,
                                'CONEXOES': [
                                    dados['MENSAGE']['DADOS']['ID']
                                ]
                            },
                                validar = true
                                ;

                            clientes_chat.forEach(
                                function (cliente, i) {

                                    if (user_id == cliente.USUARIO_ID) {

                                        validar = false;
                                        cliente.CONEXOES.push(temp.ID);
                                        temp = cliente;
                                    }
                                }
                            );

                            if (validar) {
                                clientes_chat.push(temp);
                            }

                            dados['MENSAGE']['DADOS'] = { NEW: temp, LISTA: clientes_chat };
                            dados['MENSAGE']['TYPE'] = 'ON_LOGIN_USER';
                            dados['MENSAGE']['METODO'] = 'ON_LOGIN_USER';

                            var msg = JSON.stringify(dados);

                            clientes_chat.forEach(
                                function (cliente, index) {
                                    sendMensageChat(msg, cliente.USUARIO_ID);
                                }
                            );

                            break;

                        case 'SEND_CHAT':

                            dados['TYPE'] = 'ON_MENSAGE';
                            dados['METODO'] = 'ON_MENSAGE';
                            dados['MENSAGE']['TYPE'] = 'ON_MENSAGE';
                            dados['MENSAGE']['METODO'] = 'ON_MENSAGE';
                            dados['NOTIF_NOVA_MSG'] = 0;

                            sendMensageChat(JSON.stringify(dados), para, 1);

                            break;

                        default:
                            var msg = JSON.stringify(dados);
                            senMensage(msg, cliente.CLIENTE_ID_SOCKET);
                    }

                } else {

                    var item = JSON.parse(message.utf8Data);
                    var send = item.MENSAGE;

                    var tipo = send.TYPE;
                    var dado = send.DADOS;
                    var metod = send.METODO;
                    var request = send.REQUEST;
                    var menu = send.MENU;

                    for (var i = 0; i < dado.length; i++) {
                        var obj = dado[i];

                        var dados_envio = [];
                        dados_envio['MENSAGE'] = [];

                        dados_envio['MENSAGE']['DADOS'] = obj;
                        dados_envio['MENSAGE']['TYPE'] = metod;
                        dados_envio['MENSAGE']['METODO'] = metod;
                        dados_envio['VALIDE'] = true;

                        clientes.forEach(
                            function (cliente, i) {
                                if (obj['USUARIO_ID'] == cliente.USER_ID) {
                                    console.log((new Date()) + ' Enviando mensagem para cliente ID:' + cliente.CLIENTE_ID_SOCKET);
                                    cliente.sendUTF(JSON.stringify(dados_envio));
                                }
                            }
                        );
                    }

                }

            }
            else if (message.type === 'binary') {
                console.log((new Date()) + ' Mensagem binária recebida com ' + message.binaryData.length + ' bytes');
                connection.sendBytes(message.binaryData);
            }
        });

        connection.on('close', function (reasonCode, description) {

            if (connection.tipo_origin != 'INTERNO') {

                var index = clientes.indexOf(connection);

                var cliente_id = clientes[index].CLIENTE_ID_SOCKET;

                if (index !== -1) {
                    console.log((new Date()) + ' Cliente com IP:' + connection.remoteAddress + ' e ID:' + cliente_id + ' desconectado.');

                    // Apaga a conexão do cliente que desconectou
                    clearInterval(clientes[index].METODO);
                    clientes.splice(index, 1);

                    var temp = 0;

                    // Laço para apagar ids de chat que desconectaram
                    clientes_chat.forEach(
                        function (cliente, index) {

                            // Procura nas conexoes de um usuario a conexao que desconectou
                            cliente.CONEXOES.forEach(
                                function (conexao, i) {

                                    if (cliente_id == conexao) {
                                        cliente.CONEXOES.splice(i, 1);
                                    }
                                });

                            // se um cliente de chat nao tem mais conexoes, ele eh removido
                            if (cliente.CONEXOES.length == 0) {

                                temp = cliente;
                                clientes_chat.splice(index, 1);

                                var dados = [];
                                dados['CHANEL'] = 0;
                                dados['VALIDE'] = true;
                                dados['MENSAGE'] = [];
                                dados['MENSAGE']['TYPE'] = 'ON_LOGOF_USER';
                                dados['MENSAGE']['METODO'] = 'ON_LOGOF_USER';
                                dados['MENSAGE']['REQUEST'] = '';
                                dados['MENSAGE']['DADOS'] = { OLD: temp, LISTA: clientes_chat };

                                var msg = JSON.stringify(dados);

                                // notifica os clientes de chat que um cliente se desconectou
                                clientes_chat.forEach(
                                    function (cliente, index) {
                                        sendMensageChat(msg, cliente.USUARIO_ID);
                                    }
                                );
                            }
                        }
                    );

                }
            } else {

            }
        });

    } catch (e) {
        console.log(e);
    }

});