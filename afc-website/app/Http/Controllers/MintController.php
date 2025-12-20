<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reference;
use App\Models\Question;

class MintController extends Controller
{
    public function index()
    {
        // Fetch all active references (status == 1)
        $activeReferences = Reference::where('status', 1)->get();

        // Get all active topics as a comma-separated string
        $activeTopics = $activeReferences->pluck('topic')->toArray();
        $activeTopicsString = count($activeTopics) > 0 ? implode(', ', $activeTopics) : 'Topic Name';

        // Fetch questions associated with active references in random order
        $questions = Question::whereHas('reference', function($query) {
            $query->where('status', 1);
        })->inRandomOrder()->get();

        return Inertia::render('Smart/JsCode/MintPage', [
            'questions'    => $questions,
            'activeTopics' => $activeTopicsString,
        ]);
    }
}
