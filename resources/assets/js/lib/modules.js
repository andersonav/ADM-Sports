var AngularFindModule = {};

(function(window, angular) {
    'use strict';

    var ajax = function ($q) {

        var vm = this;
        
        vm.ajax = null;
                
        var sanitize = function(type,url,params,options,resolve,reject) {
                            
            params              = (typeof(params             ) === "undefined") ? null : params             ;
            options             = (typeof(options            ) === "undefined") ? {}   : options            ;
            options.complete    = (typeof(options.complete   ) === "undefined") ? null : options.complete   ;
            options.progress    = (typeof(options.progress   ) === "undefined") ? true : options.progress   ;
            options.async       = (typeof(options.async      ) === "undefined") ? true : options.async      ;
            options.cache       = (typeof(options.cache      ) === "undefined") ? true : options.cache      ;
            options.contentType = (typeof(options.contentType) === "undefined") ? null : options.contentType;

            if ( params != null && typeof(params) == 'object') {
                
                params = JSON.stringify(params);
                
                options.contentType = 'application/json';
            }            
            
            return {
                type    : type,
                url     : url,
                params  : params,
                options : options,
                resolve : resolve,
                reject  : reject
            }
        };
		
		var objectToFormData = function(obj) {
			
			var formData 	= new FormData();
			var rootName 	= '';
			var ignoreList 	= [];

			function appendFormData(data, root) {
				if (!ignore(root)) {
					root = root || '';
					if (data instanceof File) {
						formData.append(root, data);
					} else if (Array.isArray(data)) {
						for (var i = 0; i < data.length; i++) {
							appendFormData(data[i], root + '[' + i + ']');
						}
					} else if (typeof data === 'object' && data) {
						for (var key in data) {
							if (data.hasOwnProperty(key)) {
								if (root === '') {
									appendFormData(data[key], key);
								} else {
									appendFormData(data[key], root + '[' + key+ ']');
								}
							}
						}
					} else {
						if (data !== null && typeof data !== 'undefined') {
							formData.append(root, data);
						}
					}
				}
			}

			function ignore(root){
				return Array.isArray(ignoreList)
					&& ignoreList.some(function(x) { return x === root; });
			}

			appendFormData(obj, rootName);

			return formData;

		}
        
        var xhr2 = function(type,url,params,options) {
            return $q(function(resolve, reject) {
                
				var data = sanitize(type,url,params,options,resolve, reject);
				var dados = objectToFormData(params);
				
				/*
				$.ajax({
					url: url,
					data: dados,
					type: 'POST',
					contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
					processData: false, // NEEDED, DON'T OMIT THIS
					// ... Other options like success and etc
				});
				*/

                vm.ajax = execAjaxFile(
                    data.type,
                    data.url,
                    dados,
                    data.resolve,
                    data.reject,
                    data.options.complete,
                    data.options.progress,
                    data.options.async,
                    data.options.cache,
					false,
					false
                );
				
				
            });
        }
		
		var xhr = function(type,url,params,options) {
            return $q(function(resolve, reject) {
                
                var data = sanitize(type,url,params,options,resolve, reject);

                vm.ajax = execAjax1(
                    data.type,
                    data.url,
                    data.params,
                    data.resolve,
                    data.reject,
                    data.options.complete,
                    data.options.progress,
                    data.options.async,
                    data.options.cache,
                    data.options.contentType
                );
            });
        }
		
		vm.postFile = function (url,params,options) {
            return xhr2('POST',url,params,options);
        };
        
        vm.post = function (url,params,options) {
            return xhr('POST',url,params,options);
        };
        
        vm.get = function (url,options) {
            return xhr('GET',url,null,options);
        };
        
        vm.abort = function () {
            vm.ajax.abort();
        }
    };
    
    ajax.$inject = ['$q'];

    var ajaxModule = angular.module('ajax', []);
    
    ajaxModule.service('$ajax', ajax);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ajaxModule.name;
    }

})(window, window.angular);