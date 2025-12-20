<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ICOParticipation extends Model
{
    protected $table = 'ico_participations';

    protected $fillable = [
        'user_id',
        'wallet_address',
        'eth_amount',
        'afcoin_amount',
        'rate',
        'tx_hash',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
