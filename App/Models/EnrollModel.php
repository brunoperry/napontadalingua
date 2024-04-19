<?php

namespace App\Models;

use App\Core\Model;

/**
 * EnrollModel Class
 */
final class EnrollModel extends Model
{
    public string $table = 'enroll';
    public string $primary_key = 'id';

    protected array $allowed_columns = [
        'column1',
        'date_created'
    ];
    protected array $allowed_update_columns = [
        'column1',
        'date_updated',
        'date_deleted',
        'deleted'
    ];

    public function get_services(): array
    {
        $query = "SELECT * FROM services WHERE available= 1 ORDER BY order_index";
        $data = $this->query($query)['data'];

        foreach ($data as $key => $service) {
            $data[$key]->availability = $this->get_availability($service);
        }
        return $data;
    }
    public function get_availability(object $service): bool
    {
        return ($service->total_vacancies  / 2) > $service->num_enrolls;
    }

    public function get_modalities(): array
    {
        $query = "SELECT * FROM modalities WHERE deleted = 0";
        return $this->query($query)['data'];
    }

    public function get_uuids(): array
    {
        $query = "SELECT * FROM users";
        $data = $this->query($query)['data'];
        $uuids = [];
        foreach ($data as $value) $uuids[] = $value->uuid;
        return $uuids;
    }

    public function validate_insert(array $data): bool
    {

        if (empty($data['email'])) {
            $this->errors['email'] = 'Email is required';
        } else if ($this->first(['email' => $data['email']])) {
            $this->errors['email'] = 'Email already exists';
        } else if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = 'Valid email is required';
        }

        return empty($this->errors);
    }

    public function validate_update(array $data): bool
    {

        $email_arr = ['email' => $data['email']];
        $email_arr_not = [$this->primary_key => $data[$this->primary_key] ?? 0];

        if (empty($data['email'])) {
            $this->errors['email'] = 'Email is required';
        } else if ($this->first($email_arr, $email_arr_not)) {
            $this->errors['email'] = 'Email already exists';
        } else if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = 'Valid email is required';
        }

        return empty($this->errors);
    }
}
