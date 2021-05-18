angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'CapitalGiro',
	'Confirmacao',
	'Devices'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	CapitalGiro,
	Confirmacao,
	Devices
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta 										= new Consulta();
	vm.CapitalGiro 										= new CapitalGiro($scope);
	vm.Confirmacao  									= new Confirmacao();
	vm.Devices  										= new Devices();
	vm.Confirme     									= vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme 									= vm.Confirme;
	gScope.Devices										= vm.Devices;

	var today 							= new Date();
	var actual_month 					= today.getMonth();
	var actual_year 					= today.getFullYear();

	vm.ARRAY_ANOS  = [];

	vm.ARRAY_MESES  = [
		{VALOR:0,  MES:'Janeiro'},
		{VALOR:1,  MES:'Fevereiro'},
		{VALOR:2,  MES:'Março'},
		{VALOR:3,  MES:'Abril'},
		{VALOR:4,  MES:'Maio'	},
		{VALOR:5,  MES:'Junho'},
		{VALOR:6,  MES:'Julho'},
		{VALOR:7,  MES:'Agosto'},
		{VALOR:8,  MES:'Setembro'},
		{VALOR:9,  MES:'Outubro' },
		{VALOR:10, MES:'Novembro'},
		{VALOR:11, MES:'Dezembro'}
	];
	
	gScope.ARRAY_MESES 	= vm.ARRAY_MESES;

	var tmp = actual_year + 20;

	for(var index = actual_year - 20; index <= tmp; index++){
		vm.ARRAY_ANOS.push({ANO : index});
	}

	gScope.ARRAY_ANOS 					= vm.ARRAY_ANOS;

	vm.CapitalGiro.MES 			= actual_month;
	vm.CapitalGiro.ANO				= actual_year;


	vm.CapitalGiro.consultar();

	vm.calcularQuantidadeDecimais = function (number) {
		var quantidadeDecimais = 0;
		var contarDecimaisNumber = gScope.countDecimals(number);

		if (contarDecimaisNumber < 2) {
			quantidadeDecimais = 2;
		} else if (contarDecimaisNumber > 5) {
			quantidadeDecimais = 5;
		} else {
			quantidadeDecimais = contarDecimaisNumber;
		}

		return quantidadeDecimais;
	}

	vm.countDecimals = function (number) {
		if (Math.floor(number.valueOf()) === number.valueOf()) return 0;

		return number.toString().split(".")[1].length || 0;
	}

	gScope.calcularQuantidadeDecimais 	= vm.calcularQuantidadeDecimais;
	gScope.countDecimals 				= vm.countDecimals;
	gScope.CapitalGiro 					= vm.CapitalGiro;


	$('.filter_on_enter').keyup(function(event){
		var key = event.keyCode;

		if(key == 13){
			vm.CapitalGiro.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.CapitalGiro.consultar();
		}
	});
	
}   
