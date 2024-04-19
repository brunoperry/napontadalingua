<?php

namespace App\Core;

use App\Enums\Roles;

class Controller {
    protected  $user;
    
    protected function get_json_response(array $data): mixed {
        return json_encode($data);
    }
    protected function send_json_response(array $data):void {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    // protected function menu_data(): array {
    //     $data = [];

    //     if (
    //         $this->user->role_id == Roles::ROOT->value ||
    //         $this->user->role_id == Roles::SUPER_USER->value ||
    //         $this->user->role_id == Roles::ADMIN->value
    //     ) {

    //         $data['control_panel'] = ['name' => 'Painel de Controlo', 'url' => '/controlpanel', 'icon' => 'control_panel'];
    //         $data['registry'] = ['name' => 'Registo', 'url' => '/registry', 'icon' => 'edit_document'];
    //     }

    //     $data['Profile'] = ['name' => 'Perfil', 'url' => "/profile/{$this->user->id}", 'icon' => 'user'];
    //     $data['Settings'] = ['name' => 'Definições', 'url' => '/settings', 'icon' => 'settings'];
    //     $data['Signout'] = ['name' => 'Sair', 'url' => '/auth/signout', 'icon' => 'signout'];

    //     return $data;
    // }
}