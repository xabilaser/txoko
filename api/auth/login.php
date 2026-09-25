<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

boot();
require_method('POST');

$body = request_body();
$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');

if ($email === '' || $password === '') {
    json_error('Introduce el correo y la contraseña', 422);
}

$socio = find_socio_by_email($email);
if ($socio === null || !password_verify($password, (string) $socio['password_hash'])) {
    usleep(300000);
    json_error('Credenciales incorrectas', 401);
}

if (password_needs_rehash((string) $socio['password_hash'], PASSWORD_DEFAULT)) {
    $stmt = db()->prepare('UPDATE socios SET password_hash = ? WHERE id = ?');
    $stmt->execute([password_hash($password, PASSWORD_DEFAULT), $socio['id']]);
}

login_socio($socio);
json_out(['user' => public_socio($socio)]);
