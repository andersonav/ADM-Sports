<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TipoDocumento;

class TiposDocumentoController extends Controller
{
    public function index()
    {
        $tiposDocumento = TipoDocumento::get();

        return view('tiposDocumento', compact('tiposDocumento'));
    }

    public function tiposDocumento()
    {
        $tiposDocumento = TipoDocumento::get(['TBTIPO_DOCUMENTO.*'])
            ->toArray();

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
            $tipoDocumento = TipoDocumento::where('ID', $dados->ID)->update($arr);
        }else{
            $tipoDocumento = TipoDocumento::create($arr);
        }

        return response()->json($tipoDocumento);
    }

    public function postTipoDocumentoDelete(Request $request){
        $dados = (object) $request->DADOS;

        $tipoDocumento = TipoDocumento::where('ID', $dados->ID)->delete();

        return response()->json($tipoDocumento);
    }
}
