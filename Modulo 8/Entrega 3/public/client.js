const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json' // Inform the server the body format
        },
        body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
        });

        if (!response.ok) {
        // Handle HTTP error statuses (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json(); // Parse the JSON response from the server
        console.log('Success:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
};

const button = document.getElementById("btnLogin")
const inputemail = document.getElementById("emailLogin")
const inputpassword = document.getElementById("passLogin")
const buttonRegister = document.getElementById("btnRegister")
const inputemailRegister = document.getElementById("emailRegister")
const inputpasswordRegister = document.getElementById("passRegister")

if(button){
    button.addEventListener( "click", async event => {
        event.preventDefault();

        const email = inputemail.value;
        const password = inputpassword.value;

        const url = "http://localhost:3030/login";

        console.log(email)

        const data = {
            "email": email,
            "password": password
        }

        const respuesta = await postData(url, data);

        console.log(respuesta);

    } );
}

if(buttonRegister){
    buttonRegister.addEventListener( "click", async event => {
        event.preventDefault();

        const email = inputemailRegister.value;
        const password = inputpasswordRegister.value;

        const url = "http://localhost:3030/register";

        console.log(email)

        const data = {
            "email": String(email),
            "password": String(password)
        }

        const respuesta = await postData(url, data);

        console.log(respuesta);

    } );
}
