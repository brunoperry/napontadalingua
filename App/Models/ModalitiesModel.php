<?php

namespace App\Models;

use App\Core\Model;

/**
 * ModalitiesModel Class
 */
final class ModalitiesModel extends Model
{
    public string $table = 'modalities';
    public string $primary_key = 'id';

    protected array $allowed_columns = [
        'name',
        'type',
        'value',
        'turns',
        'date_created'
    ];
    protected array $allowed_update_columns = [
        'name',
        'type',
        'value',
        'turns',
        'date_updated',
    ];

    public function get_modalities(): array
    {
        $query = "SELECT * FROM modalities WHERE deleted = 0";
        return $this->query($query)['data'];
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
