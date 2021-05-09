(function(window, angular) {
    'use strict';

	angular
        .module('app').factory('Confirmacao' , Confirmacao );
	
	Confirmacao.$inject = [
		'$rootScope',
		'$parse',
		'$q',
        '$compile',
		'$ajax',		
		'$timeout',
        '$sce',
        'gScope'
    ];

	function Confirmacao($rootScope, $parse, $q, $compile, $ajax, $timeout, $sce, gScope) {

        // Private variables.
        var obj      = null;
        
	    /**
	     * Constructor, with class name
	     */
		
		 function Confirmacao() {
            
            obj = this; 

            /**
			* Um input disfarçado de select - Souza, Anderson
			*/
            
            obj.getNew = getNew;
            obj.default = {
                ID               : '',
                confirmacao_id   : '',
                componente       : '',
                model            : '',
                titulo           : '',
                lista            : [],
                agendada_Confirmacao: function(){},
                alto_fechar      : false,
                obtn_sim         : {desc:'Sim'       ,class:'btn-primary' ,ret:'1' ,hotkey:'enter' ,glyphicon:'class-btn1 fa-ok'           },
                obtn_ok          : {desc:'Confirmar' ,class:'btn-primary' ,ret:'1' ,hotkey:'enter' ,glyphicon:'class-btn2 fa-ok'           },
                obtn_nao         : {desc:'Não'       ,class:'btn-danger ' ,ret:'2' ,hotkey:'esc'   ,glyphicon:'class-btn3 fa-ban-circle'   },
                obtn_cancelar    : {desc:'Cancelar'  ,class:'btn-danger ' ,ret:'2' ,hotkey:'esc'   ,glyphicon:'class-btn4 fa-ban-circle'   },
                obtn_voltar      : {desc:'Voltar'    ,class:'btn-default' ,ret:'2' ,hotkey:'esc'   ,glyphicon:'class-btn5 fa-chevron-left' },
                Confirmacao : function(dados, elem, classe){
                    
                    classe = typeof classe == 'undefined' ? '' : classe;

                    var popup = `
                    <div class="modal in confirm" role="dialog" data-backdrop="static" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-small" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">`+dados.titulo+`</h5>
                                </div>
                                <div class="modal-body confirme-body">
                                    ` + dados.inter + `
                                </div>
                                <div class="modal-footer confirme-footer">
                                    `+dados.botao+`
                                </div>
                            </div>
                        </div>
                    </div>`;
                    
                    $('#layoutSidenav_content').first().append('<div id="'+dados.id+'"></div>');
                    
                    
                    return popup;
                },
                getbutom : function(btn, key, model){

                    var ret = `
                        <button ng-if="`+model+`.botao[`+key+`].aguardar == false || `+model+`.botao[`+key+`].TEMPO_AGUARDAR <= 0" class="btn ` + btn.class + `" type="button" 
                            data-hotkey="` + btn.hotkey + `" ng-click="`+model+`.botao[`+key+`].executar($event, `+model+`.botao[`+key+`]);">
                            ` + btn.desc + `
                            <span class="badge badge-counter text-uppercase">` + btn.hotkey + `</span>
                        </button>`;

                    return ret;
                },
                closeAll : function(){
                    var that = this;

                    angular.forEach(that.lista,function(item , key){
                        $('#'+item.id).remove();
                    });

                },
                add : function(tipo, titulo, pergunta, botao, func, fechar, classe){
                    var that = this;

                    classe   = typeof classe   == 'undefined' ? ''    : classe;

                    var model = that.model+'.lista['+that.lista.length+']';

                    pergunta = (pergunta + '').replaceAll('#MODEL#', model);

                    var obj_Confirmacao = {
                        id          : that.lista.length+'_'+Math.floor((Math.random() * 999999) + 1),
                        tipo        : tipo,
                        titulo      : titulo,
                        pergunta    : pergunta,
                        botao       : botao,
                        func        : func,
                        alto_fechar : fechar == 'N' ? false : true,
                        model       : model,
                        html        : '',
                        botoes      : '',
                        CSS_TITULO  : '',
                        cancelar    : function(e){
                            var that = this;
                            if(that.alto_fechar){ $('#'+that.id).remove(); that = {};}
                            if(e.isTrigger > 0 ){ $(".stop_propag_esc").val('true'); }
                        },
                        fechar     : function(e){
                            var that = this;
                            $('#'+that.id).remove();
                            that = {};
                        },
                        hide  : function(e){
                            var that = this;
                            $('#'+that.id).css('display', 'none');
                        },
                        show  : function(e){
                            var that = this;
                            $('#'+that.id).css('display', 'block');
                        }
                    };

                    that.lista.push(obj_Confirmacao);

                    obj_Confirmacao.botoes = '';
                    obj_Confirmacao.botao.reverse();
                    obj_Confirmacao.func.reverse();

                    for (var i = 0; i < obj_Confirmacao.botao.length; i++) { 

                        obj_Confirmacao.botao[i] = angular.copy(obj_Confirmacao.botao[i]);

                        var num = obj_Confirmacao.botao[i];

                        var cod = that.getbutom(num, i, obj_Confirmacao.model);
                        obj_Confirmacao.botoes = obj_Confirmacao.botoes + cod;

                        num.click    = obj_Confirmacao.func[i];
                        num.pai      = obj_Confirmacao;
                        num.executar = function(e, btn){

                            $(e.target).focus();

                            that.Time1 = $timeout(function(){
                                try {
                                
                                    btn.click(e, btn);

                                    if(btn.pai.alto_fechar){
                                        $('#'+btn.pai.id).remove();
                                        btn.pai = {};
                                    }

                                    if(e.isTrigger > 0){
                                        $(".stop_propag_esc").val('true');	
                                    }

                                }catch(err) {
                                    showErro(err.message);
                                }

                                $timeout.cancel(that.Time1);
                            });
                        }

                        num.aguardar = typeof num.aguardar == 'undefined' ? false : num.aguardar;
                        
                        num.timeAguardar = function(){
                            var that = this;

                            that.TEMPO_AGUARDAR = that.TEMPO_AGUARDAR - 1;

                            $timeout(function(){
                                if(that.TEMPO_AGUARDAR > 0){
                                    that.timeAguardar();
                                }
                            }, 1000);
                        };

                        if(num.aguardar){
                            num.timeAguardar();
                        }
                    }

                    obj_Confirmacao.html = that.Confirmacao({
                        titulo: titulo,
                        inter : pergunta,
                        botao : obj_Confirmacao.botoes,
                        id    : obj_Confirmacao.id
                    }, obj_Confirmacao, classe);

                    var corpo  = $('#' + obj_Confirmacao.id);
                    var scope = corpo.scope(); 
					corpo.html(obj_Confirmacao.html);
                    //$compile(corpo.contents())(scope);
                    
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

                    that.compiledElement = $compile(corpo.contents())(childScope);
                    childScope.$on("$destroy", function() {
                        that.compiledElement.remove();
                    });

                    $('.modal.in.confirm').modal({backdrop: 'static', keyboard: false});

                    $timeout(function (){
                        $('.modal.in.confirm').first().focus();
                    }, 200);

                    return obj_Confirmacao;

                },
                key_object_scop : -1,
                compile: function(){
                    var that = this;
                    var html = that.getHtml();
                    var obj  = $(that.componente);
                    var scope = obj.scope(); 
					obj.html(html);
                    //$compile(obj.contents())(scope);
                    
                    if (that.childScope) {
                        that.childScope.$destroy();
                        that.childScope = undefined;
                    }
            
                    that.childScope = scope.$new();
                    that.compiledElement = $compile(obj.contents())(that.childScope);
                    that.childScope.$on("$destroy", function() {
                        that.compiledElement.remove();
                    });
				}
            };
        }

        function getNew(model){
            var that      = this;
            var Confirmacao  = angular.copy(that.default);

            Confirmacao.Confirmacao_id = 'input_'+Math.floor((Math.random() * 999999) + 1);
            Confirmacao.model = model;

            return Confirmacao;
        }

        return Confirmacao;
        
	};

})(window, window.angular);