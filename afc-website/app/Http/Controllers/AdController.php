<?php

namespace App\Http\Controllers;

use App\Models\Ad;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class AdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd('index');
        $ad = Ad::all(); // Fetch all products
        // dd('index');
        return Inertia::render('Dashboard/Add_Ad', ['ad' => $ad]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        dd('index');
        return Inertia::render('Dashboard/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Validate the incoming request data, including the image file.
    $validatedData = $request->validate([
        'title'       => 'required|string|max:255',
        'price'       => 'required|max:255',
        'currency'    => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'location'    => 'required|string|max:255',
        'expires_at'  => 'required|string|max:255',
        'image'       => 'required|image|max:1024', // image is required; max size 1024 KB
    ]);

    // If an image file is present, store it in the "public/images" directory.
    if ($request->hasFile('image')) {
        // This will store the image and return the path.
        $validatedData['image'] = $request->file('image')->store('AdImages', 'public');
    }

    // Add the ID of the currently authenticated user.
    $validatedData['created_by'] = auth()->id();

    // Create the ad record with the validated data.
    Ad::create($validatedData);

    // Redirect back to the ad index with a success message.
    return redirect()->route('ad.showAd')->with('message', 'Product created successfully!');
}


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ad = Ad::where('id',$id)->get();
        // dd($ad);
        return Inertia::render('Dashboard/Detail_Ad', ['ad' => $ad]);
    }

        public function ShowAd()
    {
        $user = auth()->user();

        // Fetch only products the user is authorized to view
        $ad = Ad::where('created_by', $user->id)->get();

        // Add policy checks for each product


        return inertia('Dashboard/Show_Ad', ['ad' => $ad]);
    }

    public function CardAd()
    {
        $user = auth()->user();

        // Fetch only products the user is authorized to view
        // $ad = Ad::where('created_by', $user->id)->get();
        $ad = Ad::all();


        // Add policy checks for each product


        return inertia('Dashboard/Card_Ad', ['ad' => $ad]);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $ads = Ad::where('id',$id)->get();
        $ad = '';
        foreach($ads as $a){
            $ad =$a;
        }
        return inertia('Dashboard/Edit_Ad',['ad' => $ad]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    // dd('dd');
    // Validate the incoming request data
    $validatedData = $request->validate([
        'title'       => 'required|string|max:255',
        'price'       => 'required|numeric',
        'currency'    => 'required|string|max:10',
        'description' => 'required|string',
        'location'    => 'required|string|max:255',
        'expires_at'  => 'nullable|date',
        'image'       => 'nullable|image|max:2048', // optional image upload, limit size to 2MB
    ]);

    // Retrieve the ad using the provided ID
    $ad = Ad::findOrFail($id);

    // Check if a new image is uploaded
    if ($request->hasFile('image')) {
        // Optionally: delete the old image if necessary
        // if ($ad->image && Storage::disk('public')->exists($ad->image)) {
        //     Storage::disk('public')->delete($ad->image);
        // }

        // Store the new image in the 'ads' directory on the 'public' disk
        $validatedData['image'] = $request->file('image')->store('AdImages', 'public');
    }

    // Update the ad with the validated data
    $ad->update($validatedData);

    // Redirect to a specific route or back with a success message
    return redirect()->route('ad.showAd')->with('success', 'Ad updated successfully.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ad $ad)
    {
        // Check if the ad has an image and if it exists in the 'public' disk
        if ($ad->image && Storage::disk('public')->exists($ad->image)) {
            Storage::disk('public')->delete($ad->image);
        }

        // Delete the ad record from the database
        $ad->delete();

        // Redirect with a success message
        return redirect()->route('ad.showAd')->with('message', 'Product deleted successfully!');
    }


    public function globalAds()
        {
            // Fetch all ads from database
            $ads = Ad::all();
            // Return as JSON array
            return response()->json($ads);
        }


}
