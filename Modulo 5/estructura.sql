-- 1. Creación de la Tabla Editoriales:

-- Crea una nueva tabla llamada Editoriales para almacenar la información de las casas editoriales.
-- La tabla debe tener las siguientes columnas:
CREATE TABLE Editoriales(
-- editorial_id: Debe ser un número de serie que se incremente automáticamente y funcione como la llave primaria (SERIAL PRIMARY KEY).
editorial_id SERIAL PRIMARY KEY,
-- nombre: Debe ser un texto de hasta 100 caracteres, no puede ser nulo y debe ser único (VARCHAR(100) NOT NULL UNIQUE).
nombre VARCHAR(100) NOT NULL UNIQUE,
-- pais_origen: Debe ser un texto de hasta 50 caracteres (VARCHAR(50)).
pais_origen VARCHAR(50) 
);


-- 2. Modificación de la Tabla Libros para incluir la Editorial:
--Para poder relacionar un libro con su editorial, necesitas modificar la tabla Libros.

-- Paso A: Agrega una nueva columna a la tabla Libros llamada editorial_id. El tipo de dato debe ser INTEGER.
ALTER TABLE libros ADD COLUMN editorial_id INTEGER;
-- Paso B: Agrega una restricción de llave foránea (FOREIGN KEY) a la nueva columna editorial_id para que apunte a la columna editorial_id de la tabla Editoriales.
ALTER TABLE libros ADD CONSTRAINT fk_libros_editoriales FOREIGN KEY (editorial_id) REFERENCES Editoriales(editorial_id);


-- 3. Puesta en Marcha (Poblando y Actualizando Datos):
-- Para que la nueva estructura sea útil, añade algo de información:

-- Paso A: Inserta dos editoriales en tu nueva tabla Editoriales. Por ejemplo: ('Planeta', 'España') y ('Sudamericana', 'Argentina').
INSERT INTO Editoriales (nombre, pais_origen)
VALUES 
('Catalonia', 'Chile'), 
('LOM', 'Chile');
-- Paso B: Asigna estas editoriales a algunos libros existentes. Actualiza la tabla Libros para que el libro 'Cien años de soledad' tenga la editorial_id de 'Sudamericana' y el libro 'Rayuela' tenga la editorial_id de 'Planeta'.
UPDATE libros SET editorial_id = 1 WHERE libro_id < 5;
UPDATE libros SET editorial_id = 2 WHERE libro_id >= 5;

select * from libros;


--  4. Modificando una Restricción:

-- El equipo ha decidido que el país de origen de una editorial es un dato obligatorio.
-- Modifica la columna pais_origen en la tabla Editoriales para que no acepte valores nulos (NOT NULL).
ALTER TABLE editoriales ALTER COLUMN pais_origen SET NOT NULL;


-- 5. Eliminación y Limpieza de Tablas:

-- A veces es necesario crear tablas temporales. Crea una tabla de prueba llamada Promociones_Verano con una única columna promo_id SERIAL PRIMARY KEY.
CREATE TABLE Promociones_Verano(
	promo_id SERIAL PRIMARY KEY
);
-- Ahora, elimina completamente la tabla Promociones_Verano de la base de datos.
DROP TABLE Promociones_Verano;

-- En un comentario en tu script, explica brevemente cuál es la diferencia entre usar DROP TABLE y TRUNCATE TABLE.
-- RESPUESTA: El DROP TABLE elimina una tabla completa de la DB, mientras que el TRUNCATE elimina la data de la tabla.