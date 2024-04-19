<?php

namespace App\Core;

class Route {

    public $path;
    public $controller;
    public $middlewares = [];
    public $params = [];

    public function __construct(string $path, string $controller) {
        $this->path = $path;
        $this->controller = $controller;
    }

    public function middleware(array $middlewares): Route {
        $this->middlewares = $middlewares;
        return $this;
    }

    public function withParams(array $params): Route {
        $this->params = $params;
        return $this;
    }
}


class Router {
    private static $routes = [];

    public static function get(string $path, string $controller): Route {
        $route = new Route($path, $controller);
        self::$routes['GET'][$path] = $route;
        return $route;
    }

    public static function post(string $path, string $controller): Route {
        $route = new Route($path, $controller);
        self::$routes['POST'][$path] = $route;
        return $route;
    }

    public static function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = $_SERVER['REQUEST_URI'];

        if (array_key_exists($method, self::$routes)) {
            foreach (self::$routes[$method] as $routePath => $route) {

                $pattern = preg_replace('/\//', '\/', $routePath);
                $pattern = '/^' . preg_replace('/\{([a-zA-Z]+)\}/', '(?<$1>[^\/]+)', $pattern) . '$/';

                if (preg_match($pattern, $path, $matches)) {
                    $controller = $route->controller;
                    if (!empty($route->middlewares)) {
                        foreach ($route->middlewares as $middleware) {
                            $middlewareInstance = new $middleware;
                            $middlewareInstance->handle($controller, function () use ($controller, $matches) {

                                self::callController($controller, $matches);
                            });
                        }
                    } else {
                        self::callController($controller, $matches);
                    }
                    return;
                }
            }
        }

        Template::render('404');
    }

    public static function callController(string $controller, array $params = []): void {
        list($controllerName, $method) = explode('@', $controller);
        $controllerName = 'App\\Controllers\\' . $controllerName;
        $controllerObj = new $controllerName();
        $controllerObj->$method($params);
    }
}
