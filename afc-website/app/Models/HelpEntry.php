<?php
 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HelpEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'entry_type',  // 'faq' or 'troubleshooting'
        'title',
        'content',
        'user_email',
        'status',      // 0: hidden, 1: displayed
    ];
}
