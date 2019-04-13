<?php

namespace App\Console\Commands;

use App\Action;
use App\Nephew;
use Illuminate\Console\Command;

class update extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:puncte';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'updates the points';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach(Action::all() as $action){
            $action->delete();
        }

        foreach(Nephew::all() as $nephew){
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

                    $this-> info(json_decode($response)[$i]->name);

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
                            for($j=0; $j<$n1; $j++){
                                $this-> info(json_decode($response1)[$j]->sha);
                            }
                        }
                       else $n1=0;
                        $suma = $suma + $n1;
                    }
                }
            }
            $suma = $suma + $n * 5;
            $this->info($suma);
            if($suma > $nephew->actions){
                $nephew-> points = $nephew-> points + $suma - $nephew->actions;
                $nephew->actions = $suma;
                $nephew -> save();
            }
        }
    }
}
