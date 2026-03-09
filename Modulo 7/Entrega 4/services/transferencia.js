const pool = require("../config/db"); // Importar la configuración de db.js

// ----------------------- FUNCIONES  -----------------------

// Función async para obtener tareas
const obtenerCuentas = async () => {
    try {
        const result = await pool.query("SELECT * FROM cuentas;");
        const cuentas = result.rows;
        // console.log(cuentas)
        return cuentas;
    } catch (e) {
        console.error("Error en la obstención de cuentas: ", e);
    }
};

//  TABLA cuentas
// ATRIBUTOS: id, titular, saldo

// Función async para insertar una nueva tarea
const realizarTransferencia = async (
        cuentaOrigenId,
        cuentaDestinoId,
        monto,
    ) => {
        const client = await pool.connect();
        try {
            // Se inicia la transacción con un begin
            await client.query("BEGIN");

            // Resta a la cuenta de origen del monto de la transferencia
            const sqlResta ="UPDATE cuentas SET saldo = saldo - $1 WHERE  id = $2  RETURNING id;";
            const valoresResta = [monto, cuentaOrigenId];
            const respuestaResta = await client.query(sqlResta, valoresResta);
            console.log(respuestaResta.rows[0].id);

            // Error al no encontrar cuenta de origen
            if (respuestaResta.rows[0].id !== cuentaOrigenId) {
                throw new Error(
                    "No se pudo realizar la resta de saldo a la cuenta de origen, cuenta no encontrada.",
                );
            }

            // Suma a la cuenta de destino del monto de la transferencia
            const sqlSuma ="UPDATE cuentas SET saldo = saldo + $1 WHERE  id = $2 RETURNING id;";
            const valoresSuma = [monto, cuentaDestinoId];
            const respuestaSuma = await client.query(sqlSuma, valoresSuma);
            console.log(respuestaResta.rows[0].id);

             // Error al no encontrar cuenta de destino
            if (respuestaSuma.rows[0].id !== cuentaDestinoId) {
                throw new Error(
                    "No se pudo realizar la suma de saldo a la cuenta de destino, cuenta no encontrada.",
                );
            }

            // Se realiza el commit de la operacion exitosa y se retorna el mensaje de exito
            await client.query("COMMIT");
            return `Se realizo la tranferencia con exito desde la cuenta ${cuentaOrigenId} --> a la cuenta ${cuentaDestinoId} , un monto de $${monto}`;
        } catch (e) {
            // Se realiza un rollback si se encuentra un error durante la transacción
            await client.query("ROLLBACK");
            return `No se pudo realizar la transferencia desde la cuenta ${cuentaOrigenId} --> a la cuenta ${cuentaDestinoId} , un monto de $${monto} \n Pe causa: ${e}`;
        } finally {
            if (client) {
            // Se libera el cliente
            client.release();
                console.log("Cliente liberado.");
            }
        }
};

module.exports = { obtenerCuentas, realizarTransferencia };