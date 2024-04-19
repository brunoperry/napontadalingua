<div class="about-container">
    <div class="top">
        <img src="<?= PUBLIC_FOLDER . '/images/' . $data['about']->image ?>" alt="">
        <h2><?= $data['about']->title ?></h2>
        <p><?= $data['about']->description ?></p>
    </div>
    <div class="bottom">
        <h3><?= $data['about']->subtitle ?></h3>
        <ul>
            <?php foreach ($data['about']->points as $bullet) : ?>
                <li><?= $bullet ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>