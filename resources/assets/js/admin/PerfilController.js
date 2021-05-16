angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'Perfil',
	'Confirmacao',
	'Devices'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	Perfil,
	Confirmacao,
	Devices
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta 										= new Consulta();
	vm.Perfil 											= new Perfil($scope);
	vm.Confirmacao  									= new Confirmacao();
	vm.Devices  										= new Devices();
	vm.Confirme     									= vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme 									= vm.Confirme;
	gScope.Devices										= vm.Devices;

	// Consulta Tipo Documento
	vm.ConsultaTipoDocumento 									= vm.Consulta.getNew(true);
	vm.ConsultaTipoDocumento.componente 						= '.consulta-tipo-documento';
	vm.ConsultaTipoDocumento.option.class 						= 'consulta-tipo-documento-c';
	vm.ConsultaTipoDocumento.model 								= 'vm.ConsultaTipoDocumento';
	vm.ConsultaTipoDocumento.option.label_descricao 			= 'Tipo Documento: ';
	vm.ConsultaTipoDocumento.option.obj_consulta 				= '/admin/funcionalidades/consultas/TipoDocumento';
	vm.ConsultaTipoDocumento.option.tamanho_tabela 				= '100%';
	vm.ConsultaTipoDocumento.option.required 					= false;
	vm.ConsultaTipoDocumento.autoload 							= false;
	vm.ConsultaTipoDocumento.cache 								= false;
	vm.ConsultaTipoDocumento.option.infinite_scroll 			= true;
	vm.ConsultaTipoDocumento.option.obj_ret 					= ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaTipoDocumento.option.campos_tabela 				= [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO']];
	vm.ConsultaTipoDocumento.option.filtro_sql 					= {};

	vm.ConsultaTipoDocumento.compile();
	vm.Perfil.consultas.push({OBJ : vm.ConsultaTipoDocumento, NOME: 'TIPO_DOCUMENTO'});

	vm.ConsultaTipoDocumento.onSelect = function (item) {

	};

	vm.ConsultaTipoDocumento.onClear = function (item) {

	};

	gScope.ConsultaTipoDocumento = vm.ConsultaTipoDocumento;

	// Consulta Conta
	vm.ConsultaModuloConta 									= vm.Consulta.getNew(true);
	vm.ConsultaModuloConta.componente 						= '.consulta-tipo-modulo-conta';
	vm.ConsultaModuloConta.option.class 					= 'consulta-tipo-modulo-conta-c';
	vm.ConsultaModuloConta.model 							= 'vm.ConsultaModuloConta';
	vm.ConsultaModuloConta.option.label_descricao 			= 'Módulo de Conta: ';
	vm.ConsultaModuloConta.option.obj_consulta 				= '/admin/funcionalidades/consultas/ModuloConta';
	vm.ConsultaModuloConta.option.tamanho_tabela 			= '100%';
	vm.ConsultaModuloConta.option.required 					= false;
	vm.ConsultaModuloConta.autoload 						= false;
	vm.ConsultaModuloConta.cache 							= false;
	vm.ConsultaModuloConta.option.infinite_scroll 			= true;
	vm.ConsultaModuloConta.option.obj_ret 					= ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaModuloConta.option.campos_tabela 			= [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO'], ['DESC_MC_TIPO', 'TIPO']];
	vm.ConsultaModuloConta.option.filtro_sql 				= {};

	vm.ConsultaModuloConta.compile();

	vm.Perfil.consultas.push({OBJ : vm.ConsultaModuloConta, NOME: 'MODULO_CONTA'});


	vm.ConsultaModuloConta.onSelect = function (item) {

	};

	vm.ConsultaModuloConta.onClear = function (item) {

	};

	gScope.ConsultaModuloConta = vm.ConsultaModuloConta;

	// Consulta Conta
	vm.ConsultaContaBancaria 								= vm.Consulta.getNew(true);
	vm.ConsultaContaBancaria.componente 					= '.consulta-conta-bancaria';
	vm.ConsultaContaBancaria.option.class 					= 'consulta-conta-bancaria-c';
	vm.ConsultaContaBancaria.model 							= 'vm.ConsultaContaBancaria';
	vm.ConsultaContaBancaria.option.label_descricao 		= 'Conta bancária: ';
	vm.ConsultaContaBancaria.option.obj_consulta 			= '/admin/funcionalidades/consultas/ContaBancaria';
	vm.ConsultaContaBancaria.option.tamanho_tabela 			= '100%';
	vm.ConsultaContaBancaria.option.required 				= false;
	vm.ConsultaContaBancaria.autoload 						= false;
	vm.ConsultaContaBancaria.cache 							= false;
	vm.ConsultaContaBancaria.option.infinite_scroll 		= true;
	vm.ConsultaContaBancaria.option.obj_ret 				= ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaContaBancaria.option.campos_tabela 			= [['DESC_ID', 'ID'], ['DESC_CONTA', 'DESCRIÇÃO']];
	vm.ConsultaContaBancaria.option.filtro_sql 				= {};

	vm.ConsultaContaBancaria.compile();

	vm.Perfil.consultas.push({OBJ : vm.ConsultaContaBancaria, NOME: 'CONTA_BANCARIA'});


	vm.ConsultaContaBancaria.onSelect = function (item) {

	};

	vm.ConsultaContaBancaria.onClear = function (item) {

	};

	gScope.ConsultaContaBancaria = vm.ConsultaContaBancaria;

	vm.Perfil.consultar();

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
	gScope.Perfil 					= vm.Perfil;


	$('.filter_on_enter').keyup(function(event){
		var key = event.keyCode;

		if(key == 13){
			vm.Perfil.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.Perfil.consultar();
		}
	});
	
	$.key("delete", function (e) {
		if (!$(".modal").is(':visible')) {
			if ($("#dataTablePerfil tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.Perfil.DATATABLE.row("#dataTablePerfil tbody tr.row_selected").data();
				vm.Perfil.SELECTED = data;

				$timeout(function (){
					$scope.$apply(function () {
						vm.Perfil.excluir();
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
				onFocusInputModal("#modalPerfil");
			});
		}else{
			if($(".modal:visible").length > 0){

				if($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')){
					var idModal = $(".modal:visible").last().attr("id");
					$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');

					$timeout(function () {
						onFocusInputModal("#modalPerfil");
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
