<?php

namespace App\Core;

require 'App/Core/Migration.php';

/**
 * Services Class
 */
final class Services extends Migration
{

    public function up()
    {

        $this->add_column('id int unsigned auto_increment');
        $this->add_column('name varchar(255) null');
        $this->add_column('long_desc text null');
        $this->add_column('short_desc text null');
        $this->add_column('available tinyint(1) unsigned default 1');
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
        $this->create_table('services');


        $this->add_data([
            'name' => 'Salas de estudo',
            'long_desc' => 'Na sala de estudo os alunos têm apoio transversal a todas as disciplinas. Ajudamos na resolução dos trabalhos de casa, na organização dos cadernos diários e na criação e de hábitos de estudo. Orientamos o trabalho fornecendo fichas de trabalho e exercícios adaptados. Respeitamos o ritmo de trabalho de cada aluno e a sua individualidade, definindo uma estratégia adequada a cada personalidade. Os encarregados de educação têm acesso ao trabalho diário dos alunos através da nossa plataforma.',
            'short_desc' => 'ajudamos o seu filho a melhorar o desempenho escolar',
            'available' => 1,
        ]);

        $this->add_data([
            'name' => 'Planos pontuais de estudo',
            'long_desc' => '- Explicações pontuais, em grupo ou individuais,  para preparação dos testes<br>- Planos de recuperação de notas, durante as férias<br>- Grupos de estudo intensivo para os exames',
            'short_desc' => 'reforça o conhecimento',
            'available' => 1,
        ]);

        $this->add_data([
            'name' => 'Explicações',
            'long_desc' => 'Explicações individuais do 1º ao 12º ano A cada aluno é realizada uma avaliação diagnostica. Mediante os resultados obtidos o explicador sugere um plano de trabalho personalizado que vai sendo adaptado ao longo do ano. O aluno tem um papel activo no decorrer das explicações de forma a torna-las mais apelativas.',
            'short_desc' => 'intensifica as aprendizagens',
            'available' => 1,
        ]);
        $this->insert('services');
    }

    public function down()
    {
        $this->drop_table('services');
    }
}
