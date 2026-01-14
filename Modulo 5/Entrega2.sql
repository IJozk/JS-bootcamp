-- EJERCICIOS
-- 1. Encuentra todos los libros escritos por el autor con autor_id = 1.
SELECT * FROM libros WHERE autor_id = 1;

-- 2.  Lista el titulo y precio de todos los libros, ordenados por precio de mayor a menor.
SELECT titulo, precio FROM libros ORDER BY precio desc;

-- 3. Encuentra todos los libros del género 'Novela' que tengan un stock mayor a 5.
SELECT * FROM libros WHERE genero = 'Novela' AND stock > 5;

-- 4. Busca todos los clientes cuyo apellido contenga la letra 'a'.
SELECT * FROM clientes WHERE LOWER(apellido) LIKE '%a%';

-- 5. Calcula el número total de libros en la tabla Libros.
SELECT COUNT(*) as "Cantidad libros" FROM libros;

-- 6. Encuentra qué géneros de libros tienen un precio promedio mayor a $20.000.
SELECT genero, 
	TO_CHAR(ROUND(AVG(precio)), '$999G999') as "Promedio Precios" 
FROM libros 
GROUP BY genero 
HAVING AVG(precio) > 20000;

-- 7. Muestra el título de cada libro junto con el nombre y apellido de su autor.
SELECT lb.titulo as "Libro", 
	CONCAT(au.nombre, ' ',au.apellido) as "Autor" 
FROM libros lb 
JOIN autores au ON (lb.autor_id = au.autor_id);

-- 8. Lista todos los autores y, si han escrito un libro en nuestra base de datos, muestra el título del libro. Si no han escrito ninguno, debe mostrar al autor de todas formas.
SELECT CONCAT(au.nombre, ' ',au.apellido) as "Autor", 
	lb.titulo as "Libro"  
FROM autores au 
LEFT JOIN libros lb ON (lb.autor_id = au.autor_id);

-- 9. Muestra el nombre del cliente, el título del libro que compró y la fecha de la venta.
SELECT CONCAT(nombre, ' ',apellido),
	lb.titulo,
	ve.fecha_venta
FROM clientes cl 
JOIN ventas ve ON (cl.cliente_id = ve.cliente_id)
JOIN libros lb ON (lb.libro_id = ve.libro_id)

-- 10. Encuentra los títulos de los libros que han sido vendidos (es decir, que existen en la tabla Ventas). Utiliza una subconsulta para resolverlo.
SELECT venta_id,
	(SELECT titulo FROM libros WHERE libro_id = ve.libro_id)
FROM ventas ve;