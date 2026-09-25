# API del Txoko (PHP + MySQL)

La app sigue siendo estática (React/Vite) y habla con una API PHP alojada en el mismo
hosting, bajo la carpeta `api/`. Al estar en el mismo dominio no hace falta CORS y la
sesión viaja en una cookie `HttpOnly`.

## Estructura

```
api/
  config.example.php   plantilla de configuración (copiar a config.php)
  config.php           credenciales reales (NO se sube a git)
  install.php          crea las tablas y el primer administrador
  schema.mysql.sql     esquema de la base de datos
  health.php           GET  -> comprueba PHP + conexión a la BBDD
  auth/login.php       POST {email, password} -> {user}
  auth/logout.php      POST -> {ok}
  auth/me.php          GET  -> {user|null}
  auth/password.php    POST {actual, nueva} -> {ok}
  lib/                 bootstrap, conexión PDO y helpers de sesión
```

## Puesta en marcha en el hosting

1. Sube el contenido de `dist/` y, junto a él, la carpeta `api/` completa:

   ```
   /txoko/index.html
   /txoko/assets/...
   /txoko/api/...
   ```

2. Copia `api/config.example.php` a `api/config.php` y rellena host, nombre de la base
   de datos, usuario y contraseña, además de un `install_token` largo y aleatorio.

3. Comprueba la conexión abriendo `https://tu-dominio/txoko/api/health.php`.
   Debe responder `{"ok":true,...}`.

4. Crea las tablas y el primer administrador:

   ```
   https://tu-dominio/txoko/api/install.php?token=TU_TOKEN&admin_email=tu@correo.com&admin_password=TuClaveSegura
   ```

5. **Borra `api/install.php`** del hosting.

6. Entra en `https://tu-dominio/txoko/` con ese correo y contraseña.

## Desarrollo en local

En una terminal:

```
npm run dev:api     # PHP en http://localhost:8000
```

En otra:

```
npm run dev         # Vite en http://localhost:5173, con /api redirigido al PHP
```

Necesitas PHP 8 con las extensiones `pdo_mysql` y una base de datos MySQL/MariaDB local;
`api/config.php` funciona igual en local (con tus datos locales) que en el hosting.

## Notas

- Las contraseñas se guardan con `password_hash` (bcrypt); nunca en claro.
- El service worker no cachea nada bajo `/api/`, para que los datos siempre sean frescos.
- `api/.htaccess` impide descargar `config.php` y el esquema desde el navegador.
