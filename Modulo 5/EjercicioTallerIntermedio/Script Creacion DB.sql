-- ============================================
-- TALLER PRACTICO SQL - MODULO 5
-- Prefijos:
-- VET_     Veterinaria
-- SALOON_ Salon de Belleza
-- EFE_     Trenes
-- ============================================

-- ================================
-- VETERINARIA (VET)
-- ================================

DROP TABLE IF EXISTS VET_pago_consulta, VET_consultas, VET_mascotas, VET_duenos CASCADE;

CREATE TABLE VET_duenos (
    id_dueno SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    telefono VARCHAR(20)
);

CREATE TABLE VET_mascotas (
    id_mascota SERIAL PRIMARY KEY,
    id_dueno INT NOT NULL REFERENCES VET_duenos(id_dueno),
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(20)
);

CREATE TABLE VET_consultas (
    id_consulta SERIAL PRIMARY KEY,
    id_mascota INT NOT NULL REFERENCES VET_mascotas(id_mascota),
    fecha DATE DEFAULT CURRENT_DATE,
    motivo VARCHAR(100)
);

CREATE TABLE VET_pago_consulta (
    id_pago SERIAL PRIMARY KEY,
    id_consulta INT NOT NULL REFERENCES VET_consultas(id_consulta),
    monto NUMERIC(10,2) CHECK (monto > 0)
);

INSERT INTO VET_duenos (nombre, telefono) VALUES
('Juan Perez','1111'),
('Ana Lopez','2222'),
('Pedro Soto','3333'),
('Maria Diaz','4444');

INSERT INTO VET_mascotas (id_dueno, nombre, especie) VALUES
(1,'Firulais','Perro'),
(1,'Misu','Gato'),
(2,'Rex','Perro'),
(3,'Luna','Gato');

INSERT INTO VET_consultas (id_mascota, motivo) VALUES
(1,'Vacunación'),
(2,'Control'),
(3,'Cirugía'),
(4,'Desparasitación');

INSERT INTO VET_pago_consulta (id_consulta, monto) VALUES
(1,20000),
(2,15000),
(3,80000),
(4,12000);

-- ================================
-- SALON DE BELLEZA (SALOON)
-- ================================

DROP TABLE IF EXISTS SALOON_ventas, SALOON_reservas, SALOON_servicios, SALOON_clientes CASCADE;

CREATE TABLE SALOON_clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE SALOON_servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(50),
    precio NUMERIC(10,2) CHECK (precio > 0)
);

CREATE TABLE SALOON_reservas (
    id_reserva SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES SALOON_clientes(id_cliente),
    fecha DATE,
    hora TIME
);

CREATE TABLE SALOON_ventas (
    id_venta SERIAL PRIMARY KEY,
    id_reserva INT REFERENCES SALOON_reservas(id_reserva),
    monto NUMERIC(10,2)
);

INSERT INTO SALOON_clientes (nombre) VALUES
('Carla'),
('Sofia'),
('Paula'),
('Daniela');

INSERT INTO SALOON_servicios (nombre_servicio, precio) VALUES
('Corte de pelo',15000),
('Uñas',12000),
('Alisado',50000),
('Tintura',30000);

INSERT INTO SALOON_reservas (id_cliente, fecha, hora) VALUES
(1,CURRENT_DATE,'10:00'),
(2,CURRENT_DATE,'11:00'),
(3,CURRENT_DATE,'12:00'),
(4,CURRENT_DATE,'13:00');

INSERT INTO SALOON_ventas (id_reserva, monto) VALUES
(1,15000),
(2,12000),
(3,50000),
(4,30000);

-- ================================
-- ITINERARIO DE TRENES (EFE)
-- ================================

DROP TABLE IF EXISTS EFE_usuarios, EFE_horarios, EFE_viajes, EFE_trenes CASCADE;

CREATE TABLE EFE_trenes (
    id_tren SERIAL PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE EFE_viajes (
    id_viaje SERIAL PRIMARY KEY,
    id_tren INT REFERENCES EFE_trenes(id_tren),
    origen VARCHAR(50),
    destino VARCHAR(50)
);

CREATE TABLE EFE_horarios (
    id_horario SERIAL PRIMARY KEY,
    id_viaje INT REFERENCES EFE_viajes(id_viaje),
    hora_salida TIME
);

CREATE TABLE EFE_usuarios (
    id_usuario SERIAL PRIMARY KEY,
    id_viaje INT REFERENCES EFE_viajes(id_viaje),
    nombre VARCHAR(50)
);

INSERT INTO EFE_trenes (nombre) VALUES
('Tren Norte'),
('Tren Sur'),
('Tren Central'),
('Tren Express');

INSERT INTO EFE_viajes (id_tren, origen, destino) VALUES
(1,'Santiago','La Serena'),
(2,'Santiago','Concepción'),
(3,'Valparaiso','Santiago'),
(4,'Santiago','Talca');

INSERT INTO EFE_horarios (id_viaje, hora_salida) VALUES
(1,'08:00'),
(2,'09:30'),
(3,'14:00'),
(4,'18:45');

INSERT INTO EFE_usuarios (id_viaje, nombre) VALUES
(1,'Carlos'),
(1,'Laura'),
(2,'Miguel'),
(3,'Sofia');
