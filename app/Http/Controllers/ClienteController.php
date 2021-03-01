<?php

namespace App\Http\Controllers;

use App\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $clientes = Cliente::get();

        return view('clientes', compact('clientes'));
    }

    public function clientes()
    {
        $clientes = Cliente::get(['TBCLIENTE.*'])
            ->toArray();

        return response()->json($clientes);
    }

    public function postCliente(Request $request)
    {
        $dados = (object) $request->DADOS;

        $cliente = [];

        $arr = [
            'IDENTIFICACAO'         => $dados->IDENTIFICACAO,
            'RAZAOSOCIAL'           => $dados->RAZAOSOCIAL,
            'NOMEFANTASIA'          => $dados->NOMEFANTASIA,
            'CEP'                   => $dados->CEP,
            'ENDERECO'              => $dados->ENDERECO,
            'BAIRRO'                => $dados->BAIRRO,
            'CIDADE'                => $dados->CIDADE,
            'UF'                    => $dados->UF,
            'NUMERO'                => $dados->NUMERO,
            'TELEFONE'              => $dados->TELEFONE,
            'CELULAR'               => $dados->CELULAR
        ];

        if(isset($dados->ID) && $dados->ID > 0){
            $cliente = Cliente::where('ID', $dados->ID)->update($arr);
        }else{
            $cliente = Cliente::create($arr);
        }

        return response()->json($cliente);
    }

    public function postClienteDelete(Request $request){
        $dados = (object) $request->DADOS;

        $cliente = Cliente::where('ID', $dados->ID)->delete();

        return response()->json($cliente);
    }
}
