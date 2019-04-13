<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nephew extends Model
{
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function actiuni(){
        return $this->hasMany(Action::class);
    }
}
