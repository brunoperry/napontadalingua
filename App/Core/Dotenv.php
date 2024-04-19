<?php

//Dotenv.php
class Dotenv
{
    private string $filePath;
    private bool $env_exists = false;

    public function __construct()
    {
        $this->filePath = '.env';
        $this->env_exists = file_exists($this->filePath);
        if(!file_exists($this->filePath)) {
            die('No .env file found. Create a .env file');
        }
    }

    public function load(): void
    {
        if(!$this->env_exists) return;

        $lines = file($this->filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($lines as $line) {
            if ($this->isValidLine($line)) {
                list($name, $value) = explode('=', $line, 2);
                $this->setEnvironmentVariable($name, $value);
            }
        }
        // $this->setEnvironmentVariable('ROOT_URL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST']);
    }

    private function isValidLine(string $line): bool
    {
        $line = trim($line);
        return $line !== '' && $line[0] !== '#';
    }

    private function setEnvironmentVariable(string $name, string $value): void
    {
        $_ENV[$name] = $value;
        putenv("$name=$value");
    }
}