angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'TiposModuloConta'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	TiposModuloConta
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.TiposModuloConta = new TiposModuloConta();

	vm.TiposModuloConta.getTiposModuloConta();


	gScope.TiposModuloConta = vm.TiposModuloConta;
}   
