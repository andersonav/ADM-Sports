<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/home');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');


Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {

    Route::group(['prefix' => 'funcionalidades'], function () {

        Route::group(['prefix' => 'consultas'], function () {
            Route::post('/Perfil', 'ConsultasController@Perfil')->name('perfil');
            Route::post('/TipoDocumento', 'ConsultasController@TipoDocumento')->name('tipoDocumento');
            Route::post('/ModuloContaItem', 'ConsultasController@ModuloContaItem')->name('moduloContaItem');
            Route::post('/ModuloConta', 'ConsultasController@ModuloConta')->name('moduloConta');
            Route::post('/ContaBancaria', 'ConsultasController@ContaBancaria')->name('contaBancaria');
        });
       
        Route::group(['prefix' => 'clientes'], function () {
            Route::get('/', 'ClienteController@index')->name('clientes');
            Route::any('/get', 'ClienteController@clientes')->name('getClientes');
            Route::post('/post', 'ClienteController@postCliente')->name('post-cliente');
            Route::post('/delete', 'ClienteController@postClienteDelete')->name('delete-cliente');
        });
       
        Route::group(['prefix' => 'alunos'], function () {
            Route::get('/', 'AlunoController@index')->name('alunos');
            Route::any('/get', 'AlunoController@alunos')->name('getAlunos');
            Route::post('/post', 'AlunoController@postAluno')->name('post-aluno');
            Route::post('/delete', 'AlunoController@postAlunoDelete')->name('delete-aluno');
        });

        Route::group(['prefix' => 'tipos-documento'], function () {
            Route::get('/', 'TiposDocumentoController@index')->name('tiposDocumento');
            Route::any('/get', 'TiposDocumentoController@tiposDocumento')->name('getTiposDocumento');
            Route::post('/post', 'TiposDocumentoController@postTiposDocumento')->name('post-tipos-documento');
            Route::post('/delete', 'TiposDocumentoController@postTiposDocumentoDelete')->name('delete-tipos-documento');
        });
        
        Route::group(['prefix' => 'contas-bancarias'], function () {
            Route::get('/', 'ContasBancariasController@index')->name('contasBancarias');
            Route::any('/get', 'ContasBancariasController@contasBancarias')->name('getContasBancarias');
            Route::post('/post', 'ContasBancariasController@postContasBancarias')->name('post-contas-bancarias');
            Route::post('/delete', 'ContasBancariasController@postContasBancariasDelete')->name('delete-contas-bancarias');
        });

        Route::group(['prefix' => 'modulos-conta'], function () {

            Route::group(['prefix' => 'tipos'], function () {
                Route::get('/', 'TiposModuloContaController@index')->name('tiposModuloConta');
                Route::any('/get', 'TiposModuloContaController@tiposModuloConta')->name('getTiposModuloConta');
                Route::post('/post', 'TiposModuloContaController@postTiposModuloConta')->name('post-tipos-modulo-conta');
                Route::post('/delete', 'TiposModuloContaController@postTipoModuloContaDelete')->name('delete-tipo-modulo-conta');
            });

            Route::group(['prefix' => 'itens'], function () {
                Route::get('/', 'TiposModuloContaItensController@index')->name('tiposModuloContaItens');
                Route::any('/get', 'TiposModuloContaItensController@tiposModuloContaItens')->name('getTiposModuloContaItens');
                Route::post('/post', 'TiposModuloContaItensController@postTiposModuloContaItens')->name('post-tipos-modulo-conta-item');
                Route::post('/delete', 'TiposModuloContaItensController@postTiposModuloContaItensDelete')->name('delete-tipo-modulo-conta-item');
            });
            
            Route::group(['prefix' => 'contas'], function () {
                Route::get('/', 'ModuloContaController@index')->name('moduloConta');
                Route::any('/get', 'ModuloContaController@getModuloConta')->name('getModuloConta');
                Route::post('/post', 'ModuloContaController@postModuloConta')->name('post-modulo-conta');
                Route::post('/delete', 'ModuloContaController@postModuloContaDelete')->name('delete-modulo-conta');
            });
            
            Route::group(['prefix' => 'perfis'], function () {
                Route::get('/', 'PerfilController@index')->name('perfis');
                Route::any('/get', 'PerfilController@getPerfil')->name('getPerfil');
                Route::post('/post', 'PerfilController@postPerfil')->name('post-perfil');
                Route::post('/delete', 'PerfilController@postPerfilDelete')->name('delete-perfil');
            });
        });

        Route::group(['prefix' => 'lancamentos'], function () {
            Route::get('/', 'LancamentosController@index')->name('lancamentos');
            Route::any('/get', 'LancamentosController@lancamentos')->name('getLancamentos');
            Route::post('/post', 'LancamentosController@postLancamentos')->name('post-lancamentos');
            Route::post('/delete', 'LancamentosController@postLancamentosDelete')->name('delete-lancamentos');
        });
        
        Route::group(['prefix' => 'lancamento-itens'], function () {
            Route::any('/get', 'LancamentosController@getLancamentoItens')->name('getLancamentoItens');
        });
    });

});
