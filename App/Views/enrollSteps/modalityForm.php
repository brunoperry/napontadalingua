<div id="modalities" class="form-step" data-title="Escolha a modalidade">
    <div class="form-control">
        <div class="modality-type">
            <h4>Mensalidades <sup>1</sup></h4>
            <?php foreach ($data['modalities'] as $modality) : ?>
                <?php if ($modality->type != 'monthly') continue; ?>
                <label class="modality-item" for="<?= $modality->id ?>-modality">
                    <input type="radio" value="<?= $modality->id ?>" name="modality" id="<?= $modality->id ?>-modality" data-turns="<?= $modality->turns ?>">
                    <div class="modality-container">
                        <p class="name"><?= $modality->name ?></p>
                        <p class="value"><?= $modality->value ?></p>
                    </div>
                </label>
            <?php endforeach; ?>
            <span>IVA incluído à taxa em vigor</span>
        </div>
        <div class="modality-type">
            <h4>Dia a vulso</h4>
            <?php foreach ($data['modalities'] as $modality) : ?>
                <?php if ($modality->type != 'daily') continue; ?>
                <label class="modality-item" for="<?= $modality->id ?>-modality">
                    <input type="radio" value="<?= $modality->id ?>" name="modality" id="<?= $modality->id ?>-modality" data-turns="<?= $modality->turns ?>">
                    <div class="modality-container">
                        <p class="name"><?= $modality->name ?></p>
                        <p class="value"><?= $modality->value ?></p>
                    </div>
                </label>
            <?php endforeach; ?>
        </div>
    </div>
</div>