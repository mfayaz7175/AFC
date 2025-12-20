<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reference;
use App\Models\Question;
use Illuminate\Support\Facades\Storage;

class ManageRefController extends Controller
{
    // Show the Manage References page with initial data
    public function index()
    {
        $references = Reference::all();
        $questions = Question::all();

        return Inertia::render('Dashboard/ManageRef', [
            'references' => $references,
            'questions'  => $questions,
            // You can also pass the current user's permissions if needed
        ]);
    }

    // Store a new reference
    public function storeReference(Request $request)
    {
        // Validate the incoming request
        $data = $request->validate([
            'topic'       => 'required|string|max:255',
            'description' => 'required|string',
            'message'     => 'nullable|string',
            'video_link'  => 'nullable|url',
            'file'        => 'nullable|file|max:10240', // max 10MB, adjust as needed
        ]);

        // Handle file upload if present
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('references', 'public');
        }

        Reference::create($data);

        // Redirect back with a success message (or use Inertia flash messages)
        return redirect()->back()->with('success', 'Reference added successfully.');
    }

    // Delete a reference
    public function destroyReference(Reference $reference)
    {
        // Optionally delete the file from storage if needed
        if ($reference->file) {
            Storage::disk('public')->delete($reference->file);
        }
        $reference->delete();

        return redirect()->back()->with('success', 'Reference deleted successfully.');
    }

    // Update an existing reference
    public function updateReference(Request $request, Reference $reference)
    {
        // Validate the incoming data
        $data = $request->validate([
            'topic'       => 'required|string|max:255',
            'description' => 'required|string',
            'message'     => 'nullable|string',
            'video_link'  => 'nullable|url',
            'file'        => 'nullable|file|max:10240', // max 10MB
        ]);

        // If a new file is uploaded, delete the old one (if exists) and store the new file
        if ($request->hasFile('file')) {
            if ($reference->file) {
                \Storage::disk('public')->delete($reference->file);
            }
            $data['file'] = $request->file('file')->store('references', 'public');
        }

        $reference->update($data);

        return redirect()->back()->with('success', 'Reference updated successfully.');
    }

    // Store a new question
    public function storeQuestion(Request $request)
    {
        // Validate the request; note the new reference_id rule
        $data = $request->validate([
            'reference_id'  => 'required|exists:references,id',
            'type'           => 'required|string',
            'num_questions'  => 'required|integer|min:1',
            'text'           => 'required|string',
            'correct_answer' => 'required|string',
            // When type is four-answer, options must be present as an array of 4 strings.
            'options'        => 'nullable|array',
            'options.*'      => 'nullable|string',
        ]);

        // For written questions, options may not be provided.
        if ($data['type'] !== 'four-answer') {
            $data['options'] = null;
        }

        Question::create($data);

        return redirect()->back()->with('success', 'Question added successfully.');
    }

    // Delete a question
    public function destroyQuestion(Question $question)
    {
        $question->delete();

        return redirect()->back()->with('success', 'Question deleted successfully.');
    }

    // Update an existing question
    public function updateQuestion(Request $request, Question $question)
    {
        // Validate the request; include the reference_id
        $data = $request->validate([
            'reference_id'  => 'required|exists:references,id',
            'type'           => 'required|string',
            'num_questions'  => 'required|integer|min:1',
            'text'           => 'required|string',
            'correct_answer' => 'required|string',
            'options'        => 'nullable|array',
            'options.*'      => 'nullable|string',
        ]);

        // For written questions, ignore options
        if ($data['type'] !== 'four-answer') {
            $data['options'] = null;
        }

        $question->update($data);

        return redirect()->back()->with('success', 'Question updated successfully.');
    }

    public function toggleStatus(Request $request, Reference $reference)
    {
        // Validate the incoming status (should be 0 or 1)
        $data = $request->validate([
            'status' => 'required|boolean',
        ]);

        // Update only the status column
        $reference->update($data);

        // Return a redirect response which Inertia can handle properly.
        return redirect()->back()->with('success', 'Reference status updated successfully.');
    }


}
