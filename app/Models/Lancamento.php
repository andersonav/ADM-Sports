<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lancamento extends Model
{
    protected $table = 'tblancamento';

    protected $primaryKey = "ID";

    const CREATED_AT = 'DATA_CRIACAO';
    const UPDATED_AT = 'DATA_ATUALIZACAO';

    protected $guarded = [];
}
