<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SupportEmail;
use Illuminate\Support\Facades\Storage;

class SupportEmailController extends Controller
{
    // Store a new support email from the Contact Support form
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'category'  => 'required|in:technical,account,trading,other',
            'message'   => 'required|string',
            'attachment'=> 'nullable|file|max:10000', // max 10MB
        ]);

        $supportEmail = new SupportEmail();
        // Set the email from the logged-in user – not from the form!
        $supportEmail->user_email = auth()->user()->email;
        $supportEmail->name       = $validated['name'];
        $supportEmail->category   = $validated['category'];
        $supportEmail->message    = $validated['message'];

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('emailAttachments', 'public');
            $supportEmail->attachment = $path;
        }

        $supportEmail->save();

        return redirect()->back()->with('success', 'Your support request has been submitted successfully.');
    }

    // For admin: return support emails as JSON (for the modal)
    public function index(Request $request)
    {
        $emails = SupportEmail::orderBy('created_at', 'desc')->paginate(5);
        // If the request wants JSON (AJAX), return JSON
        if ($request->wantsJson()) {
            return response()->json($emails);
        }
        // Otherwise, render an Inertia page (if needed)
        return inertia('Dashboard/SupportEmails', [
            'emails' => $emails,
        ]);
    }

    // For admin: delete a support email
    public function destroy(SupportEmail $email)
    {
        if ($email->attachment) {
            Storage::disk('public')->delete($email->attachment);
        }
        $email->delete();
        return redirect()->back()->with('success', 'Support email deleted successfully.');
    }

    // (Optional) You can add methods for replying or marking emails as read.
    public function markAsRead(SupportEmail $email)
    {
        $email->update(['read' => true]);
        return response()->json(['success' => true]);
    }

    public function unreadCount()
    {
        // Assuming you have an Email model and unread status field
        $unreadCount = \App\Models\Email::where('read', false)->count();

        return response()->json([
            'unreadSupportCount' => $unreadCount,
        ]);
    }

}
