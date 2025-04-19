<?php

namespace App\Controllers;

// EnrollController.php
use App\Core\Controller;
use App\Core\Template;
use App\Models\EnrollModel;
use App\Models\ModalitiesModel;
use App\Models\ServicesModel;

class EnrollController extends Controller
{
    public function index()
    {
        $serviceModel = new ServicesModel();
        $modalitiesModel  = new ModalitiesModel();
        $data = [
            'css' => [
                'enroll',
                'service_form',
                'modality_form',
                'timetable_form',
                'student_form',
                'tutor_form',
                'review',
                'form'
            ],
            'js' => 'enroll',
            'services' => $serviceModel->get_services(),
            'modalities' => $modalitiesModel->get_modalities(),
            'student_number' => $this->UUID(),
            'enroll_year' => date('Y') . '/' . (date('Y') + 1),
            'title' => 'Inscrição'
        ];
        Template::render('enroll', $data);
    }

    public function UUID(): string
    {
        $model = new EnrollModel();
        $uuids = $model->get_uuids();
        $uuid = generateShortUUID();
        $attempts = 0;
        while (in_array($uuid, $uuids)) {
            $uuid = generateShortUUID();
            $attempts++;
            if ($attempts > 1000) break;
        }
        return strtoupper($uuid);
    }

    public function do_enroll(): void
    {
        $post_data = $this->request->post();
        $this->send_json_response([
            'status' => 200,
            'data' => $post_data
        ]);
    }
}
