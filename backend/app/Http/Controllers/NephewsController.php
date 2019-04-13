<?php

namespace App\Http\Controllers;

use App\Action;
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


        $suma = 0;
        $n=0; $n1=0;
        $curl = curl_init();

        curl_setopt_array($curl, array(

            CURLOPT_URL => "https://api.github.com/users/". $nephew->github ."/repos",

            CURLOPT_RETURNTRANSFER => true,

            CURLOPT_ENCODING => "",

            CURLOPT_TIMEOUT => 30000,

            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

            CURLOPT_CUSTOMREQUEST => "GET",

            CURLOPT_HTTPHEADER => array(
                'User-Agent: TinaSnipesU'
            ),

        ));

        $response = curl_exec($curl);

        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            $this->info($err);
        } else {
            $n= count(json_decode($response));
            for($i=0; $i<$n; $i++){
                $nume = json_decode($response)[$i]->name;

                $action = new Action();
                $action->nephew_id = $nephew->id;
                $action->value = json_decode($response)[$i]->name;
                $action->save();

                $n1=0;

                $curl1 = curl_init();

                curl_setopt_array($curl1, array(

                    CURLOPT_URL => "https://api.github.com/repos/". $nephew->github ."/". $nume . "/commits",

                    CURLOPT_RETURNTRANSFER => true,

                    CURLOPT_ENCODING => "",

                    CURLOPT_TIMEOUT => 30000,

                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

                    CURLOPT_CUSTOMREQUEST => "GET",

                    CURLOPT_HTTPHEADER => array(
                        'User-Agent: TinaSnipesU'
                    ),

                ));

                $response1 = curl_exec($curl1);

                $err1 = curl_error($curl1);

                curl_close($curl1);

                if ($err1) {
                    $this->info($err1);
                } else {
                    if(gettype(json_decode($response1)) == "array"){
                        $n1= count(json_decode($response1));
                    }

                    $suma = $suma + $n1;
                }
            }
        }
        $suma = $suma + $n * 5;
        if($suma > $nephew->actions){
            $nephew-> points = $nephew-> points + $suma - $nephew->actions;
            $nephew->actions = $suma;
            $nephew -> save();
        }

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
        $nephews = $user->nephews()->with('actiuni')->orderBy('points', 'created_at')->get();
        return response()->json(compact('nephews'), 200);
    }


}
