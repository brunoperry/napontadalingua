<?php

use App\Core\Session;

function dd($data, $type = 'message'): void
{

    $bcolor = '#444';
    $fcolor = 'white';
    switch ($type) {
        case 'message':
            $bcolor = '#444';
            break;
        case 'warning':
            $bcolor = '#ffc000';
            $fcolor = '#444';
            break;
        case 'error':
            $bcolor = '#ff0000';
            break;
    }
    echo '<pre><div style="background-color:' . $bcolor . '; color:' . $fcolor . '; padding:10px">';
    print_r($data);
    echo '</div></pre>';
}

function redirect($url): void
{

    header("Location: /$url");
    die;
}

function csrf(string $sesKey = 'csrf', int $hours = 1): string
{
    $key = '';

    $ses = new Session;
    $key = hash('sha256', time() . rand(0, 99));
    $expires = time() + ((60 * 60) * $hours);

    $ses->set($sesKey, [
        'key' => $key,
        'expires' => $expires
    ]);

    return "<input type='hidden' value='$key' name='$sesKey' />";
}

function icon(string $name, string $class = null): string | null
{
    $path = ASSETS_FOLDER . '/icons/' . $name . '.svg';
    if (file_exists($path)) {
        $svg = file_get_contents($path);
        if ($class) {

            $svgXml = simplexml_load_string($svg);

            if ($class == "content") {
                $svgMarkup = '<svg width="21" height="21" viewBox="0 0 21 21" fill="red">
    <circle cx="8.25" cy="8" r="7.5"/>
    <path d="M13.5 13.5L19.7498 20"/>
</svg>';

                // Encode the SVG markup for use in a data URI
                $encodedSvgMarkup = urlencode($svgMarkup);

                // Construct the data URI string
                $dataUri = 'data:image/svg+xml;utf8,' . $encodedSvgMarkup;

                // Output the data URI
                return $dataUri;
            }
            $svgXml = simplexml_load_string($svg);
            if ($svgXml !== false) {
                $svgXml['class'] = $class;
                $modifiedSvgContent = $svgXml->asXML();
                return $modifiedSvgContent;
            }
            return null;
        } else {
            return $svg;
        }
    }
    return null;
}
function image(string $name, string $class = null): string | null
{
    // $path = PUBLIC_FOLDER . 'public/images/' . $name;
    $path = 'public/images/' . $name;
    if (file_exists($path)) {
        $type = pathinfo($path, PATHINFO_EXTENSION);
        if ($type == 'svg') return file_get_contents($path);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        if ($class) {
            $elem = "<img src='{$base64}' class='{$class}' />";
        } else {
            $elem = "<img src='{$base64}' />";
        }
        return $elem;
    }
    return null;
}
function logo(bool $colored = true): string | null
{
    if ($colored) $name = 'logo_colored';
    else $name = 'logo';
    $path = ASSETS_FOLDER . '/images/' . $name . '.svg';

    if (file_exists($path))  return file_get_contents($path);
    return null;
}

function generateShortUUID()
{
    return substr(uniqid(), -8);
}

function csrf_verify(array $post, string $sesKey = 'csrf'): mixed
{

    if (empty($post[$sesKey])) return false;

    $ses = new Session;
    $data = $ses->get($sesKey);

    if (is_array($data)) {
        if ($data['key'] !== $post[$sesKey]) //return false;
            return ['key' => $data['key'], 'post' => $post[$sesKey]];

        if ($data['expires'] > time()) return true;

        $ses->pop($sesKey);
    }

    return false;
}
