<?php

namespace App\Controllers;

// EnrollController.php
use App\Core\Controller;
use App\Core\Template;
use App\Models\EnrollModel;

class EnrollController extends Controller
{
    public function index()
    {
        $model = new EnrollModel();
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
            'services' => $model->get_services(),
            'modalities' => $model->get_modalities(),
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
}
