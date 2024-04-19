<?php

namespace App\Core;

require 'App/Core/Migration.php';

/**
 * Contacts Class
 */
final class Contacts extends Migration
{

    public function up()
    {

        $this->add_column('id int unsigned auto_increment');
        $this->add_column('phone varchar(50) null');
        $this->add_column('mobile varchar(50) null');
        $this->add_column('email varchar(50) null');
        $this->add_column('address varchar(100) null');
        $this->add_column('district varchar(100) null');
        $this->add_column('pob varchar(100) null');
        $this->add_column('image varchar(100) null');
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
        $this->create_table('contacts');

        $this->add_data([
            'phone' => '212 488 110',
            'mobile' => '926 312 302',
            'email' => 'estudo@na-ponta-da-lingua.pt',
            'address' => 'Rua Antero de Figueiredo nº4D',
            'district' => 'Alvalade',
            'pob' => '1700-041 Lisboa',
            'image' => 'map.webp',
        ]);
        $this->insert('contacts');
    }

    public function down()
    {
        $this->drop_table('contacts');
    }
}
