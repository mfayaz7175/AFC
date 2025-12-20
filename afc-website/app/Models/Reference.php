<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    protected $fillable = [
        'topic',
        'description',
        'message',
        'file',
        'video_link',
        'status',
    ];
}
