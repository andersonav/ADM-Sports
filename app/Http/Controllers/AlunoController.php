<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('alunos');
    }

    public function alunos()
    {
        $alunos = Aluno::get(['tbaluno.*'])
            ->toArray();

        return response()->json($alunos);
    }

    public function postAluno(Request $request)
    {
        $dados = (object) $request->DADOS;

        $aluno = [];

        $arr = [
            'MATRICULA'             => $dados->MATRICULA,
            'NOME'                  => $dados->NOME,
            'DATA_NASCIMENTO'       => $dados->FDATA_NASCIMENTO,
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
            $update = Aluno::where('ID', $dados->ID)->update($arr);
            $find = Aluno::where('ID', $dados->ID)->get(); 
            $aluno = $find[0];
        }else{
            $aluno = Aluno::create($arr);
        }

        return response()->json($aluno);
    }

    public function postAlunoDelete(Request $request){
        $dados = (object) $request->DADOS;

        $aluno = Aluno::where('ID', $dados->ID)->delete();

        return response()->json($aluno);
    }
}
