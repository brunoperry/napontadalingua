<?php

namespace App\Core;

require 'App/Core/Migration.php';

/**
 * Modalities Class
 */
final class Modalities extends Migration
{
    public function up()
    {
        $this->add_column('id int unsigned auto_increment');
        $this->add_column('type varchar(255) null');
        $this->add_column('name varchar(100) null');
        $this->add_column('value varchar(100) null');
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
        $this->create_table('modalities');

        $this->add_data([
            'type' => 'monthly',
            'name' => '2x semana',
            'value' => '100€'
        ]);
        $this->add_data([
            'type' => 'monthly',
            'name' => '3x semana',
            'value' => '125€'
        ]);
        $this->add_data([
            'type' => 'monthly',
            'name' => '4x semana',
            'value' => '145€'
        ]);
        $this->add_data([
            'type' => 'monthly',
            'name' => '5x semana',
            'value' => '160€'
        ]);
        $this->add_data([
            'type' => 'daily',
            'name' => 'Manhãs/Tardes',
            'value' => '20€'
        ]);
        $this->insert('modalities');
    }

    public function down()
    {
        $this->drop_table('modalities');
    }
}
