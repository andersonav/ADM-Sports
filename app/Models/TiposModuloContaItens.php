<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TiposModuloContaItens extends Model
{
    protected $table = 'TBMODULO_CONTA';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}