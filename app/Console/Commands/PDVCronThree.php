<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Request;
use App\Http\Controllers\SincronizacaoController;
use Illuminate\Support\Facades\DB;

class PDVCronThree extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pdvthree:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executa Sincronização Automática de PDV 10min';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $request = new Request();
        
        $ctrlSincronizacao = new SincronizacaoController($request);

        try {    

            $ctrlSincronizacao->cliente();

            // DB::beginTransaction();
           
        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
       
        try {    

            $ctrlSincronizacao->pedido();

            // DB::beginTransaction();
           
        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
       
        try {    

            $ctrlSincronizacao->devolucao();

            // DB::beginTransaction();
           
        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
        
        // try {    

        //     $ctrlSincronizacao->movimento();

        //     // DB::beginTransaction();
           
        // } catch (\ValidationException $e1) {

        // } catch (\Throwable $th) {

        // }
        
        // try {    

        //     $ctrlSincronizacao->postSetDownloadConferencia();

        //     // DB::beginTransaction();
           
        // } catch (\ValidationException $e1) {

        // } catch (\Throwable $th) {

        // }
        
        try {    

            $ctrlSincronizacao->postSincronizarTudo();

            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
        
        try {    

            $ctrlSincronizacao->postSincronizarCancelamentoAndResFiscal();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
    }
}
