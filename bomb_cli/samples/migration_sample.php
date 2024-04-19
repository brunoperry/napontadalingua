{PHP_TAG}

namespace App\Core;

require 'App/Core/Migration.php';

/**
* {CLASS_NAME} Class
*/
final class {CLASS_NAME} extends Migration {

public function up() {

$this->add_column('id int unsigned auto_increment');
$this->add_column('column1 varchar(255) null');
$this->add_column('column2 text null');
$this->add_column('deleted tinyint(1) unsigned default 0');
$this->add_column('date_created datetime default null');
$this->add_column('date_updated datetime default null');
$this->add_column('date_deleted datetime default null');

$this->add_primary_key('id');
$this->add_key('deleted');
$this->add_key('date_created');
$this->add_key('date_deleted');

/**
* More keys to add examples:
* $this->add_unique_key('column2');
* $this->add_full_text_key('column2');
*/
$this->create_table('{TABLE_NAME}');

/**
* To seed data example:
* $this->add_data([
* 'username'=>'bruno',
* 'email'=>'email@email.com',
* 'gender'=>'male'
* ]);
* $this->insert('{TABLE_NAME}');
*/
}

public function down() {
$this->drop_table('{TABLE_NAME}');
}
}