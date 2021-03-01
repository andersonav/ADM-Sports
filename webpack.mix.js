let mix = require('laravel-mix');

let cssPathPublic = 'public/assets/css';
let jsPathPublic = 'public/assets/js';

let libPath = 'resources/assets/js/lib';

mix.js([
   libPath + '/angular.min.js',
   libPath + '/numeral.min.js'
], jsPathPublic + '/vendors.js');

mix.postCss('resources/assets/sass/main/styles.css', cssPathPublic + '/main/main.css').options({
   processCssUrls: false
});

mix.js(
   [
      libPath + '/modules.js',
      'resources/assets/js/admin/app.js',
      libPath + '/componentes/Consulta.js'
   ], jsPathPublic + '/master.js')
   .sass('resources/assets/sass/admin/app.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/DashboardController.js',
      'resources/assets/js/admin/_adm.factory.Dashboard.js'
   ], jsPathPublic + '/dashboard.js')
   .sass('resources/assets/sass/admin/dashboard.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/ClientesController.js',
      'resources/assets/js/admin/_adm.factory.Clientes.js'
   ], jsPathPublic + '/clientes.js')
   .sass('resources/assets/sass/admin/clientes.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/TiposDocumentoController.js',
      'resources/assets/js/admin/_adm.factory.TiposDocumento.js'
   ], jsPathPublic + '/tiposDocumento.js')
   .sass('resources/assets/sass/admin/tiposDocumento.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/TiposModuloContaController.js',
      'resources/assets/js/admin/_adm.factory.TiposModuloConta.js'
   ], jsPathPublic + '/tiposModuloConta.js')
   .sass('resources/assets/sass/admin/tiposModuloConta.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/TiposModuloContaItensController.js',
      'resources/assets/js/admin/_adm.factory.TiposModuloContaItens.js'
   ], jsPathPublic + '/tiposModuloContaItens.js')
   .sass('resources/assets/sass/admin/tiposModuloContaItens.scss', cssPathPublic);


if (mix.inProduction()) {
   mix.version();
}