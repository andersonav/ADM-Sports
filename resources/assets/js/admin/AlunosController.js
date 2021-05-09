angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'Alunos',
	'Confirmacao',
	'Devices'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	Alunos,
	Confirmacao,
	Devices
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta 										= new Consulta();
	vm.Alunos 										= new Alunos($scope);
	vm.Confirmacao  									= new Confirmacao();
	vm.Devices  										= new Devices();
	vm.Confirme     									= vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme 									= vm.Confirme;
	gScope.Devices										= vm.Devices;

	vm.Alunos.compileDatatable();

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
	gScope.Alunos 					= vm.Alunos;


	$('.filter_on_enter').keyup(function(event){
		var key = event.keyCode;

		if(key == 13){
			vm.Alunos.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.Alunos.consultar();
		}
	});
	
	$.key("delete", function (e) {
		if (!$(".modal").is(':visible')) {
			if ($("#dataTableAlunos tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.Alunos.DATATABLE.row("#dataTableAlunos tbody tr.row_selected").data();
				vm.Alunos.SELECTED = data;

				$timeout(function (){
					$scope.$apply(function () {
						vm.Alunos.excluir();
					});
				});

			}
		}
	});

	$.key("enter", function (e) {
		if ($(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			if($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')){
				var idModal = $(".modal:visible").last().attr("id");

				if(typeof idModal == 'undefined'){
					$(".modal.in.confirm button[data-hotkey=enter]:visible:enabled").first().trigger('click');
				}else{
					$("#" + idModal + " [data-hotkey=enter]:visible:enabled").first().trigger('click');
				}
			}
		}

	});

	$.key("esc", function (e) {
		if($(".modal.in.confirm:visible").length > 0){
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			$(".modal.in.confirm button[data-hotkey=esc]:visible:enabled").first().trigger('click');

			$timeout(function () {
				onFocusInputModal("#modalAlunos");
			});
		}else{
			if($(".modal:visible").length > 0){

				if($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')){
					var idModal = $(".modal:visible").last().attr("id");
					$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');

					$timeout(function () {
						onFocusInputModal("#modalAlunos");
					});
				}
			}
		}
	});
	
	$.key("f6", function (e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if($(".modal:visible").length > 0){
			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f6]:visible:enabled").first().trigger('click');
		}else{
			$("[data-hotkey=f6]:visible:enabled").first().trigger('click');
		}
	});
	
	$.key("f7", function (e) {
		if($(".modal:visible").length > 0){
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f7]:visible:enabled").first().trigger('click');
		}
	});
	
	$.key("f9", function (e) {
		if($(".modal:visible").length > 0){
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f9]:visible:enabled").first().trigger('click');
		}
	});
	
	$.key("f10", function (e) {
		if($(".modal:visible").length > 0){
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f10]:visible:enabled").first().trigger('click');
		}
	});
	
	$.key("f12", function (e) {
		if($(".modal:visible").length > 0){
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var idModal = $(".modal:visible").last().attr("id");
			$("#" + idModal + " [data-hotkey=f12]:visible:enabled").first().trigger('click');
		}
	});


	$.key("up", function (e) {


		if ($("#tableConsulta tbody tr.selected").length == 1) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			var elementConsulta = $("#tableConsulta tbody tr.selected");

			$(elementConsulta.prev()[0]).focus();
		}

	});

	$.key("down", function (e) {

		if ($("#tableConsulta tbody tr.selected").length == 1) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var elementConsulta = $("#tableConsulta tbody tr.selected");

			$(elementConsulta.next()[0]).focus();
		}
	});
}   
