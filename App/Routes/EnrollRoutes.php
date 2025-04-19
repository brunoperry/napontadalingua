<?php

namespace App\Routes;

use App\Core\Router;

Router::get('/enroll', 'EnrollController@index');
Router::post('/enroll', 'EnrollController@do_enroll');
