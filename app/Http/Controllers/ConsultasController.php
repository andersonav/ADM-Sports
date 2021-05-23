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
                    JSON_OBJECT('DESC_ID', LPAD(MC.ID, 4, '0'), 'ID', MC.ID, 'DESCRICAO', MC.DESCRICAO, 'MODULO_CONTA_TIPO_ID', MCC.MODULO_CONTA_TIPO_ID) as MODULO_CONTA_JSON,
                
                    JSON_OBJECT('DESC_ID', LPAD(TIPO.ID, 4, '0'), 'ID', TIPO.ID, 'DESCRICAO', TIPO.DESCRICAO) AS TIPO_DOCUMENTO_JSON,

                    JSON_OBJECT('DESC_ID', LPAD(C.ID, 4, '0'), 'ID', C.ID, 'DESCRICAO', C.DESCRICAO) AS CONTA_BANCARIA_JSON

                FROM TBPERFIL T
                LEFT JOIN tbmodulo_conta_item MC ON MC.ID = T.MODULO_CONTA_ITEM_ID
                LEFT JOIN tbmodulo_conta MCC ON MCC.ID = MC.MODULO_CONTA_ID
                LEFT JOIN tbtipo_documento TIPO ON TIPO.ID = T.TIPO_DOCUMENTO_ID
                LEFT JOIN tbconta_bancaria C ON C.ID = T.CONTA_BANCARIA_ID
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
                    
                FROM tbtipo_documento T
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
                FROM tbmodulo_conta_item T
                INNER JOIN tbmodulo_conta MC ON MC.ID = T.MODULO_CONTA_ID
                INNER JOIN tbmodulo_conta_tipo MCT ON MCT.ID = MC.MODULO_CONTA_TIPO_ID
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
                FROM tbmodulo_conta T
                INNER JOIN tbmodulo_conta_tipo MCT ON MCT.ID = T.MODULO_CONTA_TIPO_ID
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
                FROM tbconta_bancaria T
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
