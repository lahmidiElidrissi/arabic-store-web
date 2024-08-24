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

        $role = $request->user()->getRoleNames();

        $token = $request->user()->createToken('AuthToken' , [$role[0]] )->plainTextToken;

        return response()->json(['token' => $token , 'user' => $request->user() , 'isAdmin' =>  $request->user()->isAdmin() ]);
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
        $guestUser->assignRole('user');
        $token = $guestUser->createToken('gusetToken')->plainTextToken;
        return response()->json(['token' => $token]);
    }
}
