<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

function find_socio_by_email(string $email): ?array
{
    $stmt = db()->prepare('SELECT * FROM socios WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $row = $stmt->fetch();
    return $row === false ? null : $row;
}

function find_socio_by_id(string $id): ?array
{
    $stmt = db()->prepare('SELECT * FROM socios WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    return $row === false ? null : $row;
}

function public_socio(array $socio): array
{
    return [
        'id' => $socio['id'],
        'email' => $socio['email'],
        'nombre' => $socio['nombre'],
        'apodo' => $socio['apodo'],
        'rol' => $socio['rol'],
        'tipoCuota' => $socio['tipo_cuota'],
        'esEuskaltegi' => (bool) $socio['es_euskaltegi'],
    ];
}

function login_socio(array $socio): void
{
    session_regenerate_id(true);
    $_SESSION['socio_id'] = $socio['id'];
}

function logout_socio(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
}

function current_socio(): ?array
{
    $id = $_SESSION['socio_id'] ?? null;
    if (!is_string($id)) {
        return null;
    }
    return find_socio_by_id($id);
}

function require_socio(): array
{
    $socio = current_socio();
    if ($socio === null) {
        json_error('No autenticado', 401);
    }
    return $socio;
}

function require_admin(): array
{
    $socio = require_socio();
    if ($socio['rol'] !== 'admin_propietario') {
        json_error('Permisos insuficientes', 403);
    }
    return $socio;
}
