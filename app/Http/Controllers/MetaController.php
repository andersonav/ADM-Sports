<?php

namespace App\Http\Controllers;

use App\Models\Meta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MetaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('meta');
    }

    public function getMeta()
    {

        $perfis = $this->getMetas(0);

        return response()->json($perfis);
    }

    public function postMeta(Request $request)
    {
        $dados = (object) $request->DADOS;

        $meta = [];

        $arr = [
            'MES'       => $dados->MES,
            'ANO'       => $dados->ANO,
            'VALOR'     => $dados->VALOR,
            'TIPO'      => $dados->TIPO
        ];

        $id = 0;

        if(isset($dados->ID) && $dados->ID > 0){
            $update = Meta::where('ID', $dados->ID)->update($arr);
            $id = $dados->ID;

        }else{
            $meta = Meta::create($arr);

            $id = $meta['ID'];
        }

        $meta = $this->getMetas($id);

        $ret = $meta[0];

        return response()->json($ret);
    }

    public function postMetaDelete(Request $request){
        $dados = (object) $request->DADOS;

        $meta = Meta::where('ID', $dados->ID)->delete();

        return response()->json($meta);
    }

    public function getMetas($id){

        $idStr = '';

        if($id > 0){
            $idStr = 'AND T.ID = ' . $id;
        }

        $sql = "SELECT 
                    X.*,
                    CONCAT(X.MES_F, '/', X.ANO) AS DESC_META
                FROM 
                        (SELECT 
                        T.*,
                        LPAD(T.ID, 4, '0') AS DESC_ID,

                        IF(T.MES = 1, 'JANEIRO', 
                        IF(T.MES = 2, 'FEVEREIRO', 
                        IF(T.MES = 3, 'MARÇO', 
                        IF(T.MES = 4, 'ABRIL', 
                        IF(T.MES = 5, 'MAIO', 
                        IF(T.MES = 6, 'JUNHO', 
                        IF(T.MES = 7, 'JULHO', 
                        IF(T.MES = 8, 'AGOSTO', 
                        IF(T.MES = 9, 'SETEMBRO', 
                        IF(T.MES = 10, 'OUTUBRO', 
                        IF(T.MES = 11, 'NOVEMBRO', 
                        IF(T.MES = 12, 'DEZEMBRO', 
                        '')))))))))))) AS MES_F
                        
                        
                    FROM tbmeta T
                    WHERE T.ID > 0
                $idStr) X";

        $args = [
        ];

        $perfis = DB::select($sql, $args);

        return $perfis;
    }
}
