<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

class WelcomeController extends Controller
{
    public function index()
{
    $news = News::latest()->take(4)->get(); // Get 3 most recent news items

    return Inertia::render('Welcome', [
        'news' => $news,
    ]);
}
}
