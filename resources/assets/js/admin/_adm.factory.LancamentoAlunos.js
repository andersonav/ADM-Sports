(function (window, angular) {
	'use strict';

	angular
		.module('app')
		.factory('LancamentoAlunos', LancamentoAlunos);

	LancamentoAlunos.$inject = [
		'$ajax',
		'$q',
		'$compile',
		'$rootScope',
		'$timeout',
		'gScope'
	];

	function LancamentoAlunos($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
		 * Constructor, with class name
		 */
		function LancamentoAlunos($scope) {

			obj = this;
			obj.scope 									= $scope;
			obj.model 									= 'vm.LancamentoAlunos';

            obj.url_consultar 							= urlhost + '/admin/funcionalidades/alunos/get';
			obj.url_gravar 								= urlhost + '/admin/funcionalidades/lancamento-alunos/post';
			obj.url_excluir 							= urlhost + '/admin/funcionalidades/lancamento-alunos/delete';

			obj.SELECTED 								= {};
			obj.BACKUP 									= {};
			obj.DADOS 									= [];
			obj.BACKUP_ITENS							= [];
			obj.consultas								= [];

			obj.CAMPO_INDEX 							= 'ID';

			obj.INCLUINDO 								= false;
			obj.ALTERANDO 								= false;

			obj.VALOR_PADRAO							= 0;

			obj.FILTRO_ALUNO							= '';

			obj.MODAL									= "#modalLancamentoAlunos";

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
			obj.keyUPSearchAlunos						= keyUPSearchAlunos;
		}

		function setDadosIncluir() {

			var dados = {
				DESCRICAO: ''
			};

			return dados;
		}

		function incluir() {
			var that = this;

			obj.INCLUINDO = true;

			obj.FILTRO_ALUNO							= '';

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

			if(obj.VALOR_PADRAO == 0 || obj.VALOR_PADRAO == '' || obj.VALOR_PADRAO == null){
				check = false;
				showErro("Valor padrão para alunos inválido");
			}

			if (rows_selected.length == 0) {
				check = false;
				showErro("Nenhum aluno selecionado");

			}

			if(check == true){
				that.confirmarGravar();
			}

		}

		function confirmarGravar() {
			var that = this;

			var rows_selected = obj.DATATABLE.rows('.selected').data();

			angular.forEach(rows_selected, function (item, value){
				item.DESC_LANC_ID 	= '';
				item.LANC_ID 		= -1;
				item.ALUNO_ID 		= angular.copy(item.ID);
				item.VALOR			= angular.copy(obj.VALOR_PADRAO);
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

			obj.insertConsultas();

			$(obj.MODAL).modal('show');
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
			
			if(gScope.LancamentoItens.DADOS.length > 0){

			}
			// dados.FILTRO.MODULO_CONTA			= gScope.Lancamentos.SELECTED.ID;
			// dados.DADOS.MODULO_CONTA			= gScope.Lancamentos.SELECTED.ID;
			// dados.FILTRO.FILTRO_CLIENTE					= gScope.ConsultaClienteFiltro.item.dados.CODIGO;
			
			return dados;
		}

		function consultar() {

			var that = this;

			var dados = {
				FILTRO: {

				},
				DADOS: {

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
				obj.DATATABLE = $('#dataTableLancamentoAlunos').DataTable({
					"order": [[0, 'desc']],
					"searching": true,
					"data": obj.DADOS,
					"deferRender": true,
					"tabIndex": 0,
					drawCallback: function () {
						$('.popoverCFe').popover({
							"html": true
						});
					},
					select: {
						style:    'multi',
						selector: 'td:first-child'
					},
					'columnDefs': [ 
						{
							orderable: false,
							className: 'select-checkbox',
							targets:   0,
							defaultContent: ''
						} 
					],
					"columns": [
						{"data": null},
						{ "data": "ID", "title": 'ID', 
							render : function(data, type, row) {
								return trim_null(row.ID).padStart(5, '0');
							}
						},
						{ "data": "NOME", "title": 'Nome', 
							render : function(data, type, row) {
								return row.NOME;
							}
						},
						{ "data": "CELULAR", "title": 'Celular',
							render : function(data, type, row) {
								

								var formatter = {};

								formatter = new StringMask('(00) 00000-0000');

								var celular = formatter.apply(data);

								return celular;

							} 
						}
					],
					createdRow: function(row, data, dataIndex) {

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