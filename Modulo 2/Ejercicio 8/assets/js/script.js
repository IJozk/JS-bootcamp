$(document).ready(function () {

    // Observer para hacer visibles las secciones cuando entran en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar las secciones que necesitan animación de entrada
    document.querySelectorAll('.header-container, .cv-container').forEach(section => {
        observer.observe(section);
    });

    $("#botonSubmit").on("click", function () {
        // Obtener valores según los IDs del formulario en contacto.html
        const nombre = $('#validationCustom01').val();
        const apellido = $('#validationCustom02').val();
        const email = $('#validationCustomUsername').val();
        const ciudad = $('#validationCustom03').val();
        const region = $('#validationCustom04').val();
        const comentarios = $('#validationCustom05').val();
        const acuerdo = $('#invalidCheck').val();

        const myDiv  = $('#msj_val_1');
        const myDiv2 = $('#msj_val_2');
        const myDiv3 = $('#msj_val_3');
        const myDiv4 = $('#msj_val_4');
        const myDiv5 = $('#msj_val_5');
        const myDiv6 = $('#msj_val_6');
        const myDiv7 = $('#msj_val_7');
        const myDiv8 = $('#msj_val_8');

        myDiv8.html("")

        // Validar campos
        if ( nombre == "" ) {
            myDiv.html("<p class='text-danger'> El campo esta vacio, ingresa el  nombre</p>")
        }else{
            myDiv.html("")
        }
        if( apellido == "" ){
            myDiv2.html("<p class='text-danger' > El campo esta vacio, ingresa el  apellido</p>")
        }else{
            myDiv2.html("")
        }
        if( email == "" ){
            myDiv3.html("<p class='text-danger' > El campo esta vacio, ingresa el email </p>")
        }else{
            myDiv3.html("")
        }
        if( ciudad == "" ){
            myDiv4.html("<p class='text-danger' > El campo esta vacio, ingresa el ciudad </p>")
        }else{
            myDiv4.html("")
        }
        if( !region ){
            myDiv5.html("<p class='text-danger' > El campo esta vacio, ingresa el region </p>")
        }else{
            myDiv5.html("")
        }
        if( comentarios == "" ){
            myDiv6.html("<p class='text-danger' > El campo esta vacio, ingresa el comentarios " + comentarios +" </p>")
        }else{
            myDiv6.html("")
        }
        if ( !acuerdo ) {
            myDiv7.html("<p class='text-danger' > Debe aceptar el acuerdo de uso. </p>")
        }else{
            myDiv7.html("")
        }

        if( nombre != ""  && apellido != "" && email != "" && ciudad != "" && region != "" && comentarios != "" && acuerdo ){
            myDiv8.html("<p class='text-success' > Se ha enviado correctamente el cormulario</p>")
            // Datos a enviar
            const data = { nombre, apellido, email, ciudad, region, comentarios };
            console.log('Datos a enviar:', data);
        }

    })

    $('#invalidCheck').on("click", function () {
        if(myDiv7.text()  ){
            myDiv7.html("")
        }
    })

    $("#movSections li a").on("click", function (event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        event.stopPropagation(); // Detiene la propagación del evento

        let hash = this.hash;

        if (hash) {
            // Cierra el dropdown de Bootstrap manualmente
            $('.dropdown-menu').removeClass('show');

            $("html, body").stop().animate(
                {
                    scrollTop: $(hash).offset().top - 70
                },
                4000, // 1.5 segundos para un scroll más natural
                'swing',
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });

})
