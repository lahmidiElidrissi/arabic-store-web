<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

Route::get('/v1/login/google', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/v1/login/google/callback', function () {

        $googleUser = Socialite::driver('google')->stateless()->setHttpClient(new \GuzzleHttp\Client(['verify' => false]))->user();

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'password' => Hash::make("password"),
            ]
        );


        Auth::login($user);

        return response()->json([
            'token' => $user->createToken('authToken')->plainTextToken,
            'isAdmin' =>  $user->isAdmin()
        ]);
});