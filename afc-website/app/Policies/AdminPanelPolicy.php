<?php

namespace App\Policies;

use App\Models\User;

class AdminPanelPolicy
{
    /**
     * Determine whether the user can access the admin panel.
     */
    public function viewAdminPanel(User $user): bool
    {
        // Only users with the 'admin' role can access the admin panel
        return $user->role === 'admin';
    }
}
