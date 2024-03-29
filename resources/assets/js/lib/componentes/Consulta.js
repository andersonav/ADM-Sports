(function(window, angular) {
    'use strict';

	angular
        .module('app').factory('Consulta' , Consulta);
	
	Consulta.$inject = [
        '$ajax',
        '$httpParamSerializer',
        '$rootScope',
        'gScope',
        '$compile',
		'$timeout',
		'$sce'
    ];

	function Consulta($ajax, $httpParamSerializer, $rootScope, gScope, $compile,$timeout,$sce) {

		var lista = [];
	    /**
	     * Constructor, with class name
	     */
	    function Consulta(data) {
	        if (data) {
	            this.setData(data);
	        }
	    }

	    /**
	     * Public method, assigned to prototype
	     */
	    var obj_Consulta = {

	        Consulta: function(data) {
	            if (data) {
	                this.setData(data);
	            }
			},
			htmlDecode: function(str) {
            
				str = str.replace(/&QUOT;/g,    '&quot;'   );
				str = str.replace(/&NBSP;/g,    '&nbsp;'   );
				str = str.replace(/&AACUTE;/g,  '&Aacute;' );
				str = str.replace(/&ACIRC;/g,   '&Acirc;'  );
				str = str.replace(/&AGRAVE;/g,  '&Agrave;' );
				str = str.replace(/&ARING;/g,   '&Aring;'  );
				str = str.replace(/&ATILDE;/g,  '&Atilde;' );
				str = str.replace(/&AUML;/g,    '&Auml;'   );
				str = str.replace(/&AELIG;/g,   '&AElig;'  );
				str = str.replace(/&EACUTE;/g,  '&Eacute;' );
				str = str.replace(/&ECIRC;/g,   '&Ecirc;'  );
				str = str.replace(/&EGRAVE;/g,  '&Egrave;' );
				str = str.replace(/&EUML;/g,    '&Euml;'   );
				str = str.replace(/&ETH;/g,     '&ETH;'    );
				str = str.replace(/&IACUTE;/g,  '&Iacute;' );
				str = str.replace(/&ICIRC;/g,   '&Icirc;'  );
				str = str.replace(/&IGRAVE;/g,  '&Igrave;' );
				str = str.replace(/&IUML;/g,    '&Iuml;'   );
				str = str.replace(/&OACUTE;/g,  '&Oacute;' );
				str = str.replace(/&OCIRC;/g,   '&Ocirc;'  );
				str = str.replace(/&OGRAVE;/g,  '&Ograve;' );
				str = str.replace(/&OSLASH;/g,  '&Oslash;' );
				str = str.replace(/&OTILDE;/g,  '&Otilde;' );
				str = str.replace(/&OUML;/g,    '&Ouml;'   );
				str = str.replace(/&UACUTE;/g,  '&Uacute;' );
				str = str.replace(/&UCIRC;/g,   '&Ucirc;'  );
				str = str.replace(/&UGRAVE;/g,  '&Ugrave;' );
				str = str.replace(/&UUML;/g,    '&Uuml;'   );
				str = str.replace(/&CCEDIL;/g,  '&Ccedil;' );
	
				return str;
			},
			trustAsHtml: function(string){
				var obj = this;
				var html = obj.htmlDecode(string);
				return $sce.trustAsHtml(html);
			},
			onScrollEnd: function(event){
				var obj = this;
				if(obj.option.infinite_scroll == true && obj.option.infinite_end == false){
					obj.option.consulta_pagina++;
					obj.filtrar(true);
				}
				//var html = obj.htmlDecode(string);
				//eturn $sce.trustAsHtml(html);
			},
			gerar_class: function(item,focused){
				var that = this;
				var classe = '';
				if(that.option.keepitopen == true){
					item.CHECKED = !item.CHECKED;
				}
			},
	        MontarHtml: function(obj,flag){
				var that = this;

	            var html = '';
	            
	            html += '<div class="consulta-container" ng-class="{\'no-label\':'+obj.model+'.option.no_label == true}">';
	            html += '    <div class="consulta">';
	            html += '        <div class="form-group '+obj.getClassForm()+'">';
				html += '           <label for="consulta-descricao" '+( obj.option.ttitle.length > 0 ? 'ttitle="'+ obj.option.ttitle +'"' : '' )+'>'+obj.option.label_descricao+'</label>';
				
				html += '<div class="input-group '+obj.option.class+'" style="display: inline-flex;">';
                html += '            <input type="text" style="'+ (obj.option.width > 0 ? 'width : '+obj.option.width+'px !important;' : '') + ' '+(typeof obj.option.text_transform_input != 'undefined' ? 'text-transform:'+ obj.option.text_transform_input + ';' : '')+''+(typeof obj.option.tamanho_minimo != 'undefined' ? ' min-width:'+ obj.option.tamanho_minimo : '')+''+(typeof obj.option.tamanho_maximo != 'undefined' ? '; max-width:'+ obj.option.tamanho_maximo : '')+'" ng-focus="'+obj.model+'.Input.focus" '+( obj.option.placeholder.length > 0 ? 'placeholder="'+obj.option.placeholder+'"' : '' )+' ng-blur="'+obj.model+'.InputBlur($event)" ng-keydown="'+obj.model+'.InputKeydown($event)" name="consulta_descricao" class="form-control consulta-descricao '+obj.option.tamanho_input+' objConsulta '+obj.getClassInput()+'" autocomplete="off" ng-class="{\'required\': '+obj.model+'.option.required}" ng-required="'+obj.model+'.option.required" ng-readonly="'+obj.model+'.Input.readonly" ng-disabled="'+obj.model+'.Input.disabled" ng-model="'+obj.model+'.Input.value" '+( obj.option.input_width.length > 0 ? 'style="width: '+ obj.option.input_width +' !important"' : '' )+' '+(typeof obj.option.placeholder != undefined ? 'placeholder="'+ obj.option.placeholder +'"' : '' )+' class="form-control bg-light border-0 small"';
                html += '                aria-label="" aria-describedby="basic-addon2" id="'+obj.option.class+'">';
                html += '            <div class="input-group-append">';
                html += '                <button style="border-radius: 0px 5px 5px 0px;" class="btn btn-primary '+obj.getClassButton()+'" type="button" ng-click="'+obj.model+'.setFocusInput(); '+obj.model+'.filtrar()" ng-if="'+obj.model+'.btn_filtro.visivel" ng-disabled="'+obj.model+'.btn_filtro.disabled" tabindex="-1">';
                html += '                    <i class="fas fa-search fa-sm"></i>';
				html += '                 </button>';
                html += '                <button  style="border-radius: 0px 5px 5px 0px;" class="btn btn-danger '+obj.getClassButton()+'" type="button" ng-click="'+obj.model+'.apagar(true)" ng-if="'+obj.model+'.btn_apagar_filtro.visivel" ng-disabled="'+obj.model+'.btn_apagar_filtro.disabled" tabindex="-1">';
                html += '                    <i class="fas fa-times fa-sm"></i>';
				html += '                 </button>';
				html += '            </div>';
				
				html += '               <div ng-style="'+obj.model+'.tabela.style" ng-if="'+obj.model+'.tabela.visivel" style="box-shadow: 0px 1px 3px #a90f0f; position: absolute; background: white; width: '+(typeof obj.option.tamanho_tabela == 'string' ? obj.option.tamanho_tabela : obj.option.tamanho_tabela > 0 ? obj.option.tamanho_tabela +'px' : 'auto')+'; max-height: 300px; '+(typeof obj.option.tamanho_minimo != 'undefined' ? 'min-width:'+ obj.option.tamanho_minimo : '')+''+(typeof obj.option.tamanho_tabela_max == 'string' ? obj.option.tamanho_tabela_max : '')+''+'" class="pesquisa-res-container ativo lista-consulta-container">';
	            html += '                   <div class="pesquisa-res lista-consulta table-ec" on-scroll-to-bottom=" '+obj.model+'.onScrollEnd($event)">';
					if(obj.option.infinite_scroll == true){
						html += ' <div ng-if="'+obj.model+'.consultando" style="position: absolute; opacity: 0.75; width: 100%; height: 100%; z-index: 10; background-color: rgb(255, 255, 255);">';
						html += ' <img style="width: 100px; height: 100px; top: calc(50% - 50px); left: calc(50% - 50px); position: relative;"';
						html += ' src="'+urlhost+'/assets/img/loading.gif"/> </div>';
					}

                // html += '        </div>';

	            // html += '           <div class="input-group '+obj.option.class+'">';
	            // html += '               <input type="search" style="'+ (obj.option.width > 0 ? 'width : '+obj.option.width+'px !important;' : '') + ' '+(typeof obj.option.text_transform_input != 'undefined' ? 'text-transform:'+ obj.option.text_transform_input + ';' : '')+''+(typeof obj.option.tamanho_minimo != 'undefined' ? ' min-width:'+ obj.option.tamanho_minimo : '')+''+(typeof obj.option.tamanho_maximo != 'undefined' ? '; max-width:'+ obj.option.tamanho_maximo : '')+'" ng-focus="'+obj.model+'.Input.focus" '+( obj.option.placeholder.length > 0 ? 'placeholder="'+obj.option.placeholder+'"' : '' )+' ng-blur="'+obj.model+'.InputBlur($event)" ng-keydown="'+obj.model+'.InputKeydown($event)" name="consulta_descricao" class="form-control consulta-descricao '+obj.option.tamanho_input+' objConsulta '+obj.getClassInput()+'" autocomplete="off" ng-required="'+obj.model+'.option.required" ng-readonly="'+obj.model+'.Input.readonly" ng-disabled="'+obj.model+'.Input.disabled" ng-model="'+obj.model+'.Input.value" '+( obj.option.input_width.length > 0 ? 'style="width: '+ obj.option.input_width +' !important"' : '' )+' '+(typeof obj.option.placeholder != undefined ? 'placeholder="'+ obj.option.placeholder +'"' : '' )+' />';            
	            // html += '               <button type="button" ng-click="'+obj.model+'.apagar(true)" class="input-group-addon btn-filtro btn-apagar-filtro btn-apagar-filtro-consulta search-button" style="display: block !important;" ng-if="'+obj.model+'.btn_apagar_filtro.visivel" ng-disabled="'+obj.model+'.btn_apagar_filtro.disabled" tabindex="-1" ><span class="fas fa-times"></span></button>';
	            // html += '               <button type="button" ng-click="'+obj.model+'.setFocusInput(); '+obj.model+'.filtrar()" class="input-group-addon btn-filtro btn-filtro-consulta search-button '+obj.getClassButton()+'" disabled tabindex="-1"  style="display: block !important;" ng-if="'+obj.model+'.btn_filtro.visivel" ng-disabled="'+obj.model+'.btn_filtro.disabled"><span class="fas fa-search"></span></button>';
	            
	            html += '                       <table id="tableConsulta" style="width: 100%;" class="table table-condensed table-bordered table-hover selectable '+obj.getClassTabela()+'">';
	            html += '                           <thead>';
				html += '                               <tr ng-focus="'+obj.model+'.focus()" >';
				
				
				angular.forEach(obj.option.campos_tabela, function(iten, key) {
					if(typeof iten[0] == 'string'){
						html += '                                   <th>'+iten[1] + ((obj.option.campos_tabela.length-1) == key ? '<span title="Atualizar dados" style="float: right; color: white;" class="fas fa-sync" ng-if="'+obj.model+'.id_cached != \'0\'" ng-click="'+obj.model+'.apagarCache()" ></span>' : '')  +'</th>';
					}else if (typeof iten[0] == 'object'){

						var htmlTtitle = iten[0].TTITLE;
						html += '                                   <th ttitle="'+htmlTtitle+'">'+iten[1] + ((obj.option.campos_tabela.length-1) == key ? '<span title="Atualizar dados" style="float: right; color: white;" class="fas fa-sync" ng-if="'+obj.model+'.id_cached != \'0\'" ng-click="'+obj.model+'.apagarCache()" ></span>' : '')  +'</th>';

					}
				});


	            html += '                               </tr>';
	            html += '                           </thead>';

	            var tamanho = obj.option.campos_tabela.length;
	            html += '                           <tr ng-if="'+obj.model+'.dados.length == 0" ng-Keydown="'+obj.model+'.selecionarKeydown($event,null)" ng-click="'+obj.model+'.selecionarItem(null)" ng-focus="'+obj.model+'.focus()" class="selectable" tabindex="0">';
	            html += '                                   <td style="text-align:center;" colspan="'+tamanho+'">SEM REGISTROS</td>';
	            html += '                           </tr>';


	            html += '                           <tr ng-class="{ \'selected\' : '+obj.model+'.focused == consultaTblItem }" ng-Keydown="'+obj.model+'.selecionarKeydown($event,consultaTblItem)" style="@{{ consultaTblItem.MARKED == true ? \'background-color : rgb(255, 224, 224);\' : \'\'}}" ng-click="'+obj.model+'.selecionarItem(consultaTblItem); " ng-focus="'+obj.model+'.focus(); ' + obj.model + '.focused = consultaTblItem" ng-blur="' + obj.model + '.focused = false " class="selectable" tabindex="0" ng-repeat="consultaTblItem in '+obj.model+'.dados track by $index">';
	            
	            angular.forEach(obj.option.campos_tabela, function(iten, key) {
					var alinha = 'left';
					var textUpper = 'none';
					var coluna = "";
					if(typeof iten[0] == 'string'){
						coluna = iten[0];
					}else if (typeof iten[0] == 'object'){
						coluna = iten[0].COLUNA;
					}

					if(typeof obj.option.align_right != 'undefined'){
						if(obj.option.align_right.indexOf(coluna) != (-1)){
							alinha = 'right';
						}
					}

					if(typeof obj.option.align_center != 'undefined'){
						if(obj.option.align_center.indexOf(coluna) != (-1)){
							alinha = 'center';
						}
					}

					if(typeof obj.option.text_transform_none != 'undefined'){
						if(obj.option.text_transform_none.indexOf(coluna) != (-1)){
							textUpper = 'none';
						}
					}
					
					if(typeof obj.option.campos_html != 'undefined' && obj.option.campos_html == true){
						var check_html = false;
						if (typeof iten[0] == 'object' && typeof iten[0].HTML != 'undefined'){
							check_html = iten[0].HTML;
						}

						if(check_html == true){
							html += '	<td ng-bind-html="'+obj.model+'.trustAsHtml(consultaTblItem.'+coluna+')" style="text-align:'+alinha+';"></td>';
						}else{
							html += '   <td style="text-align:'+alinha+'; text-transform:'+textUpper+';">{{consultaTblItem.'+coluna+'}}</td>';
						}

					}else{
						if(coluna == obj.option.campo_html){
							html += '	<td ng-bind-html="'+obj.model+'.trustAsHtml(consultaTblItem.'+coluna+')" style="text-align:'+alinha+';"></td>';
						}else if(coluna == obj.option.campo_html2){
							html += '	<td ng-bind-html="'+obj.model+'.trustAsHtml(consultaTblItem.'+coluna+')" style="text-align:'+alinha+';"></td>';
						}else{
							html += '   <td style="text-align:'+alinha+'; text-transform:'+textUpper+';">{{consultaTblItem.'+coluna+'}}</td>';
						}
					}
				
				});

	            html += '                           </tr>';
				html += '                       </table>';
				html += '						<p ng-if="'+obj.model+'.option.infinite_end" style="font-weight: bold;margin-top: 3px;margin-bottom: 5px;text-align: center;color: crimson;"> Todos os registros foram carregados </p> ';
	            html += '                   </div>';
	            html += '               </div>';
	            html += '           </div>';
	            html += '        </div>';
	            html += '    </div>';
	            html += '</div>';  

	            if(flag == 0){
		            var obj   = $(obj.componente);
                    if ( obj.length > 0 ) {
                        var scope = obj.scope(); 
						obj.html(html);
						
						//$compile(obj.contents())(scope);

						if(typeof gScope.childScopes == 'undefined'){ gScope.childScopes = []; }

						if(that.key_object_scop >= 0){
							var childScope = gScope.childScopes[that.key_object_scop];

							if (typeof childScope != 'undefined') {
								childScope.$destroy();
								gScope.childScopes[that.key_object_scop] = undefined;
							}
						}
						
						if(that.key_object_scop < 0){
							that.key_object_scop = gScope.childScopes.length;
						}

						childScope = scope.$new();
						gScope.childScopes[that.key_object_scop] = childScope;

						that.compiledElement = $compile(obj.contents())(childScope);
						childScope.$on("$destroy", function() {
							that.compiledElement.remove();
						});
                    }
		        }else{
		        	return html;	
		        }

			},
			key_object_scop: -1,
            id_cached : '0',
            apagarCache : function(){

                var that = this;
                localStorage.removeItem(that.id_cached);
                that.dados = [];
                that.consultar(that);
                
            },
            beforeSearch : function(){},
	        consultar: function(obj,scroll){
                var that = this;
				
				if(typeof scroll == 'undefined'){
					that.option.consulta_pagina = 0;
					that.option.infinite_end = false;
				}

                that.beforeSearch();
	        	
	            var btn_filtro = $(this.element_input_group).find('.'+this.getClassButton());

	            function beforeSend() {
	                if (btn_filtro !== false){
	                $(btn_filtro)
	                    .children()
	                    .removeClass('fa-search')
	                    .addClass('fa-circle-notch');
	                }
	            }

	            function complete(){
	                if (btn_filtro !== false) {
	                    $(btn_filtro)
	                        .children()
	                        .addClass('fa-search')
	                        .removeClass('fa-circle-notch');
	                }
	            }

                function isEmpty(obj) {
                    for(var prop in obj) {
                        if(obj.hasOwnProperty(prop))
                            return false;
                    }

                    return JSON.stringify(obj) === JSON.stringify({});
                }

	            beforeSend();

	            var filtro = obj.Input.value;
	            if(filtro == undefined){
	            	filtro = "";	
	            }

	            var paran = Object.assign({}, obj.option.paran);

                var dados = {FILTRO : (filtro+'').replace(/'/g, "''")};
                
                if ( isEmpty(this.option.data_request) && isEmpty(this.option.require_request) ) {
                    dados.OPTIONS  = obj.option.filtro_sql;
					dados.PARAN    = paran;
					dados.CONSULTA = {
						TIPO: obj.option.consulta_tipo,
						PAGINA: obj.option.consulta_pagina * obj.option.consulta_qtd,
						QTD: obj.option.consulta_qtd,
						INFINITE_SCROLL: obj.option.infinite_scroll
					};
                } else {
                    
                    if ( !isEmpty(this.option.data_request) ) {                   
                        var target = this.option.data_request;

                        var props = {};
                        for (var k in target){
                            if (target.hasOwnProperty(k)) {

                                if ( Array.isArray(target[k]) ) {
                                    var model = target[k][0];
                                    var prop  = target[k][1];
                                    props[k]  = model[prop];
                                } else {
                                    props[k] = target[k];
                                }

                            }
                        }

                        angular.extend(dados, props);
                    }
                    if ( !isEmpty(this.option.require_request) ) {    
                        var target = this.option.require_request;

                        var props = {};
                        for (var k in target){
                            if (target.hasOwnProperty(k)) {
                                var model = target[k][0].item.dados;
                                var prop  = target[k][1];
                                props[k]  = model[prop];
                            }
                        }
                        angular.extend(dados, props);
                    }
                }

                function executarConsulta(obj, hash){
					if(typeof scroll != 'undefined'){
						obj.consultando = true;
					}

                    $ajax.post(obj.option.obj_consulta, dados, {progress:false,complete:complete})
                        .then(function(response) {

                            if(that.onFilter != null){
                                that.onFilter();
							}
							
							if(typeof scroll != 'undefined'){
								for(var a = 0; a < response.length; a++){
									var item = response[a];
									obj.dados.push(item);
								}
								if(response.length < obj.option.consulta_qtd && obj.option.consulta_pagina > 0){
									obj.option.infinite_end = true;
									//(response.length < obj.dados.length) response.length == 0
									//showAlert('Aviso: <br> Não há registros a serem adicionados.');
								}
							}else{
								obj.dados = response;								
							}	

							that.onFormatMerge(obj.dados);

                            if(obj.dados.length == 1){
                                obj.selecionarItem(obj.dados[0]);   
                            }else{
								if(typeof scroll == 'undefined'){
									obj.setFocusTabela();
								}                                
                            }    
                            
                            that.id_cached   = '0';
							var timeDateHora = new Date();
							if(that.cache == true ||typeof that.cache == 'undefined'){
								localStorage.setItem(hash, JSON.stringify({DADOS: obj.dados, DATA: timeDateHora}));
							}
							if(that.onMerge != null && that.option.keepitopen == true){
								that.onMerge(obj.dados);
							}
							obj.consultando = false;
                        },
                        function(e){
							//showErro(e);
							obj.consultando = false;
                        }
                    );

                }

                function hashCode(str) {
                    str = str + '';
                    var hash = 0, i, chr;
                    if (str.length === 0) return hash;
                    for (i = 0; i < str.length; i++) {
                      chr   = str.charCodeAt(i);
                      hash  = ((hash << 5) - hash) + chr;
                      hash |= 0; // Convert to 32bit integer
                    }
                    return hash;
                };

                var hash = 'cache' + hashCode(obj.option.obj_consulta + JSON.stringify(dados));

                if(that.cache == true){

                    var cache = localStorage.getItem(hash);

                    if(cache === null){
                        executarConsulta(obj, hash);
                    }else{

                        cache  =  JSON.parse(cache);

                        var outraData = new Date();
                        var dataTime  = new Date(cache.DATA);
                        var response  = cache.DADOS;

                        dataTime.setHours(dataTime.getHours() + 24);

                        if(outraData <= dataTime){

                            that.id_cached = hash;

                            that.Time1 = $timeout(function(){

                                if(that.onFilter != null){
                                    that.onFilter();
                                }

								obj.dados = response;
								if(that.onMerge != null && that.option.keepitopen == true){
									that.onMerge(obj.dados);
								}

                                if(obj.dados.length == 1){

                                    obj.selecionarItem(obj.dados[0]); 

                                }else{

                                    that.Time2 = $timeout(function(){
										obj.setFocusTabela();
										$timeout.cancel(that.Time2);
                                    },100);

                                } 
                                
								complete();
								
								$timeout.cancel(that.Time1);
                                
                            },100);

                        }else{
                            localStorage.removeItem(hash);
                            executarConsulta(obj, hash);
                        }
                    }

                }else{
                    executarConsulta(obj, hash);
                }

	        },
	        setData: function(data) {
	            angular.extend(this, data);
	        },
	        InputKeydown: function($event){
	            if($event.key == 'Delete' && this.Input.readonly == true && this.btn_apagar_filtro.disabled == false){
	                this.apagar();   
	            }

	            if($event.key == 'Enter' && this.Input.readonly == false){
	                this.filtrar();   
	            }

	            if($event.key == 'ArrowDown' && this.tabela.visivel == true){
	                
                    var table = $($event.target).nextAll('.pesquisa-res-container').first();
                    var tr    = table.find('tbody tr:focusable').first();
                    tr.focus();
	            }
	        },
	        InputBlur: function($event){
                
                var that = this;
                                
                var input_group = $($event.relatedTarget).closest('.input-group');

                if ( !that.item.selected ) { 

                    if ( input_group.length == 0 || (input_group.length > 0 && input_group[0] != that.element_input_group)  ) {
                        if ( !that.tabela.visivel ) {
                            //that.apagar();
                            this.Input.value = '';
                        }
                    }
                }
	        },
	        selecionarKeydown: function($event,item){
				var that = this;

	            if($event.key == 'Enter'){
					$timeout(function (){
						that.selecionarItem(item);
					}, 100);

	                
				}   

	            if($event.key == 'Escape'){
					$timeout(function (){
						that.tabela.visivel = false;
						that.setFocusInput();
					}, 100);
	            }
	        },
	        vincular:function(msg){

                var msg = typeof msg == 'undefined' ? '' : msg;
                var that = this;
                
                this.require_msg = msg;

	            if(this.require != null){
	                if(Array.isArray(this.require)){
	                	that.option.filtro_sql = [];
	                    angular.forEach(this.require, function(item, key) {
	                        that.option.filtro_sql.push(item.item);
	                    });

	                    this.require.reverse();

	                    angular.forEach(this.require, function(item, key) {

	                        item.actionsSelct.push(function(){
	                            if(that.validar() && that.autoload == true){
                                    that.setFocusInput();
	                                that.filtrar();
	                            }   
	                        });
	                        item.actionsClear.push(function(){
	                            that.apagar(); 
	                        });
	                    });

	                }else{

	                    this.option.filtro_sql = this.require.item;

	                    this.require.actionsSelct.push(function(){
                            if(that.validar() && that.autoload == true){
                                that.setFocusInput();
                                that.filtrar();
                            }   
	                    });
	                    this.require.actionsClear.push(function(){
	                        that.apagar();    
	                    });
	                }
	            }
	        },
	        selecionarItem:function(item){

				var that = this;
	        	var tamanho = 0;
	        	if(this.dados != undefined){
		        	if(typeof this.dados == 'object'){
		        		tamanho = Object.keys(this.dados).length;
		        	}else{
		        		tamanho = this.dados.length;
		        	}
		        }else{
		        	tamanho = 0;	
		        }

				function tratar(){
					if(that.onSelect != null && that.vinculoEnabled == true){
	                    that.onSelect(item);
					}
					that.onFindItem();

	                if(that.vinculoEnabled == true){
		                if(that.actionsSelct != null){
							if(typeof that.option.keepitopen == 'undefined' ||
								that.option.keepitopen == false){
							
								angular.forEach(that.actionsSelct, function(item, key) {
									if(item != null){
										item();
									}
								});
							}
		                }
		            }
				}

	            if(tamanho > 0){
					   
					if(typeof that.option.keepitopen == 'undefined' || that.option.keepitopen == false){
							//Se acaso for verdadeiro a tabela não irá fechar porém irá fazer o método de onSelect...
							this.tabela.visivel = false;

							this.btn_apagar_filtro.disabled = false;
							this.btn_apagar_filtro.visivel  = true;

							this.btn_filtro.disabled = true;
							this.btn_filtro.visivel  = false;

							this.Input.readonly = true;

							var valor = '';

							angular.forEach(this.option.obj_ret, function(campo, key) {
								if(valor == ''){
									valor  = item[campo];
								}else{
									valor += ' - ' + item[campo];    
								}
							});

							this.selected = item;

							this.item.selected = true;
							this.item.dados = item;
							
							if ( this.set_this ) {
								angular.extend(this, item);
							}
							
							//$rootScope.$apply(function(){
							that.Time3 = $timeout(function(){
								$rootScope.$apply(function(){
									that.Input.value = valor;
								});								
								tratar();

								$timeout.cancel(that.Time3);
								
							}, 0, false);
							//})
							
							this.setFocusInput();
							this.setDefalt();
					}else{
						item.MARKED = true;
						tratar();
					}
	                	                

	            }else{
	                this.item.selected = false;
	                this.item.dados = {};
                    
	                this.tabela.visivel = false;
	                this.selected = null;
	                this.setFocusInput();
	            }
			},
			tabela_fixa : false,
	        setFocusTabela: function() {
	            this.tabela.visivel = true;
                
	            var that = this;

                var input_height = that.element_input.offsetHeight;
                var table_pos    = input_height+1;
                
	            var altura    = window.innerHeight;
	            var registros = this.dados.length + 1; if(registros>8){registros = 8.7}
	            var tamanho   = (registros) * table_pos;
	            var imput     = $(this.element_form_group).find('.'+that.getClassInput());
	            var pos       = $(imput).offset();
	            var topo      = table_pos;
				var max_height= '300px';

				var coordenadas = that.element_input.getBoundingClientRect();
				var topo_tela = coordenadas.top;

				if(that.tabela_fixa == true){
					topo = topo_tela - input_height + 10;
				}
				
	            if(((pos.top + table_pos + tamanho) > altura)  &&  (window.innerWidth > 500)){

					if(isMobile()){
						
					}else{

						var tabdiv = (pos.top + table_pos + tamanho);

						if( (tabdiv - 60) <  altura){
							max_height= '210px';
						}else if( (tabdiv - 90) <  altura){
							max_height= '180px';
						}else if( (tabdiv - 120) <  altura){
							max_height= '150px';
						}else if( (tabdiv - 150) <  altura){
							max_height= '120px';
						}else if( (tabdiv - 180) <  altura){
							max_height= '90px';
						}else{
							if(that.tabela_fixa == true){
								topo = (topo_tela - tamanho + 10) * -1;
								max_height= '150px';
							}else{
								topo = (tamanho * -1);
								max_height= '150px';
							}
						}
					}	
					            	
				};

				if(that.tabela_fixa == true && !isMobile()){
					var parte_css1 = {'max-height': max_height, 'top':topo, 'z-index': '99', 'position' : 'fixed'};
				}else{
					var parte_css1 = {'max-height': max_height, 'top':topo, 'z-index': '99'};
				}

				if(typeof this.option.tabela_style != 'undefined'){					
					var parte_css2 = this.option.tabela_style;
					//this.tabela.style = {...parte_css1, ...parte_css2 };
					this.tabela.style = Object.assign({}, parte_css1, parte_css2);
				}else{
					this.tabela.style = parte_css1;
				}
                
                that.Time4 = $timeout(function(){
                    
                    var tabela = $(that.element_form_group).find('.'+that.getClassTabela());

	                var tr     = $(tabela).find('tr');
	                if(tr.length > 1){
	                    $(tr[1]).focus();
	                }

                    that.element_table_container = $(that.componente).find('.pesquisa-res-container')[0];

                    var closeTable = function (e) {

                        var input_group_click = $(e.target).closest('.input-group');
                        var table_container_click = $(e.target).closest('.pesquisa-res-container');

                        if ( !that.tabela.visivel || table_container_click.length == 0 || (table_container_click.length > 0 && table_container_click[0] != that.element_table_container) ) {
                            
                            $(this).off(e);
                            
                            that.Time5 = $timeout(function(){
                                //$rootScope.$apply(function () {                            

                                    if ( !that.item.selected && !$(that.element_input).is(':focus') && !$(that.element_input).is(':disabled') && !$(that.element_button_search).is(':focus')  ) {
                                        that.apagar();
                                    }

                                    that.tabela.visivel = false;
								//});
								$timeout.cancel(that.Time5);
                            });
                        }
                    };
                    
                    $('body').focusin(closeTable);
					$('body').click(closeTable);

					$timeout.cancel(that.Time4);
                });

	            /*
	            that.pageScroll = $(document).scrollTop();
            	
            	$(document).on('mouseenter','.pesquisa-res-container.ativo',function(){
            		$(document).scroll(function() {
		                var obj = $('.pesquisa-res-container.ativo');
		                if ($(obj).length > 0) {
		                    $(document).scrollTop(that.pageScroll);
		                }
		            });
            	});
            	*/	            

	        },
	        pageScroll:0,
	        setFocusInput: function() {
	            $(this.element_form_group).find('.'+this.getClassInput()).focus();
	        },
	        focus:function(){
	            clearTimeout(this.timeFechar);
	        },     
	        compile : function (montar_html) {
                
                this.getDataComponent();
                this.MontarHtml(this,0);
                this.getScale();
                
                if ( this.option.tamanho_tabela == undefined || this.option.tamanho_tabela == null ) {
                    var input_width = $(this.element_input).width();
                    
                    if ( input_width < 300 ) {
                        this.option.tamanho_tabela = 300
                    } else {
                        this.option.tamanho_tabela = input_width;
                    }
                }
                
                return this;
	        },
            getScale : function () {
                this.element_input = $(this.componente).find('.consulta-descricao')[0];
                this.element_button_search = $(this.componente).find('[type="button"].search-button')[0];
                this.element_input_group = $(this.componente).find('.input-group')[0];                
                this.element_form_group = $(this.componente).find('.form-group')[0];   
            },
            getDataComponent : function () {
                
                var label = $(this.componente).attr('x-label');
                if (typeof label !== typeof undefined && label !== false) {
                    this.option.label_descricao = label;
                }
                
                var ttitle = $(this.componente).attr('x-ttitle');
                if (typeof ttitle !== typeof undefined && ttitle !== false) {
                    this.option.ttitle = ttitle;                    
                }
                
                var required = $(this.componente).attr('x-required');
                if (typeof required !== typeof undefined && required !== false) {
                    this.option.required = required == true ? true : false;                    
                }
                
                var model = $(this.componente).attr('x-model');
                if (typeof model !== typeof undefined && model !== false) {
                    this.model = model;                    
                }
                
                var api = $(this.componente).attr('x-api');
                if (typeof api !== typeof undefined && api !== false) {
                    this.option.obj_consulta = api;                    
                }
                
                var returns = $(this.componente).attr('x-returns');
                if (typeof returns !== typeof undefined && returns !== false) {
                    returns = returns.replace(/'/g, '"');
                    returns = JSON.parse(returns);
                    this.option.obj_ret = returns;
                }
                
                var table_returns = $(this.componente).attr('x-table-returns');
                if (typeof table_returns !== typeof undefined && table_returns !== false) {
                    table_returns = table_returns.replace(/'/g, '"');
                    table_returns = JSON.parse(table_returns);
                    this.option.campos_tabela = table_returns;
                }

                var input_width = $(this.componente).attr('x-input-width');
                if (typeof input_width !== typeof undefined && input_width !== false) {
                    this.option.input_width = input_width;                    
                }                

                var table_width = $(this.componente).attr('x-table-width');
                if (typeof table_width !== typeof undefined && table_width !== false) {
                    this.option.tamanho_tabela = table_width;                    
                }     
                

                var data_request = $(this.componente).attr('x-data-request');
                if (typeof data_request !== typeof undefined && data_request !== false) {
                    data_request = data_request.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
                    data_request = JSON.parse(data_request);
                    this.option.data_request = data_request;
                }
                
            },
	        html : function () {
	            return this.MontarHtml(this,1);
            },
            require_msg : '',
	        validate:function(){
                var that = this;
	            var ret = true;

	            if(that.require != null){
	                if(Array.isArray(that.require)){

	                    that.require.reverse();
                        var notificado = false;

	                    angular.forEach(that.require, function(item, key) {
	                        if(item.selected == null){
	                            item.setErro();
	                            item.setFocusInput();
                                ret = false;
                                
                                if(that.require_msg.length > 0 && notificado ==  false){
                                    notificado = true;
                                    showAlert(that.require_msg, true);
                                }
	                        }
	                    });

	                }else{
	                    if(that.require.selected == null){
	                        that.require.setErro();
	                        that.require.setFocusInput();
                            ret = false;
                            
                            if(that.require_msg.length > 0){
                                showAlert(that.require_msg, true);
                            }
	                    }
	                }
	            }

	            return ret;

	        },
	        validar:function(){

	            var ret = true;

	            if(this.require != null){
	                if(Array.isArray(this.require)){

	                    this.require.reverse();

	                    angular.forEach(this.require, function(item, key) {
	                        if(item.selected == null){
	                            ret = false;
	                        }
	                    });

	                }else{
	                    if(this.require.selected == null){
	                        ret = false;
	                    }
	                }
	            }

	            return ret;

            },
            clear : function (focus,withoutOnClear) {
                this.apagar(focus,withoutOnClear);
            },
	        apagar : function (focus,withoutOnClear) {

                if ( focus ) {
                    if ( $(this.element_input).is(':focusable') ) {
                        $(this.element_input).focus();
                    }
                }
                
                var target = this.item.dados;
                var selected = this.item.selected;


                for (var k in target){
                    if (target.hasOwnProperty(k)) {

                        delete this[k];
                    }
                }                
                
	            this.item.selected = false;
	            this.item.dados = {};

	            this.tabela.visivel = false;

	            this.btn_apagar_filtro.disabled = true;
	            this.btn_apagar_filtro.visivel  = false;

	            this.btn_filtro.disabled = false;
	            this.btn_filtro.visivel  = true;

	            this.Input.disabled = false;
	            this.Input.readonly = false;
	            this.Input.value = '';

	            this.selected = null;

	            if(withoutOnClear != true && this.onClear != null && this.vinculoEnabled == true){
	                this.onClear();
	            }

	            if(this.vinculoEnabled == true){
		            if(this.actionsClear != null){
		                angular.forEach(this.actionsClear, function(item, key) {
		                    if(item != null){
		                        item();
		                    }
		                });
		            }
		        }

		        if(this.fimClear != null){
			    	this.fimClear(selected);
				}
				
				$(this.element_form_group).removeClass('has-error');
	        },
	        filtrar : function (scroll) {

	            var validar = true;

	            if(this.validarInput != null){
	                validar = this.validarInput();
	            }

	            if(this.validate()){
	                if(validar){
						this.consultar(this,scroll);						                    
	                }
	            }
	        },
	        disable: function(status){
	        	if(status){
//		        	this.vinculoEnabled 			= false;
					this.Input.disabled             = true;
					this.btn_apagar_filtro.visivel  = true;
					this.btn_apagar_filtro.disabled = true;
					this.disabled                   = true;
					this.btn_filtro.visivel         = false;
				}else{

					if(this.item.selected == true){
						this.btn_filtro.visivel         = false;
						this.btn_apagar_filtro.visivel  = true;
						this.Input.disabled             = false;
					}else{
						this.btn_filtro.visivel         = true;
						this.btn_apagar_filtro.visivel  = false;
						this.Input.disabled             = false;

					}

//					this.vinculoEnabled 			= true;
					this.btn_apagar_filtro.disabled = false;
					this.disabled                   = false;

				}
			},
			selecao_multipla: false,
			usuario_vinculado : false,
			onVincularUsuario : function(itens){},
			vincularUsuario : function(){
				var that = this;

				var btn_filtro = $(this.element_input_group).find('.'+this.getClassButton());

				function complete(){
	                if (btn_filtro !== false) {
	                    $(btn_filtro)
	                        .children()
	                        .removeClass('fa-circle-notch');
	                }
				}
				
				$ajax.post(that.option.obj_consulta+'VincularUsuario', [], {progress:false,complete:complete})
					.then(function(response) {

						if(response.length > 0){
							that.usuario_vinculado = true;
							that.setSelected(response[0]);

							if(that.selecao_multipla == true){
								that.apagar();
							}else{
								that.setSelected(response[0]);
							}

							that.btn_apagar_filtro.disabled = true;
                            that.Input.disabled = true;
                            that.btn_filtro.disabled = true;	

						}else{

							that.btn_apagar_filtro.disabled = false;
                            that.Input.disabled = false;
                            that.btn_filtro.disabled = false;

						}	
						
						that.DADOS_ITENS = response;
						that.onVincularUsuario(response);
					},
					function(e){
						showErro('Consulta sem vínculo de usuário!', true);
					}
				);
				
			},
	        setSelected : function(dasos, descricao){

	        	if(dasos != null){
		        	if(Object.keys(dasos).length > 0){

			        	this.selected       = dasos;   
			            this.item.dados     = dasos;
			            this.item.selected  = true;
			            this.selecionado    = true;
			            this.Input.readonly = true;
			            this.Input.readonly = true;

			            this.btn_apagar_filtro.visivel = true;
			            this.btn_apagar_filtro.disabled= false;
			            this.btn_filtro.visivel        = false;

                        if ( this.set_this ) {
                            angular.extend(this, this.selected);
                        }  
                        
                        if ( descricao == true ) {

                            if(this.onSelect != null && this.vinculoEnabled == true){
                                this.onSelect(this.item.dados);
							}
							this.onFindItem();
                        } else {
                            this.Input.value    = descricao;
                        }
                        
			            if(descricao == undefined || true ){
				            var valor = '';

			                angular.forEach(this.option.obj_ret, function(campo, key) {
			                    if(valor == ''){
			                        valor  = dasos[campo];
			                    }else{
			                        valor += ' - ' + dasos[campo];    
			                    }
			                });

			                this.Input.value = valor;
			            } 
                        
                                            
			        }
				}
				
				$(this.element_form_group).removeClass('has-error');
	        },
	        setErro:function(msg){
	            $(this.element_form_group).addClass('has-error');
	        },
	        setAlert:function(msg){
	            $(this.element_form_group).addClass('has-error');
	        },
	        setDefalt:function(){
	            $(this.element_form_group).removeClass('has-error');
	        },
            setRequireRequest : function (data) {
                this.option.require_request = data;
            },            
            setDataRequest : function (data) {
                this.option.data_request = data;
            },            
	        getClassTabela:function(){
	            return this.option.class+'_tabela';
	        },
	        getClassForm:function(){
	            return this.option.class+'_forme';
	        },
	        getClassInput:function(){
	            return this.option.class+'_Input';
	        },
	        getClassButton:function(){
	            return this.option.class+'_button';
            },
	        vinculoEnabled:true,
	        actionsSelct  : [],
	        actionsClear  : [],
	        fimClear      : null,
			onSelect      : null,
			onFindItem    : function(event){
				var that = this;
				findNextField(that.componente,true);
			},
			onMerge       : null,
			onFormatMerge : function(){},
	        onFilter      : null,
	        onClear       : null,
	        require       : null,
	        validarInput  : null,
	        timeFechar    : null,
	        selected      : null,
            focused       : false,
	        item          : {selected: false, dados: {}},   
	        model         : '',
	        componente    : '',
	        dados         : [],
	        tabela:{
	            disabled  : true,
	            visivel   : false,
	            style     : {'max-height':'300px'}    
	        },
	        btn_apagar_filtro: { 
	            disabled  : true,
	            visivel   : false,
	        },
	        btn_filtro: { 
	            disabled  : false,
	            visivel   : true,
	        },
	        Input: {
	            disabled  : false,
	            readonly  : false,
	            focus     : false,
	            value     : ''
            },
            autoload : true,
            cache    : true,
	        option   : {
	            label_descricao   : 'DEFAULT:',
                ttitle            : '',
	            obj_consulta      : 'Ppcp/include/_22030-gp',
	            obj_ret           : ['ID','DESCRICAO'],
	            campos_sql        : ['ID','DESCRICAO'],
	            campos_inputs     : [['_id','ID'],['_descricao','DESCRICAO']],
	            filtro_sql        : [['STATUS','1'],['ORDER','DESCRICAO,ID']],
	            campos_tabela     : [['ID','ID'],['DESCRICAO','DESCRIÇÃO']],
	            tamanho_input     : 'input-medio',
	            tamanho_tabela    : null,
	            required          : true,
	            class             : 'consulta_gp_grup',
	            autofocus         : false,
				selecionado       : false,
				consulta_tipo     : '',
				consulta_pagina   : 0,
				consulta_qtd      : 20,
				infinite_scroll   : false,
				infinite_end 	  : false,
	            paran             : [],
                data_request      : {},
                require_request   : {},
                input_width       : '',
				placeholder       : '',
				width             : 0
	        }
	    };

	    /**
	     * Public method, assigned to prototype
	     */
	    Consulta.prototype = {
	        Consulta: function(data) {
	            if (data) {
	                this.setData(data);
	            }
	        },
	        getNew: function(set_this) {
                
	        	var item = angular.copy(obj_Consulta);
				lista.push(item);
				
				item.consulta_id = 'consulta_'+Math.floor((Math.random() * 9999999) + 1);

	        	item.pageScroll = $(document).scrollTop();
                
                if ( set_this != undefined ) {
                    item.set_this = true;
				}
				
				//item.objeto_principal = item;

	        	return item;
			},
			getConsultasPadrao : function(){

				return [
					{NOME : 'CIDADE'					, CAMPOS : ['ID','DESCRICAO','UF','CODIGOIBGE','CAPITAL','CEP']},
					{NOME : 'CLIENTES'					, CAMPOS : ['ID','CODIGO','RAZAOSOCIAL','NOMEFANTASIA','CNPJ','CNPJ_F','BAIRRO','ENDERECO','INSCRICAO_ESTADUAL','CEP','CIDADE','NUMERO','DESC_ENDERECO','DESC_CIDADE','UF']},
					{NOME : 'REPRESENTANTES'			, CAMPOS : ['CODIGO', 'ID', 'RAZAOSOCIAL', 'NOMEFANTASIA', 'CNPJ', 'CNPJ_F', 'BAIRRO', 'ENDERECO', 'INSCRICAO_ESTADUAL', 'CEP', 'CIDADE', 'NUMERO', 'DESC_ENDERECO', 'DESC_CIDADE', 'UF', 'STATUS', 'REPRESENTANTE_ID', 'VENDEDOR_ID', 'SUPERVISOR_ID', 'DESC_SUPERVISOR']},
					{NOME : 'UF'						, CAMPOS : ['ID','DESCRICAO']},
					{NOME : 'COLABORADOR'				, CAMPOS : ['ID', 'CODIGO', 'DESCRICAO']},
					{NOME : 'TABELA_PRECO'				, CAMPOS : ['ID', 'DESC_ID', 'DESCRICAO','DESC_ESTAB']}
				];
				
			},
            getConsultaPadrao:function(TIPO, componente, descricao){
                var that = this;
				var consulta = that.getNew(true);				

				switch(TIPO) {
					case 'COLABORADOR':
						//Consulta Colaboradores
						consulta.componente                  = '.'+componente;
						consulta.option.class                = componente+'-c';
						//consulta.model                     = '';
						// consulta.option.label_descricao      = 'Colaborador:   <a tabindex="-1" href="'+urlhost+'/_23180" target="_blank" rel="noopener noreferrer"><span class="fas fa-external-link-alt" title="23180 - Cadastro de Colaboradores"></span></a>';
						consulta.option.label_descricao      = 'Colaborador: ';
						consulta.option.tamanho_input        = 'input-maior';
						consulta.option.tamanho_tabela       = '100%';
						consulta.option.infinite_scroll      = true;
						consulta.option.required             = true;
						consulta.autoload                    = false;
						consulta.cache                       = true;
						consulta.option.consulta_tipo	     = 'ATIVO';
						consulta.option.obj_ret              = ['ID','DESCRICAO'];
						consulta.option.campos_tabela        = [['ID','MATRÍCULA'],['DESCRICAO','NOME']];
						consulta.option.filtro_sql           = {STATUS: 1};
					break;

					case 'CLIENTES':
						//Consulta Clientes
						consulta.componente                  = '.'+componente;
						consulta.option.class                = componente+'-c';
						//consulta.model                     = '';
						// consulta.option.label_descricao      = 'Cliente:   <a tabindex="-1" href="'+urlhost+'/_12360" target="_blank" rel="noopener noreferrer"><span class="fas fa-external-link-alt" title="12360 - Cadastro de Clientes"></span></a>';
						consulta.option.label_descricao      = 'Cliente: ';
						consulta.option.tamanho_input        = 'input-maior';
						consulta.option.tamanho_tabela       = '100%';
						consulta.option.infinite_scroll      = true;
						consulta.option.required             = true;
						consulta.autoload                    = false;
						consulta.cache                       = true;
						consulta.option.obj_ret              = ['ID','RAZAOSOCIAL'];
						consulta.option.campos_tabela        = [['ID','ID'],['RAZAOSOCIAL','NOME'],['NOMEFANTASIA','CLIENTE'],['CNPJ_F','CNPJ/CPF'],['UF','UF']];
						consulta.option.filtro_sql           = {STATUS: 1};
					break;


					case 'UF':
						//Consulta UF's
						consulta.componente                  = '.'+componente;
						consulta.option.class                = componente+'-c';
						//consulta.model                     = '';
						consulta.option.label_descricao      = 'UF: ';
						consulta.option.obj_consulta         = '/funcionalidades/consultas/UF';
						consulta.option.tamanho_input        = 'input-maior';
						consulta.option.tamanho_tabela       = '100%';
						consulta.option.infinite_scroll      = true;
						consulta.option.required             = true;
						consulta.autoload                    = false;
						consulta.cache                       = true;
						consulta.option.obj_ret           	 = ['ID','DESCRICAO'];
						consulta.option.campos_tabela     	 = [['ID','UF'],['DESCRICAO','DESCRIÇÃO']];
					break;

					case 'CIDADE':
						//Consulta Cidades
						consulta.componente                  = '.'+componente;
						consulta.option.class                = componente+'-c';
						//consulta.model                     = '';
						// consulta.option.label_descricao      = 'Cidade:  <a tabindex="-1" href="'+urlhost+'/_21120" target="_blank" rel="noopener noreferrer"><span class="fas fa-external-link-alt" title="21120 - Cadastro de Cidades"></span></a>';
						consulta.option.label_descricao      = 'Cidade: ';
						consulta.option.obj_consulta         = '/funcionalidades/consultas/Cidade';
						consulta.option.tamanho_input        = 'input-maior';
						consulta.option.tamanho_tabela       = '100%';
						consulta.option.infinite_scroll      = true;
						consulta.option.required             = true;
						consulta.autoload                    = false;
						consulta.cache                       = true;
						consulta.option.obj_ret              = ['ID','DESCRICAO'];
						consulta.option.campos_tabela        = [['ID','ID'],['DESCRICAO','DESCRIÇÃO']];
						consulta.option.filtro_sql           = {STATUS: 1};
					break;

					case 'REPRESENTANTES':
						//Consulta Representantes
						consulta.componente                  = '.'+componente;
						consulta.option.class                = componente+'-c';
						//consulta.model                     = '';
						// consulta.option.label_descricao      = 'Representante:   <a tabindex="-1" href="'+urlhost+'/_12350" target="_blank" rel="noopener noreferrer"><span class="fas fa-external-link-alt" title="12350 - Cadastro de Representantes"></span></a>';
						consulta.option.label_descricao      = 'Representante:';
						consulta.option.obj_consulta         = '/funcionalidades/consultas/Representantes';
						consulta.option.tamanho_input        = 'input-maior';
						consulta.option.tamanho_tabela       = '100%';
						consulta.option.infinite_scroll      = true;
						consulta.option.required             = true;
						consulta.autoload                    = false;
						consulta.cache                       = true;
						consulta.option.obj_ret              = ['ID','RAZAOSOCIAL'];
						consulta.option.campos_tabela        = [['ID','ID'],['RAZAOSOCIAL','NOME'],['NOMEFANTASIA','NOME FANTASIA'],['CNPJ_F','CNPJ/CPF'],['UF','UF']];
						consulta.option.filtro_sql           = {STATUS: 1};
					break;

					case 'TABELA_PRECO':
						//Consulta Tabela de Preço
						consulta.componente                  = '.'+componente;
						consulta.option.class                = componente+'-c';
						//consulta.model                     = '';
						consulta.option.label_descricao      = 'Tabela de Preço: ';
						consulta.option.obj_consulta         = '/funcionalidades/consultas/TabelaPreco';
						consulta.option.tamanho_input        = 'input-medio';
						consulta.option.tamanho_tabela       = '100%';
						consulta.option.infinite_scroll      = true;
						consulta.option.required             = true;
						consulta.autoload                    = false;
						consulta.cache                       = false;
						consulta.option.obj_ret              = ['DESC_ID','DESCRICAO'];
						consulta.option.campos_tabela        = [['DESC_ID','ID'],['DESCRICAO','DESCRICAO'], ['DESC_ESTAB','ESTABELECIMENTO']];

					case '':

						break;

					default:
					  // code block
				}

				var valido = false;
				var list   = that.getConsultasPadrao();

				angular.forEach(list,  function(item , key){
					if(TIPO == item.NOME){
						valido = true;
					}
				});

				if(!valido){
					showErro('Consulta "'+TIPO+'" não foi definida, defina em "getConsultasPadrao"' + (typeof descricao != 'undefined' ? ', Campo: '+descricao : '.'), true);
				}

                return consulta;
            },
            component : function(componente,set_this){
                
                set_this = set_this != undefined ? set_this : true;
                
                if ( componente == undefined || typeof componente != 'string' || !(componente.length > 0) ) {
                    showErro('Seu objeto de consulta esta configurado incorretamente.', true);
                    return false;
                }
                
                var ret = this.getNew(set_this);
                
                ret.componente = componente;
                
                return ret;
            },
	        clearHistory:function(url){
                window.history.replaceState('', '', encodeURI(urlhost + url));
	        },
	        postHistory:function(obj,url){
	        	var paran = {
                    CONSULTA : []
                };

                angular.forEach(lista, function(item, key) {
	                paran.CONSULTA.push(item.item);
	            });

                paran.CONSULTA.push(obj);

                window.history.replaceState('', '', encodeURI(urlhost + url + '?' + JSON.stringify(paran)));
	        },
	        getHistory:function(){
	        	var ret =[];

	        	try {

	                var search = location.search.substring(1);
	                search = decodeURI(search);
	                search = JSON.parse(search);

	                if(!(typeof search.CONSULTA == 'undefined')){
	                    ret = search.CONSULTA[search.CONSULTA.length - 1];

	                    angular.forEach(lista, function(item, key) {
			                item.item = search.CONSULTA[key];

			                if(item.item.selected){
				                
					            item.btn_apagar_filtro.disabled = false;
					            item.btn_apagar_filtro.visivel  = true;
					            item.btn_filtro.disabled = true;
					            item.btn_filtro.visivel  = false;
					            item.Input.readonly = true;
					            item.selected = item.item.dados;

					            var valor = '';
					            angular.forEach(item.option.obj_ret, function(campo, key) {
				                    if(valor == ''){
				                        valor  = item.item.dados[campo];
				                    }else{
				                        valor += ' - ' + item.item.dados[campo];    
				                    }
				                });

				                item.Input.value = valor;
					        }
			            });
	                }   

	            } catch(err) {}

	            return ret;
	        }
	    }

	    /**
	     * Return the constructor function
	     */
	    return Consulta;
	};

})(window, window.angular);