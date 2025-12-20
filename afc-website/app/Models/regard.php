<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class regard extends Model
{
    use HasFactory;
    protected $fillable =[
        'like','comment'
    ];

    public function products(){
        return $this->belongsTo(product::class);
    }
}
