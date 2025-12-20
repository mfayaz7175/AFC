<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HelpEntry;
use Inertia\Inertia;
use App\Models\Tutorial;

class HelpEntryController extends Controller
{
    public function index()
    {
        // Fetch all help entries ordered by creation date
        $helpEntries = HelpEntry::orderBy('created_at', 'desc')->get();

        // Fetch tutorials with pagination (6 per page)
        $tutorials = Tutorial::orderBy('created_at', 'desc')->paginate(6);

        // Determine if the current user is an admin.
        // (Assumes you have defined a policy/gate 'viewAdminPanel')
        $isAdmin = auth()->user()->can('viewAdminPanel');

        return Inertia::render('Dashboard/Help', [
            'tutorials'   => $tutorials,
            'helpEntries' => $helpEntries,
            'isAdmin'     => $isAdmin,
        ]);
    }

    // For authenticated users to submit a new help entry
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'entry_type' => 'required|in:faq,troubleshooting',
            'title'      => 'required|string|max:255',
            'content'    => 'nullable|string',
        ]);

        // Create the help entry; note that user_email comes from the authenticated user,
        // and we set status to 0 (hidden) by default until reviewed by an admin.
        HelpEntry::create([
            'entry_type' => $validated['entry_type'],
            'title'      => $validated['title'],
            'content'    => $validated['content'] ?? '',
            'user_email' => auth()->user()->email,
            'status'     => 0,
        ]);

        return redirect()->back()->with('success', 'Your question has been submitted.');
    }

    // For admin to update an existing help entry
    public function update(Request $request, HelpEntry $entry)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'nullable|string',
            'status'  => 'required|in:0,1',
        ]);

        $entry->update($validated);

        return redirect()->back()->with('success', 'Entry updated successfully.');
    }

    // For admin to delete a help entry
    public function destroy(HelpEntry $entry)
    {
        $entry->delete();
        return redirect()->back()->with('success', 'Entry deleted successfully.');
    }
}
