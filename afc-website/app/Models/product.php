<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $fillable =[
        'name','category','address','description','created_by', // Include created_by
        'updated_by',
    ];

    public function redards(){
        return $this->hasMany(regard::class);
    }
}
