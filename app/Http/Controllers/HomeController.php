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
                                    COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM tblancamento X INNER JOIN tbmodulo_conta_tipo MCT ON MCT.ID = X.MODULO_CONTA_TIPO_ID WHERE MCT.OPERACAO = T.OPERACAO AND X.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL), 0) AS VALOR 
                                    
                                FROM tbmodulo_conta_tipo T";

        $sqlMovimentacoes = "SELECT 
                    GROUP_CONCAT(DISTINCT T.DESCRICAO ORDER BY T.ID ASC) AS LABEL,
                    
                    GROUP_CONCAT(COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM tblancamento X WHERE X.MODULO_CONTA_TIPO_ID = T.ID AND X.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL ORDER BY X.MODULO_CONTA_TIPO_ID ASC), 0)) AS VALOR 
                    
                FROM tbmodulo_conta_tipo T";
        
        $sqlSaldos = "SELECT 
                    GROUP_CONCAT(DISTINCT T.DESCRICAO) AS LABEL,
                    
                    GROUP_CONCAT(COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM tblancamento X WHERE X.TIPO_DOCUMENTO_ID = T.ID AND X.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL ORDER BY X.TIPO_DOCUMENTO_ID ASC), 0)) AS VALOR 
                    
                FROM tbtipo_documento T
                ORDER BY T.ID ASC";
        
        $sqlContas = "SELECT 
                    GROUP_CONCAT(DISTINCT CONCAT(T.CONTA, ' - ', T.DESCRICAO) ORDER BY T.ID ASC) AS LABEL,
                    
                    GROUP_CONCAT(COALESCE((SELECT SUM(X.VALOR_TOTAL) FROM tblancamento X WHERE X.CONTA_BANCARIA_ID = T.ID AND X.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL ORDER BY X.CONTA_BANCARIA_ID ASC), 0)) AS VALOR 
                    
                FROM tbconta_bancaria T
                ORDER BY T.ID ASC";
        
        $sqlAlunosMatriculas = "SELECT DISTINCT
                        COUNT(A.ID) AS QTD_MATRICULAS
                    FROM tblancamento_item T
                    INNER JOIN tblancamento L ON L.ID = T.LANCAMENTO_ID
                    INNER JOIN tbaluno A ON A.ID = T.ALUNO_ID
                    WHERE L.DATA BETWEEN :DATA_INICIAL AND :DATA_FINAL";
        
        $sqlAlunosDesistentes = "SELECT 
                                    COUNT(T.ID) AS QTD_DESISTENTES
                                FROM tbaluno T
                                LEFT JOIN tblancamento_item LI ON LI.ALUNO_ID = T.ID
                                LEFT JOIN tblancamento L ON L.ID = LI.LANCAMENTO_ID
                        WHERE 
                            L.DATA NOT BETWEEN :DATA_INICIAL AND :DATA_FINAL
                        OR (LI.ID IS NULL)";
        
        $args = [
            'DATA_INICIAL'      => $param->DATA_INICIAL,
            'DATA_FINAL'        => $param->DATA_FINAL
        ];

        $ret->CONTAS_DESPESAS       = DB::select($sqlContasReceberPagar, $args);
        $ret->MOVIMENTACOES         = DB::select($sqlMovimentacoes, $args);
        $ret->SALDOS                = DB::select($sqlSaldos, $args);
        $ret->CONTAS                = DB::select($sqlContas, $args);
        $ret->ALUNOS_MATRICULADOS   = DB::select($sqlAlunosMatriculas, $args);
        $ret->ALUNOS_DESISTENTES    = DB::select($sqlAlunosDesistentes, $args);


        return response()->json($ret);
    }

}
