<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TiposDocumento extends Model
{
    protected $table = 'tbtipo_documento';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
