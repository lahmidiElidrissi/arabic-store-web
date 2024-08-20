<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ( !empty($request->all()) ) {
            $products = Self::SearchProducts($request);
        } 
        if ( empty($request->all()) || empty($products) ) {
            $products = Product::with(["images", "category"])->paginate(6);
        }

        return Response::json([
            'products' => $products,
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    /**
     * Search for products based on name or category.
     *
     * @param Request $request The request object containing the search parameters.
     * @return \Illuminate\Database\Eloquent\Collection|null The collection of found products or null if no products found.
     */
    public static function SearchProducts($request) {
        // get procucts with images and category
        $products = Product::with(["images", "category"]);

        // search with name product
        if ($request->name) {
            $products->where('name', 'like', '%' . $request->name . '%');
        }

        // search with category
        if ($request->category) {
            $products->where('category_id', $request->category);
        }

        return $products->paginate(6);
    }

    public function getProductById($id) {
        $products = Product::with(["images", "category"])->where("id",$id)->get();
        return Response::json([
            'product' => $products
        ], 200);
    }
}
