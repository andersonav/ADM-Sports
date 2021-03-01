<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TiposModuloConta extends Model
{
    protected $table = 'TBMODULO_CONTA_TIPO';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
