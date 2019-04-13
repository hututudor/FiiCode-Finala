<?php

namespace App\Http\Controllers;

use App\Nephew;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NephewsController extends Controller
{
    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'github' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
            
        ]);
        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $nephew = new Nephew();
        $nephew->user_id = $user->id;
        $nephew->name = $request->name;
        $nephew->github = $request->github;
        $nephew->color = $request->color;

        $nephew->save();
        return response()->json(compact('nephew'), 200);
    }

    public function edit(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'github' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
        ]);
        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $nephew = Nephew::where('id', $request->id)->first();
        if(!$nephew){
            return response()->json('', 404);
        }
        if($nephew->user_id != $user->id){
            return response()->json('', 403);
        }
        $nephew->name = $request->name;
        $nephew->github = $request->github;
        $nephew->color = $request->color;
        $nephew->save();
        return response()->json(compact('nephew'), 200);
    }

    public function delete($id){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $nephew = Nephew::where('id', $id)->first();
        if(!$nephew){
            return response()->json('', 404);
        }
        if($nephew->user_id != $user->id){
            return response()->json('', 403);
        }
        $nephew->delete();
        return response()->json('', 200);
    }

    public function get($id){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $nephew = Nephew::where('id', $id)->first();
        if(!$nephew){
            return response()->json('', 404);
        }
        if($nephew->user_id != $user->id){
            return response()->json('', 403);
        }
        return response()->json(compact('nephew'), 200);
    }

    public function getall(){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $nephews = $user->nephews()->with('actions')->orderBy('points', 'created_at')->get();
        return response()->json(compact('nephews'), 200);
    }


}
