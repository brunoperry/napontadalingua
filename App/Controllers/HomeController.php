<?php

namespace App\Controllers;

// HomeController.php
use App\Core\Controller;
use App\Core\Template;
use App\Models\HomeModel;

class HomeController extends Controller
{
    public function index()
    {
        $model = new HomeModel();
        $gallery_images = $model->get_gallery();
        $services = $model->get_services();
        $about = $model->get_about();
        $contacts = $model->get_contacts();
        $networks = $model->get_networks();

        $data = [
            'css' => ['home', 'background'],
            'js' => ['home', 'background'],
            'start' => [
                'gallery' => $gallery_images,
                'card-title' => 'Inscrições abertas 2024/2025',
                'card-subtitle' => 'Inscrições abertas para:',
                'services' => $services
            ],
            'services' => $services,
            'about' => $about,
            'contacts' => $contacts,
            'networks' => $networks,
            'title' => 'Na Ponta da Língua - Centro de Estudos',
        ];
        Template::render('home', $data);
    }
}
