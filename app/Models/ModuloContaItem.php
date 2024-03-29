<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuloContaItem extends Model
{
    protected $table = 'tbmodulo_conta_item';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
