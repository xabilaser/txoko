<?php

declare(strict_types=1);

const TXOKO_API_DIR = __DIR__ . '/..';

function config(): array
{
    static $config = null;
    if ($config === null) {
        $path = TXOKO_API_DIR . '/config.php';
        if (!is_file($path)) {
            json_error('La API no está configurada: falta api/config.php', 500);
        }
        $config = require $path;
    }
    return $config;
}

function json_out(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function json_error(string $message, int $status = 400, array $extra = []): never
{
    json_out(['error' => $message] + $extra, $status);
}

function request_body(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);
    if (is_array($data)) {
        return $data;
    }
    return $_POST;
}

function require_method(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== $method) {
        json_error('Método no permitido', 405);
    }
}

function is_https(): bool
{
    if (($_SERVER['HTTPS'] ?? '') !== '' && strtolower((string) $_SERVER['HTTPS']) !== 'off') {
        return true;
    }
    return strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';
}

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    session_name('txoko_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => is_https(),
    ]);
    session_start();
}

function boot(): void
{
    $debug = (bool) (config()['debug'] ?? false);
    ini_set('display_errors', $debug ? '1' : '0');
    error_reporting(E_ALL);

    set_exception_handler(static function (Throwable $e) use ($debug): void {
        error_log('[txoko-api] ' . $e->getMessage());
        json_error($debug ? $e->getMessage() : 'Error interno del servidor', 500);
    });

    start_session();
}
