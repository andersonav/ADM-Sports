<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TiposModuloContaItens extends Model
{
    protected $table = 'tbmodulo_conta';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
