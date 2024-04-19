{PHP_TAG}

namespace App\Controllers;

// {CLASS_NAME}.php
use App\Core\Controller;
use App\Core\Template;

class {CLASS_NAME} extends Controller {
    public function index() {
        Template::render('{VIEW_NAME}', ['css' => '{VIEW_NAME}', 'js' => '{VIEW_NAME}']);
    }
}