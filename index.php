<?php

use App\Core\Router;

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

require_once __DIR__ . '/App/bootstrap.php';

$USER_DATA = [];


Router::dispatch();