<?php

namespace App\Http\Controllers;

use App\Models\ICOParticipation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;  // ← make sure this is imported

class ICOController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'wallet_address' => 'required|string',
            'eth_amount'     => 'required|numeric|min:0.0001',
            'afcoin_amount'  => 'required|numeric|min:0.00000001',
            'rate'           => 'required|numeric|min:0.01',
            'tx_hash'        => 'required|string|unique:ico_participations,tx_hash',
        ]);

        // Associate with the logged-in user (if any)
        $validated['user_id'] = auth()->id();

        ICOParticipation::create($validated);

        // Redirect back to the buy page with a flash message
        return Redirect::route('ico.buy')
                       ->with('success', 'Your purchase was recorded successfully!');
    }

    public function stats()
    {
        return response()->json([
            'participants' => ICOParticipation::distinct('wallet_address')->count(),
            'eth_total'    => ICOParticipation::sum('eth_amount'),
            'afcoin_total' => ICOParticipation::sum('afcoin_amount'),
        ]);
    }
}
