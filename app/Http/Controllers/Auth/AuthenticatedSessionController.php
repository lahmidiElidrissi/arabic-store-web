<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $token = $request->user()->createToken('gusetToken')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }

    /**
     * Creates a guest user with a unique email and returns a JSON response with a generated token.
     *
     * @return \Illuminate\Http\Response
     */
    public function createGustUser()
    {
        // create guest user
        $guestUser = User::create([
            'name' => 'Guest',
            'password' => bcrypt('guest'),
            'email' => "guestmaroc@guest.com",
        ]);
        // set a unique email to the guest user
        $guestUser->update([
            'email' => "guest{$guestUser->id}@guest.com",
        ]);
        $token = $guestUser->createToken('gusetToken')->plainTextToken;
        return response()->json(['token' => $token]);
    }
}
