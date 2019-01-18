//Recogemos todos los elementos del formulario.
const formGroup = document.forms["formularioRegistro"];

// Array que establece si los campos han sido validados. False para obligatorios, true para opcionales.
var camposValidos = {
    "nombre": false,
    "apellido": false,
    "email": false,
    "trabajo": true,
    "jefe": true,
    "fechaContrato": true,
    "telefono": true,
    "salario": true,
    "contrasena": false,
    "confirmacionContrasena": false
};

// Patron para la fecha
const patronFecha = /^(\d{4}\/\d{1,2}\/\d{1,2})$/;

// Patron para el telefono
const patronTelefono = /^(6|7)(\d{8})$/;

// Patron para el campo del email.
const emailPattern = /^(\w+)([A-Za-z0-9-._]*)(@pufo.es)$/;

// Patron para la contraseña
const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;

// Campo para el nombre
const nombreInput = formGroup["nombre"];
nombreInput.addEventListener("keyup", () => {
    // Primero comprobamos que no tiene numeros
    let tieneNumeros = false;
    for (let i = 0; i < nombreInput.value.length; i++) {
        if (!isNaN(nombreInput.value[i])) {
            tieneNumeros = true;
            break;
        }
    }

    // Comprobamos la longitud de la cadena
    if (nombreInput.value.length > 15 || nombreInput.value.length < 2 || tieneNumeros) {
        nombreInput.style.border = "1px solid red";
        document.getElementById("nombreSpan").innerHTML = "Longitud entre 2 y 15 caracteres, no puede tener numeros.";
        camposValidos["nombre"] = false;
    } else {
        nombreInput.style.border = "1px solid green";
        document.getElementById("nombreSpan").innerHTML = "";
        camposValidos['nombre'] = true;
    }
});

//Campo para el apellido
const apellidoInput = formGroup["apellido"];
apellidoInput.addEventListener("keyup", () => {
    // Primero comprobamos que no tiene numeros
    let tieneNumeros = false;
    for (let i = 0; i < apellidoInput.value.length; i++) {
        if (!isNaN(apellidoInput.value[i])) {
            tieneNumeros = true;
            break;
        }
    }
    // Comprobamos la longitud de la cadena
    if (apellidoInput.value.length > 15 || apellidoInput.value.length < 2 || tieneNumeros) {
        apellidoInput.style.border = "1px solid red"; // Error
        document.getElementById("apellidoSpan").innerHTML = "Longitud entre 2 y 15 caracteres, no puede tener numeros.";
        camposValidos["apellido"] = false;
    } else {
        apellidoInput.style.border = "1px solid green";
        document.getElementById("apellidoSpan").innerHTML = "";
        camposValidos["apellido"] = true;
    }
});

// Campo para el email
const emailInput = formGroup["email"];
emailInput.addEventListener("keyup", () => {
    if (emailPattern.test(emailInput.value)) {
        emailInput.style.border = "1px solid green";
        document.getElementById("emailSpan").innerHTML = "";
        camposValidos['email'] = true;
    } else {
        emailInput.style.border = "1px solid red";
        document.getElementById("emailSpan").innerHTML = "Debe ser un email válido.";
        camposValidos['email'] = false;
    }
});

// Campo para el trabajo
const trabajoInput = formGroup["trabajo"];
trabajoInput.addEventListener("change", () => {
    console.log(trabajoInput.value);
    if (trabajoInput.value !== '0') {
        trabajoInput.style.border = "1px solid green";
        document.getElementById("trabajoSpan").innerHTML = "";
        camposValidos['trabajo'] = true;
    } else {
        trabajoInput.style.border = "1px solid red";
        document.getElementById("trabajoSpan").innerHTML = "Debes escoger un trabajo.";
        camposValidos['trabajo'] = false;
    }
});

// Campo para el Jefe
const jefeInput = formGroup["jefe"];
jefeInput.addEventListener("change", () => {
    if (jefeInput.value !== '0') {
        jefeInput.style.border = "1px solid green";
        document.getElementById("jefeSpan").innerHTML = "";
        camposValidos['jefe'] = true;
    } else {
        jefeInput.style.border = "1px solid red";
        document.getElementById("jefeSpan").innerHTML = "Debes escoger una opcion valida.";
        camposValidos['jefe'] = false;
    }
});

// Campo para la fecha
const fechaInput = formGroup['fechaContrato'];
fechaInput.addEventListener("change", () => {
    let fecha = new Date(fechaInput.value);

    let fechaHoy = new Date();

    let fechaMañana = new Date(fechaHoy.getFullYear() + '-' + (fechaHoy.getMonth() + 1) + '-' + (fechaHoy.getDate() + 1))

    let fechaMinima = new Date("2000-01-01");

    // Si la fecha actual es menor a la fehca minima, dará error
    if (fecha.getTime() - fechaMinima.getTime() < 0) {
        fechaInput.style.border = "1px solid red";
        document.getElementById("fechaContratoSpan").innerHTML = "Debes escoger una fecha mayor al 1 de Enero del 2000.";
        camposValidos['fecha'] = false;
    }// Si la fecha es mayor al dia en el que estamos, dará error también.
    else if ((fecha.getTime() - fechaMañana.getTime()) >= 0) {
        fechaInput.style.border = "1px solid red";
        document.getElementById("fechaContratoSpan").innerHTML = "Debes escoger una fecha menor al dia actual.";
        camposValidos['fecha'] = false;
    } else {
        fechaInput.style.border = "1px solid green";
        document.getElementById("fechaContratoSpan").innerHTML = "";
        camposValidos['fecha'] = true;
    }

});

// Campo para el numero
const telefonoInput = formGroup['telefono'];
telefonoInput.addEventListener('keyup', () => {
    if (patronTelefono.test(telefonoInput.value)) {
        telefonoInput.style.border = "1px solid green";
        document.getElementById("telefonoSpan").innerHTML = "";
        camposValidos['telefono'] = true;
    } else {
        telefonoInput.style.border = "1px solid red";
        document.getElementById("telefonoSpan").innerHTML = "Debe introducir un numero valido";
        camposValidos['telefono'] = false;
    }
});

// Campo para el salario
const salarioInput = formGroup['salario'];
salarioInput.addEventListener('keyup', () => {
    if (!numeroValido(salarioInput.value) || (parseFloat(salarioInput.value) > 12000) || (parseFloat(salarioInput.value) < 0)) {
        salarioInput.style.border = "1px solid red";
        document.getElementById("salarioSpan").innerHTML = "Debes introducir un numero.";
        camposValidos['salario'] = false;
    } else {
        salarioInput.style.border = "1px solid green";
        document.getElementById("salarioSpan").innerHTML = "";
        camposValidos['salrario'] = true;
    }
});

const contrasenaInput = formGroup['contrasena'];
contrasenaInput.addEventListener('keyup', () => {
    if (patronContrasena.test(contrasenaInput.value)) {
        contrasenaInput.style.border = "1px solid green";
        document.getElementById('contrasenaSpan').innerHTML = "";
        camposValidos['contrasena'] = true;
    } else {
        contrasenaInput.style.border = "1px solid red";
        document.getElementById('contrasenaSpan').innerHTML = "La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un simbolo.";
        camposValidos['contrasena'] = false;
    }
});

const confirmacionContrasenaInput = formGroup['confirmacionContrasena'];
confirmacionContrasenaInput.addEventListener('keyup', () => {
    if (confirmacionContrasenaInput.value === contrasenaInput.value) {
        confirmacionContrasenaInput.style.border = "1px solid green";
        document.getElementById("confirmacionContrasenaSpan").innerHTML = "";
        camposValidos['confirmacionContrasena'] = true;
    } else {
        confirmacionContrasenaInput.style.border = "1px solid red";
        document.getElementById('confirmacionContrasenaSpan').innerHTML = "Las contraseñas deben coincidir.";
        camposValidos['confirmacionContrasena'] = false;
    }
});

// Funcion para le boton de registrar
const inputButton = formGroup['inputButton'];
inputButton.addEventListener('click', () => {
    // Comprobamos todos los campos del array que almacena si los campos introducidos son validos.
    let formularioValido = false;
    for (var key in camposValidos) {
        if (!camposValidos[key]) {
            break; // Si hay algun campo en false, rompe el bucle.
        }
        formularioValido = true; // Si todas son true, establece la variable a true.
    }

    if (formularioValido) {
        // Creamos la cookie para el usuario
        crearCookie("email", emailInput.value, 365);
        // Creamos la cookie de la contraseña
        crearCookie("contraseña", contrasenaInput.value, 365);
        // Creamos la cookie para el nombre y el apellido
        crearCookie("nombre", nombreInput.value + " " + apellidoInput.value, 365);

        botonLogin = document.createElement("input");
        botonLogin.classList.add("submitButton");
        botonLogin.setAttribute("type","button");
        botonLogin.value = "Login";
        botonLogin.addEventListener("click", () => {
            window.location.assign("index.html");
        });
        document.querySelector("form").appendChild(botonLogin);
        document.getElementById("mensaje").innerHTML = "USUARIO REGISTRADO CORRECTAMENTE";
    } else {
        console.log("Formulario invalido");
    }
});

// Funcion que valida es un numero el string pasado.
function numeroValido(numero) {
    // Si en alguna posicion se encuentra con un caracter que no es u numero devolvera false.
    for (let i = 0; i < numero.length; i++) {
        if (isNaN(parseFloat(numero.charAt(i)))) return false;
    }
    // Si todo son numeros, devuelve true.
    return true;
}

// Funciones sobre cookies extraidas de https://geekytheory.com/gestion-de-cookies-en-javascript.

function crearCookie(clave, valor, diasexpiracion) {
    var d = new Date();
    d.setTime(d.getTime() + (diasexpiracion * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = clave + "=" + valor + "; " + expires;
}

function obtenerCookie(clave) {
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function comprobarCookie(clave) {
    var clave = obtenerCookie(clave);
    if (clave != "") return true;
}