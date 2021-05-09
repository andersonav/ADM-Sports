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

			obj = this;
			obj.model = 'vm.Dashboard';

			obj.url_consultar = urlhost + '/funcionalidades/dashboard/last-movimentacoes/';
			obj.url_gravar = urlhost + '/funcionalidades/dashboard/post';
			obj.url_excluir = urlhost + '/funcionalidades/dashboard/delete';


			obj.DADOS = [];
			obj.MOVIMENTACOES = [];
			obj.MOVIMENTACOES_STR = '';
			obj.VENDAS_FORMAS_PAGAMENTO = [];
			obj.VENDAS_FORMAS_PAGAMENTO_STR = '';
			obj.LABELS_MOVIMENTACOES = [];
			obj.VALORES_MOVIMENTACOES = [];
			obj.LABELS_FORMAS_PAGAMENTO = [];
			obj.VALORES_FORMAS_PAGAMENTO = [];

			obj.getLastMovimentacoes = getLastMovimentacoes;
			obj.compileGrafics = compileGrafics;

			obj.QTD_ALUNOS 		= 0;
			obj.QTD_CLIENTES 	= 0;
			obj.QTD_PRODUTOS 	= 0;
			obj.QTD_VENDAS 		= 0;

			obj.DATATABLE = null;
		}


		function getLastMovimentacoes() {

			$timeout(function () {
				obj.LABELS_MOVIMENTACOES = [];
				obj.VALORES_MOVIMENTACOES = [];
				obj.LABELS_FORMAS_PAGAMENTO = [];
				obj.VALORES_FORMAS_PAGAMENTO = [];

				angular.forEach(obj.MOVIMENTACOES, function (item, value) {
					obj.LABELS_MOVIMENTACOES.push(trim_null(item.DESC_MES));
					obj.VALORES_MOVIMENTACOES.push(Number(item.VALOR));
				});

				angular.forEach(obj.VENDAS_FORMAS_PAGAMENTO, function (item, value) {
					obj.LABELS_FORMAS_PAGAMENTO.push(trim_null(item.DESCRICAO));
					obj.VALORES_FORMAS_PAGAMENTO.push(Number(item.VALOR));
				});

				obj.compileGrafics();
			});
		}

		function compileGrafics() {
			// Area Chart Example
			var ctx = document.getElementById("myAreaChart");
			var myLineChart = new Chart(ctx, {
				type: "line",
				data: {
					labels: [
						"Jan",
						"Fev",
						"Mar",
						"Abr",
						"Mai",
						"Jun",
						"Jul",
						"Ago",
						"Set",
						"Out",
						"Nov",
						"Dez"
					],
					datasets: [{
						label: "Valor",
						lineTension: 0.3,
						backgroundColor: "rgba(0, 97, 242, 0.05)",
						borderColor: "rgba(0, 97, 242, 1)",
						pointRadius: 3,
						pointBackgroundColor: "rgba(0, 97, 242, 1)",
						pointBorderColor: "rgba(0, 97, 242, 1)",
						pointHoverRadius: 3,
						pointHoverBackgroundColor: "rgba(0, 97, 242, 1)",
						pointHoverBorderColor: "rgba(0, 97, 242, 1)",
						pointHitRadius: 10,
						pointBorderWidth: 2,
						data: [
							0,
							10000,
							5000,
							15000,
							10000,
							20000,
							15000,
							25000,
							20000,
							30000,
							25000,
							40000
						]
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
								unit: "date"
							},
							gridLines: {
								display: false,
								drawBorder: false
							},
							ticks: {
								maxTicksLimit: 7
							}
						}],
						yAxes: [{
							ticks: {
								maxTicksLimit: 5,
								padding: 10,
								// Include a dollar sign in the ticks
								callback: function (value, index, values) {
									return "R$ " + number_format(value);
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
						backgroundColor: "rgb(255,255,255)",
						bodyFontColor: "#858796",
						titleMarginBottom: 10,
						titleFontColor: "#6e707e",
						titleFontSize: 14,
						borderColor: "#dddfeb",
						borderWidth: 1,
						xPadding: 15,
						yPadding: 15,
						displayColors: false,
						intersect: false,
						mode: "index",
						caretPadding: 10,
						callbacks: {
							label: function (tooltipItem, chart) {
								var datasetLabel =
									chart.datasets[tooltipItem.datasetIndex].label || "";
								return datasetLabel + ": R$ " + number_format(tooltipItem.yLabel);
							}
						}
					}
				}
			});


			// Bar Chart Example
			var ctx = document.getElementById("myBarChart");
			var myBarChart = new Chart(ctx, {
				type: "bar",
				data: {
					labels: ["Dinheiro", "Transferências", "Cartão de Débito", "Cartão de Crédito"],
					datasets: [{
						label: "Valor",
						backgroundColor: "rgba(0, 97, 242, 1)",
						hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
						borderColor: "#4e73df",
						data: [4215, 5312, 6251, 7841, 9821, 14984],
						maxBarThickness: 25
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
								max: 15000,
								maxTicksLimit: 5,
								padding: 10,
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


			// Area Chart Example
			var ctxAlunosPermanentes = document.getElementById("chartAlunosPermantesDesistentes");
			var chartAlunosPermantesDesistentes = new Chart(ctxAlunosPermanentes, {
				type: "line",
				data: {
					labels: [
						"Jan",
						"Fev",
						"Mar",
						"Abr",
						"Mai",
						"Jun",
						"Jul",
						"Ago",
						"Set",
						"Out",
						"Nov",
						"Dez"
					],
					datasets: [{
						label: "Valor",
						lineTension: 0.3,
						backgroundColor: "rgba(0, 97, 242, 0.05)",
						borderColor: "rgba(0, 97, 242, 1)",
						pointRadius: 3,
						pointBackgroundColor: "rgba(0, 97, 242, 1)",
						pointBorderColor: "rgba(0, 97, 242, 1)",
						pointHoverRadius: 3,
						pointHoverBackgroundColor: "rgba(0, 97, 242, 1)",
						pointHoverBorderColor: "rgba(0, 97, 242, 1)",
						pointHitRadius: 10,
						pointBorderWidth: 2,
						data: [
							0,
							10000,
							5000,
							15000,
							10000,
							20000,
							15000,
							25000,
							20000,
							30000,
							25000,
							40000
						]
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
								unit: "date"
							},
							gridLines: {
								display: false,
								drawBorder: false
							},
							ticks: {
								maxTicksLimit: 7
							}
						}],
						yAxes: [{
							ticks: {
								maxTicksLimit: 5,
								padding: 10,
								// Include a dollar sign in the ticks
								callback: function (value, index, values) {
									return "R$ " + number_format(value);
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
						backgroundColor: "rgb(255,255,255)",
						bodyFontColor: "#858796",
						titleMarginBottom: 10,
						titleFontColor: "#6e707e",
						titleFontSize: 14,
						borderColor: "#dddfeb",
						borderWidth: 1,
						xPadding: 15,
						yPadding: 15,
						displayColors: false,
						intersect: false,
						mode: "index",
						caretPadding: 10,
						callbacks: {
							label: function (tooltipItem, chart) {
								var datasetLabel =
									chart.datasets[tooltipItem.datasetIndex].label || "";
								return datasetLabel + ": R$ " + number_format(tooltipItem.yLabel);
							}
						}
					}
				}
			});


			// Bar Chart Example
			var ctxContasBancarias = document.getElementById("chartContasBancarias");
			var chartContasBancarias = new Chart(ctxContasBancarias, {
				type: "bar",
				data: {
					labels: ["Conta 1", "Conta 2", "Conta 3", "Conta 4"],
					datasets: [{
						label: "Valor",
						backgroundColor: "rgba(0, 97, 242, 1)",
						hoverBackgroundColor: "rgba(0, 97, 242, 0.9)",
						borderColor: "#4e73df",
						data: [4215, 5312, 6251, 7841, 9821, 14984],
						maxBarThickness: 25
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
								max: 15000,
								maxTicksLimit: 5,
								padding: 10,
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
		}

		return Dashboard;
	};

})(window, window.angular);