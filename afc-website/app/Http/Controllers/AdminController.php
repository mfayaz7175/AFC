<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Policies\AdminPanelPolicy;

class AdminController extends Controller
{
    /**
     * Display the admin panel.
     */

    public function index()
    {
      
        return Inertia::render('Product/Index');
    }
}
