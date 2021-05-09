<?php

namespace App\Http\Controllers;

use App\Models\ContaBancaria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContasBancariasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('contasBancarias');
    }

    public function contasBancarias()
    {
        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID
                FROM TBCONTA_BANCARIA T
                WHERE T.ID > 0";

        $args = [];

        $contasBancarias = DB::select($sql, $args);

        return response()->json($contasBancarias);
    }

    public function postContasBancarias(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoDocumento = [];

        $arr = [
            'CONTA'                 => $dados->CONTA,
            'DESCRICAO'             => $dados->DESCRICAO
        ];

        if (isset($dados->ID) && $dados->ID > 0) {
            $update = ContaBancaria::where('ID', $dados->ID)->update($arr);
            $find = ContaBancaria::where('ID', $dados->ID)->get();
            $tipoDocumento = $find[0];
        } else {
            $tipoDocumento = ContaBancaria::create($arr);
        }

        return response()->json($tipoDocumento);
    }

    public function postContasBancariasDelete(Request $request)
    {
        $dados = (object) $request->DADOS;

        $tipoDocumento = ContaBancaria::where('ID', $dados->ID)->delete();

        return response()->json($tipoDocumento);
    }
}
