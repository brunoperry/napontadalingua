<?php

namespace App\Core;

require 'App/Core/Migration.php';

/**
 * Networks Class
 */
final class Networks extends Migration
{

    public function up()
    {

        $this->add_column('id int unsigned auto_increment');
        $this->add_column('name varchar(255) null');
        $this->add_column('url varchar(255) null');
        $this->add_column('icon varchar(255) null');
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
        $this->create_table('networks');

        $this->add_data([
            'name' => 'facebook',
            'url' => 'https://www.facebook.com/na.ponta.da.lingua.sala.de.estudo',
            'icon' => 'facebook.svg'
        ]);
        $this->add_data([
            'name' => 'instagram',
            'url' => 'https://www.instagram.com/estudo_na.ponta.da.lingua/',
            'icon' => 'instagram.svg'
        ]);
        $this->add_data([
            'name' => 'whatsapp',
            'url' => 'https://web.whatsapp.com/send?phone=+351926312302',
            'icon' => 'whatsapp.svg'
        ]);
        $this->insert('networks');
    }

    public function down()
    {
        $this->drop_table('networks');
    }
}
