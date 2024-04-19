<?php
require 'App/Core/functions.php';
require 'App/Core/Dotenv.php';

spl_autoload_register(function ($class) {
    require  str_replace('\\', '/', $class) . '.php';
});

//Load enviroment vars
$dotenv = new Dotenv();
$dotenv->load();


define('PUBLIC_FOLDER', '/public');
define('ASSETS_FOLDER', 'App/assets');

// Load all route files
foreach (glob('App/Routes/*.php') as $routeFile) {
    require_once $routeFile;
}
