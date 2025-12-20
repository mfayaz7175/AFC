<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_id',
        'type',
        'num_questions',
        'text',
        'correct_answer',
        'options',
    ];

    protected $casts = [
        'options' => 'array',  // This converts the JSON column to a PHP array
    ];

    /**
     * Get the reference that owns the question.
     */
    public function reference()
    {
        return $this->belongsTo(\App\Models\Reference::class);
    }
}
