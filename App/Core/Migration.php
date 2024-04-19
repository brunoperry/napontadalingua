<?php

namespace App\Core;

require 'Database.php';

// Migration.php

class Migration extends Database
{
    private array $columns          = [];
    private array $keys             = [];
    private array $data             = [];
    private array $primary_keys     = [];
    private array $foreign_keys     = [];
    private array $unique_keys      = [];
    private array $full_text_keys   = [];

    public function create_table(string $table_name)
    {
        try {
            if (!empty($this->columns)) {

                $query = "CREATE TABLE IF NOT EXISTS $table_name (";

                $query .= implode(",", $this->columns) . ",";
                foreach ($this->primary_keys as $key) {
                    $query .= "PRIMARY KEY ($key),";
                }
                foreach ($this->keys as $key) {
                    $query .= "KEY ($key),";
                }
                foreach ($this->unique_keys as $key) {
                    $query .= "UNIQUE KEY $key ($key),";
                }
                foreach ($this->full_text_keys as $key) {
                    $query .= "FULLTEXT KEY $key ($key),";
                }

                $query = trim($query, ",");

                $query .= ") ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4";

                $res = $this->query($query);

                $this->columns          = [];
                $this->keys             = [];
                $this->data             = [];
                $this->primary_keys     = [];
                $this->foreign_keys     = [];
                $this->unique_keys      = [];
                $this->full_text_keys   = [];

                if ($res['status'] == 200) {
                    echo "\n\r Table $table_name created successfully!";
                } else {
                    $error = $res['error'];
                    echo $query;
                    return;
                    // echo "\n\r Error creating table: $table_name with error $error";
                }
            } else {
                echo "\n\r Column and data not found! Could not create table: $table_name";
            }
        } catch (\Throwable $th) {
            echo "\n\r Error creating table: $table_name";
        }
    }

    public function insert(string $table_name): void
    {
        if (!empty($this->data) && is_array($this->data)) {
            foreach ($this->data as $row) {
                $keys = array_keys($row);
                $columns_string = implode(",", $keys);
                $values_string = ':' . implode(",:", $keys);
                $query = "INSERT INTO $table_name ($columns_string) VALUES ($values_string)";
                $this->query($query, $row);
            }

            $this->data = [];
            echo "\n\r Data inserted successfully in Table: $table_name";
        } else {
            echo "\n\r Row data not found! No data inserted in table: $table_name";
        }
    }

    public function add_column(string $column): void
    {
        $this->columns[] = $column;
    }

    public function add_key(string $key): void
    {
        $this->keys[] = $key;
    }

    public function add_primary_key(string $primary_key): void
    {
        $this->primary_keys[] = $primary_key;
    }

    public function add_unique_key(string $key): void
    {
        $this->unique_keys[] = $key;
    }

    public function add_full_text_key(string $key): void
    {
        $this->full_text_keys[] = $key;
    }

    public function add_data(array $data): void
    {
        $this->data[] = $data;
    }

    public function drop_table(string $table_name)
    {
        $query = "DROP TABLE IF EXISTS $table_name ";
        $this->query($query);

        echo "\n\r Table $table_name deleted successfully!";
    }
}
