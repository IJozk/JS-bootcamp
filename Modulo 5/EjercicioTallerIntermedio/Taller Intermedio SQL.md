# 🧪 Taller Práctico Integrador de SQL – Módulo 5 (Nivel Intermedio)

## Introducción General

En este taller trabajarán como equipos de desarrollo de bases de datos, aplicando SQL a problemas reales.  
El docente entregará previamente **un script base de creación de tablas y carga inicial de datos**, que contiene tres contextos distintos dentro de una misma base de datos, separados por prefijos:

- `VET_` → Veterinaria **Los Cachorros**
- `SAL_` → Salón de Belleza **Nancy**
- `EFE_` → Empresa Ferroviaria **Tren Antártico**

Cada equipo puede:
- Elegir **un solo caso**
- O trabajar **dos o los tres casos**, según su ritmo

---

## Objetivo del Taller

Integrar todos los contenidos del módulo:

- Consultas SQL (SELECT)
- Funciones de agregación
- JOINs
- Manipulación de datos (DML)
- Transacciones y propiedades ACID

Trabajando **sobre un modelo de datos ya existente**, como ocurre en escenarios reales.

---

# 🐶 CASO 1: Veterinaria “Los Cachorros” (`VET_`)

### Contexto
La veterinaria necesita analizar las consultas realizadas a las mascotas, los pagos asociados y mantener actualizado su registro de atención.

---

## Parte A – Consultas Básicas (Dirigidas)

1. Listar todas las mascotas con su respectivo dueño.
2. Mostrar las consultas veterinarias realizadas en una fecha específica.
3. Listar los pagos realizados, ordenados por monto descendente.

---

## Parte B – Funciones de Agregación (Semi-dirigidas)

4. Calcular:
   - Total de consultas realizadas
   - Monto promedio de pago por consulta (`AVG`)
   - Pago mínimo y máximo (`MIN`, `MAX`)
5. Agrupar consultas por veterinario o tipo de atención (según modelo entregado).

---

## Parte C – JOINs (Dirigidas)

6. Crear una consulta con `INNER JOIN` que muestre:
   - Mascota
   - Dueño
   - Fecha de consulta
   - Monto pagado
7. Crear una consulta con `LEFT JOIN` que muestre mascotas **aunque no tengan consultas registradas**.

---

## Parte D – DML (A criterio del equipo)

8. Registrar una nueva consulta para una mascota.
9. Actualizar el monto de un pago.
10. Eliminar o marcar como anulada una consulta.

---

## Parte E – Transacciones (Dirigidas)

11. Crear una transacción que:
    - Registre una consulta
    - Registre su pago
    - Actualice un contador de consultas o ingresos
12. Simular un error y aplicar `ROLLBACK`.

---

# 💅 CASO 2: Salón de Belleza “Nancy” (`SAL_`)

### Contexto
El salón gestiona reservas de horas para distintos servicios y registra las ventas asociadas a cada atención.

---

## Parte A – Consultas Básicas (Dirigidas)

1. Listar todas las reservas con el nombre del cliente.
2. Mostrar los servicios disponibles y su valor.
3. Consultar las reservas de un día específico.

---

## Parte B – Funciones de Agregación (Semi-dirigidas)

4. Calcular:
   - Total de servicios realizados
   - Promedio de valor por servicio
   - Servicio más caro y más barato
5. Agrupar reservas por tipo de servicio.

---

## Parte C – JOINs (Dirigidas)

6. `INNER JOIN` entre:
   - Reservas
   - Clientes
   - Servicios
7. `LEFT JOIN` para mostrar clientes que aún no tienen reservas.

---

## Parte D – DML (A criterio del equipo)

8. Registrar una nueva reserva.
9. Actualizar el valor de un servicio.
10. Eliminar o cancelar una reserva.

---

## Parte E – Transacciones (Dirigidas)

11. Transacción que:
    - Inserte una reserva
    - Inserte una venta
    - Actualice un contador de servicios realizados
12. Probar `ROLLBACK` ante un error de inserción.

---

# 🚆 CASO 3: Tren Antártico (`EFE_`)

### Contexto
La empresa ferroviaria gestiona trenes, horarios, viajes y pasajeros que compran pasajes.

---

## Parte A – Consultas Básicas (Dirigidas)

1. Listar los trenes disponibles.
2. Mostrar los horarios asociados a cada tren.
3. Consultar los viajes disponibles en una fecha determinada.

---

## Parte B – Funciones de Agregación (Semi-dirigidas)

4. Calcular:
   - Total de viajes realizados
   - Cantidad promedio de pasajeros por viaje
   - Viaje con más y menos pasajeros
5. Agrupar usuarios por viaje.

---

## Parte C – JOINs (Dirigidas)

6. `INNER JOIN` entre:
   - Trenes
   - Horarios
   - Viajes
   - Usuarios
7. `LEFT JOIN` para mostrar viajes sin pasajeros.

---

## Parte D – DML (A criterio del equipo)

8. Registrar un nuevo pasajero en un viaje.
9. Actualizar la cantidad de asientos disponibles.
10. Eliminar o cancelar un viaje.

---

## Parte E – Transacciones (Dirigidas)

11. Transacción que:
    - Inserte un pasajero
    - Actualice disponibilidad del viaje
    - Actualice un contador de ventas o pasajeros
12. Simular sobreventa y ejecutar `ROLLBACK`.

---

## Entregables

- Un archivo SQL por cada caso trabajado:
  - `vet.sql`
  - `sal.sql`
  - `efe.sql`
- Cada archivo debe incluir:
  - SELECT
  - GROUP BY
  - AVG, MIN, MAX
  - INNER JOIN y LEFT JOIN
  - Transacciones con COMMIT y ROLLBACK
- Enviar todos los archivos en **un solo ZIP o RAR**.

---

## Evaluación

Se evaluará:
- Correcta aplicación de SQL
- Uso adecuado de JOINs y funciones
- Transacciones bien implementadas
- Claridad del código y comentarios
- Trabajo colaborativo
