(function (window, angular) {
	'use strict';

	angular
		.module('app')
		.factory('Lancamentos', Lancamentos);

	Lancamentos.$inject = [
		'$ajax',
		'$q',
		'$compile',
		'$rootScope',
		'$timeout',
		'gScope'
	];

	function Lancamentos($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
		 * Constructor, with class name
		 */
		function Lancamentos($scope) {

			obj = this;
			obj.scope 									= $scope;
			obj.model 									= 'vm.Lancamentos';

            obj.url_consultar 							= urlhost + '/admin/funcionalidades/lancamentos/get';
			obj.url_gravar 								= urlhost + '/admin/funcionalidades/lancamentos/post';
			obj.url_excluir 							= urlhost + '/admin/funcionalidades/lancamentos/delete';

			obj.SELECTED 								= {};
			obj.BACKUP 									= {};
			obj.DADOS 									= [];
			obj.BACKUP_ITENS							= [];
			obj.consultas								= [];

			obj.CAMPO_INDEX 							= 'ID';

			obj.INCLUINDO 								= false;
			obj.ALTERANDO 								= false;

			obj.MODAL									= "#modalLancamentos";

			obj.setDadosIncluir 						= setDadosIncluir;
			obj.incluir 								= incluir;
			obj.gravar 									= gravar;
			obj.confirmarGravar 						= confirmarGravar;
			obj.excluir									= excluir;
			obj.confirmarExcluir						= confirmarExcluir;
			obj.cancelar 								= cancelar;
			obj.confirmarCancelar 						= confirmarCancelar;
			obj.alterar									= alterar;
			obj.visualizar								= visualizar;
			obj.insertConsultas							= insertConsultas;
			obj.setDadosConsultar						= setDadosConsultar;
			obj.consultar 		        				= consultar;
			obj.compileDatatable        				= compileDatatable;
		}

		function setDadosIncluir() {

			var dataAtual = new Date();

			var date = moment(dataAtual).toDate();

			var dados = {
				VALOR_TOTAL				: 0,
				DESCRICAO				: '',
				DATA					: date,
				DATA_VENCIMENTO			: date,
				DATA_RECEB_PAG 			: date,
				STATUS					: 0,
				TIPO					: 0
			};

			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			if(that.consultas.length > 0){
				angular.forEach(that.consultas, function(consulta, key){
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

			if(gScope.ConsultaModuloContaItem.item.selected == false){
				check = false;
				showErro("Módulo de conta obrigatório");
				gScope.ConsultaModuloContaItem.setFocusInput();
			}
			
			if(gScope.ConsultaTipoDocumento.item.selected == false){
				check = false;
				showErro("Tipo do documento obrigatório");
				gScope.ConsultaTipoDocumento.setFocusInput();
			}

			if (check == true) {
				var msg = gScope.Confirme.add(1,'Confirmação',
				'Deseja realmente gravar esse registro?' , [
					{desc:'Não' 	,	class:'btn-danger' ,	ret:'2',	hotkey:'esc' 	,	glyphicon:'fas fa-ban'       	},
					{desc:'Sim'     ,	class:'btn-success',	ret:'1',	hotkey:'enter' 	,	glyphicon:'fas fa-check-circle' }
					
				],[
					function (e, btn){ 
					},
					function (e, btn){ 
						that.confirmarGravar();
					}
				]);
			}

		}

		function confirmarGravar() {
			var that = this;

			var perfilID = 0;
			if(gScope.ConsultaPerfil.item.selected == true){
				perfilID = gScope.ConsultaPerfil.item.dados.ID;
			}
			
			var moduloContaItem = 0;
			if(gScope.ConsultaModuloContaItem.item.selected == true){
				moduloContaItem = gScope.ConsultaModuloContaItem.item.dados.ID;
			}
			
			var tipoDocumento = 0;
			if(gScope.ConsultaTipoDocumento.item.selected == true){
				tipoDocumento = gScope.ConsultaTipoDocumento.item.dados.ID;
			}
			
			var contaBancaria = 0;
			if(gScope.ConsultaContaBancaria.item.selected == true){
				contaBancaria = gScope.ConsultaContaBancaria.item.dados.ID;
			}

			obj.SELECTED.PERFIL_ID 					= perfilID;
			obj.SELECTED.MODULO_CONTA_ITEM_ID 		= moduloContaItem;
			obj.SELECTED.MODULO_CONTA_TIPO_ID 		= gScope.ConsultaModuloContaItem.item.dados.MODULO_CONTA_TIPO_ID;
			obj.SELECTED.TIPO_DOCUMENTO_ID 			= tipoDocumento;
			obj.SELECTED.CONTA_BANCARIA_ID 			= contaBancaria;

			obj.SELECTED.FDATA 						= moment(obj.SELECTED.DATA).format('YYYY-MM-DD');
			obj.SELECTED.FDATA 						= obj.SELECTED.FDATA == 'Invalid date' ? null : obj.SELECTED.FDATA;
			
			obj.SELECTED.FDATA_VENCIMENTO 			= moment(obj.SELECTED.DATA_VENCIMENTO).format('YYYY-MM-DD');
			obj.SELECTED.FDATA_VENCIMENTO 			= obj.SELECTED.FDATA_VENCIMENTO == 'Invalid date' ? null : obj.SELECTED.FDATA_VENCIMENTO;
			
			obj.SELECTED.FDATA_RECEB_PAG 			= moment(obj.SELECTED.DATA_RECEB_PAG).format('YYYY-MM-DD');
			obj.SELECTED.FDATA_RECEB_PAG 			= obj.SELECTED.FDATA_RECEB_PAG == 'Invalid date' ? null : obj.SELECTED.FDATA_RECEB_PAG;
			
			obj.SELECTED.GRAVAR_ITENS 				= gScope.LancamentoItens.DADOS;
			obj.SELECTED.ITENS_EXCLUIDOS 			= gScope.LancamentoItens.ITENS_EXCLUIDOS;

			var dados = {
				DADOS: obj.SELECTED,
				FILTRO: {

				}
			};

			return $q(function (resolve, reject) {

				$ajax.post(that.url_gravar, dados).then(function (response) {

					var msg = '';

					if(obj.INCLUINDO){
						msg = 'Registro incluído com sucesso';
						
					}else{
						msg = 'Registro alterado com sucesso';
						var index = -1;

						angular.forEach(obj.DADOS, function(item, value){
							if(item[obj.CAMPO_INDEX] == response.ID){
								index = value;		
							}
						});

						if(index >= 0){
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

			if(typeof index != 'undefined'){
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			var msg = gScope.Confirme.add(1,'Confirmação',
			'Deseja realmente excluir esse registro?' , [
				{desc:'Não' 	,	class:'btn-danger' ,	ret:'2',	hotkey:'esc' 	,	glyphicon:'fas fa-ban'       	},
				{desc:'Sim'     ,	class:'btn-success',	ret:'1',	hotkey:'enter' 	,	glyphicon:'fas fa-check-circle' }
				
			  ],[
				function (e, btn){ 
				},
				function (e, btn){ 
					that.confirmarExcluir();
				}
			]);

		}

		function confirmarExcluir() {

			var that = this;

			var dados = {
				DADOS: obj.SELECTED
			};

			return $q(function (resolve, reject) {

				$ajax.post(that.url_excluir, dados).then(function (response) {

					var index = -1;

					angular.forEach(obj.DADOS, function(item, value){
						if(item[obj.CAMPO_INDEX] == obj.SELECTED.ID){
							index = value;		
						}
					});

					if(index >= 0){
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

			var msg = gScope.Confirme.add(1,'Confirmação',
			'Deseja realmente cancelar essa operação?' , [
				{desc:'Não' 	,	class:'btn-danger' ,	ret:'2',	hotkey:'esc' 	,	glyphicon:'fas fa-ban'       	},
				{desc:'Sim'     ,	class:'btn-success',	ret:'1',	hotkey:'enter' 	,	glyphicon:'fas fa-check-circle' }
				
			  ],[
				function (e, btn){ 

				},
				function (e, btn){ 
					that.confirmarCancelar();
				}
			]);
		}

		function confirmarCancelar() {
			var that = this;

			if(Object.keys(obj.BACKUP).length === 0){
				obj.SELECTED = {};
			}else{
				obj.SELECTED = angular.copy(obj.BACKUP);
			}

			if(obj.INCLUINDO){
				if(that.consultas.length > 0){
					angular.forEach(that.consultas, function(consulta, key){
						consulta.OBJ.apagar();
						consulta.OBJ.Input.disabled = false;
						consulta.OBJ.btn_filtro.disabled = false;
					});
				}

				$(obj.MODAL).modal('hide');
			}else{
				obj.insertConsultas();
			}

			obj.INCLUINDO = false;
			obj.ALTERANDO = false;
		}

		function alterar() {
			var that 		= this;

			var check = true;

			if(check == true){
				obj.INCLUINDO 	= false;
				obj.ALTERANDO 	= true;

				obj.BACKUP		= angular.copy(obj.SELECTED);

				if(that.consultas.length > 0){
					angular.forEach(that.consultas, function(consulta, key){
						if(typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true){
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

		function visualizar(index){
			var that = this;

			var item = obj.SELECTED;

			if(typeof index != 'undefined'){
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			obj.SELECTED.DATA = moment(obj.SELECTED.DATA).toDate();
			obj.SELECTED.DATA_VENCIMENTO = moment(obj.SELECTED.DATA_VENCIMENTO).toDate();
			obj.SELECTED.DATA_RECEB_PAG = moment(obj.SELECTED.DATA_RECEB_PAG).toDate();

			obj.insertConsultas();

			if(obj.SELECTED.TIPO != 0){
				gScope.LancamentoItens.consultar();
			}

			$(obj.MODAL).modal('show');
		}

		function insertConsultas(){
			var that = this;

			if(that.consultas.length > 0){
				angular.forEach(that.consultas, function(consulta, key){
					var nome = consulta.NOME;

					if(typeof that.SELECTED[nome+'_JSON'] != 'undefined' && that.SELECTED[nome+'_JSON'] != '' && that.SELECTED[nome+'_JSON'] != null){

						var jsonX = JSON.parse(that.SELECTED[nome+'_JSON']);

						if(typeof jsonX.ID != 'undefined' && jsonX.ID != '' && jsonX.ID != null){
							consulta.OBJ.setSelected(jsonX);
						}

						consulta.OBJ.Input.disabled = true;
						consulta.OBJ.btn_filtro.disabled = true;   
						
					}else{
						if(that.SELECTED[that.CAMPO_INDEX] <= 0 && that.disabled_consulta_on_visualizar == false){
							consulta.OBJ.apagar();
							consulta.OBJ.Input.disabled = false;
							consulta.OBJ.btn_filtro.disabled = false;    
						}else{
							consulta.OBJ.apagar();
							consulta.OBJ.Input.disabled = true;
							consulta.OBJ.btn_filtro.disabled = true;   
						}
					}
				});
			}

		}

		function setDadosConsultar(dados){
			var that = this;
			
			// dados.FILTRO.FILTRO_TABELA_PRECO			= gScope.ConsultaTabelaPrecoFiltro.item.dados.ID;
			// dados.FILTRO.FILTRO_CLIENTE					= gScope.ConsultaClienteFiltro.item.dados.CODIGO;
			
			return dados;
		}

		function consultar() {

			var that = this;

			var dados = {
				FILTRO: {

				}
			};

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
        
        function compileDatatable(){

			var that = this;

			var StringMask = require('string-mask');

			if(obj.DATATABLE == null){
				obj.DATATABLE = $('#dataTableLancamentos').DataTable({
					"order": [[0, 'desc']],
					"searching": false,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function () {
						$('.popoverCFe').popover({
							"html": true
						});
					},
					"columns": [
						// { "data": "ID", "title": 'ID', 
						// 	render : function(data, type, row) {
						// 		return trim_null(row.ID).padStart(5, '0');
						// 	}
						// },
						{ "data": "DESCRICAO", "title": 'Descrição', 
							render : function(data, type, row) {
								return row.DESCRICAO;
							} 
						},
						{ "data": "MODULO_CONTA_ITEM_ID", "title": 'Módulo de Conta', 
							render : function(data, type, row) {
								return row.DESC_MODULO_CONTA;
							} 
						},
						{ "data": "CONTA_BANCARIA_ID", "title": 'Conta Bancária', 
							render : function(data, type, row) {
								return row.DESC_CONTA;
							} 
						},
						{ "data": "VALOR_TOTAL", "title": 'Valor Total', 
							render : function(data, type, row) {
								return number_format(row.VALOR_TOTAL, 2, ',', '.');
							} 
						},
						{ "data": "DATA", "title": 'Data', 
							render : function(data, type, row) {
								return moment(angular.copy(row.DATA)).format('DD/MM/YYYY');
							} 
						},
						{ "data": "STATUS", "title": 'Status', 
							render : function(data, type, row) {
								var html = '';

								if(data == 0){
									html = '<div class="badge badge-green mr-3 text-small">PAGO</div>';
								}else if(data == 1){
									html = '<div class="badge badge-danger mr-3 text-small">RECEBIDO</div>';
								}

								return html;
							} 
						},
						{ "data": "ACTIONS", "title": 'Opções', 'className': 'text-center',
							render : function(data, type, full, meta ) {
								var html = '';

								var index = meta.row;

								html = html + `
								<button type="button" class="btn btn-sm btn-danger" ng-click="vm.Lancamentos.excluir(`+index+`);" ng-dblclick="$event.stopPropagation();">
									<span class="fas fa-trash"></span>
								</button>`;

								return html;
							}
						}
					],
					createdRow: function(row, data, dataIndex) {

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

							$timeout(function (){
								obj.visualizar();

								// obj.DATATABLE.$('tr.row_selected').removeClass('row_selected');
								// $(row).addClass('row_selected');
							});
						});

						$compile(angular.element(row).contents())(obj.scope);
					},
					"language": returnLanguageDatatable()
				});

			}else{
				obj.DATATABLE.clear();
				if(obj.DADOS.length > 0){
					angular.forEach(obj.DADOS, function (item, value){
						obj.DATATABLE.row.add(item).draw();
					});
				}else{
					obj.DATATABLE.draw();
				}
			}
		}

		return Lancamentos;
	};

})(window, window.angular);