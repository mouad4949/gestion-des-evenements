<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Valider les données du formulaire
        // $credentials = $request->validate([
        //     'email' => 'required|email',
        //     'password' => 'required|min:8',
        // ]);
    
        // Récupérer l'utilisateur avec les informations d'identification fournies
        $user = User::where('email', $request->input('email'))->first();
        if ($user && Hash::check($request->input('password'), $user->password)) {
            return response()->json(['error' => 'LOGIN BAD zbi'], 500);
        } else {
            return response()->json(['error' => 'LOGIN BAD credentials'], 401);
        }
        
    
        
    }
    

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}

