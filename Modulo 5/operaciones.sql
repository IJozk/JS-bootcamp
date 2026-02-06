-- Tarea 1: Ingresando un nuevo autor y su libro

-- Inserta un nuevo autor en la tabla Autores. Elige el nombre y apellido que prefieras
INSERT INTO Autores (nombre, apellido, nacionalidad) VALUES
('Marcela', 'Paz', 'Chilena');

-- Usando el autor_id del autor que acabas de crear, inserta un nuevo libro en la tabla Libros que le pertenezca.
INSERT INTO Libros (titulo, genero, anio_publicacion, precio, stock, autor_id) VALUES
('Papelucho casi huérfano', 'Ficción', 1951, 9900.00, 18, 7);



-- Tarea 2: Actualizando información

-- El libro "Rayuela" ha subido de precio. Actualiza su precio a 29500.00
UPDATE libros 
SET precio = 29500.00
WHERE titulo = 'Rayuela';

-- La librería ha recibido un nuevo lote de libros del género 'Cuento'. 
-- Actualiza el stock de todos los libros de ese género, aumentando su valor actual en 5 unidades.
UPDATE libros 
SET stock = stock + 5
WHERE genero = 'Cuento';



-- Tarea 3: Borrando información

-- El cliente Juan Pérez ha devuelto el libro que compró. 
-- Busca en la tabla Ventas el registro correspondiente a la compra del libro 'La casa de los espíritus' por parte del cliente 'Juan Pérez' y elimínalo.

DELETE FROM ventas 
WHERE libro_id = (SELECT libro_id FROM libros WHERE titulo = 'La casa de los espíritus')
AND cliente_id = (SELECT cliente_id FROM clientes WHERE nombre = 'Juan' AND apellido = 'Pérez');



-- Tarea 4: Integridad Referencial en Acción

-- Intenta eliminar al autor 'Gabriel García Márquez' de la tabla Autores.
DELETE FROM autores 
WHERE nombre || ' ' || apellido = 'Gabriel García Márquez'

-- IMPORTANTE: La consulta fallará. 
-- En un comentario en tu script SQL, explica con tus propias palabras por qué PostgreSQL te impide eliminar a este autor.

-- Error obtenido

-- ERROR:  update o delete en «autores» viola la llave foránea «libros_autor_id_fkey» en la tabla «libros»
-- La llave (autor_id)=(1) todavía es referida desde la tabla «libros». 

-- SQL state: 23503
-- Detail: La llave (autor_id)=(1) todavía es referida desde la tabla «libros».

-- Explicación.

-- Esto sucede por que en la tabla libros existen libros cuyo registro estan relacionados con el autor que se quiere eliminar. Esto no es permitido,
-- ya que esos libros quedarian sin un autor lo que incumple la regla de la existencia obligatoria de un autor para un libro.



-- Tarea 5: Tareas de Transaccionalidad

-- Transacción Exitosa (COMMIT):
BEGIN;
-- Un cliente va a comprar el libro 'El Aleph'. Necesitas realizar dos acciones como una única operación atómica:
-- Disminuir el stock del libro 'El Aleph' en 1 unidad.
UPDATE libros SET stock = (stock - 1) WHERE titulo =  'El Aleph';

-- Registrar la venta en la tabla Ventas para el cliente_id 4 y el libro_id correspondiente a 'El Aleph', con la fecha actual.
INSERT INTO ventas(libro_id, cliente_id, fecha_venta, cantidad) VALUES( 6, 4, NOW(), 1);

COMMIT;
-- Escribe el bloque de código completo que inicie una transacción, ejecute ambas operaciones y luego la confirme.----



-- Tarea 6: Transacción Fallida (ROLLBACK):

-- Simula un escenario similar: un cliente quiere comprar 'La ciudad y los perros'.
-- Inicia una transacción.
BEGIN;

-- Disminuye el stock del libro en 1 unidad.
UPDATE libros SET stock = (stock - 1) WHERE titulo =  'La ciudad y los perros';

-- Justo después de actualizar el stock, te das cuenta de que hay un problema con el pago del cliente y la venta no puede continuar. 
-- Debes deshacer la operación de stock para que la base de datos quede en su estado original.
ROLLBACK;
-- Escribe el bloque de código completo que inicie la transacción, actualice el stock y luego la revierta.


SELECT * FROM autores; 
SELECT * FROM libros;
SELECT * FROM ventas;

