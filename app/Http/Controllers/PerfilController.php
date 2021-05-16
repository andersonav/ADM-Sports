<?php

namespace App\Http\Controllers;

use App\Models\Perfil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PerfilController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('perfil');
    }

    public function getPerfil()
    {

        $perfis = $this->getPerfis(0);

        return response()->json($perfis);
    }

    public function postPerfil(Request $request)
    {
        $dados = (object) $request->DADOS;

        $perfil = [];

        $arr = [
            'DESCRICAO'             => $dados->DESCRICAO,
            'DESCRICAO_PADRAO'      => $dados->DESCRICAO_PADRAO,
            'VALOR'                 => $dados->VALOR,
            'MODULO_CONTA_ITEM_ID'  => $dados->MODULO_CONTA_ITEM_ID,
            'TIPO_DOCUMENTO_ID'     => $dados->TIPO_DOCUMENTO_ID,
            'CONTA_BANCARIA_ID'     => $dados->CONTA_BANCARIA_ID,
            'TIPO_LANCAMENTO'       => $dados->TIPO_LANCAMENTO
        ];

        $id = 0;

        if(isset($dados->ID) && $dados->ID > 0){
            $update = Perfil::where('ID', $dados->ID)->update($arr);
            $id = $dados->ID;

        }else{
            $perfil = Perfil::create($arr);

            $id = $perfil['ID'];
        }

        $perfil = $this->getPerfis($id);

        $ret = $perfil[0];

        return response()->json($ret);
    }

    public function postPerfilDelete(Request $request){
        $dados = (object) $request->DADOS;

        $perfil = Perfil::where('ID', $dados->ID)->delete();

        return response()->json($perfil);
    }

    public function getPerfis($id){

        $idStr = '';

        if($id > 0){
            $idStr = 'AND T.ID = ' . $id;
        }

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID,
                    JSON_OBJECT('DESC_ID', LPAD(MC.ID, 4, '0'), 'ID', MC.ID, 'DESCRICAO', MC.DESCRICAO) as MODULO_CONTA_JSON,
                    
                    JSON_OBJECT('DESC_ID', LPAD(TIPO.ID, 4, '0'), 'ID', TIPO.ID, 'DESCRICAO', TIPO.DESCRICAO) AS TIPO_DOCUMENTO_JSON,

                    JSON_OBJECT('DESC_ID', LPAD(C.ID, 4, '0'), 'ID', C.ID, 'DESCRICAO', C.DESCRICAO) AS CONTA_BANCARIA_JSON

                FROM TBPERFIL T
                LEFT JOIN TBMODULO_CONTA_ITEM MC ON MC.ID = T.MODULO_CONTA_ITEM_ID
                LEFT JOIN TBTIPO_DOCUMENTO TIPO ON TIPO.ID = T.TIPO_DOCUMENTO_ID
                LEFT JOIN TBCONTA_BANCARIA C ON C.ID = T.CONTA_BANCARIA_ID
                WHERE T.ID > 0
            $idStr";

        $args = [
        ];

        $perfis = DB::select($sql, $args);

        return $perfis;
    }
}
