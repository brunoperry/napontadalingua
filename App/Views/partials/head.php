<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($data['title']) ? $data['title'] : 'Na Ponta da Lingua'; ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Amiko:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/svg+xml" href="<?= PUBLIC_FOLDER ?>/images/ico.svg">
    <link rel="stylesheet" href="<?= PUBLIC_FOLDER ?>/css/style.css">
    <?php foreach ($cssFiles as $file) { ?>
        <link rel="stylesheet" href="<?= $file ?>">
    <?php } ?>
    <script type="module" src="<?= PUBLIC_FOLDER ?>/js/components.js"></script>
    <?php foreach ($jsFiles as $file) { ?>
        <script src="<?= $file ?>"></script>
    <?php } ?>
</head>

<body>