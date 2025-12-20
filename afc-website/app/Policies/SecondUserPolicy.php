<?php

namespace App\Policies;

use App\Models\User;

class SecondUserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function viewSecondUserPanel(User $user) : bool {
        return $user->role === 'ST_user';
    }
}
