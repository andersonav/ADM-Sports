<?php

namespace App\Helpers;

use Validator;
use Exception;

class Helpers
{

    public static function objectToArray($d)
    {
        if (is_object($d)) {
            $d = get_object_vars($d);
        }

        if (is_array($d)) {
            return array_map(array('self', 'objectToArray'), $d);
        } else {
            return $d;
        }
    }

    public static function arrayToObject($d)
    {
        if (is_array($d)) {
            return (object)array_map(array('self', 'arrayToObject'), $d);
        } else {
            return $d;
        }
    }

    public static function utf8_converter($array)
    {
        array_walk_recursive($array, function (&$item, $key) {
            if (!mb_detect_encoding($item, 'utf-8', true)) {
                if ($item != null) $item = utf8_encode($item);
            } else {
                if ($item != null) $item = $item;
            }
        });
        return $array;
    }

    public static function ObjEncode($obj)
    {
        // return (array)$obj;
        return (array)Helpers::arrayToObject(Helpers::utf8_converter(Helpers::objectToArray($obj)));
    }
}
