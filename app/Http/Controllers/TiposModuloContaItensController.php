<?php

namespace App\Http\Controllers;

use App\TiposModuloContaItens;
use Illuminate\Http\Request;

class TiposModuloContaItensController extends Controller
{
    public function index()
    {
        return view('tiposModuloContaItens');
    }

    public function tiposModuloContaItens()
    {
        $tiposModuloContaItens = TiposModuloContaItens::get(['TBMODULO_CONTA_ITEM.*'])
            ->toArray();

        return response()->json($tiposModuloContaItens);
    }

    public function postTiposModuloContaItens(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoModuloContaItem = [];

        $arr = [
            'DESCRICAO'             => $dados->DESCRICAO,
            'DESC_RESUMIDA'         => $dados->DESC_RESUMIDA,
            'MODULO_CONTA_ID'       => $dados->MODULO_CONTA_ID
        ];

        if (isset($dados->ID) && $dados->ID > 0) {
            $tipoModuloContaItem = TiposModuloContaItens::where('ID', $dados->ID)->update($arr);
        } else {
            $tipoModuloContaItem = TiposModuloContaItens::create($arr);
        }

        return response()->json($tipoModuloContaItem);
    }

    public function postTipoModuloContaItemDelete(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoModuloContaItem = TiposModuloContaItens::where('ID', $dados->ID)->delete();

        return response()->json($tipoModuloContaItem);
    }
}
