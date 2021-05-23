angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'Lancamentos',
	'LancamentoItens',
	'LancamentoAlunos',
	'LancamentoClientes',
	'Confirmacao',
	'Devices'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	Lancamentos,
	LancamentoItens,
	LancamentoAlunos,
	LancamentoClientes,
	Confirmacao,
	Devices
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta 										= new Consulta();
	vm.Lancamentos 										= new Lancamentos($scope);
	vm.LancamentoItens 									= new LancamentoItens($scope);
	vm.LancamentoAlunos 								= new LancamentoAlunos($scope);
	vm.LancamentoClientes 								= new LancamentoClientes($scope);
	vm.Confirmacao  									= new Confirmacao();
	vm.Devices  										= new Devices();
	vm.Confirme     									= vm.Confirmacao.getNew('vm.Confirme');
	gScope.Confirme 									= vm.Confirme;
	gScope.Devices										= vm.Devices;

	vm.Lancamentos.consultar();
	vm.LancamentoItens.compileDatatable();

	// Consulta Perfil
	vm.ConsultaPerfil 									= vm.Consulta.getNew(true);
	vm.ConsultaPerfil.componente 						= '.consulta-perfil';
	vm.ConsultaPerfil.option.class 						= 'consulta-perfil-c';
	vm.ConsultaPerfil.model 							= 'vm.ConsultaPerfil';
	vm.ConsultaPerfil.option.label_descricao 			= 'Perfil: ';
	vm.ConsultaPerfil.option.obj_consulta 				= '/admin/funcionalidades/consultas/Perfil';
	vm.ConsultaPerfil.option.tamanho_tabela 			= '100%';
	vm.ConsultaPerfil.option.required 					= false;
	vm.ConsultaPerfil.autoload 							= false;
	vm.ConsultaPerfil.cache 							= false;
	vm.ConsultaPerfil.option.infinite_scroll 			= true;
	vm.ConsultaPerfil.option.obj_ret 					= ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaPerfil.option.campos_tabela 				= [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO']];
	vm.ConsultaPerfil.option.filtro_sql 				= {};

	vm.ConsultaPerfil.compile();

	vm.Lancamentos.consultas.push({OBJ : vm.ConsultaPerfil, NOME: 'PERFIL'});


	vm.ConsultaPerfil.onSelect = function (item) {

		if(vm.ConsultaPerfil.item.selected == true){
			if(Number(item.VALOR) > 0){
				vm.Lancamentos.SELECTED.VALOR_TOTAL = item.VALOR;
			}

			if(item.DESCRICAO_PADRAO != '' && item.DESCRICAO_PADRAO != null){
				vm.Lancamentos.SELECTED.DESCRICAO = item.DESCRICAO_PADRAO;
			}

			vm.Lancamentos.SELECTED.TIPO = Number(item.TIPO_LANCAMENTO);

			if(item.MODULO_CONTA_JSON != ''){
				var jsonModuloConta = JSON.parse(item.MODULO_CONTA_JSON);

				if(typeof jsonModuloConta.DESC_ID != 'undefined' && jsonModuloConta.ID != ''){
					gScope.ConsultaModuloContaItem.setSelected(jsonModuloConta);
				}
			}
			
			if(item.TIPO_DOCUMENTO_JSON != ''){
				var jsonTipoDocumento = JSON.parse(item.TIPO_DOCUMENTO_JSON);

				if(typeof jsonTipoDocumento.DESC_ID != 'undefined' && jsonTipoDocumento.ID != ''){
					gScope.ConsultaTipoDocumento.setSelected(jsonTipoDocumento);
				}
			}
			
			if(item.CONTA_BANCARIA_JSON != ''){
				var jsonContaBancaria = JSON.parse(item.CONTA_BANCARIA_JSON);

				if(typeof jsonContaBancaria.DESC_ID != 'undefined' && jsonContaBancaria.ID != ''){
					gScope.ConsultaContaBancaria.setSelected(jsonContaBancaria);
				}
			}
		}

	};

	vm.ConsultaPerfil.onClear = function (item) {

	};

	gScope.ConsultaPerfil = vm.ConsultaPerfil;
	
	// Consulta Tipo Documento
	vm.ConsultaTipoDocumento 									= vm.Consulta.getNew(true);
	vm.ConsultaTipoDocumento.componente 						= '.consulta-tipo-documento';
	vm.ConsultaTipoDocumento.option.class 						= 'consulta-tipo-documento-c';
	vm.ConsultaTipoDocumento.model 								= 'vm.ConsultaTipoDocumento';
	vm.ConsultaTipoDocumento.option.label_descricao 			= 'Tipo Documento: ';
	vm.ConsultaTipoDocumento.option.obj_consulta 				= '/admin/funcionalidades/consultas/TipoDocumento';
	vm.ConsultaTipoDocumento.option.tamanho_tabela 				= '100%';
	vm.ConsultaTipoDocumento.option.required 					= true;
	vm.ConsultaTipoDocumento.autoload 							= false;
	vm.ConsultaTipoDocumento.cache 								= false;
	vm.ConsultaTipoDocumento.option.infinite_scroll 			= true;
	vm.ConsultaTipoDocumento.option.obj_ret 					= ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaTipoDocumento.option.campos_tabela 				= [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO']];
	vm.ConsultaTipoDocumento.option.filtro_sql 					= {};

	vm.ConsultaTipoDocumento.compile();
	vm.Lancamentos.consultas.push({OBJ : vm.ConsultaTipoDocumento, NOME: 'TIPO_DOCUMENTO'});

	vm.ConsultaTipoDocumento.onSelect = function (item) {

	};

	vm.ConsultaTipoDocumento.onClear = function (item) {

	};

	gScope.ConsultaTipoDocumento = vm.ConsultaTipoDocumento;
	
	// Consulta Conta
	vm.ConsultaModuloContaItem 									= vm.Consulta.getNew(true);
	vm.ConsultaModuloContaItem.componente 						= '.consulta-modulo-conta-item';
	vm.ConsultaModuloContaItem.option.class 					= 'consulta-modulo-conta-item-c';
	vm.ConsultaModuloContaItem.model 							= 'vm.ConsultaModuloContaItem';
	vm.ConsultaModuloContaItem.option.label_descricao 			= 'Módulo de Conta: ';
	vm.ConsultaModuloContaItem.option.obj_consulta 				= '/admin/funcionalidades/consultas/ModuloContaItem';
	vm.ConsultaModuloContaItem.option.tamanho_tabela 			= '100%';
	vm.ConsultaModuloContaItem.option.required 					= true;
	vm.ConsultaModuloContaItem.autoload 						= false;
	vm.ConsultaModuloContaItem.cache 							= false;
	vm.ConsultaModuloContaItem.option.infinite_scroll 			= true;
	vm.ConsultaModuloContaItem.option.obj_ret 					= ['DESC_ID', 'DESCRICAO'];
	vm.ConsultaModuloContaItem.option.campos_tabela 			= [['DESC_ID', 'ID'], ['DESCRICAO', 'DESCRIÇÃO'], ['DESC_MC', 'MODELO'], ['DESC_MC_TIPO', 'TIPO']];
	vm.ConsultaModuloContaItem.option.filtro_sql 				= {};

	vm.ConsultaModuloContaItem.compile();

	vm.Lancamentos.consultas.push({OBJ : vm.ConsultaModuloContaItem, NOME: 'MODULO_CONTA_ITEM'});


	vm.ConsultaModuloContaItem.onSelect = function (item) {

	};

	vm.ConsultaModuloContaItem.onClear = function (item) {

	};

	gScope.ConsultaModuloContaItem = vm.ConsultaModuloContaItem;

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

	vm.Lancamentos.consultas.push({OBJ : vm.ConsultaContaBancaria, NOME: 'CONTA_BANCARIA'});


	vm.ConsultaContaBancaria.onSelect = function (item) {

	};

	vm.ConsultaContaBancaria.onClear = function (item) {

	};

	gScope.ConsultaContaBancaria = vm.ConsultaContaBancaria;



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
	gScope.Lancamentos 					= vm.Lancamentos;
	gScope.LancamentoItens 				= vm.LancamentoItens;
	gScope.LancamentoAlunos 			= vm.LancamentoAlunos;
	gScope.LancamentoClientes 			= vm.LancamentoClientes;


	$('.filter_on_enter').keyup(function(event){
		var key = event.keyCode;

		if(key == 13){
			vm.Lancamentos.consultar();
		}
	});

	$.key("alt+f", function (e) {
		if (!$(".modal").is(':visible')) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			vm.Lancamentos.consultar();
		}
	});
	
	$.key("delete", function (e) {
		if (!$(".modal").is(':visible')) {
			if ($("#dataTableLancamentos tbody tr.row_selected").length == 1 && $("#tableConsulta:visible").length == 0) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();

				var data = vm.Lancamentos.DATATABLE.row("#dataTableLancamentos tbody tr.row_selected").data();
				vm.Lancamentos.SELECTED = data;

				$timeout(function (){
					$scope.$apply(function () {
						vm.Lancamentos.excluir();
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
				onFocusInputModal("#modalLancamentos");
			});
		}else{
			if($(".modal:visible").length > 0){

				if($("#tableConsulta:visible").length == 0 && !$("input[name=consulta_descricao]").is(':focus')){
					var idModal = $(".modal:visible").last().attr("id");
					$("#" + idModal + " [data-hotkey=esc]:visible:enabled").first().trigger('click');

					$timeout(function () {
						onFocusInputModal("#modalLancamentos");
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
