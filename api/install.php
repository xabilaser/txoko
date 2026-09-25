<?php

declare(strict_types=1);

require_once __DIR__ . '/lib/db.php';

boot();

$token = (string) (config()['install_token'] ?? '');
if ($token === '' || $token === 'cambia-esto-por-algo-largo-y-aleatorio') {
    json_error('Define un install_token propio en config.php antes de instalar', 403);
}
if (!hash_equals($token, (string) ($_GET['token'] ?? ''))) {
    json_error('Token de instalación incorrecto', 403);
}

$sql = file_get_contents(__DIR__ . '/schema.mysql.sql');
if ($sql === false) {
    json_error('No se encuentra schema.mysql.sql', 500);
}

$sinComentarios = preg_replace('/^\s*--.*$/m', '', $sql) ?? '';
foreach (array_filter(array_map('trim', explode(';', $sinComentarios))) as $statement) {
    db()->exec($statement);
}

$created = null;
$email = strtolower(trim((string) ($_GET['admin_email'] ?? '')));
$password = (string) ($_GET['admin_password'] ?? '');

if ($email !== '' && $password !== '') {
    if (strlen($password) < 8) {
        json_error('La contraseña del administrador debe tener al menos 8 caracteres', 422);
    }
    $stmt = db()->prepare('SELECT COUNT(*) FROM socios WHERE email = ?');
    $stmt->execute([$email]);
    if ((int) $stmt->fetchColumn() === 0) {
        $stmt = db()->prepare(
            'INSERT INTO socios (id, email, password_hash, nombre, rol, tipo_cuota, es_euskaltegi)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            bin2hex(random_bytes(16)),
            $email,
            password_hash($password, PASSWORD_DEFAULT),
            (string) ($_GET['admin_nombre'] ?? 'Administrador'),
            'admin_propietario',
            'mensual_domiciliada',
            0,
        ]);
        $created = $email;
    }
}

json_out([
    'ok' => true,
    'tablas' => 'creadas o ya existentes',
    'admin_creado' => $created,
    'siguiente_paso' => 'Borra api/install.php del hosting',
]);
