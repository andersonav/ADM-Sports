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

    public function getModuloConta(Request $request)
    {

        $modulosConta = $this->getModuloContas(0);

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

        $id = 0;

        if(isset($dados->ID) && $dados->ID > 0){
            $update = ModuloContaItem::where('ID', $dados->ID)->update($arr);
            $id = $dados->ID;
        }else{
            $moduloConta = ModuloContaItem::create($arr);
            $id = $moduloConta['ID'];
        }

        $modulosConta = $this->getModuloContas($id);
        $ret = $modulosConta[0];

        return response()->json($ret);
    }

    public function postModuloContaDelete(Request $request){
        $dados = (object) $request->DADOS;

        $moduloConta = ModuloContaItem::where('ID', $dados->ID)->delete();

        return response()->json($moduloConta);
    }

    public function getModuloContas($id){

        $moduloConta = '';
        if(isset($id) && $id > 0){
            $moduloContaId = $id;

            $moduloConta = 'AND T.ID = ' . $moduloContaId;

        }

        $sql = "SELECT 
                T.*,
                LPAD(T.ID, 4, '0') AS DESC_ID,
                CONCAT(LPAD(MC.ID, 4, '0'), ' - ', MC.DESCRICAO) AS MODULO_CONTA_DESCRICAO,


                JSON_OBJECT('DESC_ID', LPAD(MC.ID, 4, '0'), 'ID', MC.ID, 'DESCRICAO', MC.DESCRICAO) as MODULO_CONTA_JSON
                
               
            FROM tbmodulo_conta_item T
            INNER JOIN tbmodulo_conta MC ON MC.ID = T.MODULO_CONTA_ID
            WHERE T.ID > 0
            $moduloConta";

        $args = [
        ];

        return DB::select($sql, $args);
    }
}
