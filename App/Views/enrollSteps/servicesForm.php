<div id="services" class="form-step" data-title="Escolha o Serviço">
    <div class="form-control-h">
        <?php foreach ($data['services'] as $service) : ?>
            <label class="service-card" for="<?= $service->alias ?>-service">
                <input type="radio" value="<?= $service->alias ?>" name="service" id="<?= $service->alias ?>-service">
                <div class="service-container">
                    <?= image($service->image, 'img') ?>
                    <h3 class="title"><?= $service->name ?></h3>
                    <p class="desc"><?= $service->short_desc ?></p>
                    <div class="status"></div>
                </div>
                <span><?= $service->availability ? "" : "Poucas vagas!" ?></span>
            </label>
        <?php endforeach; ?>
    </div>
</div>