<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Session;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Card $card)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Card $card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        //
    }

    public function getProducts(Request $request)
    {
        $user = $request->user();
        $card = $user->card;
        if ($card != null){
            $products = $card->products;
            // with images
            $products->load('images');
        }

        return Response::json([
            "products" => ( !empty($products) ) ? $products : [],
            "cardId" => ( $card != null ) ? $card->id : null
        ], 200);
    }

    public function addProductToCard(Request $request , $id)
    {
        $user = $request->user();
        $card = $user->card ?? Card::create(['user_id' => $user->id]);
        $product = Product::find($id);
        if (!$card->products->contains($product)) {

            $card->products()->attach($product);
            $product->load('images');
            $product->pivot = $card->products()->where('product_id', $product->id)->first()->pivot;
            return Response::json([
                "product" => $product,
                "cardId" => $card->id
            ], 200);

        } else {
            return Response::json([
                "product" => null
            ], 200);
        }
    }

    public function removeProductFromCard(Request $request ,$id)
    {
        $user = $request->user();
        $card = $user->card;
        $card->products()->detach($id);
        return Response::json([
            "id" => $id
        ], 200);
    }

    public function updateProductQuantity(Request $request, $id, $quantity)
    {
        $user = $request->user();
        $card = $user->card;
        $pivot = $card->products()->wherePivot('product_id', $id)->first()->pivot;
        $pivot->update(['quantity' => intval($quantity)]);
        return Response::json([
            "quantity" => $quantity,
            "id" => $id
        ], 200);
    }
}
