<?php

namespace App\Policies;

use App\Models\User;

class FirstUserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function viewAdminPanel(User $user): bool
    {
        // Only users with the 'admin' role can access the admin panel
        return $user->role === 'admin';
    }

    public function viewFirstUserPanel(User $user): bool
    {
        return $user->role ==='FT_user';
    }
}
