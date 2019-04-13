<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@authenticate');

// middleware for auth-only routes
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'AuthController@getAuthenticatedUser');

    Route::get('nephews/{id}', 'NephewsController@get');
    Route::get('nephews', 'NephewsController@getall');
    Route::post('nephews', 'NephewsController@add');
    Route::put('nephews/{id}', 'NephewsController@edit');
    Route::delete('nephews/{id}', 'NephewsController@delete');
});
