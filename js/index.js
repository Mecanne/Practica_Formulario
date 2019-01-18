const botonLogin = document.getElementById("login");
botonLogin.addEventListener("click", () => {
    var email = document.getElementById("email").value;
    var contraseña = document.getElementById("contraseña").value;
    if(obtenerCookie("email") === email && obtenerCookie("contraseña") === contraseña){
        window.location.assign("main.html");
    }else{
        document.getElementById("mensaje").innerHTML = "Usuario o conotraseña incorrectos";
    }
});

const botonRegistro = document.getElementById("registrar");
botonRegistro.addEventListener("click", () => {
    window.location.assign("registro.html");
});

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