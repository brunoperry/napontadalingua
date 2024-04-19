<?php

namespace App\Core;
/**
 * Model class
 */
class Model extends Database 
{
    public string $order                    = 'desc';
    public string $order_column             = 'id';
    public string $primary_key              = 'id';

    public int $limit                       = 10;
    public int $offset                      = 0;
    public array $errors                    = []; 

    protected string $table                 = '';
    protected array $allowed_columns        = [];
    protected array $allowed_update_columns = [];

    public function where(array $where_array = [], array $where_not_array = [], string $data_type = 'object'): array|bool {

        $query = "select * from $this->table where ";

        if (!empty($where_array)) {
            foreach ($where_array as $key => $value) {
                $query .= $key . '= :' . $key . ' && ';
            }
        }

        if (!empty($where_not_array)) {
            foreach ($where_not_array as $key => $value) {
                $query .= $key . ' != :' . $key . ' && ';
            }
        }

        $query = trim($query, ' && ');
        $query .= " order by $this->order_column $this->order limit $this->limit offset $this->offset";

        $data = array_merge($where_array, $where_not_array);

        return $this->query($query, $data);
    }

    public function first(array $where_array = [], array $where_not_array = [], string $data_type = 'object'): object|bool {

        $res = $this->where($where_array, $where_not_array, $data_type);
        if (!empty($res['data']))
        return $res['data'][0];

        return false;
    }

    public function get_all(string $data_type = 'object'): array|bool {

        $query = "SELECT * FROM $this->table ORDER BY $this->order_column $this->order LIMIT $this->limit OFFSET $this->offset";
        return $this->query($query, [], $data_type);
        
    }

    public function insert(array $data):array|bool {

        if(!empty($this->allowed_columns)) {
            foreach ($data as $key => $value) {
                if(!in_array($key, $this->allowed_columns)) {
                    unset($data[$key]);
                }
            }
        }
        if(!empty($data)) {
            $keys = array_keys($data);
            $query = "INSERT INTO $this->table (" . implode(",",$keys) . ") VALUES (:" . implode(",:",$keys) . ")";
            return $this->query($query, $data);
        }

        return false;
    }

    public function update(string|int $_id, array $data):bool|array {
        
        if(!empty($this->allowed_update_columns) || !empty($this->allowed_columns)) {
            $this->allowed_update_columns = empty($this->allowed_update_columns) ? $this->allowed_columns : $this->allowed_update_columns;
            foreach ($data as $key => $value) {
                if(!in_array($key, $this->allowed_update_columns)) {
                    unset($data[$key]);
                }
            }
        }

        if(!empty($data)) {
            $query = "UPDATE $this->table SET ";
            foreach ($data as $key => $value) {
                $query .= $key . "= :" . $key . ",";
            }
            $query = trim($query, ",");
            $data['_id'] = $_id;
            $query .= " WHERE $this->primary_key = :_id";
            
            $res = $this->query($query, $data);
            return $res;
        }

        return false;
    }

    public function delete(string|int $_id):bool {
            $query = "DELETE FROM $this->table WHERE $this->primary_key = :_id LIMIT 1";
            return $this->query($query);
        return false;
    }
}
