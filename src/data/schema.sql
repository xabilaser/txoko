-- Socios
CREATE TABLE socios (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  apodo TEXT,
  telefono TEXT,
  rol TEXT CHECK (rol IN ('admin_propietario','socio')) NOT NULL,
  tipo_cuota TEXT CHECK (tipo_cuota IN ('mensual_domiciliada','anual_pago_unico')) NOT NULL,
  es_euskaltegi INTEGER NOT NULL DEFAULT 0
);

-- Grupos euskaltegi
CREATE TABLE grupos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL
);
CREATE TABLE grupo_miembros (
  grupo_id TEXT NOT NULL,
  socio_id TEXT NOT NULL,
  PRIMARY KEY (grupo_id, socio_id)
);

-- Reservas / Eventos
CREATE TABLE reservas (
  id TEXT PRIMARY KEY,
  fecha TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('euskaltegi','libre','partido_athletic','satelite')) NOT NULL,
  solicitante_id TEXT NOT NULL,
  estado TEXT CHECK (estado IN ('pendiente','confirmada','rechazada')) NOT NULL,
  descripcion TEXT,
  grupo_id TEXT,
  modificado INTEGER DEFAULT 0,
  colaboracion_satelite INTEGER DEFAULT 0
);

-- Comensales
CREATE TABLE comensales (
  reserva_id TEXT NOT NULL,
  socio_id TEXT,
  invitado_nombre TEXT
);

-- Productos
CREATE TABLE productos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria TEXT,
  precio REAL NOT NULL
);

-- Consumos
CREATE TABLE consumos (
  reserva_id TEXT NOT NULL,
  producto_id TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  subtotal REAL NOT NULL
);

-- Compras asociadas a la reserva
CREATE TABLE compras_reserva (
  reserva_id TEXT NOT NULL,
  importe REAL NOT NULL,
  socio_id TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('comida_cena','abastecimiento')) NOT NULL
);

-- Faltas de despensa
CREATE TABLE faltas_despensa (
  reserva_id TEXT NOT NULL,
  texto TEXT NOT NULL
);

-- Liquidaciones
CREATE TABLE liquidaciones (
  id TEXT PRIMARY KEY,
  reserva_id TEXT NOT NULL,
  socio_id TEXT NOT NULL,
  saldo REAL NOT NULL,
  estado TEXT CHECK (estado IN ('pendiente','validado_admin','validado_socio_acreedor')) NOT NULL
);

-- Turnos auxiliares
CREATE TABLE turnos_auxiliares (
  id TEXT PRIMARY KEY,
  tipo TEXT CHECK (tipo IN ('trapero','abastecimiento','limpieza_interna')) NOT NULL,
  socio_id TEXT NOT NULL,
  inicio TEXT NOT NULL,
  fin TEXT NOT NULL,
  frecuencia TEXT,
  estado TEXT CHECK (estado IN ('pendiente','activo','completado')) NOT NULL
);

-- Limpieza externa
CREATE TABLE limpieza_externa (
  id TEXT PRIMARY KEY,
  fecha TEXT NOT NULL,
  reprogramado_desde TEXT
);

-- Avisos / tablón
CREATE TABLE avisos (
  id TEXT PRIMARY KEY,
  tipo TEXT CHECK (tipo IN ('aviso_limpieza','reposición','nota_general')) NOT NULL,
  texto TEXT NOT NULL,
  fecha TEXT NOT NULL,
  dirigido_a_id TEXT
);
