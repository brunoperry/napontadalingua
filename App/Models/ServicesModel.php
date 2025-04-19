<?php

namespace App\Models;

use App\Core\Model;

/**
 * ServicesModel Class
 */
final class ServicesModel extends Model
{
    public string $table = 'services';
    public string $primary_key = 'id';

    protected array $allowed_columns = [
        'name',
        'long_desc',
        'short_desc',
        'vacancies',
        'num_enrolls',
        'alias',
        'available',
        'date_created'
    ];
    protected array $allowed_update_columns = [
        'name',
        'long_desc',
        'short_desc',
        'vacancies',
        'num_enrolls',
        'alias',
        'available',
        'date_updated',
    ];

    public function get_services(): array
    {
        $query = "SELECT * FROM $this->table WHERE available= 1 ORDER BY order_index";
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
        if (empty($data['name'])) {
            $this->errors['name'] = 'Service name is required';
        }

        return empty($this->errors);
    }

    public function validate_update(array $data): bool
    {

        return empty($this->errors);
    }
}
