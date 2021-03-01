angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'TiposDocumento'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	TiposDocumento
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.TiposDocumento = new TiposDocumento();

	vm.TiposDocumento.getTiposDocumento();


	gScope.TiposDocumento = vm.TiposDocumento;
}   
