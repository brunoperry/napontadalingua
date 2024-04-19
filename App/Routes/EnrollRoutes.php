<?php

namespace App\Routes;

use App\Core\Router;

Router::get('/enroll', 'EnrollController@index');
