<?php

namespace App\Core;

use \PDO;
use \PDOException;

/**
 * Database class
 */
class Database
{
    private static string $query_id     = '';
    public int $affected_rows           = 0;
    public int $insert_id               = 0;
    public string $error                = '';
    public bool $has_error              = false;
    public $table_exists_db             = '';

    private function connect(): object
    {

        $name = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];
        $host = $_ENV['DB_HOST'];
        $driver = $_ENV['DB_DRIVER'];
        $port = $_ENV['DB_PORT'];
        $this->table_exists_db = $_ENV['DB_NAME'];

        try {
            $db_config = "$driver:host=$host;port=$port;dbname=$name";
            $con = new PDO($db_config, $user, $password);

            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            $error_code = $e->getCode();
            echo $name . '<br>';
            echo $user . '<br>';
            echo $password . '<br>';
            echo $host . '<br>';
            echo $driver . '<br>';
            echo $port . '<br>';
            if ($error_code == 1049) {

                echo 'Database not found, creating database...';
                try {
                    $db_config = "$driver:host=$host;port=$port";
                    $con = new PDO($db_config, $user, $password);
                    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $createDbQuery = "CREATE DATABASE $name";
                    $con->exec($createDbQuery);
                    echo "\n$name database created successfully";
                    echo "\n please run the migration again";
                    return $con;
                } catch (PDOException $e2) {
                    //throw $th;
                    dd('Error connecting to database: ' . $e->getMessage(), 'error');
                    die();
                }
                die();
            }
            dd('Error connecting to database: ' . $e->getMessage(), 'error');
            die();
        }

        return $con;
    }

    public function get_row(string $query, array $data = [], string $data_type = 'object')
    {

        $result = $this->query($query, $data, $data_type);
        if (is_array($result) && count($result) > 0) {
            return $result[0];
        }

        return false;
    }

    public function query(string $query, array $data = [], string $data_type = 'object'): bool|array
    {
        $this->error                 = '';
        $this->has_error             = false;
        $con = $this->connect();

        try {
            $stm = $con->prepare($query);
            $result = $stm->execute($data);
            $this->affected_rows     = $stm->rowCount();
            $this->insert_id         = $con->lastInsertId();
            if ($result) {
                if ($data_type == 'object') {
                    $rows = $stm->fetchAll(PDO::FETCH_OBJ);
                } else {
                    $rows = $stm->fetchAll(PDO::FETCH_ASSOC);
                }
            }
        } catch (PDOException $e) {
            $this->error                 = $e->getMessage();
            $this->has_error             = true;
            return ['status' => 401, 'error' => $this->error, 'query' => $query, 'data' => $data];
        }

        $arr = [];
        $arr['query'] = $query;
        $arr['data'] = $data;
        $arr['result'] = $rows ?? [];
        $arr['query_id'] = self::$query_id;
        self::$query_id = '';

        if (is_array($arr['result']) && count($arr['result']) > 0) return ['status' => 200, 'data' => $arr['result']];
        else return ['status' => 200, 'data' => []];
    }

    public function table_exists(string|array $mytables): bool
    {
        global $APP;

        if (empty($APP['tables'])) {

            $this->error                 = '';
            $this->has_error             = false;

            $con = $this->connect();

            $query = "SELECT TABLE_NAME AS tables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" . $this->table_exists_db . "'";

            $res = $this->query($query);
            $result = $APP['tables'] = $res['result'];
        } else {
            $result = $APP['tables'];
        }

        if ($result) {
            $all_tables = array_column($result, 'tables');

            if (is_string($mytables))
                $mytables = [$mytables];

            $count = 0;
            foreach ($mytables as $key => $table) {
                if (in_array($table, $all_tables))
                    $count++;
            }

            if ($count == count($mytables))
                return true;
        }

        return false;
    }
}
