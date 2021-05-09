(function (window, angular) {
	'use strict';

	angular
		.module('app')
		.factory('ModuloConta', ModuloConta);

	ModuloConta.$inject = [
		'$ajax',
		'$q',
		'$compile',
		'$rootScope',
		'$timeout',
		'gScope'
	];

	function ModuloConta($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
		 * Constructor, with class name
		 */
		function ModuloConta($scope) {

			obj = this;
			obj.scope 									= $scope;
			obj.model 									= 'vm.ModuloConta';

            obj.url_consultar 							= urlhost + '/admin/funcionalidades/modulos-conta/tipos/get';
			obj.url_gravar 								= urlhost + '/admin/funcionalidades/modulos-conta/tipos/post';
			obj.url_excluir 							= urlhost + '/admin/funcionalidades/modulos-conta/tipos/delete';
			obj.url_imprimir_papel_termico				= urlhost + '/admin/funcionalidades/modulos-conta/tipos/impressao';

			obj.SELECTED 								= {};
			obj.BACKUP 									= {};
			obj.DADOS 									= [];
			obj.BACKUP_ITENS							= [];
			obj.consultas								= [];

			obj.CAMPO_INDEX 							= 'ID';

			obj.INCLUINDO 								= false;
			obj.ALTERANDO 								= false;

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
			obj.imprimirPapelTermico					= imprimirPapelTermico;
			obj.setConsultasPadroesDisabled				= setConsultasPadroesDisabled;
			obj.setConsultasPadroesEnabled				= setConsultasPadroesEnabled;
		}

		function setDadosIncluir() {

			var dados = {
				ID					: 0,
				DESCRICAO			: '',
				DESC_RESUMIDA		: '',
				OPERACAO			: 0
			};

			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.SELECTED = obj.setDadosIncluir();

			// gScope.ModuloContaItens.DADOS = [];
			// gScope.ModuloContaItens.compileDatatable();


			if(that.consultas.length > 0){
				angular.forEach(that.consultas, function(consulta, key){
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

					$("#modalModuloConta").modal('hide');


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

				$("#modalModuloConta").modal('hide');
			}else{
				gScope.ModuloContaItens.DADOS = angular.copy(obj.BACKUP_ITENS);
				gScope.ModuloContaItens.ITENS_EXCLUIDOS = [];
				gScope.ModuloContaItens.compileDatatable();
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

				obj.BACKUP_ITENS	= angular.copy(gScope.ModuloContaItens.DADOS);

				if(that.consultas.length > 0){
					angular.forEach(that.consultas, function(consulta, key){
						if(typeof consulta.ALTERAR == 'undefined' || consulta.ALTERAR == true){
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

		function visualizar(item){
			var that = this;

			var item = obj.SELECTED;

			if(typeof index != 'undefined'){
				item = obj.DATATABLE.row(index).data();
			}

			obj.SELECTED = item;

			obj.insertConsultas();

			gScope.ModuloContaItens.consultar();

			$("#modalModuloConta").modal('show');
			
		}

		function insertConsultas(){
			var that = this;

			if(that.consultas.length > 0){
				angular.forEach(that.consultas, function(consulta, key){
					var nome = consulta.NOME;

					if(typeof that.SELECTED[nome+'_JSON'] != 'undefined' && that.SELECTED[nome+'_JSON'] != '' && that.SELECTED[nome+'_JSON'] != null){
						consulta.OBJ.setSelected(JSON.parse(that.SELECTED[nome+'_JSON']));

						if(that.SELECTED[that.CAMPO_INDEX] <= 0){
							consulta.OBJ.btn_apagar_filtro.disabled = false;
						}else{
							consulta.OBJ.btn_apagar_filtro.disabled = true;
						}
						
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

			if(obj.DATATABLE == null){
				obj.DATATABLE = $('#dataTableModuloConta').DataTable({
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
					// select: {
					// 	style:    'single'
					// },
					"columns": [
						{ "data": "OPERACAO", "title": '', "className": "text-center", 
							render : function(data, type, row) {
								var html = '';

								if(data == 0){
									html = '<div class="badge badge-green mr-3 text-small">ENTRADA</div>';
								}else if(data == 1){
									html = '<div class="badge badge-danger mr-3 text-small">SAÍDA</div>';
								}

								return html;
							}
						},
						{ "data": "ID", "title": 'ID', 
							render : function(data, type, row) {
								return trim_null(row.ID).padStart(4, '0');
							}
						},
						{ "data": "DESC_RESUMIDA", "title": 'Descrição resumida', 
							render : function(data, type, row) {
								return row.DESC_RESUMIDA;
							} 
						},
						{ "data": "DESCRICAO", "title": 'Descrição', 
							render : function(data, type, row) {
								return row.DESCRICAO;
							} 
						},
						{ "data": "ACTIONS", "title": 'Opções',
							render : function(data, type, full, meta ) {
								var html = '';

								var index = meta.row;

								html = html +' <div class="form-group no-print" style="display: contents;"> '+
								'			<div class="dropdown acoes"> '+ 
								'				<button type="button" class="btn btn-sm btn-warning toggle" '+
								'					style="margin-left: 6px;" '+							
								'					data-toggle="dropdown" ng-dblclick="$event.stopPropagation();" aria-expanded="false" '+ 'ng-readonly="false"> '+
								'					<span class="fas fa-th-list"></span> '+
								'					 '+
								' 				</button> '+
								'					<ul class="dropdown-menu">	'+
								'						<li class="dropdown-header" style="text-transform: initial; font-weight: bold;"> '+
								'							Ações Disponíveis </li>' +
								'						<li class="dropdown-item" style="cursor: pointer;" ng-click="vm.ModuloConta.excluir('+index+');"> '+
								'	 						<a style="text-transform: initial; cursor: pointer;"> '+
								' 								<span class="fas fa-trash"></span> Excluir</a> ' +
								'						</li> '+
								'					</ul> '+
								'				</div> '+
								'			</div> ';

								return html;
							}
						},
					],
					createdRow: function(row, data, dataIndex) {

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

		function imprimirPapelTermico(index){

			var that = this;

			var item = obj.DATATABLE.row(index).data();
			obj.SELECTED = item;

			var dados = {
				DADOS: obj.SELECTED
			};

			return $q(function (resolve, reject) {

				$ajax.post(that.url_imprimir_papel_termico, dados).then(function (response) {
					
					gScope.Devices.imprimirCupom(trim_null(response));
					
					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function setConsultasPadroesDisabled(){
			gScope.ConsultaTabelaPreco.btn_apagar_filtro.disabled 	= true;
			gScope.ConsultaTabelaPreco.Input.disabled 				= true;
			gScope.ConsultaTabelaPreco.btn_filtro.disabled 			= true;
		}

		function setConsultasPadroesEnabled(){
			gScope.ConsultaTabelaPreco.btn_apagar_filtro.disabled 	= false;
			gScope.ConsultaTabelaPreco.Input.disabled 				= false;
			gScope.ConsultaTabelaPreco.btn_filtro.disabled 			= false;
		}

		return ModuloConta;
	};

})(window, window.angular);