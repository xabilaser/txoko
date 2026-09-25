<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

boot();
require_method('POST');

logout_socio();
json_out(['ok' => true]);
