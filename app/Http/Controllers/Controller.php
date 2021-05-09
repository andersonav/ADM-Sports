<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    private $requestAll     = [];
    private $request        = [];
    private $request_base   = [];


    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct(Request $request) {
        $this->middleware('auth');
        $this->requestAll = $request->all();
        $this->request = $this->obj_case(json_decode(json_encode((object) $request->all()), false));
        $this->request_base = $request;
    }


    public function request($request_base = false) {
        
        if ( $request_base ) {
            $ret = $this->request_base;
        } else {
            $ret = $this->request;
        }

        return $ret;
    }

    function obj_case($array, $case = CASE_UPPER) {
        if (is_object($array)) {
            $array = get_object_vars($array);
        }
        return (object) array_change_key_case($array,$case);
    }

    public function getGenerator($generator, $increment){
        $string = 'RDB$DATABASE';

        $retID = DB::select("SELECT GEN_ID($generator, $increment) AS ID FROM $string"); 
        $id = $retID[0]->ID;

        return $id;
    }


    function setDefValue(&$value, $def_value = '', $def_round = 0) {

        if ( isset($value) ) {
            
            if ($value instanceof stdClass ) {
                if ( $value == $def_value || empty($value)  ) {
                    $value = $def_value;
                }
            } else if ( $value != 0 && ($value == $def_value || empty($value) ) ) {
                $value = $def_value;
            }

            if($def_round != 0){
                $value = round($value, $def_round);
            }
        } else {
            $value = $def_value;
        }
        
        return $value;
    }

    function log_erro($msg, $code = 99998) {
        throw new \Exception($msg, $code);
    }

    function log_info($msg, $menu = null) {
        //Verifica se a string passada como menu possui módulo
        if ( $menu != null) {
            $str = explode('/_', $menu); 
            if ( is_numeric( $str[0] ) ) {
                $menu   = $str[0];
                $modulo = '';
            } else {
                $menu   = $str[1];
                $modulo = $str[0];
            }
            $menu = Illuminate\Support\Facades\Lang::get($modulo . '/_' . $menu . '.titulo') . ' | ';
        } else {
            $menu = '';
        }
        
        $user = str_pad( (Auth::check() ? Auth::user()->USUARIO : ''), 10) . ' | ';
        
        Log::info($user . print_r($msg, true));
    }

}
