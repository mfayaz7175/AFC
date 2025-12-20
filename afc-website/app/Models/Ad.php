<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;
    protected $table = 'ad';
    protected $fillable = [
        'title','description','image','price','currency','status',
        'location','expires_at','created_at','updated_at',
        'created_by','updated_by',
    ];
}
