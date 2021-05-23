<?php

namespace App\Http\Controllers;

use App\Models\TiposModuloConta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TiposModuloContaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('tiposModuloConta');
    }

    public function tiposModuloConta()
    {

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID
                FROM tbmodulo_conta_tipo T
                WHERE T.ID > 0";

        $args = [
        ];

        $tiposModuloConta = DB::select($sql, $args);


        return response()->json($tiposModuloConta);
    }

    public function postTiposModuloConta(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoModuloConta = [];

        $arr = [
            'DESCRICAO'            => $dados->DESCRICAO,
            'DESC_RESUMIDA'        => $dados->DESC_RESUMIDA,
            'OPERACAO'             => $dados->OPERACAO
        ];

        if(isset($dados->ID) && $dados->ID > 0){
            $update = TiposModuloConta::where('ID', $dados->ID)->update($arr);
            $find = TiposModuloConta::where('ID', $dados->ID)->get(); 
            $tipoModuloConta = $find[0];
        }else{
            $tipoModuloConta = TiposModuloConta::create($arr);
        }

        return response()->json($tipoModuloConta);
    }

    public function postTiposModuloContaDelete(Request $request){
        $dados = (object) $request->DADOS;

        $tipoModuloConta = TiposModuloConta::where('ID', $dados->ID)->delete();

        return response()->json($tipoModuloConta);
    }
}
