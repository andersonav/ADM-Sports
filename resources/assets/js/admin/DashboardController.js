angular
	.module('app')
	.value('gScope', {})
	.controller('Ctrl', Ctrl);


Ctrl.$inject = [
	'$scope',
	'$timeout',
	'gScope',
	'Consulta',
	'Dashboard'
];

function Ctrl(
	$scope,
	$timeout,
	gScope,
	Consulta,
	Dashboard
) {

	var vm = this;
	gScope.Ctrl = this;

	vm.Consulta = new Consulta();
	vm.Dashboard = new Dashboard();

	gScope.Dashboard = vm.Dashboard;


	var start = moment().subtract(29, "days");
    var end = moment();

    function cb(start, end) {
		vm.Dashboard.DATA_INICIAL 	= moment(start).toDate();
		vm.Dashboard.FDATA_INICIAL 	= moment(start).format('YYYY-MM-DD');
		vm.Dashboard.DATA_FINAL 	= moment(end).toDate();
		vm.Dashboard.FDATA_FINAL 	= moment(end).format('YYYY-MM-DD');

		vm.Dashboard.getLastMovimentacoes();

        $("#reportrange span").html(
            start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
        );
    }

	$("#reportrange").daterangepicker(
        {
            "showDropdowns": true,
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "Aplicar",
                "cancelLabel": "Cancelar",
                "daysOfWeek": [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sab"
                ],
                "monthNames": [
                    "Janeiro",	
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                ],
                "firstDay": 1,
                "customRangeLabel": 'Editar Data',
            },
            startDate: start,
            endDate: end,
            ranges: {
                'Hoje': [moment(), moment()],
                'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                "Últimos 7 dias": [moment().subtract(6, "days"), moment()],
                "Últimos 30 dias": [moment().subtract(29, "days"), moment()],
                "Este Mês": [
                    moment().startOf("month"),
                    moment().endOf("month"),
                ],
                "Último Mês": [
                    moment().subtract(1, "month").startOf("month"),
                    moment().subtract(1, "month").endOf("month"),
                ]
            },
        },
        cb
    );

    cb(start, end);
	
}
