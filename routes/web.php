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


Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');


Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {

    Route::group(['prefix' => 'cadastros'], function () {

        Route::group(['prefix' => 'clientes'], function () {
            Route::get('/', 'ClienteController@index')->name('clientes');
            Route::any('/get', 'ClienteController@clientes')->name('getClientes');
            Route::post('/post', 'ClienteController@postCliente')->name('post-cliente');
            Route::post('/delete', 'ClienteController@postClienteDelete')->name('delete-cliente');
        });
        
        Route::group(['prefix' => 'tipos-documento'], function () {
            Route::get('/', 'TiposDocumentoController@index')->name('tiposDocumento');
            Route::any('/get', 'TiposDocumentoController@tiposDocumento')->name('getTiposDocumento');
            Route::post('/post', 'TiposDocumentoController@postTiposDocumento')->name('post-tipos-documento');
            Route::post('/delete', 'TiposDocumentoController@postTipoDocumentoDelete')->name('delete-tipo-documento');
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
                Route::post('/delete', 'TiposModuloContaItensController@postTipoModuloContaItemDelete')->name('delete-tipo-modulo-conta-item');
            });

            
        });

    });
});
