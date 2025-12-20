<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::query();

        // Filter by search term if provided.
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%')
                  ->orWhere('source', 'like', '%' . $search . '%');
            });
        }

        // Filter by category if provided and not set to 'all'
        if (($category = $request->input('category')) && $category !== 'all') {
            $query->where('category', $category);
        }

        // Paginate the results (10 per page)
        $news = $query->orderBy('created_at', 'desc')->paginate(5);

        // Add a human-readable timestamp.
        $news->getCollection()->transform(function ($newsItem) {
            $newsItem->timestamp = $newsItem->created_at->diffForHumans();
            return $newsItem;
        });

        // Fetch distinct categories (ignoring nulls)
        $categories = News::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Dashboard/News', [
            'news'             => $news,
            'search'           => $request->input('search'),
            'selectedCategory' => $request->input('category', 'all'),
            'categories'       => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/NewsForm', [
            'news' => null,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'source'      => 'required|string|max:255',
            // Change the validation rule from URL to image
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category'    => 'nullable|string|max:255',
        ]);

        // Check if an image file was uploaded, then store it.
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('newsImage', 'public');
            $data['image'] = $imagePath;
        }

        News::create($data);

        return redirect()->route('news.index')->with('success', 'News added successfully.');
    }

    public function edit(News $news)
    {
        return Inertia::render('Dashboard/NewsForm', [
             'news' => $news,
        ]);
    }

    public function update(Request $request, News $news)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'source'      => 'required|string|max:255',
            // This field is still validated but will only be used if a file is uploaded.
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category'    => 'nullable|string|max:255',
        ]);

        // Only update the image field if a new file is provided.
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('newsImage', 'public');
            $data['image'] = $imagePath;
        } else {
            // Remove the image key so that it does not overwrite the existing image.
            unset($data['image']);
        }

        $news->update($data);

        return redirect()->route('news.index')->with('success', 'News updated successfully.');
    }


    public function destroy(News $news)
    {
        $news->delete();

        return redirect()->route('news.index')->with('success', 'News deleted successfully.');
    }
}
