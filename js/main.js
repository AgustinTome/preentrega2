const usuariosRegistrados = [];
const materias = [];

// Menu de Bienvenida - Funcion
function mostrarMenuBienvenida() {
    const opcion = prompt(`Bienvenido a la Universidad Crypto. Por favor, inicia sesión para continuar:

1. Registrarte
2. Iniciar Sesión
3. Cerrar

Selecciona una opción:`);

    if (opcion === "1") {
        registrarte();
    } else if (opcion === "2") {
        iniciarSesion();
    } else if (opcion === "3") {
        alert("Gracias por ingresar!");
    } else {
        alert("Opción no válida. Por favor, selecciona una opción válida.");
        mostrarMenuBienvenida();
    }
}

// Registro de Usuario - Funcion Menu Bienvenida
function registrarte() {
    const nombreUsuario = prompt("Ingresa tu Usuario:");
    const contrasena = prompt("Ingresa tu Contraseña:");
    
    const confirmacion = prompt(`Nombre de Usuario: ${nombreUsuario}\nContraseña: ${contrasena}\n¿Estás de acuerdo? (SI/NO)`).toUpperCase();

    if (confirmacion === "SI") {
        usuariosRegistrados.push({ nombreUsuario, contrasena });
        alert("Usuario registrado");
        mostrarMenuBienvenida();
    } else {
        alert("Registro cancelado");
        mostrarMenuBienvenida();
    }
}

// Inicio de Sesion - Funcion Menu Bienvenida
function iniciarSesion() {
    if (usuariosRegistrados.length === 0) {
        alert("No se encuentran usuarios registrados. Por favor, regístrate primero.");
        mostrarMenuBienvenida();
    } else {
        let usuarioEncontrado = false;
        const nombreUsuario = prompt("Ingresa tu nombre de usuario:");
        const contrasena = prompt("Ingresa tu contraseña:");

        for (const usuario of usuariosRegistrados) {
            if (usuario.nombreUsuario === nombreUsuario && usuario.contrasena === contrasena) {
                usuarioEncontrado = true;
                alert("Inicio de sesión exitoso.");
                mostrarMenu();
                break; 
            }
        }

        if (!usuarioEncontrado) {
            alert("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
            mostrarMenuBienvenida();
        }
    }
}

// Menu de Materias - Funcion
function mostrarMenu() {
    const opcion = prompt(`Bienvenido a la plataforma de Alumnos:
1. Ingresar materia
2. Ver Materias
3. Cerrar Sesión

Selecciona una opción:`);

    if (opcion === "1") {
        ingresarMateria();
    } else if (opcion === "2") {
        mostrarHistorial();
    } else if (opcion === "3") {
        alert("Sesión cerrada.");
        mostrarMenuBienvenida();
    } else {
        alert("Opción no válida. Por favor, ingrese una opción válida.");
        mostrarMenu();
    }
}   

// Materias - Función para ingresar una materia
function ingresarMateria() {
    const materiaNombre = prompt("Ingrese el nombre de la materia");
    let notaPrimerTrimestre, notaSegundoTrimestre, notaTercerTrimestre;

    do {
        notaPrimerTrimestre = prompt("Ingrese nota del primer trimestre");
    } while (!validarNota(notaPrimerTrimestre));

    do {
        notaSegundoTrimestre = prompt("Ingrese nota del segundo trimestre");
    } while (!validarNota(notaSegundoTrimestre));

    do {
        notaTercerTrimestre = prompt("Ingrese nota del tercer trimestre");
    } while (!validarNota(notaTercerTrimestre));

    agregarMateria(
        materiaNombre,
        parseFloat(notaPrimerTrimestre),
        parseFloat(notaSegundoTrimestre),
        parseFloat(notaTercerTrimestre)
    );

    const respuesta = prompt("¿Desea agregar otra materia? (SI/NO)").toUpperCase();
    if (respuesta === "SI") {
        ingresarMateria();
    } else {
        mostrarMenu();
    }
}

// Materia - Funcion Agregar Historial
function agregarMateria(nombre, nota1, nota2, nota3) {
    const promedio = calcularPromedio(nota1, nota2, nota3);
    const estado = determinarEstado(promedio);

    const materia = {
        nombre: nombre,
        notas: [nota1, nota2, nota3],
        promedio: promedio,
        estado: estado
    };

    materias.push(materia);
}

// Materia - Funcion Historial
function mostrarHistorial() {
    if (materias.length === 0) {
        alert("No se ha ingresado ninguna materia.");
    } else {
        let historial = "Historial de Materias:\n";
        materias.forEach(materia => {
            historial += `Materia: ${materia.nombre}\n`;
            historial += `Promedio: ${materia.promedio.toFixed(2)}\n`;
            historial += `Estado: ${materia.estado}\n\n`;
        });
        historial += "Presione ACEPTAR para volver al menú principal.";
        alert(historial);
    }

    mostrarMenu();
}


function calcularPromedio(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

function determinarEstado(promedio) {
    return promedio >= 7 ? "Aprobada" : "Desaprobada";
}

function validarNota(entrada) {
    const nota = parseFloat(entrada);
    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("Ingresa un número entre 0 y 10.");
        return false;
    }
    return true;
}

mostrarMenuBienvenida();
