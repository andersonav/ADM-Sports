<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\FormasPagamento;

class ConsultasController extends Controller
{

    public function Perfil()
    {

        $request = $this->request();
        $param   = $request;

        $desc = strtoupper($param->FILTRO);

        if($desc != ''){
			$desc = 'AND UPPER(T.ID||\'-\'||FN_LPAD(T.ID, 4, \'0\')||\'-\'||coalesce(T.DESCRICAO,\'\')) LIKE \'%'.str_replace(' ', '%', $desc).'%\'';
		}else{
			$desc = '';   
		}

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID,
                    JSON_OBJECT('DESC_ID', LPAD(MC.ID, 4, '0'), 'ID', MC.ID, 'DESCRICAO', MC.DESCRICAO) as MODULO_CONTA_JSON,
                
                    JSON_OBJECT('DESC_ID', LPAD(TIPO.ID, 4, '0'), 'ID', TIPO.ID, 'DESCRICAO', TIPO.DESCRICAO) AS TIPO_DOCUMENTO_JSON,

                    JSON_OBJECT('DESC_ID', LPAD(C.ID, 4, '0'), 'ID', C.ID, 'DESCRICAO', C.DESCRICAO) AS CONTA_BANCARIA_JSON

                FROM TBPERFIL T
                LEFT JOIN TBMODULO_CONTA_ITEM MC ON MC.ID = T.MODULO_CONTA_ITEM_ID
                LEFT JOIN TBTIPO_DOCUMENTO TIPO ON TIPO.ID = T.TIPO_DOCUMENTO_ID
                LEFT JOIN TBCONTA_BANCARIA C ON C.ID = T.CONTA_BANCARIA_ID
                WHERE T.ID > 0
                $desc
                ORDER BY T.DESCRICAO ASC
                LIMIT :QTD OFFSET :PAGINA";

        $args = [
            'QTD'      => $param->CONSULTA->QTD,
            'PAGINA'    => $param->CONSULTA->PAGINA
        ];

        $ret = DB::select($sql, $args);

        return response()->json($ret);
    }
    
    public function TipoDocumento()
    {

        $request = $this->request();
        $param   = $request;

        $desc = strtoupper($param->FILTRO);

        if($desc != ''){
			$desc = 'AND UPPER(T.ID||\'-\'||FN_LPAD(T.ID, 4, \'0\')||\'-\'||coalesce(T.DESCRICAO,\'\')) LIKE \'%'.str_replace(' ', '%', $desc).'%\'';
		}else{
			$desc = '';   
		}

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID
                    
                FROM TBTIPO_DOCUMENTO T
                WHERE T.ID > 0
                $desc
                ORDER BY T.DESCRICAO ASC
                LIMIT :QTD OFFSET :PAGINA";

        $args = [
            'QTD'      => $param->CONSULTA->QTD,
            'PAGINA'    => $param->CONSULTA->PAGINA
        ];

        $ret = DB::select($sql, $args);

        return response()->json($ret);
    }
    
    public function ModuloContaItem()
    {

        $request = $this->request();
        $param   = $request;

        $desc = strtoupper($param->FILTRO);

        if($desc != ''){
			$desc = 'AND UPPER(T.ID||\'-\'||FN_LPAD(T.ID, 4, \'0\')||\'-\'||coalesce(T.DESCRICAO,\'\')) LIKE \'%'.str_replace(' ', '%', $desc).'%\'';
		}else{
			$desc = '';   
		}

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID,
                    CONCAT(LPAD(MC.ID, 4, '0'), ' - ', MC.DESCRICAO) AS DESC_MC,
                    CONCAT(LPAD(MCT.ID, 4, '0'), ' - ', MCT.DESCRICAO) AS DESC_MC_TIPO,
                    MC.MODULO_CONTA_TIPO_ID
                FROM TBMODULO_CONTA_ITEM T
                INNER JOIN TBMODULO_CONTA MC ON MC.ID = T.MODULO_CONTA_ID
                INNER JOIN TBMODULO_CONTA_TIPO MCT ON MCT.ID = MC.MODULO_CONTA_TIPO_ID
                WHERE T.ID > 0
                $desc
                ORDER BY T.DESCRICAO ASC
                LIMIT :QTD OFFSET :PAGINA";

        $args = [
            'QTD'      => $param->CONSULTA->QTD,
            'PAGINA'    => $param->CONSULTA->PAGINA
        ];

        $ret = DB::select($sql, $args);

        return response()->json($ret);
    }
    
    public function ModuloConta()
    {

        $request = $this->request();
        $param   = $request;

        $desc = strtoupper($param->FILTRO);

        if($desc != ''){
			$desc = 'AND UPPER(T.ID||\'-\'||FN_LPAD(T.ID, 4, \'0\')||\'-\'||coalesce(T.DESCRICAO,\'\')) LIKE \'%'.str_replace(' ', '%', $desc).'%\'';
		}else{
			$desc = '';   
		}

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID,
                    CONCAT(LPAD(MCT.ID, 4, '0'), ' - ', MCT.DESCRICAO) AS DESC_MC_TIPO 
                FROM TBMODULO_CONTA T
                INNER JOIN TBMODULO_CONTA_TIPO MCT ON MCT.ID = T.MODULO_CONTA_TIPO_ID
                WHERE T.ID > 0
                $desc
                ORDER BY T.DESCRICAO ASC
                LIMIT :QTD OFFSET :PAGINA";

        $args = [
            'QTD'      => $param->CONSULTA->QTD,
            'PAGINA'    => $param->CONSULTA->PAGINA
        ];

        $ret = DB::select($sql, $args);

        return response()->json($ret);
    }
    
    public function ContaBancaria()
    {

        $request = $this->request();
        $param   = $request;

        $desc = strtoupper($param->FILTRO);

        if($desc != ''){
			$desc = 'AND UPPER(T.ID||\'-\'||FN_LPAD(T.ID, 4, \'0\')||\'-\'||coalesce(T.DESCRICAO,\'\')) LIKE \'%'.str_replace(' ', '%', $desc).'%\'';
		}else{
			$desc = '';   
		}

        $sql = "SELECT 
                    T.*,
                    LPAD(T.ID, 4, '0') AS DESC_ID,
                    CONCAT(T.CONTA, ' - ', T.DESCRICAO) AS DESC_CONTA
                FROM TBCONTA_BANCARIA T
                WHERE T.ID > 0
                $desc
                ORDER BY T.DESCRICAO ASC
                LIMIT :QTD OFFSET :PAGINA";

        $args = [
            'QTD'      => $param->CONSULTA->QTD,
            'PAGINA'    => $param->CONSULTA->PAGINA
        ];

        $ret = DB::select($sql, $args);

        return response()->json($ret);
    }
}
