<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContaBancaria extends Model
{
    protected $table = 'tbconta_bancaria';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
