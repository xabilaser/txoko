<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

boot();
require_method('GET');

$socio = current_socio();
json_out(['user' => $socio === null ? null : public_socio($socio)]);
