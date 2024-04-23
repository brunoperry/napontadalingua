<npl-background class="npl-background">
    <?php
    $dir = "App/assets/icons/particles/";
    $files = glob($dir . "*.svg");
    $max_particles = 140;
    for ($i = 0; $i < $max_particles; $i++)
        echo file_get_contents($files[array_rand($files)]);
    ?>
</npl-background>