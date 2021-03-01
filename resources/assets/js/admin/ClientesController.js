angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'Clientes'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	Clientes
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.Clientes = new Clientes();

	vm.Clientes.getClientes();


	gScope.Clientes = vm.Clientes;
}   
