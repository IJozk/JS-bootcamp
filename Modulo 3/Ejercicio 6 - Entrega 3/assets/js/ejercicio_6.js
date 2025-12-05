// Requisitos minimos

const calcularPropina = ( montoTotal, porcentajePropina ) => {
    return montoTotal * ( porcentajePropina / 100 );
};

let total = "";
let porcentaje = "";

do{
    total = parseFloat(prompt("Ingrese el monto total de la cuenta:"));
}while(total <= 0 || isNaN(total));

do{
    porcentaje = parseFloat(prompt("Ingrese el porcentaje de propina que desea dejar:"));
}while(porcentaje < 0 || isNaN(porcentaje));


const propina = calcularPropina(total, porcentaje);

const resumen = `--- Resumen de la Cuenta ---
Monto de la cuenta: $${total}
Propina (${porcentaje}%): $${propina}
Total a pagar: $${total + propina}`;

console.log(resumen);

const resumenElemento = document.getElementById("detalleBoleta");

resumenElemento.innerHTML = `<h2>--- Resumen de la Cuenta ---</h2>
                            <br>
                            <ul>
                                <li>Monto de la cuenta: $${total}</li>
                                <li>Propina (${porcentaje}%): $${propina}</li>
                                <li>Total a pagar: $${total + propina}</li>`;