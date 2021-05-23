(function (window, angular) {
	'use strict';

	angular
		.module('app')
		.factory('Dashboard', Dashboard);

	Dashboard.$inject = [
		'$ajax',
		'$q',
		'$timeout',
		'gScope'
	];

	function Dashboard($ajax, $q, $timeout, gScope) {

		var obj = null;

		/**
		 * Constructor, with class name
		 */
		function Dashboard() {

			obj 								= this;
			obj.model 							= 'vm.Dashboard';

			obj.url_consultar 					= urlhost + '/admin/dashboard/last-movimentacoes';
			obj.url_gravar 						= urlhost + '/admin/dashboard/post';
			obj.url_excluir 					= urlhost + '/admin/dashboard/delete';


			obj.DADOS 							= [];
			obj.MOVIMENTACOES 					= [];
			obj.MOVIMENTACOES_STR 				= '';
			obj.VENDAS_FORMAS_PAGAMENTO 		= [];
			obj.VENDAS_FORMAS_PAGAMENTO_STR 	= '';
			obj.LABELS_MOVIMENTACOES 			= [];
			obj.VALORES_MOVIMENTACOES 			= [];
			obj.LABELS_FORMAS_PAGAMENTO 		= [];
			obj.VALORES_FORMAS_PAGAMENTO 		= [];

			obj.getLastMovimentacoes 			= getLastMovimentacoes;
			obj.compileGrafics 					= compileGrafics;

			obj.QTD_ALUNOS 						= 0;
			obj.QTD_CLIENTES 					= 0;
			obj.QTD_PRODUTOS 					= 0;
			obj.QTD_VENDAS 						= 0;

			obj.CONTAS_RECEBER					= 0;
			obj.CONTAS_PAGAR					= 0;
			obj.CONTAS_RECEBER_VISUALIZACAO		= '';
			obj.CONTAS_PAGAR_VISUALIZACAO		= '';

			obj.GRAFIC_MOVIMENTACAO				= null;
			obj.GRAFIC_SALDOS					= null;
			obj.GRAFIC_ALUNOS					= null;
			obj.GRAFIC_CONTAS					= null;

			obj.DATATABLE 						= null;
		}


		function getLastMovimentacoes() {

			var that = this;

			var dados = {
				FILTRO: {

				},
				DADOS: {
					DATA_INICIAL	: obj.FDATA_INICIAL,
					DATA_FINAL		: obj.FDATA_FINAL
				}
			};

			return $q(function (resolve, reject) {

				$ajax.post(that.url_consultar, dados).then(function (response) {

					obj.LABELS_MOVIMENTACOES 		= [];
					obj.DATASET_MOVIMENTACOES 		= [];

					obj.LABELS_SALDOS 				= [];
					obj.DATASET_SALDOS 				= [];

					obj.LABELS_ALUNOS 				= [];
					obj.DATASET_ALUNOS 				= [];
					
					obj.LABELS_CONTAS 				= [];
					obj.DATASET_CONTAS 				= [];


					if(response.CONTAS_DESPESAS.length > 0){

						var contaReceber = 0;
						var contaPagar = 0;

						angular.forEach(response.CONTAS_DESPESAS, function  (item, value){
							if(item.OPERACAO == 0){
								contaReceber = Number(item.VALOR);
							}else{
								contaPagar = Number(item.VALOR);
							}
						});
						
						obj.CONTAS_RECEBER_VISUALIZACAO = 'R$ ' + number_format(contaReceber, 2);
						obj.CONTAS_PAGAR_VISUALIZACAO 	= 'R$ ' + number_format(contaPagar, 2);

					}
					

					if(response.MOVIMENTACOES.length > 0){
						var arrMovimentacoes = response.MOVIMENTACOES[0];

						obj.LABELS_MOVIMENTACOES 	= arrMovimentacoes.LABEL.split(',');
						obj.DATASET_MOVIMENTACOES 	= arrMovimentacoes.VALOR.split(',');

					}
					
					if(response.SALDOS.length > 0){
						var arrSaldos = response.SALDOS[0];

						obj.LABELS_SALDOS 	= arrSaldos.LABEL.split(',');
						obj.DATASET_SALDOS 	= arrSaldos.VALOR.split(',');

					}
					
					if(response.ALUNOS_MATRICULADOS.length > 0){
						var arrAlunos = response.ALUNOS_MATRICULADOS[0];
						var arrAlunosD = response.ALUNOS_DESISTENTES[0];

						obj.LABELS_ALUNOS 	= ['Alunos matriculados', 'Alunos desistentes'];
						obj.DATASET_ALUNOS 	= [arrAlunos.QTD_MATRICULAS, arrAlunosD.QTD_DESISTENTES];
					}
					
					if(response.CONTAS.length > 0){
						var arrContas = response.CONTAS[0];

						obj.LABELS_CONTAS 	= arrContas.LABEL.split(',');
						obj.DATASET_CONTAS 	= arrContas.VALOR.split(',');

					}
					

                    obj.compileGrafics();

					resolve(response);
				}, function (e) {
					reject(e);
				});
			});

		}

		function compileGrafics() {

			if(obj.GRAFIC_MOVIMENTACAO == null){

				var ctx = document.getElementById("myMovimentacoesChart");

				obj.GRAFIC_MOVIMENTACAO = new Chart(ctx, {
					type: "bar",
					data: {
						labels: obj.LABELS_MOVIMENTACOES,
						datasets: [{
							label: "Valor",
							backgroundColor: "rgba(0, 97, 242, 1)",
							hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
							borderColor: "#4e73df",
							data: obj.DATASET_MOVIMENTACOES
						}]
					},
					options: {
						maintainAspectRatio: false,
						layout: {
							padding: {
								left: 10,
								right: 25,
								top: 25,
								bottom: 0
							}
						},
						responsive: true,
						scales: {
							xAxes: [{
								time: {
									unit: "month"
								},
								gridLines: {
									display: false,
									drawBorder: false
								},
								ticks: {
									maxTicksLimit: 6
								}
							}],
							yAxes: [{
								ticks: {
									min: 0,
									maxTicksLimit: 5,
									padding: 0,
									// Include a dollar sign in the ticks
									callback: function (value, index, values) {
										return "R$ " + number_format(value, 2);
									}
								},
								gridLines: {
									color: "rgb(234, 236, 244)",
									zeroLineColor: "rgb(234, 236, 244)",
									drawBorder: false,
									borderDash: [2],
									zeroLineBorderDash: [2]
								}
							}]
						},
						legend: {
							display: false
						},
						tooltips: {
							titleMarginBottom: 10,
							titleFontColor: "#6e707e",
							titleFontSize: 14,
							backgroundColor: "rgb(255,255,255)",
							bodyFontColor: "#858796",
							borderColor: "#dddfeb",
							borderWidth: 1,
							xPadding: 15,
							yPadding: 15,
							displayColors: false,
							caretPadding: 10,
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
				obj.GRAFIC_MOVIMENTACAO.data.datasets.pop();
				obj.GRAFIC_MOVIMENTACAO.data.datasets = [{
					label: "Valor",
					backgroundColor: "rgba(0, 97, 242, 1)",
					hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
					borderColor: "#4e73df",
					data: obj.DATASET_MOVIMENTACOES
				}];

				obj.GRAFIC_MOVIMENTACAO.update();
			}
			
			if(obj.GRAFIC_SALDOS == null){

				var ctx = document.getElementById("mySaldoChart");

				obj.GRAFIC_SALDOS = new Chart(ctx, {
					type: "bar",
					data: {
						labels: obj.LABELS_SALDOS,
						datasets: [{
							label: "Valor",
							backgroundColor: "rgba(0, 97, 242, 1)",
							hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
							borderColor: "#4e73df",
							data: obj.DATASET_SALDOS
						}]
					},
					options: {
						maintainAspectRatio: false,
						layout: {
							padding: {
								left: 10,
								right: 25,
								top: 25,
								bottom: 0
							}
						},
						scales: {
							xAxes: [{
								time: {
									unit: "month"
								},
								gridLines: {
									display: false,
									drawBorder: false
								},
								ticks: {
									maxTicksLimit: 6
								}
							}],
							yAxes: [{
								ticks: {
									min: 0,
									maxTicksLimit: 5,
									padding: 0,
									// Include a dollar sign in the ticks
									callback: function (value, index, values) {
										return "R$ " + number_format(value, 2);
									}
								},
								gridLines: {
									color: "rgb(234, 236, 244)",
									zeroLineColor: "rgb(234, 236, 244)",
									drawBorder: false,
									borderDash: [2],
									zeroLineBorderDash: [2]
								}
							}]
						},
						legend: {
							display: false
						},
						tooltips: {
							titleMarginBottom: 10,
							titleFontColor: "#6e707e",
							titleFontSize: 14,
							backgroundColor: "rgb(255,255,255)",
							bodyFontColor: "#858796",
							borderColor: "#dddfeb",
							borderWidth: 1,
							xPadding: 15,
							yPadding: 15,
							displayColors: false,
							caretPadding: 10,
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
				obj.GRAFIC_SALDOS.data.datasets.pop();
				obj.GRAFIC_SALDOS.data.datasets = [{
					label: "Valor",
					backgroundColor: "rgba(0, 97, 242, 1)",
					hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
					borderColor: "#4e73df",
					data: obj.DATASET_SALDOS
				}];

				obj.GRAFIC_SALDOS.update();
			}

			if(obj.GRAFIC_ALUNOS == null){

				var ctx = document.getElementById("myAlunoChart");

				obj.GRAFIC_ALUNOS = new Chart(ctx, {
					type: "bar",
					data: {
						labels: obj.LABELS_ALUNOS,
						datasets: [{
							label: "Valor",
							backgroundColor: "rgba(0, 97, 242, 1)",
							hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
							borderColor: "#4e73df",
							data: obj.DATASET_ALUNOS
						}]
					},
					options: {
						maintainAspectRatio: false,
						layout: {
							padding: {
								left: 10,
								right: 25,
								top: 25,
								bottom: 0
							}
						},
						scales: {
							xAxes: [{
								time: {
									unit: "month"
								},
								gridLines: {
									display: false,
									drawBorder: false
								},
								ticks: {
									maxTicksLimit: 6
								}
							}],
							yAxes: [{
								ticks: {
									min: 0,
									maxTicksLimit: 5,
									padding: 0,
									// Include a dollar sign in the ticks
									callback: function (value, index, values) {
										return number_format(value);
									}
								},
								gridLines: {
									color: "rgb(234, 236, 244)",
									zeroLineColor: "rgb(234, 236, 244)",
									drawBorder: false,
									borderDash: [2],
									zeroLineBorderDash: [2]
								}
							}]
						},
						legend: {
							display: false
						},
						tooltips: {
							titleMarginBottom: 10,
							titleFontColor: "#6e707e",
							titleFontSize: 14,
							backgroundColor: "rgb(255,255,255)",
							bodyFontColor: "#858796",
							borderColor: "#dddfeb",
							borderWidth: 1,
							xPadding: 15,
							yPadding: 15,
							displayColors: false,
							caretPadding: 10,
							callbacks: {
								label: function (tooltipItem, chart) {
									var datasetLabel =
										chart.datasets[tooltipItem.datasetIndex].label || "";
									return datasetLabel + ": " + number_format(tooltipItem.yLabel);
								}
							}
						}
					}
				});
			}else{
				obj.GRAFIC_ALUNOS.data.datasets.pop();
				obj.GRAFIC_ALUNOS.data.datasets = [{
					label: "Valor",
					backgroundColor: "rgba(0, 97, 242, 1)",
					hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
					borderColor: "#4e73df",
					data: obj.DATASET_ALUNOS
				}];

				obj.GRAFIC_ALUNOS.update();
			}

			if(obj.GRAFIC_CONTAS == null){

				var ctx = document.getElementById("myContaChart");

				obj.GRAFIC_CONTAS = new Chart(ctx, {
					type: "bar",
					data: {
						labels: obj.LABELS_CONTAS,
						datasets: [{
							label: "Valor",
							backgroundColor: "rgba(0, 97, 242, 1)",
							hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
							borderColor: "#4e73df",
							data: obj.DATASET_CONTAS
						}]
					},
					options: {
						maintainAspectRatio: false,
						layout: {
							padding: {
								left: 10,
								right: 25,
								top: 25,
								bottom: 0
							}
						},
						scales: {
							xAxes: [{
								time: {
									unit: "month"
								},
								gridLines: {
									display: false,
									drawBorder: false
								},
								ticks: {
									maxTicksLimit: 6
								}
							}],
							yAxes: [{
								ticks: {
									min: 0,
									maxTicksLimit: 5,
									padding: 0,
									// Include a dollar sign in the ticks
									callback: function (value, index, values) {
										return "R$ " + number_format(value, 2);
									}
								},
								gridLines: {
									color: "rgb(234, 236, 244)",
									zeroLineColor: "rgb(234, 236, 244)",
									drawBorder: false,
									borderDash: [2],
									zeroLineBorderDash: [2]
								}
							}]
						},
						legend: {
							display: false
						},
						tooltips: {
							titleMarginBottom: 10,
							titleFontColor: "#6e707e",
							titleFontSize: 14,
							backgroundColor: "rgb(255,255,255)",
							bodyFontColor: "#858796",
							borderColor: "#dddfeb",
							borderWidth: 1,
							xPadding: 15,
							yPadding: 15,
							displayColors: false,
							caretPadding: 10,
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
				obj.GRAFIC_CONTAS.data.datasets.pop();
				obj.GRAFIC_CONTAS.data.datasets = [{
					label: "Valor",
					backgroundColor: "rgba(0, 97, 242, 1)",
					hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
					borderColor: "#4e73df",
					data: obj.DATASET_CONTAS
				}];

				obj.GRAFIC_CONTAS.update();
			}


			
		}

		return Dashboard;
	};

})(window, window.angular);