<npl-gallery interval="5000">

    <div class="items">
        <?php foreach ($data['start']['gallery'] as $image) : ?>
            <div class="item" style="background-image: url(<?= PUBLIC_FOLDER ?>/images/<?= $image->image_url ?>);"></div>
        <?php endforeach; ?>
    </div>

    <div class="overlay">
        <div class="background"></div>
        <div class="card">
            <h2><?= $data['start']['card-title'] ?></h2>
            <h3><?= $data['start']['card-subtitle'] ?></h3>
            <ul>
                <?php foreach ($data['start']['services'] as $service) : ?>
                    <li><?= $service->name ?></li>
                <?php endforeach; ?>
            </ul>
            <div class="actions">
                <a onclick="window.open(this.href, '_blank', 'width=720,height=1024'); return false;" href="/enroll" class="orange">Inscreva-se já!</a>
                <a href="#" class="blue-outline">Visite-nos</a>
            </div>
        </div>
    </div>

</npl-gallery>