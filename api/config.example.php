<?php
// Copia este fichero como config.php y rellena los datos de tu hosting.
// config.php no se sube a git.

return [
    'db' => [
        'host' => 'localhost',
        'name' => 'nombre_de_la_base_de_datos',
        'user' => 'usuario',
        'pass' => 'contraseña',
        'charset' => 'utf8mb4',
    ],
    // Token de un solo uso para ejecutar install.php desde el navegador.
    // Cámbialo por una cadena larga y aleatoria; borra install.php al terminar.
    'install_token' => 'cambia-esto-por-algo-largo-y-aleatorio',
    // Muestra los errores en las respuestas de la API (solo en local).
    'debug' => false,
];
