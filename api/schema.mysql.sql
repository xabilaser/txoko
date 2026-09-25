-- Esquema MySQL/MariaDB del Txoko.
-- Se puede ejecutar tal cual en phpMyAdmin o mediante api/install.php

CREATE TABLE IF NOT EXISTS socios (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  apodo VARCHAR(120) NULL,
  telefono VARCHAR(40) NULL,
  rol ENUM('admin_propietario','socio') NOT NULL DEFAULT 'socio',
  tipo_cuota ENUM('mensual_domiciliada','anual_pago_unico') NOT NULL DEFAULT 'mensual_domiciliada',
  es_euskaltegi TINYINT(1) NOT NULL DEFAULT 0,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS grupos (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS grupo_miembros (
  grupo_id VARCHAR(36) NOT NULL,
  socio_id VARCHAR(36) NOT NULL,
  PRIMARY KEY (grupo_id, socio_id),
  CONSTRAINT fk_gm_grupo FOREIGN KEY (grupo_id) REFERENCES grupos(id) ON DELETE CASCADE,
  CONSTRAINT fk_gm_socio FOREIGN KEY (socio_id) REFERENCES socios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reservas (
  id VARCHAR(36) PRIMARY KEY,
  fecha DATE NOT NULL,
  tipo ENUM('euskaltegi','libre','partido_athletic','satelite') NOT NULL,
  solicitante_id VARCHAR(36) NULL,
  estado ENUM('pendiente','confirmada','rechazada') NOT NULL DEFAULT 'pendiente',
  descripcion VARCHAR(255) NULL,
  grupo_id VARCHAR(36) NULL,
  modificado TINYINT(1) NOT NULL DEFAULT 0,
  colaboracion_satelite TINYINT(1) NOT NULL DEFAULT 0,
  INDEX idx_reservas_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS comensales (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  reserva_id VARCHAR(36) NOT NULL,
  socio_id VARCHAR(36) NULL,
  invitado_nombre VARCHAR(120) NULL,
  CONSTRAINT fk_comensales_reserva FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS productos (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  categoria VARCHAR(80) NULL,
  precio DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS consumos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  reserva_id VARCHAR(36) NOT NULL,
  producto_id VARCHAR(36) NOT NULL,
  cantidad INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_consumos_reserva FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS compras_reserva (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  reserva_id VARCHAR(36) NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  socio_id VARCHAR(36) NOT NULL,
  tipo ENUM('comida_cena','abastecimiento') NOT NULL,
  CONSTRAINT fk_compras_reserva FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faltas_despensa (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  reserva_id VARCHAR(36) NOT NULL,
  texto VARCHAR(255) NOT NULL,
  CONSTRAINT fk_faltas_reserva FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS liquidaciones (
  id VARCHAR(36) PRIMARY KEY,
  reserva_id VARCHAR(36) NOT NULL,
  socio_id VARCHAR(36) NOT NULL,
  saldo DECIMAL(10,2) NOT NULL,
  estado ENUM('pendiente','validado_admin','validado_socio_acreedor') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS turnos_auxiliares (
  id VARCHAR(36) PRIMARY KEY,
  tipo ENUM('trapero','abastecimiento','limpieza_interna') NOT NULL,
  socio_id VARCHAR(36) NOT NULL,
  inicio DATE NOT NULL,
  fin DATE NOT NULL,
  frecuencia VARCHAR(40) NULL,
  estado ENUM('pendiente','activo','completado') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS limpieza_externa (
  id VARCHAR(36) PRIMARY KEY,
  fecha DATE NOT NULL,
  reprogramado_desde DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS avisos (
  id VARCHAR(36) PRIMARY KEY,
  tipo ENUM('aviso_limpieza','reposicion','nota_general') NOT NULL,
  texto VARCHAR(500) NOT NULL,
  fecha DATETIME NOT NULL,
  dirigido_a_id VARCHAR(36) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
