<?php

namespace App\Core;

require 'App/Core/Migration.php';

/**
 * Users Class
 */
final class Users extends Migration
{

    public function up()
    {
        $this->add_column('id int unsigned auto_increment');
        $this->add_column('fullname varchar(255) null');
        $this->add_column('role varchar(50) null');
        $this->add_column('uuid varchar(50) null');
        $this->add_column('gender int null');
        $this->add_column('school_year varchar(50) null');
        $this->add_column('next_of_kin varchar(50) null');
        $this->add_column('email varchar(100) null');
        $this->add_column('address text null');
        $this->add_column('pob varchar(50) null');
        $this->add_column('mobile varchar(50) null');
        $this->add_column('home_phone varchar(50) null');
        $this->add_column('work_phone varchar(50) null');
        $this->add_column('dob Date null');
        $this->add_column('cc varchar(50) null');
        $this->add_column('nif varchar(50) null');
        $this->add_column('sns varchar(50) null');
        $this->add_column('school text null');
        $this->add_column('notes text null');
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
        $this->create_table('users');

        $this->add_data([
            'fullname' => 'bruno perry',
            'email' => 'brunoperry@gmail.com',
            'gender' => 1,
            'role' => 'admin',
            'uuid' => generateShortUUID(),
            'date_created' => date('Y-m-d H:i:s')
        ]);
        $this->insert('users');
    }

    public function down()
    {
        $this->drop_table('users');
    }
}
