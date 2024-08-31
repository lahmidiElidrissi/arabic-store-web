<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Yajra\DataTables\Facades\DataTables;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::select("id","name")->get();
        return Response::json([
            "categories" => $categories
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
        return Response::json([
            "category" => Category::create($request->all()),
            "success" => true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return Response::json($category , 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->update($request->all());
        return Response::json([
            'success' => true,
            'status' => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return Response::json([
            "success" => true
        ]);
    }

    public function getData(Request $request)
    {

        $query = Category::query()->orderby("created_at", "desc");

        return DataTables::of($query)
            ->filter(function ($query) use ($request) {
                if (!empty($request['search'])) {
                    $searchValue = $request['search'];
                    $query->where('name', 'like', "%{$searchValue}%");
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
}
