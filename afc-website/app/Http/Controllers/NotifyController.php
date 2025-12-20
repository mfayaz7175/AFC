<?php

namespace App\Http\Controllers;

use App\Models\Notify;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class NotifyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = auth()->user();
        $notif = Notify::all();
        foreach($notif as $not){
            $exists = DB::table('notifycount')
                ->where('by_user' , $user->id)
                ->where('notif_id' , $not->id)
                ->exists();

                if(!$exists){
                    DB::table('notifycount')
                ->insert([
                    'is_read' => true,
                    'by_user' => $user->id,
                    'notif_id' => $not->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                    ]);
                }
        }

        // In your controller:
        $notif = Notify::latest()->paginate(2);
        $notifCount = Notify::all();
        return inertia('Dashboard/Notify', ['notif' => $notif, 'notifCount' => $notifCount]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Removed dd('create') so the view can load normally.
        return Inertia::render('Notify/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'title'    => 'required|string|max:255',
        'message'  => 'required|string',
        'target'   => 'required|string|max:255',
        'email'    => 'required|string|email|max:255',
        'schedule' => 'nullable|date', // Optional: validate schedule if provided.
    ]);

    // If schedule is provided, you might want to convert it to a timestamp or a proper DateTime.
    // Otherwise, you can set a default value.
    $validatedData['expires_at'] = \Carbon\Carbon::now()->addHour()->timestamp;

    // Save the notification
    \App\Models\Notify::create($validatedData);

    return redirect()->route('notify.index')
                     ->with('message', 'Notification created successfully!');
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notif = Notify::where('id',$id)->get();
        // dd($ad);
        return Inertia::render('Dashboard/Detail_Notify', ['notif' => $notif]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $notify = Notify::where('id',$id)->get();
        $notification = '';
        foreach($notify as $a){
            $notification =$a;
        }
        return inertia('Dashboard/Edit_Notify',['notification' => $notification]);
    }


    public function markAsRead(Request $request)
    {
        $user = auth()->user();

        if ($user) {
            // Update notifications for this user in your custom table (assumes 'email' is used to identify)
            DB::table('notifies')
                ->where('email', $user->email)
                ->where('is_read', false)
                ->update(['is_read' => true]);

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'error' => 'User not authenticated'], 401);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    // Retrieve the notification or fail if not found.
    $notification = Notify::findOrFail($id);

    // Validate the request data.
    $data = $request->validate([
        'title'    => 'required|string|max:255',
        'message'  => 'required|string',
        'target'   => 'required|string',
        'email'    => 'nullable|email',
        'schedule' => 'nullable|date',
    ]);

    // Update the notification with validated data.
    $notification->update($data);

    // Redirect to the notification list with a success message.
    return redirect()->route('notify.index')
                     ->with('success', 'Notification updated successfully.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notify $notify)
    {
        $notify->delete();
        // dd($ad);

        // Redirect to the product index with a success message
        return redirect()->route('notify.index')->with('message', 'Product deleted successfully!');
    }
}
