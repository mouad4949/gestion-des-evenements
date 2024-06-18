<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier;

class PanierController extends Controller
{   public function index()
    {
        try {
            $paniers = Panier::all();
            return response()->json($paniers);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    // public function destroy($id)
    // {
    //     $panier = Panier::find($id);

    //     if (!$panier) {
    //         return response()->json([
    //             'message' => 'Item not found'
    //         ], 404);
    //     }

    //     $panier->delete();

    //     return response()->json([
    //         'message' => 'Item deleted successfully'
    //     ], 200);
    // }
}