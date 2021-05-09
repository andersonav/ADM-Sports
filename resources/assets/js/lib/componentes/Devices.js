(function(window, angular) {
    'use strict';

	angular
        .module('app').factory('Devices' , Devices );
	
    Devices.$inject = [
		'$q',
		'$timeout',
		'gScope'
    ];

	function Devices($q, $timeout, gScope) {

        // Private variables.
        var obj      = null;
        
	    /**
	     * Constructor, with class name
	     */
		function Devices() {
            
            obj = this; 

			obj.server	   = 'http://localhost:8081';
            obj.server_url = obj.server + '/datasnap/rest/TServerMethods1/';

            obj.execComando         = execComando;
            obj.imprimirEtiqueta    = imprimirEtiqueta;
			obj.imprimirCupom       = imprimirCupom;
			obj.iniciarServidor		= iniciarServidor;
			obj.testarServer		= testarServer;
			obj.imprimirEspelhoPonto= imprimirEspelhoPonto;
			obj.imprimirEspelhoPonto= imprimirEspelhoPonto;
			obj.ligarBalanca		= ligarBalanca;
			obj.desligarBalanca		= desligarBalanca;
		}
		
		function iniciarServidor(){
            var that = this;

            function executar(){
				document.location.href = "clientprint:";

				showAlert('Tentando iniciar servidor...');

				$timeout(function(){

					that.testarServer().then(function(contents){
					
						if(!contents.valido){
							gScope.Confirme.add(1,'Erro ao iniciar',
							'O servidor de dispositivos do GCWeb não pode ser iniciado, baixar instalador?'
							, [ gScope.Confirme.obtn_nao, gScope.Confirme.obtn_sim],[
								function (e, btn){ 
								},
								function (e, btn){
									document.location.href = urlhost + '/out/GCWebDevices_Setup.exe';
								}
							]);
						}else{
							showSuccess('Servidor iniciado.');
						}
					
					});

				},3000);
			}

			gScope.Confirme.add(1,'Confirmação',
			'O servidor de dispositivos do GCWeb não respondeu, deseja tentar iniciar o servidor?'
			, [gScope.Confirme.obtn_nao, gScope.Confirme.obtn_sim],[
				function (e, btn){ 
				},
				function (e, btn){
					executar();
				}
			]);
        }

        function imprimirEtiqueta(codigo){
            var that = this;

            return $q(function(resolve, reject){

                that.execComando( that.server_url + 'imprimirEtiqueta', {CODIGO: codigo}).then(function(dados){
					resolve(dados);
                });
                
            });
        }
		
        function ligarBalanca(){
            var that = this;

            return $q(function(resolve, reject){
                that.execComando( that.server_url + 'ligarBalanca', {}).then(function(dados){
					resolve(dados);
                });
            });
		}

		function desligarBalanca(){
            var that = this;

            return $q(function(resolve, reject){
                that.execComando( that.server_url + 'desligarBalanca', {}).then(function(dados){
					resolve(dados);
                });
            });
		}

		function imprimirEspelhoPonto(colaboradores){
            var that = this;

            return $q(function(resolve, reject){

                that.execComando( that.server_url + 'imprimirEspelhoPonto', {COLABORADORES: colaboradores}).then(function(dados){
					resolve(dados);
                });
                
            });
		}

		function imprimirCupom(codigo){
            var that = this;

            return $q(function(resolve, reject){

                that.execComando( that.server_url + 'imprimirCupom', {CODIGO: codigo}).then(function(dados){
					resolve(dados);
                });
                
            });
		}
		
		function testarServer(){
			var that = this;

			return $q(function(resolve, reject){
				var xhttp= new XMLHttpRequest();

				try{

					xhttp.onreadystatechange = function() {
						
						if (xhttp.readyState == 4 && xhttp.status == 200) {
							resolve({valido : true, retorno : ''});
						}else{
							if (xhttp.readyState == 4 && xhttp.status == 0) {
								resolve({valido : false, retorno : ''});
							}else{
								if (xhttp.readyState == 4 && xhttp.status > 200) {
									resolve({valido : false, retorno : ''});
								}
							}
						}
					};

					xhttp.open("GET", that.server , true);
					xhttp.send();

				}catch(e){
					resolve({valido : false, retorno : ''});
				}

			});

		}

        function execComando(url, parans) {
            var that = this;
			var urlparan = '';

			if(typeof parans == 'undefined'){
				parans = [];
			}else{
				urlparan = '/' + encodeURIComponent(JSON.stringify(parans));
			}

            return $q(function(resolve, reject){
				
				var xhttp= new XMLHttpRequest();

				xhttp.onreadystatechange = function() {

					if (xhttp.readyState == 4 && xhttp.status == 0) {
						that.iniciarServidor();
						resolve({valido : false, retorno : 'Erro ao conectar com o servidor de dispositivos do GCWeb.'});	
					}else{
						
						if (xhttp.readyState == 4 && xhttp.status == status) {
							var dados = JSON.parse(xhttp.responseText);
		
							if(typeof dados.error == 'undefined' || dados.error == ''){

								dados = JSON.parse(dados.result[0]);
			
								if(typeof dados.error == 'undefined' || dados.error == ''){
									resolve({valido : true, retorno : dados});
								}else{
									resolve({valido : false, retorno : dados});
								}
								
							}else{
								resolve({valido : false, retorno : dados});
							}
						}
					}
				};

				xhttp.open("GET", url + urlparan , true);
				xhttp.send();
			});

		}
            
	    /**
	     * Return the constructor function
	     */
	    return Devices;
	};
	
})(window, window.angular);