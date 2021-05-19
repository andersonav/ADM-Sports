<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countAlunos  = Aluno::count();
        $countClientes  = Cliente::count();


        return view('home', compact('countAlunos', 'countClientes'));
    }

    public function getLastMovimentacoes(Request $request){

        $param      = (object) $request->DADOS;

        $ret = (object) [];

        $sqlContasReceberPagar = "SELECT 
                                    T.OPERACAO,
                                    COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM TBLANCAMENTO X INNER JOIN TBMODULO_CONTA_TIPO MCT ON MCT.ID = X.MODULO_CONTA_TIPO_ID WHERE MCT.OPERACAO = T.OPERACAO AND X.DATA BETWEEN '2021-05-01' AND '2021-05-30'), 0) AS VALOR 
                                    
                                FROM TBMODULO_CONTA_TIPO T";

        $sqlMovimentacoes = "SELECT 
                    GROUP_CONCAT(DISTINCT T.DESCRICAO ORDER BY T.ID ASC) AS LABEL,
                    
                    GROUP_CONCAT(COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM TBLANCAMENTO X WHERE X.MODULO_CONTA_TIPO_ID = T.ID AND X.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL ORDER BY X.MODULO_CONTA_TIPO_ID ASC), 0)) AS VALOR 
                    
                FROM TBMODULO_CONTA_TIPO T";
        
        $sqlSaldos = "SELECT 
                    GROUP_CONCAT(DISTINCT T.DESCRICAO ORDER BY T.ID ASC) AS LABEL,
                    
                    GROUP_CONCAT(COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM TBLANCAMENTO X WHERE X.TIPO_DOCUMENTO_ID = T.ID AND X.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL), 0)) AS VALOR 
                    
                FROM TBTIPO_DOCUMENTO T";
        
        $sqlContas = "SELECT 
                    GROUP_CONCAT(DISTINCT T.DESCRICAO ORDER BY T.ID ASC) AS LABEL,
                    
                    GROUP_CONCAT(COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM TBLANCAMENTO X WHERE X.CONTA_BANCARIA_ID = T.ID AND X.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL), 0)) AS VALOR 
                    
                FROM TBCONTA_BANCARIA T";
        
        $sqlAlunos = "SELECT DISTINCT
        SUM(COALESCE(A.ID, 0)) AS QTD_MATRICULAS
    FROM TBLANCAMENTO_ITEM T
    INNER JOIN TBLANCAMENTO L ON L.ID = T.LANCAMENTO_ID
    INNER JOIN TBALUNO A ON A.ID = T.ALUNO_ID
    WHERE 
        (EXTRACT(MONTH FROM L.DATA) = MONTH(CURDATE()) AND EXTRACT(YEAR FROM L.DATA) = YEAR(CURDATE()))
    OR
        (EXTRACT(MONTH FROM DATE_SUB(L.DATA, INTERVAL 1 MONTH)) = EXTRACT(MONTH FROM DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND EXTRACT(YEAR FROM L.DATA) = YEAR(CURDATE()))";
        

        $args = [
            'DATA_INICIAL'      => $param->DATA_INICIAL,
            'DATA_FINAL'        => $param->DATA_FINAL
        ];

        $ret->CONTAS_DESPESAS   = DB::select($sqlContasReceberPagar, $args);
        $ret->MOVIMENTACOES     = DB::select($sqlMovimentacoes, $args);
        $ret->SALDOS            = DB::select($sqlSaldos, $args);
        $ret->CONTAS            = DB::select($sqlContas, $args);
        $ret->ALUNOS            = [];


        return response()->json($ret);
    }

}
