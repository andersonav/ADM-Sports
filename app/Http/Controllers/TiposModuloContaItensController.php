<?php

namespace App\Http\Controllers;

use App\Models\TiposModuloContaItens;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TiposModuloContaItensController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('tiposModuloContaItens');
    }

    public function tiposModuloContaItens(Request $request)
    {
        $dados = (object) $request->DADOS;

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID
                FROM TBMODULO_CONTA T
                WHERE T.MODULO_CONTA_TIPO_ID = :MODULO_CONTA_TIPO_ID";

        $args = [
            'MODULO_CONTA_TIPO_ID' => $dados->MODULO_CONTA
        ];

        $tipoModuloContaItens = DB::select($sql, $args);

        return response()->json($tipoModuloContaItens);
    }

    public function postTiposModuloContaItens(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoModuloContaItens = [];

        $arr = [
            'MODULO_CONTA_TIPO_ID' => $dados->MODULO_CONTA,
            'DESCRICAO'            => $dados->DESCRICAO,
            'DESC_RESUMIDA'        => $dados->DESC_RESUMIDA
        ];

        if(isset($dados->ID) && $dados->ID > 0){
            $update = TiposModuloContaItens::where('ID', $dados->ID)->update($arr);
            $find = TiposModuloContaItens::where('ID', $dados->ID)->get(); 
            $tipoModuloContaItens = $find[0];
        }else{
            $tipoModuloContaItens = TiposModuloContaItens::create($arr);
        }

        return response()->json($tipoModuloContaItens);
    }

    public function postTiposModuloContaItensDelete(Request $request){
        $dados = (object) $request->DADOS;

        $tipoModuloContaItens = TiposModuloContaItens::where('ID', $dados->ID)->delete();

        return response()->json($tipoModuloContaItens);
    }
}
