(function (window, angular) {
	'use strict';

	angular
		.module('app')
		.factory('FluxoCaixaDiario', FluxoCaixaDiario);

	FluxoCaixaDiario.$inject = [
		'$ajax',
		'$q',
		'$compile',
		'$rootScope',
		'$timeout',
		'gScope'
	];

	function FluxoCaixaDiario($ajax, $q, $compile, $rootScope, $timeout, gScope) {

		var obj = null;

		/**
		 * Constructor, with class name
		 */
		function FluxoCaixaDiario($scope) {

			obj = this;
			obj.scope 									= $scope;
			obj.model 									= 'vm.FluxoCaixaDiario';

            obj.url_consultar 							= urlhost + '/admin/relatorios/diario/get';
			obj.url_gravar 								= urlhost + '/admin/relatorios/diario/post';
			obj.url_excluir 							= urlhost + '/admin/relatorios/diario/delete';

			obj.SELECTED 								= {};
			obj.BACKUP 									= {};
			obj.DADOS 									= [];
			obj.BACKUP_ITENS							= [];
			obj.consultas								= [];
			obj.LABELS									= [];
			obj.DATASET									= [];

			obj.CAMPO_INDEX 							= 'ID';

			obj.INCLUINDO 								= false;
			obj.ALTERANDO 								= false;
			obj.CHART									= null;

			obj.MODAL									= "#modalFluxoCaixaDiario";

			obj.setDadosConsultar						= setDadosConsultar;
			obj.consultar 		        				= consultar;
			obj.compileGrafics        					= compileGrafics;
		}

		function setDadosConsultar(dados){
			var that = this;
			
			dados.FILTRO.MES			= obj.MES + 1;
			dados.FILTRO.ANO			= obj.ANO;
			
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

					obj.LABELS 	= [];

					obj.DATASET = [];

					var arrLabel = [];

					angular.forEach(response.LANCAMENTOS, function (item, value){

						var json = {
							label			: item.DESCRICAO,
							data			: [],
							backgroundColor	: '',
							pointRadius		: 3
						};

						if(item.OPERACAO == 0){
							json.backgroundColor = '#36a2eb';
						}else{
							json.backgroundColor = '#ff6384';
						}

						for (var index = 0; index < item.LANCAMENTOS.length; index++) {
							var element = item.LANCAMENTOS[index];
							var valor = element.VALOR;
							var label = element.LABEL;

							json.data.push(valor);

							arrLabel.push(label);
						}

						obj.DATASET.push(angular.copy(json));

					});

					$.each(arrLabel, function(i, el){
						if($.inArray(el, obj.LABELS) === -1) obj.LABELS.push(el);
					});

					if(obj.DATASET.length > 0){
						var jsonSaldoDiaro = {
							label			: 'Saldo diário',
							data			: [],
							backgroundColor	: '#4bc0c0',
							pointRadius		: 3
						};
	
						angular.forEach(response.SALDO_DIARIO, function (item, value){
							jsonSaldoDiaro.data.push(Number(item.SALDO_DIARIO));
						});
	
						obj.DATASET.push(angular.copy(jsonSaldoDiaro));
					}

                    obj.compileGrafics();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

        }
        
        function compileGrafics(){

			var that = this;

			if(obj.CHART == null){
				var ctx = document.getElementById("myAreaStacked");

				obj.CHART = new Chart(ctx, {
					type: "bar",
					data: {
						labels: obj.LABELS,
						datasets: obj.DATASET
					},
					options: {
						plugins: {
						  title: {
							display: true,
							text: 'Fluxo diário'
						  },
						},
						responsive: true,
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}],
							x: {
								stacked: true,
								
							},
							y: {
								stacked: true
							}
						},

						tooltips: {
							callbacks: {
								label: function (tooltipItem, chart) {
									var datasetLabel =
										chart.datasets[tooltipItem.datasetIndex].label || "";
									return datasetLabel + ": R$ " + number_format(tooltipItem.yLabel, 2);
								}
							}
						}
					}
				});
			}else{
				obj.CHART.data.datasets.pop();
				obj.CHART.data.datasets = obj.DATASET;

				obj.CHART.update();
			}

		}

		return FluxoCaixaDiario;
	};

})(window, window.angular);