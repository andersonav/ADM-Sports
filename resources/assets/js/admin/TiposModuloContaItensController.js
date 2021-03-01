angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'TiposModuloContaItens'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	TiposModuloContaItens
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.TiposModuloContaItens = new TiposModuloContaItens();

	vm.TiposModuloContaItens.getTiposModuloContaItens();






	// Consulta Tipo Módulo de Conta

	// Consulta Vendedor
	vm.ConsultaTipoModuloConta = vm.Consulta.getNew(true);
	vm.ConsultaTipoModuloConta.componente                  = '.consulta-modulo-conta-tipo';
	vm.ConsultaTipoModuloConta.option.class                = 'consulta-modulo-conta-tipo-c';
	vm.ConsultaTipoModuloConta.model                       = 'vm.ConsultaTipoModuloConta';
	vm.ConsultaTipoModuloConta.option.label_descricao      = 'Tipo Módulo Conta: ';
	// vm.ConsultaTipoModuloConta.option.label_descricao      = 'Tipo Módulo Conta: <a tabindex="-1" href="'+urlhost+'/_11640" target="_blank" rel="noopener noreferrer"><span class="fa fa-external-link" title="Gerenciamento de Tipos para Módulos de Conta"></span></a>';
	vm.ConsultaTipoModuloConta.option.obj_consulta         = '/admin/cadastros/modulos-conta/tipos/get';
	vm.ConsultaTipoModuloConta.option.tamanho_tabela       = 520;
	vm.ConsultaTipoModuloConta.option.required             = false;
	vm.ConsultaTipoModuloConta.autoload                    = false;
	vm.ConsultaTipoModuloConta.cache                       = false;
	vm.ConsultaTipoModuloConta.option.infinite_scroll      = false;
	vm.ConsultaTipoModuloConta.option.obj_ret              = ['DESC_ID','DESCRICAO'];
	vm.ConsultaTipoModuloConta.option.campos_tabela        = [['DESC_ID','ID'],['DESCRICAO','DESCRIÇÃO']];
	vm.ConsultaTipoModuloConta.option.filtro_sql           = {};

	vm.ConsultaTipoModuloConta.compile();

	vm.ConsultaTipoModuloConta.onSelect = function(item) {

	};

	vm.ConsultaTipoModuloConta.onClear = function(item) {

	};
	
	gScope.ConsultaTipoModuloConta  = vm.ConsultaTipoModuloConta;


	gScope.TiposModuloContaItens = vm.TiposModuloContaItens;
}   
