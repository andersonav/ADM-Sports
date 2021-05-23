let mix = require('laravel-mix');

let cssPathPublic = 'public/assets/css';
let jsPathPublic = 'public/assets/js';

let libPath = 'resources/assets/js/lib';

mix.js([
   libPath + '/angular.min.js'
], jsPathPublic + '/vendors.js');

mix.postCss('resources/assets/sass/main/styles.css', cssPathPublic + '/main/main.css').options({
   processCssUrls: false
});

mix.js(
   [
      libPath + '/modules.js',
      'resources/assets/js/admin/app.js',
      libPath + '/componentes/Consulta.js',
      libPath + '/componentes/Confirmacao.js',
      libPath + '/componentes/Devices.js'
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
      'resources/assets/js/admin/AlunosController.js',
      'resources/assets/js/admin/_adm.factory.Alunos.js'
   ], jsPathPublic + '/alunos.js')
   .sass('resources/assets/sass/admin/alunos.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/TiposDocumentoController.js',
      'resources/assets/js/admin/_adm.factory.TiposDocumento.js'
   ], jsPathPublic + '/tiposDocumento.js')
   .sass('resources/assets/sass/admin/tiposDocumento.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/ContasBancariasController.js',
      'resources/assets/js/admin/_adm.factory.ContasBancarias.js'
   ], jsPathPublic + '/contasBancarias.js')
   .sass('resources/assets/sass/admin/contasBancarias.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/ModuloContaController.js',
      'resources/assets/js/admin/_adm.factory.ModuloConta.js',
      'resources/assets/js/admin/_adm.factory.ModuloContaItens.js'
   ], jsPathPublic + '/tiposModuloConta.js')
   .sass('resources/assets/sass/admin/tiposModuloConta.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/ModuloContaItemController.js',
      'resources/assets/js/admin/_adm.factory.ModuloContaItem.js'
   ], jsPathPublic + '/moduloConta.js')
   .sass('resources/assets/sass/admin/moduloConta.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/PerfilController.js',
      'resources/assets/js/admin/_adm.factory.Perfil.js'
   ], jsPathPublic + '/perfil.js')
   .sass('resources/assets/sass/admin/perfil.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/MetaController.js',
      'resources/assets/js/admin/_adm.factory.Meta.js'
   ], jsPathPublic + '/meta.js')
   .sass('resources/assets/sass/admin/meta.scss', cssPathPublic);


mix.js(
   [
      'resources/assets/js/admin/LancamentosController.js',
      'resources/assets/js/admin/_adm.factory.Lancamentos.js',
      'resources/assets/js/admin/_adm.factory.LancamentoItens.js',
      'resources/assets/js/admin/_adm.factory.LancamentoAlunos.js',
      'resources/assets/js/admin/_adm.factory.LancamentoClientes.js'
   ], jsPathPublic + '/lancamentos.js')
   .sass('resources/assets/sass/admin/lancamentos.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/FluxoCaixaDiarioController.js',
      'resources/assets/js/admin/_adm.factory.FluxoCaixaDiario.js'
   ], jsPathPublic + '/fluxoCaixaDiario.js')
   .sass('resources/assets/sass/admin/fluxoCaixaDiario.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/CapitalGiroController.js',
      'resources/assets/js/admin/_adm.factory.CapitalGiro.js'
   ], jsPathPublic + '/capitalGiro.js')
   .sass('resources/assets/sass/admin/capitalGiro.scss', cssPathPublic);

mix.js(
   [
      'resources/assets/js/admin/FluxoCaixaMensalController.js',
      'resources/assets/js/admin/_adm.factory.FluxoCaixaMensal.js'
   ], jsPathPublic + '/fluxoCaixaMensal.js')
   .sass('resources/assets/sass/admin/fluxoCaixaMensal.scss', cssPathPublic);



if (mix.inProduction()) {
   mix.version();
}