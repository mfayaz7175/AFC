<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notify extends Model
{
    use HasFactory;

    // Add the fields you want to allow mass assignment for.
    protected $fillable = [
        'title',
        'message',
        'target',
        'email',
        'schedule',
        'expires_at',
    ];
}
