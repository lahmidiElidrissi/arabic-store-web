<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

use function PHPSTORM_META\map;

class OrderController extends Controller
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
        $userId = Auth::user()->id;
        $id = $request['id'];
        $fullName = $request['fullName'];
        $phone = $request['phone'];
        $adresse = $request['adresse'];
        $total = $request['total'];
        $products = $request['products'];

        $order = Order::create([
            'user_id' => $userId,
            'adresse' => $adresse,
            'phone' => $phone,
            'full_name' => $fullName,
            'total' => $total,
        ]);

        foreach ($products as $product) {
            if (isset($product['id']) && isset($product['pivot']['quantity'])) {
                $order->products()->attach($product['id'], ['quantity' => $product['pivot']['quantity']]);
            }
        }

        // Check if the card exists before deleting it
        if (Card::find($id) !== null) {
            Card::find($id)->delete();
        }

        return Response::json([
            "order" => $order,
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
