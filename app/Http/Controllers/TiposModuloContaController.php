<?php

namespace App\Http\Controllers;

use App\TiposModuloConta;
use Illuminate\Http\Request;

class TiposModuloContaController extends Controller
{
    public function index()
    {
        $tiposModuloConta = TiposModuloConta::get();

        return view('tiposModuloConta', compact('tiposModuloConta'));
    }

    public function tiposModuloConta()
    {
        $tiposModuloConta = TiposModuloConta::
        selectRaw("LPAD(TBMODULO_CONTA_TIPO.ID, 5, '0') AS DESC_ID, TBMODULO_CONTA_TIPO.*")->get();

        return response()->json($tiposModuloConta);
    }

    public function postTiposModuloConta(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoModuloConta = [];

        $arr = [
            'DESCRICAO'             => $dados->DESCRICAO,
            'DESC_RESUMIDA'         => $dados->DESC_RESUMIDA,
            'OPERACAO'              => $dados->OPERACAO
        ];

        if (isset($dados->ID) && $dados->ID > 0) {
            $tipoModuloConta = TiposModuloConta::where('ID', $dados->ID)->update($arr);
        } else {
            $tipoModuloConta = TiposModuloConta::create($arr);
        }

        return response()->json($tipoModuloConta);
    }

    public function postTipoModuloContaDelete(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoModuloConta = TiposModuloConta::where('ID', $dados->ID)->delete();

        return response()->json($tipoModuloConta);
    }
}
