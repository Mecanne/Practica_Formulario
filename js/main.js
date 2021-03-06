if (!comprobarCookie("email")) {
    window.location.assign("index.html")
}

document.getElementById("mensaje").innerHTML = "Bienvenido " + obtenerCookie("nombre");


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

document.querySelector('button').addEventListener('click', function () {
    // Creamos la cookie para el usuario
    crearCookie("email", '', 1);
    // Creamos la cookie de la contraseña
    crearCookie("contraseña", '', 1);
    // Creamos la cookie para el nombre y el apellido
    crearCookie("nombre", '', 1);

    window.location.assign("index.html");
});