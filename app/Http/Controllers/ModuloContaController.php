<?php

namespace App\Http\Controllers;

use App\Models\ModuloContaItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModuloContaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('moduloContaItem');
    }

    public function getModuloConta()
    {

        $request = $this->request();
        $param   = $request->DADOS;

        $moduloConta = '';
        if(isset($param->MODULO_CONTA) && $param->MODULO_CONTA > 0){
            $moduloContaId = $param->MODULO_CONTA;

            $moduloConta = 'AND T.MODULO_CONTA_ID = ' . $moduloContaId;

        }

        $sql = "SELECT 
                T.*,
                LPAD(T.ID, 4, '0') AS DESC_ID,
                CONCAT(LPAD(MC.ID, 4, '0'), ' - ', MC.DESCRICAO) AS MODULO_CONTA_DESCRICAO,

                FN_TO_JSON(
                    FN_TO_PAR_JSON('DESC_ID', LPAD(MC.ID, 4, '0')),
                    FN_TO_PAR_JSON('ID', MC.ID),
                    FN_TO_PAR_JSON('DESCRICAO', MC.DESCRICAO)
                ) MODULO_CONTA_JSON

            FROM TBMODULO_CONTA_ITEM T
            INNER JOIN TBMODULO_CONTA MC ON MC.ID = T.MODULO_CONTA_ID
            WHERE T.ID > 0
            $moduloConta";

        $args = [
        ];

        $modulosConta = DB::select($sql, $args);

        return response()->json($modulosConta);
    }

    public function postModuloConta(Request $request)
    {
        $dados = (object) $request->DADOS;

        $moduloConta = [];

        $arr = [
            'MODULO_CONTA_ID'       => $dados->MODULO_CONTA_ID,
            'DESC_RESUMIDA'         => $dados->DESC_RESUMIDA,
            'DESCRICAO'             => $dados->DESCRICAO
        ];

        if(isset($dados->ID) && $dados->ID > 0){
            $update = ModuloContaItem::where('ID', $dados->ID)->update($arr);
            $find = ModuloContaItem::where('ID', $dados->ID)->get(); 
            $moduloConta = $find[0];
        }else{
            $moduloConta = ModuloContaItem::create($arr);
        }

        return response()->json($moduloConta);
    }

    public function postModuloContaDelete(Request $request){
        $dados = (object) $request->DADOS;

        $moduloConta = ModuloContaItem::where('ID', $dados->ID)->delete();

        return response()->json($moduloConta);
    }
}
