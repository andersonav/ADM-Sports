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
                    FROM tblancamento T
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
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM tblancamento X INNER JOIN tbmodulo_conta_tipo TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 0 AND X.DATA = T.DATA), 0) AS ENTRADAS,
                            
                            COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM tblancamento X INNER JOIN tbmodulo_conta_tipo TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 1 AND X.DATA = T.DATA), 0) AS SAIDAS
                        FROM tblancamento T
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

        $ret->LANCAMENTOS = DB::select("SELECT 
                    T.ID,
                    T.DESCRICAO,
                    MCT.OPERACAO
                FROM tbmodulo_conta_item T
                INNER JOIN tbmodulo_conta MC ON MC.ID = T.MODULO_CONTA_ID
                INNER JOIN tbmodulo_conta_tipo MCT ON MCT.ID = MC.MODULO_CONTA_TIPO_ID");

        foreach($ret->LANCAMENTOS as $item){
            
            $sql = "SELECT 
                        X.*,
                        IF(X.MES = 1, 'JANEIRO', 
                        IF(X.MES = 2, 'FEVEREIRO', 
                        IF(X.MES = 3, 'MARÇO', 
                        IF(X.MES = 4, 'ABRIL', 
                        IF(X.MES = 5, 'MAIO', 
                        IF(X.MES = 6, 'JUNHO', 
                        IF(X.MES = 7, 'JULHO', 
                        IF(X.MES = 8, 'AGOSTO', 
                        IF(X.MES = 9, 'SETEMBRO', 
                        IF(X.MES = 10, 'OUTUBRO', 
                        IF(X.MES = 11, 'NOVEMBRO', 
                        IF(X.MES = 12, 'DEZEMBRO', 
                        '')))))))))))) AS MES_F
                        FROM 
                        (
                            SELECT DISTINCT
                                EXTRACT(MONTH FROM T.DATA) AS MES,
                                
                                SUM(T.VALOR_TOTAL) AS VALOR,

                                COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM tblancamento X INNER JOIN tbmodulo_conta_tipo TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 0 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS ENTRADAS,
                                    
                                COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM tblancamento X INNER JOIN tbmodulo_conta_tipo TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 1 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS SAIDAS

                            FROM tblancamento T
                            WHERE 
                            T.MODULO_CONTA_ITEM_ID = :ITEM_ID
                            AND EXTRACT(YEAR FROM T.DATA) = :ANO) X
                        ";

            $args = [
                'ITEM_ID'   => $item->ID,
                'ANO'       => $param->ANO
            ];

            $item->LANCAMENTOS = DB::select($sql, $args);

        }

        return response()->json($ret);
    }

    public function capitalDeGiro(){
        return view('capitalGiro');
    }

    public function getCapitalDeGiro(){
        $request = $this->request();
        $param = $request->FILTRO;

        $ret = (object) [];

        $ret->LANCAMENTOS = DB::select("SELECT 
                    T.ID,
                    IF(T.OPERACAO = 0, 'Contas a Receber', 'Contas a Pagar') AS DESCRICAO,
                    T.OPERACAO
                FROM tbmodulo_conta_tipo T");

        foreach($ret->LANCAMENTOS as $tipo){
            
            $sql = "SELECT DISTINCT
                        CONCAT(UPPER(SUBSTRING(DATE_FORMAT(T.data, '%M'),1,1)),LOWER(SUBSTRING(DATE_FORMAT(T.data, '%M'),2))) AS LABEL,
                        
                        SUM(T.VALOR_TOTAL) AS VALOR,

                        COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM tblancamento X INNER JOIN tbmodulo_conta_tipo TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 0 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS ENTRADAS,
                            
                        COALESCE((SELECT SUM(X.VALOR_TOTAL) X FROM tblancamento X INNER JOIN tbmodulo_conta_tipo TP ON TP.ID = X.MODULO_CONTA_TIPO_ID WHERE TP.OPERACAO = 1 AND EXTRACT(MONTH FROM X.DATA) = EXTRACT(MONTH FROM T.DATA)), 0) AS SAIDAS,

                        COALESCE((SELECT X.VALOR FROM tbmeta X WHERE X.MES = EXTRACT(MONTH FROM T.DATA) AND X.TIPO = 0), 0) AS SALDO_CAIXA,

                        COALESCE((SELECT X.VALOR FROM tbmeta X WHERE X.MES = EXTRACT(MONTH FROM T.DATA) AND X.TIPO = 1), 0) AS MARGEM

                    FROM tblancamento T
                    WHERE 
                    T.MODULO_CONTA_TIPO_ID = :TIPO_ID
                    AND EXTRACT(YEAR FROM T.DATA) = :ANO";

            $args = [
                'TIPO_ID'   => $tipo->ID,
                'ANO'       => $param->ANO
            ];

            $tipo->LANCAMENTOS = DB::select($sql, $args);

        }

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
