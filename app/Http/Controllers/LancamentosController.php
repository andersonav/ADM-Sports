<?php

namespace App\Http\Controllers;

use App\Models\Lancamento;
use App\Models\LancamentoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LancamentosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('lancamentos');
    }

    public function lancamentos(Request $request)
    {
        $lancamentos = $this->getLancamentos(0);
        
        return response()->json($lancamentos);
    }
   
    public function getLancamentoItens(Request $request)
    {

        $dados = (object) $request->DADOS;

        $sql = "SELECT 
                T.LANC_ID,
                T.ALUNO_ID,
                T.CLIENTE_ID,
                T.NOME,
                LPAD(T.ID, 4, '0') AS DESC_LANC_ID
            FROM tblancamento_item T
            WHERE T.ID > 0
            AND T.LANCAMENTO_ID = :LANCAMENTO_ID";

        $args = [
            'LANCAMENTO_ID' => $dados->LANCAMENTO_ID
        ];

        $lancamentos = DB::select($sql, $args);

        return response()->json($lancamentos);
    }

    public function postLancamentos(Request $request)
    {
        $dados = (object) $request->DADOS;

        $lancamento = [];

        $arr = [
            'DESCRICAO'                 => $dados->DESCRICAO,
            'VALOR_TOTAL'               => $dados->VALOR_TOTAL,
            'DATA'                      => $dados->FDATA,
            'DATA_VENCIMENTO'           => $dados->FDATA_VENCIMENTO,
            'DATA_RECEBIMENTO'          => $dados->FDATA_RECEB_PAG,
            'STATUS'                    => $dados->STATUS,
            'TIPO'                      => $dados->TIPO,
            'PERFIL_ID'                 => $dados->PERFIL_ID,
            'CONTA_BANCARIA_ID'         => $dados->CONTA_BANCARIA_ID,
            'MODULO_CONTA_ITEM_ID'      => $dados->MODULO_CONTA_ITEM_ID,
            'MODULO_CONTA_TIPO_ID'      => $dados->MODULO_CONTA_TIPO_ID,
            'TIPO_DOCUMENTO_ID'         => $dados->TIPO_DOCUMENTO_ID
        ];

        $id = 0;

        if(isset($dados->ID) && $dados->ID > 0){
            $update = Lancamento::where('ID', $dados->ID)->update($arr);
            $id = $dados->ID;
        }else{
            $lancamento = Lancamento::create($arr);
            $id = $lancamento['ID'];
        }

        if(count($dados->GRAVAR_ITENS) > 0){

            foreach($dados->GRAVAR_ITENS as $item){

                $arrItens = [
                    'LANCAMENTO_ID'         => $id,
                    'ALUNO_ID'              => isset($item->ALUNO_ID) ? $item->ALUNO_ID : 0,
                    'CLIENTE_ID'            => isset($item->CLIENTE_ID) ? $item->CLIENTE_ID : 0,
                    'NOME'                  => $item->NOME,
                    'VALOR'                 => $item->VALOR
                ];
        
                if(isset($item->LANC_ID) && $item->LANC_ID > 0){
                    $update = LancamentoItem::where('ID', $item->LANC_ID)->update($arrItens);
                }else{
                    $lancamentoItem = LancamentoItem::create($arr);
                }
            }
        }
        
        if(count($dados->ITENS_EXCLUIDOS) > 0){

            foreach($dados->ITENS_EXCLUIDOS as $item){
                $update = LancamentoItem::where('ID', $item->LANC_ID)->delete();
            }
        }

        $lancamento = $this->getLancamentos($id);
        $ret = $lancamento[0];

        return response()->json($ret);
    }

    public function postLancamentosDelete(Request $request){
        $dados = (object) $request->DADOS;

        $lancamento = Lancamento::where('ID', $dados->ID)->delete();

        return response()->json($lancamento);
    }

    public function getLancamentos($id){

        $idStr = '';

        if($id > 0){
            $idStr = 'AND T.ID = ' . $id;
        }

        $sql = "SELECT 
                T.*,
                LPAD(T.ID, 4, '0') AS DESC_ID,

                CONCAT(LPAD(MCI.ID, 4, '0'), ' - ', MCI.DESCRICAO) AS DESC_MODULO_CONTA,


                JSON_OBJECT('DESC_ID', LPAD(MCI.ID, 4, '0'), 'ID', MCI.ID, 'DESCRICAO', MCI.DESCRICAO, 'MODULO_CONTA_TIPO_ID', T.MODULO_CONTA_TIPO_ID) as MODULO_CONTA_ITEM_JSON,
                
                JSON_OBJECT('DESC_ID', LPAD(TIPO.ID, 4, '0'), 'ID', TIPO.ID, 'DESCRICAO', TIPO.DESCRICAO) AS TIPO_DOCUMENTO_JSON,

                JSON_OBJECT('DESC_ID', LPAD(P.ID, 4, '0'), 'ID', P.ID, 'DESCRICAO', P.DESCRICAO) AS PERFIL_JSON,

                JSON_OBJECT('DESC_ID', LPAD(C.ID, 4, '0'), 'ID', C.ID, 'DESCRICAO', C.DESCRICAO) AS CONTA_BANCARIA_JSON

            FROM tblancamento T
            INNER JOIN tbmodulo_conta_item MCI ON MCI.ID = T.MODULO_CONTA_ITEM_ID
            INNER JOIN tbtipo_documento TIPO ON TIPO.ID = T.TIPO_DOCUMENTO_ID
            LEFT JOIN tbperfil P ON P.ID = T.PERFIL_ID
            LEFT JOIN tbconta_bancaria C ON C.ID = T.CONTA_BANCARIA_ID
            WHERE T.ID > 0
            $idStr";

        $args = [
        ];

        $lancamentos = DB::select($sql, $args);

        return $lancamentos;
    }
}
