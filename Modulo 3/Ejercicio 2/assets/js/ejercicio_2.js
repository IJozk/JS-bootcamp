const boton = document.getElementById("btncalcular")

boton.addEventListener("click", function(event){
    event.preventDefault();
    
    let nombre = prompt("Ingresa tu nombre: ")
    let nombre_snack = prompt("Ingresa nombre del snack: ")
    let precio = Number(prompt("Ingrese precio del snack: "))
    let cant = Number(prompt("Ingrese la cantidad que desee: "))
    let subtotal = precio * cant

    alert(`Estimado/a ${nombre}, el subtotal de su compra es ${subtotal}`)

    if (subtotal > 5000){
        alert(`El monto de su compra supera los $5.000. Se ha aplicado un descuento de  ${Math.round(subtotal*.1)}, el total de su compra es de $${Math.round(subtotal*.9)}`)
    }else{
        alert(`El monto de su compra no supera los $5.000. El total de su compra es de $${subtotal}`)
    }

    const detalleprods = document.getElementById("detalleprods")
    const detalleDesc = document.getElementById("descuentos")
    const detalleTotal = document.getElementById("total")

    detalleprods.innerHTML = `<tr> <th scope="row">${nombre_snack}</th>
                    <td>${precio}</td>
                    <td>${cant}</td>
                    <td>${precio*cant}</td>
                    </tr>`

    if (subtotal > 5000){
        detalleDesc.innerHTML = `<div class="row justify-content-end">
                                    <div class="col-6"><p>Descuento aplicado en la compra: </p></div>
                                    <div class="col-6"><p>$${Math.round(subtotal*0.1)}</p></div>
                                </div>`
        detalleTotal.innerHTML = `<div class="row justify-content-end">
                                    <div class="col-6"><p>Total a Pagar: </p></div>
                                    <div class="col-6"><p>$${Math.round(subtotal*0.9)}</p></div>
                                </div>`
    }else{
        detalleDesc.innerHTML = `<div class="row justify-content-end">
                                    <div class="col-6"><p>Descuento aplicado en la compra: </p></div>
                                    <div class="col-6"><p>$0</p></div>
                                </div>`
        detalleTotal.innerHTML = `<div class="row justify-content-end">
                                    <div class="col-6"><p>Total a Pagar: </p></div>
                                    <div class="col-6"><p>$${subtotal}</p></div>
                                </div>`
    }
})





