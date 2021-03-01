<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    protected $table = 'TBTIPO_DOCUMENTO';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
