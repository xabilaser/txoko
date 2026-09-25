<?php

declare(strict_types=1);

require_once __DIR__ . '/lib/db.php';

boot();
require_method('GET');

db()->query('SELECT 1');
json_out(['ok' => true, 'php' => PHP_VERSION]);
