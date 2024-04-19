<?php

namespace App\Models;

use App\Core\Model;

/**
 * HomeModel Class
 */
final class HomeModel extends Model
{
    public string $table = 'home';
    public string $primary_key = 'id';

    public array $allowed_columns = [
        'column1',
        'date_created'
    ];
    public array $allowed_update_columns = [
        'column1',
        'date_updated',
        'date_deleted',
        'deleted'
    ];

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

    public function get_gallery(): array
    {
        $query = "SELECT * FROM gallery";
        return $this->query($query)['data'];
    }

    public function get_services(): array
    {
        $query = "SELECT * FROM services WHERE available= 1 ORDER BY order_index";
        return $this->query($query)['data'];
    }

    public function get_about(): object
    {
        $query = "SELECT * FROM about";
        $data = $this->query($query)['data'][0];
        $data->points = explode('|', $data->bullet_points);
        return $data;
    }
    public function get_contacts(): object
    {
        $query = "SELECT * FROM contacts";
        return $this->query($query)['data'][0];
    }

    public function get_networks(): array
    {
        $query = "SELECT * FROM networks WHERE deleted = 0";
        return $this->query($query)['data'];
    }
}
