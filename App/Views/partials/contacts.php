<h2><?= $data['contacts']->title ?></h2>
<div class="contacts-container">
    <div>
        <h3><?= $data['contacts']->title ?></h3>
        <p><?= $data['contacts']->phone ?></p>
        <p><?= $data['contacts']->mobile ?></p>
        <p><?= $data['contacts']->email ?></p>
    </div>
    <div>
        <h3><?= $data['contacts']->subtitle ?></h3>
        <p><?= $data['contacts']->address ?></p>
        <p><?= $data['contacts']->district ?></p>
        <p><?= $data['contacts']->pob ?></p>
    </div>
    <div>
        <?= icon('logo_head', 'map') ?>
    </div>
</div>
<div class="bottom">
    <div class="networks-container">
        <?php foreach ($data['networks'] as $network) : ?>
            <a href="<?= $network->url ?>" target="_blank">
                <?= icon($network->icon) ?>
            </a>
        <?php endforeach; ?>
    </div>
    <span>napontadalingua.pt</span>
    <span><?= date('Y') . '/' . date('Y') + 1 ?></span>
</div>