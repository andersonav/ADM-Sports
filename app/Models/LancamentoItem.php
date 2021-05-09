<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LancamentoItem extends Model
{
    protected $table = 'TBLANCAMENTO_ITEM';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
