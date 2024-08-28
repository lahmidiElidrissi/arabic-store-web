<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Response;
use Yajra\DataTables\Facades\DataTables;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!empty($request->all())) {
            $products = Self::SearchProducts($request);
        }
        if (empty($request->all()) || empty($products)) {
            $products = Product::with(["images", "category"])->orderby("created_at", "desc")->paginate(6);
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
        $product = Product::create($request->all());

        $images = $request->images;
        foreach ($images as $image) {
            $image = Image::find($image["id"]);
            if ($image) {
                $product->images()->save($image);
            }
        }

        return Response::json([
            'success' => true,
            'status' => 200,
            'product' => $product
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Response::json($product->load(["images", "category"]), 200);
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
        $product->update($request->all());
        return Response::json([
            'success' => true,
            'status' => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product) {}

    /**
     * Search for products based on name or category.
     *
     * @param Request $request The request object containing the search parameters.
     * @return \Illuminate\Database\Eloquent\Collection|null The collection of found products or null if no products found.
     */
    public static function SearchProducts($request)
    {
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

        return $products->orderby("created_at", "desc")->paginate(6);
    }

    public function getProductById($id)
    {
        $products = Product::with(["images", "category"])->where("id", $id)->get();
        return Response::json([
            'product' => $products
        ], 200);
    }

    public function getData(Request $request)
    {

        $query = Product::query()->with("images")->orderby("created_at", "desc");

        return DataTables::of($query)
            ->filter(function ($query) use ($request) {
                if (!empty($request['search'])) {
                    $searchValue = $request['search'];
                    $query->where('name', 'like', "%{$searchValue}%")
                        ->orWhere('price', 'like', "%{$searchValue}%");
                }
            })
            ->order(function ($query) use ($request) {
                if (!empty($request['order'])) {
                    $orderColumn = $request['order'][0]['column'];
                    $orderDir = $request['order'][0]['dir'];
                    $query->orderBy($request->columns[$orderColumn]['data'], $orderDir);
                }
            })
            ->make(true);
    }

    public function removeProduct($id)
    {
        $user = auth()->user();
        $product = Product::find($id);
        if ($user->isAdmin()) {
            $product->delete();
            return Response::json(['success' => true], 200);
        } else {
            return Response::json(['success' => false], 403);
        }
    }

    public function updateImages(Request $request, $productId)
    {
        // Check if files are present in the request
        if (!isset($request["images"]) || !is_array($request["images"])) {
            return response()->json(['error' => 'No images uploaded'], 400);
        }

        $files = $request["images"]; // Directly access the images array

        $product = null;

        // Find the product
        if ($productId != "null")
           $product = Product::findOrFail($productId);
       
        // Process each uploaded image
        foreach ($files as $images) {
            foreach ($images as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->extension();
                $image->move(public_path('images'), $imageName);
                $fullPath = Env::get('APP_URL').'/images/' . $imageName;

                // Save the image path in the database
                if($product){
                    $product->images()->create([
                        'path' => $fullPath,
                    ]);
                }else{
                    $image = Image::create([
                        'path' => $fullPath,
                    ]);
                }
            }
        }

        // Return the updated list of images
        if($product)
        return response()->json(['images' => $product->images]);

        return response()->json(['images' => [$image]]);
    }

    public function removeImage($produitId , $imageId)
    {
        $image = Image::find($imageId);
        $image->delete();
        //unlink image
        $path = $image->path;
        // remove domain from path
        $path = str_replace(Env::get('APP_URL') . '/', '', $path);
        unlink($path);
        $product = Product::find($produitId);
        $image = $product->images()->get();
        return Response::json(['images' => $image], 200);
    }
}
