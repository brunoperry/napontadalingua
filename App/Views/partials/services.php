<?php foreach ($data['services'] as $key => $service) : ?>
    <article class="<?= ($key % 2 == 0) ? 'left' : 'right' ?>">
        <div class="top">
            <h2 class="num"><?= sprintf("%02d", $key + 1) ?></h2>
            <h3 class="title"><?= $service->name ?></h3>
            <h4 class="subtitle"><?= $service->short_desc ?></h4>
        </div>
        <div class="bottom">
            <img src="<?= PUBLIC_FOLDER . '/images/' . $service->image ?>" alt="">
            <p class="description"><?= $service->long_desc ?></p>
        </div>
    </article>
<?php endforeach; ?>