<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Request;
use App\Http\Controllers\SincronizacaoController;
use Illuminate\Support\Facades\DB;

class PDVCronTwo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pdvtwo:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executa Sincronização Automática de PDV 2X ao Dia';

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

            $ctrlSincronizacao->produto();

        } catch (\ValidationException $e1) {

        } catch (\Throwable $th) {

        }
    }
}
