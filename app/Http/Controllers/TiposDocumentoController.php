<?php

namespace App\Http\Controllers;

use App\Models\TiposDocumento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TiposDocumentoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('tiposDocumento');
    }

    public function tiposDocumento()
    {
        $sql = "SELECT 
                T.*,
                LPAD(T.ID, 4, '0') AS DESC_ID
            FROM TBTIPO_DOCUMENTO T
            WHERE T.ID > 0";

        $args = [
        ];

        $tiposDocumento = DB::select($sql, $args);

        return response()->json($tiposDocumento);
    }

    public function postTiposDocumento(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoDocumento = [];

        $arr = [
            'DESCRICAO'             => $dados->DESCRICAO
        ];

        if(isset($dados->ID) && $dados->ID > 0){
            $update = TiposDocumento::where('ID', $dados->ID)->update($arr);
            $find = TiposDocumento::where('ID', $dados->ID)->get(); 
            $tipoDocumento = $find[0];
        }else{
            $tipoDocumento = TiposDocumento::create($arr);
        }

        return response()->json($tipoDocumento);
    }

    public function postTiposDocumentoDelete(Request $request){
        $dados = (object) $request->DADOS;

        $tipoDocumento = TiposDocumento::where('ID', $dados->ID)->delete();

        return response()->json($tipoDocumento);
    }
}
