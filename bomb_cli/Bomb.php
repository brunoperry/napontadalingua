<?php

final class Bomb
{

    public function make(array $args): void
    {

        $action     = $args[1] ?? null;
        $class_name = $args[2] ?? null;

        if (empty($class_name)) {
            $this->message("You must provide a name for the new module.", "error");
            $this->message("See php bomb help for more info");
            die();
        }

        switch ($action) {
            case 'make:module':
                $this->create_controller($class_name);
                $this->create_model($class_name);
                $this->create_view($class_name);
                break;

            case 'make:model':
                $this->create_model($class_name);
                break;

            case 'make:migration':
                $this->create_migrate($class_name);
                break;

            case 'make:rollback':
                $this->remove_module($class_name);
                break;

            default:
                $this->message("You must provide a valid make action.", "error");
                $this->message("See php bomb help for more info");
                break;
        }
    }

    private function remove_module(string $module_name): void
    {

        $module_name = ucfirst($module_name);

        $model_file = "App/Models/" . ucfirst($module_name) . "Model.php";
        $view_file = "App/Views/" . $module_name . ".view.php";
        $controller_file = "App/Controllers/" . ucfirst($module_name) . "Controller.php";
        $route_file = "App/Routes/" . $module_name . "Routes.php";
        $css_file = "public/" . $module_name . ".css";
        $js_file = "public/" . $module_name . ".js";

        if (is_file($model_file)) {
            $this->message("Removing model file for $module_name");
            unlink($model_file);
        }
        if (is_file($view_file)) {
            $this->message("Removing view file for $module_name");
            unlink($view_file);
        }
        if (is_file($controller_file)) {
            $this->message("Removing controller file for $module_name");
            unlink($controller_file);
        }
        if (is_file($route_file)) {
            $this->message("Removing route file for $module_name");
            unlink($route_file);
        }
        if (is_file($css_file)) {
            $this->message("Removing css file for $module_name");
            unlink($css_file);
        }

        if (is_file($js_file)) {
            $this->message("Removing js file for $module_name");
            unlink($js_file);
        }

        if (is_dir("App/Migrations/$module_name")) {
            $this->message("Removing migration files for $module_name");
            $files = glob("App/Migrations/$module_name/*.php");
            if (!empty($files)) {
                foreach ($files as $file) {
                    unlink($file);
                }
            }
            rmdir("App/Migrations/$module_name");
        }
        $this->message("Module $module_name removed successfully!", "success");
    }

    private function create_controller(string $controller_name): void
    {
        if (file_exists("App/Controllers/" . $controller_name . "controller.php")) {
            $this->message("Controller " . $controller_name . "Controller.php already exists", "warning");
            return;
        }

        /* COPY FILES */
        $file_sample = "bomb_cli/samples/controller_sample.php";
        if (file_exists($file_sample)) {
            $file_name = "App/Controllers/" . ucfirst($controller_name) . "Controller.php";
            copy($file_sample, $file_name);

            $content = file_get_contents($file_sample);
            $content = str_replace("{PHP_TAG}", '<?php', $content);
            $content = str_replace("{CLASS_NAME}", ucfirst($controller_name) . "Controller", $content);
            $content = str_replace("{VIEW_NAME}", strtolower($controller_name), $content);
            file_put_contents($file_name, $content);
            $this->message("Controller file created!", "success");
        } else {
            $this->message("Controller sample file missing!", "error");
        }

        $file_sample = "bomb_cli/samples/route_sample.php";
        if (file_exists($file_sample)) {
            $file_name = "App/Routes/" . ucfirst($controller_name) . "Routes.php";
            copy($file_sample, $file_name);

            $content = file_get_contents($file_sample);
            $content = str_replace("{PHP_TAG}", '<?php', $content);
            $content = str_replace("{CLASS_NAME}", ucfirst($controller_name) . "Controller", $content);
            file_put_contents($file_name, $content);
            $this->message("Route file created!", "success");
        } else {
            $this->message("Route sample file missing!", "error");
        }
    }

    private function create_model(string $model_name): void
    {
        if (file_exists("App/Models/" . $model_name . "model.php")) {
            $this->message("Model " . $model_name . "Model.php already exists", "warning");
            return;
        }
        /* COPY FILES */
        $file_sample = "bomb_cli/samples/model_sample.php";
        if (file_exists($file_sample)) {
            $file_name = "App/Models/" . ucfirst($model_name) . "Model.php";
            copy($file_sample, $file_name);

            $content = file_get_contents($file_sample);
            $content = str_replace("{PHP_TAG}", '<?php', $content);
            $content = str_replace("{CLASS_NAME}", ucfirst($model_name) . "Model", $content);
            $content = str_replace("{TABLE_NAME}", strtolower($model_name), $content);
            file_put_contents($file_name, $content);
            $this->message("Model file created!", "success");
        } else {
            $this->message("Model sample file missing!", "error");
        }
    }

    private function create_view(string $view_name): void
    {
        if (file_exists("App/Views/" . $view_name . ".view.php")) {
            $this->message("View " . $view_name . ".view.php already exists", "warning");
            return;
        }
        /* COPY FILES */
        $file_sample = "bomb_cli/samples/view_sample.php";
        if (file_exists($file_sample)) {
            $file_name = "App/Views/" . $view_name . ".view.php";
            copy($file_sample, $file_name);

            $content = file_get_contents($file_sample);
            $content = str_replace("{PHP_TAG}", '<?php', $content);
            $content = str_replace("{VIEW_NAME}", ucfirst($view_name), $content);
            file_put_contents($file_name, $content);
            $this->message("View file created!", "success");
        } else {
            $this->message("View sample file missing!", "error");
        }

        $file_sample = "bomb_cli/samples/css_sample.css";
        if (file_exists($file_sample)) {
            $file_name = "public/css/" . $view_name . ".css";
            copy($file_sample, $file_name);
            $this->message("CSS file created!", "success");
        } else {
            $this->message("CSS sample file missing!", "error");
        }
        $file_sample = "bomb_cli/samples/js_sample.js";
        if (file_exists($file_sample)) {
            $file_name = "public/js/" . $view_name . ".js";
            copy($file_sample, $file_name);
            $this->message("JS file created!", "success");
        } else {
            $this->message("JS sample file missing!", "error");
        }
    }

    private function create_migrate(string $migration_name): void
    {

        if (empty($migration_name)) {
            $this->message('Please provide a valid class name for the migration file.', 'error');
            return;
        }
        if (file_exists("App/Migrations/" . $migration_name . ".php")) {
            $this->message("Migration " . $migration_name . ".php already exists", "warning");
            return;
        }

        $folder = "App/Migrations/" . $migration_name;
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        /* COPY FILES */
        $file_sample = "bomb_cli/samples/migration_sample.php";
        if (file_exists($file_sample)) {
            $migration_name = ucfirst($migration_name);

            $table_name = strtolower($migration_name);
            $content = file_get_contents($file_sample);
            $content = str_replace("{PHP_TAG}", '<?php', $content);
            $content = str_replace("{TABLE_NAME}", $table_name, $content);
            $content = str_replace("{CLASS_NAME}", $migration_name, $content);

            $filename = $folder . "/" . $migration_name . date("Y-m-d_His") . "_$table_name.php";
            file_put_contents($filename, $content);
            $this->message("Migration file created!", "success");
        } else {
            $this->message("Migration sample file missing!", "error");
            return;
        }
    }

    public function migrate(array $args)
    {

        $action     = $args[1] ?? null;
        $folder     = $args[2] ?? null;
        $file_name  = $args[3] ?? null;

        if ($action == "migrate" || $action == 'migrate:rollback') {

            $folder = "App/Migrations/$folder";
            if (!is_dir($folder)) {
                $this->message("No migration folder found: $folder", "error");
                return;
            }
            if (!empty($file_name)) {
                //run the file

                $file = $folder . $file_name;
                $this->message("Migrating file: $file");


                require_once $file;

                $class_name = basename($file);
                preg_match("/[a-zA-Z]+\.php$/", $class_name, $match);
                $class_name = ucfirst(str_replace(".php", "", $match[0]));

                $the_class = new ("\Migration\\$class_name");

                if ($action == "migrate") {
                    $the_class->up();
                } else {
                    $the_class->down();
                }

                $this->message("Migration complete: $file_name", "success");
            } else {
                //run all files from folder
                $files = glob($folder . '/*.php');
                if (!empty($files)) {
                    foreach ($files as $file) {

                        require_once $file;

                        $class_name = basename($file);
                        preg_match("/[a-zA-Z]+\.php$/", $class_name, $match);

                        $class_name = ucfirst(str_replace(".php", "", $match[0]));
                        $class_name = "App\\Core\\$class_name";

                        $the_class = new $class_name;

                        if ($action == "migrate") {
                            $the_class->up();
                        } else {
                            $the_class->down();
                        }
                    }
                    $this->message("Migration complete!", "success");
                } else {
                    $this->message("No migration files found in folder: $folder", "error");
                }
            }
        } else if ($action == 'migrate:refresh') {

            $this->migrate(['bomb', 'migrate:rollback', $folder, $file_name]);
            $this->migrate(['bomb', 'migrate', $folder, $file_name]);
        }
    }

    public function help(array|string $version): void
    {
        echo "

        \e[44m BOMB PHP v$version Command Line Tool\033[0m

        Database:
            migrate             Runs a migration from a specific module folder.
            migrate:refresh     Does a rollback followed by a migration.
            migrate:rollback    Runs the 'down' method for a migration in the specified module folder.

        Generators:
            make:module         Generates a new folder with all essential module files.
            make:migration      Generates a new migration file.
            make:model          Generates a new model file.
            make:rollback       Removes all the module files.
        ";
    }

    private function message(string $msg, string $type = "message"): void
    {

        switch ($type) {
            case "message":
                $msg = "\n\e[34m " . $msg;
                break;
            case "success":
                $msg = "\n\e[32m " . $msg;
                break;
            case "error":
                $msg = "\n\e[31m " . $msg;
                break;
            case "warning":
                $msg = "\n\e[33m " . $msg;
                break;
        }

        echo "\n\r$msg\033[0m";
        // ob_flush();
    }
}
