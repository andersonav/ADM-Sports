(function(window, angular) {
    'use strict';

    angular
        .module('app')
        .factory('Dashboard', Dashboard);

	Dashboard.$inject = [
        '$ajax',
        '$q',
        '$timeout',
        'gScope'
    ];

	function Dashboard($ajax, $q, $timeout, gScope) {
		
		var obj = null;

	    /**
	     * Constructor, with class name
	     */
	    function Dashboard() {
           
			obj                         = this;
			obj.model                   = 'vm.Dashboard';
			
			obj.url_consultar			= '/_20440/api/getDashboard';
            obj.url_gravar				= '/_20440/api/postDashboard';
            obj.url_excluir				= '/_20440/api/postExcluir';
            obj.url_ItensAdd			= '/_20440/api/getDashboard';
			
		}

	    return Dashboard;
	};
   
})(window, window.angular);