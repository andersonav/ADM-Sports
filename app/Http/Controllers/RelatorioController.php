<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RelatorioController extends Controller
{
    public function fluxoCaixaDiario(){
        return view('fluxoCaixaDiario');
    }
    
    public function getFluxoCaixaDiario(){
        $request = $this->request();
        $param = $request->FILTRO;

        $ret = (object) [];

        $ret->LANCAMENTOS = DB::select("SELECT 
                    T.ID,
                    T.DESCRICAO,
                    T.OPERACAO
                FROM tbmodulo_conta_tipo T");

        foreach($ret->LANCAMENTOS as $tipo){
            
            $sql = "SELECT DISTINCT
                        T.DATA,
                        SUM(T.VALOR_TOTAL) AS VALOR,
                        CONCAT(LPAD(EXTRACT(DAY FROM T.DATA), 2, '0'), '/', LPAD(EXTRACT(MONTH FROM T.DATA), 2, '0')) AS LABEL
                    FROM TBLANCAMENTO T
                    WHERE 
                    T.MODULO_CONTA_TIPO_ID = :TIPO_ID
                    AND EXTRACT(MONTH FROM T.DATA) = :MES
                    AND EXTRACT(YEAR FROM T.DATA) = :ANO
                    GROUP BY T.DATA
                    ORDER BY T.DATA ASC";

            $args = [
                'TIPO_ID'   => $tipo->ID,
                'MES'       => $param->MES,
                'ANO'       => $param->ANO
            ];

            $tipo->LANCAMENTOS = DB::select($sql, $args);

        }

        $sqlSaldo = "SELECT 
                        K.*,
                        K.ENTRADAS - K.SAIDAS AS SALDO_DIARIO
                    FROM (
                        SELECT DISTINCT
                            T.DATA,
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM TBLANCAMENTO X INNER JOIN TBMODULO_CONTA_TIPO TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 0 AND X.DATA = T.DATA), 0) AS ENTRADAS,
                            
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM TBLANCAMENTO X INNER JOIN TBMODULO_CONTA_TIPO TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 1 AND X.DATA = T.DATA), 0) AS SAIDAS
                        FROM TBLANCAMENTO T
                        WHERE 
                        EXTRACT(MONTH FROM T.DATA) = :MES
                        AND EXTRACT(YEAR FROM T.DATA) = :ANO
                        ORDER BY T.DATA ASC) K";

        $argsSaldo = [
            'MES'       => $param->MES,
            'ANO'       => $param->ANO
        ];

        $ret->SALDO_DIARIO = DB::select($sqlSaldo, $argsSaldo);
                
        return response()->json($ret);
    }

    public function fluxoCaixaMensal(){
        return view('fluxoCaixaMensal');
    }

    public function getFluxoCaixaMensal(){
        $request = $this->request();
        $param = $request->FILTRO;

        $ret = (object) [];

        DB::statement("SET GLOBAL lc_time_names=pt_BR;");

        $ret->LANCAMENTOS = DB::select("SELECT 
                    T.ID,
                    T.DESCRICAO,
                    MCT.OPERACAO
                FROM TBMODULO_CONTA_ITEM T
                INNER JOIN TBMODULO_CONTA MC ON MC.ID = T.MODULO_CONTA_ID
                INNER JOIN TBMODULO_CONTA_TIPO MCT ON MCT.ID = MC.MODULO_CONTA_TIPO_ID");

        foreach($ret->LANCAMENTOS as $item){
            
            $sql = "SELECT DISTINCT
                        CONCAT(UPPER(SUBSTRING(DATE_FORMAT(t.data, '%M'),1,1)),LOWER(SUBSTRING(DATE_FORMAT(t.data, '%M'),2))) AS LABEL,
                        
                        SUM(T.VALOR_TOTAL) AS VALOR
                    FROM TBLANCAMENTO T
                    WHERE 
                    T.MODULO_CONTA_ITEM_ID = :ITEM_ID
                    AND EXTRACT(YEAR FROM T.DATA) = :ANO
                    GROUP BY CONCAT(UPPER(SUBSTRING(DATE_FORMAT(t.data, '%M'),1,1)),LOWER(SUBSTRING(DATE_FORMAT(t.data, '%M'),2)))";

            $args = [
                'ITEM_ID'   => $item->ID,
                'ANO'       => $param->ANO
            ];

            $item->LANCAMENTOS = DB::select($sql, $args);

        }

        $sqlSaldo = "SELECT 
                        K.*,
                        K.ENTRADAS - K.SAIDAS AS SALDO_CAIXA
                    FROM (
                        SELECT DISTINCT
                            T.DATA,
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM TBLANCAMENTO X INNER JOIN TBMODULO_CONTA_TIPO TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 0 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS ENTRADAS,
                            
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM TBLANCAMENTO X INNER JOIN TBMODULO_CONTA_TIPO TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 1 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS SAIDAS
                        FROM TBLANCAMENTO T
                        WHERE 
                        EXTRACT(MONTH FROM T.DATA) = :MES
                        AND EXTRACT(YEAR FROM T.DATA) = :ANO
                        ORDER BY T.DATA ASC) K";

        $argsSaldo = [
            'MES'       => $param->MES,
            'ANO'       => $param->ANO
        ];

        $ret->SALDO_CAIXA = DB::select($sqlSaldo, $argsSaldo);

        return response()->json($ret);
    }

    public function capitalDeGiro(){
        return view('capitalGiro');
    }

    public function getCapitalDeGiro(){
        $request = $this->request();
        $param = $request->FILTRO;

        $ret = (object) [];

        DB::statement("SET GLOBAL lc_time_names=pt_BR;");

        $ret->LANCAMENTOS = DB::select("SELECT 
                    T.ID,
                    IF(T.OPERACAO = 0, 'Contas a Receber', 'Contas a Pagar') AS DESCRICAO,
                    T.OPERACAO
                FROM tbmodulo_conta_tipo T");

        foreach($ret->LANCAMENTOS as $tipo){
            
            $sql = "SELECT DISTINCT
                        CONCAT(UPPER(SUBSTRING(DATE_FORMAT(t.data, '%M'),1,1)),LOWER(SUBSTRING(DATE_FORMAT(t.data, '%M'),2))) AS LABEL,
                        
                        SUM(T.VALOR_TOTAL) AS VALOR
                    FROM TBLANCAMENTO T
                    WHERE 
                    T.MODULO_CONTA_TIPO_ID = :TIPO_ID
                    AND EXTRACT(YEAR FROM T.DATA) = :ANO
                    GROUP BY CONCAT(UPPER(SUBSTRING(DATE_FORMAT(t.data, '%M'),1,1)),LOWER(SUBSTRING(DATE_FORMAT(t.data, '%M'),2)))";

            $args = [
                'TIPO_ID'   => $tipo->ID,
                'ANO'       => $param->ANO
            ];

            $tipo->LANCAMENTOS = DB::select($sql, $args);

        }

        $sqlSaldo = "SELECT 
                        K.*,
                        K.ENTRADAS - K.SAIDAS AS SALDO_CAIXA
                    FROM (
                        SELECT DISTINCT
                            T.DATA,
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM TBLANCAMENTO X INNER JOIN TBMODULO_CONTA_TIPO TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 0 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS ENTRADAS,
                            
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM TBLANCAMENTO X INNER JOIN TBMODULO_CONTA_TIPO TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 1 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS SAIDAS
                        FROM TBLANCAMENTO T
                        WHERE 
                        EXTRACT(MONTH FROM T.DATA) = :MES
                        AND EXTRACT(YEAR FROM T.DATA) = :ANO
                        ORDER BY T.DATA ASC) K";

        $argsSaldo = [
            'MES'       => $param->MES,
            'ANO'       => $param->ANO
        ];

        $ret->SALDO_CAIXA = DB::select($sqlSaldo, $argsSaldo);

        return response()->json($ret);
    }

    public function dre(){
        return view('dre');
    }

    public function getDre(){
        $ret = [];

        return response()->json($ret);
    }

}
