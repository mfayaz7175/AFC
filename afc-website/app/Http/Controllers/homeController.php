<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class homeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all(); // Fetch all products
        // dd($products);
        return Inertia::render('Product/Index', ['product' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'address' => 'required|string|max:255',
        'description' => 'required|string|max:255',
    ]);

    // Add the authenticated user's ID to the validated data
    $validatedData['created_by'] = auth()->id(); // This line ensures created_by is set

    Product::create($validatedData);

    return redirect()->route('dashboard')->with('message', 'Product created successfully!');
}

public function show(Product $product)
    {

        $product= Product::all();
        // dd($pro);
        return Inertia::render('Product/Show', ['product' => $product]);
        // return 'kdkkdkd';
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit', ['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        // Update the product with the validated data
        $product->update($validatedData);

        // Redirect to the product index with a success message
        return redirect()->route('products.index')->with('message', 'Product updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete the product
        $product->delete();

        // Redirect to the product index with a success message
        return redirect()->route('products.index')->with('message', 'Product deleted successfully!');
    }
}

