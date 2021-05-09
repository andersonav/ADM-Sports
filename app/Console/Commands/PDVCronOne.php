<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Request;
use App\Http\Controllers\SincronizacaoController;
use Illuminate\Support\Facades\DB;

class PDVCronOne extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pdvone:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executa Sincronização Automática de PDV 1X ao Dia';

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

            $ctrlSincronizacao->condicaoPagamento();

            // DB::beginTransaction();
           
        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }

        try {    

            $ctrlSincronizacao->formaPagamento();
           
            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }

        try {    

            $ctrlSincronizacao->representante();

            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
        
        try {    

            $ctrlSincronizacao->tabelaPreco();

            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }

        try {    

            $ctrlSincronizacao->vendedor();

            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
        
        try {    

            $ctrlSincronizacao->colaborador();

            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
       
        try {    

            $ctrlSincronizacao->ibpt();

            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
        
        try {    

            $ctrlSincronizacao->usuario();

            // DB::beginTransaction();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
       
        try {    

            $ctrlSincronizacao->operador();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }

        try {    

            $ctrlSincronizacao->movimento();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
    }
}
