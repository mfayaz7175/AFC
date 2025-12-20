<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutorial;
use Illuminate\Support\Facades\Storage;

class TutorialController extends Controller
{
    // For admin to add a new tutorial
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'description'       => 'required|string',
            'videoFile'         => 'nullable|file|mimetypes:video/mp4,video/avi,video/mpeg|max:20000',
            'youtubeLink'       => 'nullable|url',
            'profileImageFile'  => 'nullable|image|max:5000',
        ]);

        $tutorial = new Tutorial();
        $tutorial->title = $validated['title'];
        $tutorial->description = $validated['description'];

        if ($request->hasFile('videoFile')) {
            $path = $request->file('videoFile')->store('tutorial/vid', 'public');
            $tutorial->video = $path;
        } else {
            $tutorial->video = null;
        }

        $tutorial->youtube_link = $validated['youtubeLink'] ?? null;

        if ($request->hasFile('profileImageFile')) {
            $path = $request->file('profileImageFile')->store('tutorial/img', 'public');
            $tutorial->profile_image = $path;
        } else {
            $tutorial->profile_image = '';
        }

        $tutorial->save();

        return redirect()->back()->with('success', 'Tutorial added successfully.');
    }

    // For admin to update an existing tutorial
    public function update(Request $request, Tutorial $tutorial)
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'description'       => 'required|string',
            'videoFile'         => 'nullable|file|mimetypes:video/mp4,video/avi,video/mpeg|max:20000',
            'youtubeLink'       => 'nullable|url',
            'profileImageFile'  => 'nullable|image|max:5000',
        ]);

        $tutorial->title = $validated['title'];
        $tutorial->description = $validated['description'];

        if ($request->hasFile('videoFile')) {
            // Delete old video file if exists
            if ($tutorial->video) {
                Storage::disk('public')->delete($tutorial->video);
            }
            $path = $request->file('videoFile')->store('tutorial/vid', 'public');
            $tutorial->video = $path;
        }

        $tutorial->youtube_link = $validated['youtubeLink'] ?? $tutorial->youtube_link;

        if ($request->hasFile('profileImageFile')) {
            if ($tutorial->profile_image) {
                Storage::disk('public')->delete($tutorial->profile_image);
            }
            $path = $request->file('profileImageFile')->store('tutorial/img', 'public');
            $tutorial->profile_image = $path;
        }

        $tutorial->save();

        return redirect()->back()->with('success', 'Tutorial updated successfully.');
    }

    // For admin to delete a tutorial
    public function destroy(Tutorial $tutorial)
    {
        if ($tutorial->video) {
            Storage::disk('public')->delete($tutorial->video);
        }
        if ($tutorial->profile_image) {
            Storage::disk('public')->delete($tutorial->profile_image);
        }
        $tutorial->delete();

        return redirect()->back()->with('success', 'Tutorial deleted successfully.');
    }
}
