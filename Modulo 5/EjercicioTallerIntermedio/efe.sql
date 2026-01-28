-- Parte A – Consultas Básicas (Dirigidas)

-- * Listar los trenes disponibles.
SELECT * FROM efe_trenes;

-- * Mostrar los horarios asociados a cada tren.
SELECT et.nombre, eh.hora_salida FROM efe_horarios eh 
JOIN efe_viajes ev ON (eh.id_viaje = ev.id_viaje)
JOIN efe_trenes et ON (ev.id_tren = et.id_tren);

-- * Consultar los viajes disponibles en una fecha determinada.
SELECT * 
FROM efe_viajes ev 
JOIN efe_horarios eh 
ON( ev.id_viaje = eh.id_viaje)
WHERE hora_salida = '08:00:00';


-- Parte B – Funciones de Agregación (Semi-dirigidas)

-- Total de viajes realizados
SELECT COUNT(*) AS "TOTAL VIAJES" FROM efe_viajes;

-- Cantidad promedio de pasajeros por viaje
SELECT AVG(pasajeros) FROM (SELECT u.id_viaje, count(*) as pasajeros FROM efe_usuarios u JOIN efe_viajes v ON (u.id_viaje = v.id_viaje) GROUP BY u.id_viaje);

-- Viaje con más y menos pasajeros
SELECT 	MAX(pasajeros),
		MIN(pasajeros),
		MAX(CASE WHEN rn_max = 1 THEN viaje END) as viaje_max_pasajeros,
	    MAX(CASE WHEN rn_min = 1 THEN viaje END) as viaje_min_pasajeros
FROM (SELECT u.id_viaje as viaje, count(*) as pasajeros,
		ROW_NUMBER() OVER (ORDER BY count(*) DESC) as rn_max,
        ROW_NUMBER() OVER (ORDER BY count(*) ASC) as rn_min
		FROM efe_usuarios u 
		JOIN efe_viajes v ON (u.id_viaje = v.id_viaje) 
		GROUP BY u.id_viaje) 

-- Agrupar usuarios por viaje
SELECT ev.id_viaje as "Viaje",
		ev.origen as "Origen",
		ev.destino as "Destino",
		count(*)  as "Total pasajeros"
FROM efe_viajes ev 
JOIN efe_usuarios eu ON( eu.id_viaje = ev.id_viaje) 
GROUP BY "Viaje";


-- Parte C – JOINs (Dirigidas)

-- `INNER JOIN` entre: trene, horarios, usuarios y viajes
SELECT * 
FROM efe_viajes ev 
JOIN efe_usuarios eu ON( eu.id_viaje = ev.id_viaje)
JOIN efe_trenes et ON( ev.id_tren = et.id_tren)
JOIN efe_horarios eh ON( ev.id_viaje = eh.id_viaje)

-- `LEFT JOIN` para mostrar viajes sin pasajeros
SELECT * 
FROM efe_viajes ev 
LEFT JOIN efe_usuarios eu  ON( eu.id_viaje = ev.id_viaje)
LEFT JOIN efe_trenes et ON( ev.id_tren = et.id_tren)
LEFT JOIN efe_horarios eh ON( ev.id_viaje = eh.id_viaje);

-- Parte D – DML (A criterio del equipo)

-- Crear nuevo pasajero para pruebas
SELECT * FROM efe_usuarios;
INSERT INTO efe_usuarios(id_viaje, nombre) VALUES
(2, 'Pedro');

-- Actualizar la cantidad de asientos disponibles.
-- No existe campo para obtener esos datos.

-- Eliminar o cancelar un viaje.
DELETE FROM efe_viajes WHERE id_viaje = 4;



-- Parte E – Transacciones (Dirigidas)
--Transacción que:	- Inserte un pasajero
-- 					- Actualice disponibilidad del viaje
-- 					- Actualice un contador de ventas o pasajeros
BEGIN;

INSERT INTO efe_usuarios(id_viaje, nombre) 
VALUES
(2, 'Pedro');

UPDATE efe_viajes SET destino = 'Valparaiso' WHERE id_viaje = 2;

COMMIT;

-- Mostrar los cambios en una consulta
SELECT ev.id_viaje as "Viaje",
		ev.origen as "Origen",
		ev.destino as "Destino",
		count(*)  as "Total pasajeros"
FROM efe_viajes ev 
JOIN efe_usuarios eu ON( eu.id_viaje = ev.id_viaje) 
GROUP BY "Viaje";


-- Simular sobreventa y ejecutar `ROLLBACK`

BEGIN;

INSERT INTO efe_usuarios(id_viaje, nombre) 
VALUES
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro'),
(2, 'Pedro');

ROLLBACK;



