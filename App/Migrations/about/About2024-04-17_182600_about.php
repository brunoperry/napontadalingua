<?php

namespace App\Core;

require 'App/Core/Migration.php';

/**
 * About Class
 */
final class About extends Migration
{

    public function up()
    {

        $this->add_column('id int unsigned auto_increment');
        $this->add_column('description text null');
        $this->add_column('subtitle text null');
        $this->add_column('bullet_points text null');
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
        $this->create_table('about');


        $this->add_data([
            'description' => 'O centro de estudo Na Ponta da Língua é um espaço acolhedor e familiar, para alunos do 1º ao 12º ano. Propomos um ensino personalizado e humanista, que respeita a individualidade de cada criança. A relação de proximidade e diálogo que criamos com cada aluno, é fundamental para o seu crescimento confiante e autónomo. Temos como objectivo, ajudar os alunos a realizarem os seus sonhos e a crescerem felizes, tornando-se adultos responsáveis, conscientes e preparados para a vida. Seremos sempre um espaço tranquilo, de segurança e de lazer, onde proporcionamos momentos que permitam, a todos os alunos, serem pessoas felizes e responsáveis.',
            'subtitle' => 'Porquê escolher o centro de estudo  Na Ponta da Língua?',
            'bullet_points' => '15 anos de experiência profissional|somos parceiros dos pais e da escola|óptimos profissionais|as crianças sentem-se felizes connosco'
        ]);
        $this->insert('about');
    }

    public function down()
    {
        $this->drop_table('about');
    }
}
