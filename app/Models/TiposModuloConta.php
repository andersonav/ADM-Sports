<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TiposModuloConta extends Model
{
    protected $table = 'tbmodulo_conta_tipo';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
