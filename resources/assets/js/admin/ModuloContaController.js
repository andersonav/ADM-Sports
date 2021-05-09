angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'ModuloConta',
	'ModuloContaItens',
	'Confirmacao',
	'Devices'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	ModuloConta,
	ModuloContaItens,
	Confirmacao,
	Devices
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta 										= new Consulta();
	vm.ModuloConta 										= new ModuloConta($scope);
	vm.ModuloContaItens 								= new ModuloContaItens($scope);
	vm.Confirmacao  									= new Confirmacao();
	vm.Devices  										= new Devices();
	vm.Confirme     									= vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme 									= vm.Confirme;
	gScope.Devices										= vm.Devices;


	vm.ModuloConta.consultar();
	vm.ModuloContaItens.compileDatatable();

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
	gScope.ModuloConta 					= vm.ModuloConta;
	gScope.ModuloContaItens 			= vm.ModuloContaItens;

	$('.filter_on_enter').keyup(function(event){
		var key = event.keyCode;

		if(key == 13){
			vm.ModuloConta.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.ModuloConta.consultar();
		}
	});
	
	$.key("delete", function (e) {
		if (!$(".modal").is(':visible')) {
			if ($("#dataTableModuloConta tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.ModuloConta.DATATABLE.row("#dataTableModuloConta tbody tr.row_selected").data();
				vm.ModuloConta.SELECTED = data;

				$timeout(function (){
					$scope.$apply(function () {
						vm.ModuloConta.excluir();
					});
				});

			}
		}else{
			if($(".modal#modalModuloConta").is(':visible')){
				if(vm.ModuloContaItens.DADOS.length > 0 && $(".modal#modalModuloContaItens:visible").length == 0){
					if ($("#dataTableModuloContaItens tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0 && (vm.ModuloConta.ALTERANDO == true || vm.ModuloConta.INCLUINDO == true)) {
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();
		
						var data = vm.ModuloContaItens.DATATABLE.row("#dataTableModuloContaItens tbody tr.row_selected").data();
						vm.ModuloContaItens.SELECTED = data;

						$timeout(function (){
							$scope.$apply(function () {
								vm.ModuloContaItens.excluir();
							});
						});
						
					}
				}
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
		}else{
			if ($("#dataTableModuloConta tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.ModuloConta.DATATABLE.row("#dataTableModuloConta tbody tr.row_selected").data();
				vm.ModuloConta.SELECTED = data;

				$timeout(function (){
					$scope.$apply(function () {
						vm.ModuloConta.visualizar();
					});
				});

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
				onFocusInputModal("#modalModuloConta");
			});
		}else{
			if($(".modal:visible").length > 0){

				if($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')){
					var idModal = $(".modal:visible").last().attr("id");
					$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');

					$timeout(function () {
						onFocusInputModal("#modalModuloConta");
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
		}else {
			if ($(".modal#modalModuloConta").is(':visible')) {

				if(vm.ModuloContaItens.DADOS.length > 0 && $(".modal#modalModuloContaItens:visible").length == 0){
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
	
	
					if ($("#dataTableModuloContaItens tbody tr.row_selected").length == 0) {
						$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
						$("#dataTableModuloContaItens tbody tr").first().focus();
					} else {
	
						var element = $("#dataTableModuloContaItens tbody tr.row_selected");
	
						vm.ModuloContaItens.DATATABLE.$('tr.row_selected').removeClass('row_selected');
	
						if (element.prev().is('tr')) {
							$(element.prev()[0]).addClass('row_selected');
	
							$(element.prev()[0]).focus();
						} else {
							$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
							$("#dataTableModuloContaItens tbody tr").first().focus();
						}
					}
				}
			}else if ($(".modal:visible").length == 0) {

				if(vm.ModuloConta.DADOS.length > 0){
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#dataTableModuloConta tbody tr.row_selected").length == 0) {
						$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
						$("#dataTableModuloConta tbody tr").first().focus();
					} else {

						var element = $("#dataTableModuloConta tbody tr.row_selected");

						element.removeClass('row_selected');

						if (element.prev().is('tr')) {
							$(element.prev()[0]).addClass('row_selected');

							$(element.prev()[0]).focus();
						} else {
							$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
							$("#dataTableModuloConta tbody tr").first().focus();
						}
					}
				}

			}
		} 

	});

	$.key("down", function (e) {

		if ($("#tableConsulta tbody tr.selected").length == 1) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();

			var elementConsulta = $("#tableConsulta tbody tr.selected");

			$(elementConsulta.next()[0]).focus();
		}else{
			if ($(".modal#modalModuloConta").is(':visible')) {

				if(vm.ModuloContaItens.DADOS.length > 0 && $(".modal#modalModuloContaItens:visible").length == 0){
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
	
	
					if ($("#dataTableModuloContaItens tbody tr.row_selected").length == 0) {
						$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
						$("#dataTableModuloContaItens tbody tr").first().focus();
					} else {
	
						var element = $("#dataTableModuloContaItens tbody tr.row_selected");
	
						vm.ModuloContaItens.DATATABLE.$('tr.row_selected').removeClass('row_selected');
	
						if (element.next().is('tr')) {
							$(element.next()[0]).addClass('row_selected');
	
							$(element.next()[0]).focus();
						} else {
							$("#dataTableModuloContaItens tbody tr").first().addClass('row_selected');
							$("#dataTableModuloContaItens tbody tr").first().focus();
						}
					}
				}
			}else if ($(".modal:visible").length == 0) {
				if(vm.ModuloConta.DADOS.length > 0){
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if ($("#dataTableModuloConta tbody tr.row_selected").length == 0) {
						$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
						$("#dataTableModuloConta tbody tr").first().focus();
					} else {

						var element = $("#dataTableModuloConta tbody tr.row_selected");

						element.removeClass('row_selected');

						if (element.next().is('tr')) {
							$(element.next()[0]).addClass('row_selected');

							$(element.next()[0]).focus();
						} else {
							$("#dataTableModuloConta tbody tr").first().addClass('row_selected');
							$("#dataTableModuloConta tbody tr").first().focus();
						}
					}
				}

			}
		}

	});
}   
