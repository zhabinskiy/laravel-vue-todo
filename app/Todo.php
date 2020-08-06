<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use \Rutorika\Sortable\SortableTrait;

    protected $fillable = ['title', 'completed'];

    protected static $sortableField = 'order';
}
