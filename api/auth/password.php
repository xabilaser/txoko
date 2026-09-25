<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

boot();
require_method('POST');

$socio = require_socio();
$body = request_body();
$actual = body_string($body, 'actual');
$nueva = body_string($body, 'nueva');

if (!password_verify($actual, (string) $socio['password_hash'])) {
    json_error('La contraseña actual no es correcta', 401);
}
if (strlen($nueva) < 8) {
    json_error('La nueva contraseña debe tener al menos 8 caracteres', 422);
}

$stmt = db()->prepare('UPDATE socios SET password_hash = ? WHERE id = ?');
$stmt->execute([password_hash($nueva, PASSWORD_DEFAULT), $socio['id']]);

json_out(['ok' => true]);
