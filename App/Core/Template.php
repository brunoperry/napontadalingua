<?php

namespace App\Core;
// Template.php
class Template
{
    public static function render(string $view, array $data = [], $include_header = true): void
    {
        $cssFiles = [];

        if (isset($data['css'])) {
            if (is_array($data['css'])) {
                foreach ($data['css'] as $value) {
                    $cssFiles[] = PUBLIC_FOLDER . '/css/' . $value . '.css';
                }
            } else {
                $cssFiles[] = PUBLIC_FOLDER . '/css/' . $data['css'] . '.css';
            }
        }

        $jsFiles = [];
        if (isset($data['js'])) {
            if (is_array($data['js'])) {
                foreach ($data['js'] as $value) {
                    $jsFiles[] = PUBLIC_FOLDER . '/js/' . $value . '.js';
                }
            } else {
                $jsFiles[] = PUBLIC_FOLDER . '/js/' . $data['js'] . '.js';
            }
        }

        // Render the head
        include 'App/Views/partials/head.php';

        // Render the main content
        include "App/Views/$view.view.php";
    }
}
