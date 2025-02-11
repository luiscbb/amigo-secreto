let listaNombresSecretos = [];
let nombresMax = 10;

function asignarTextoElemento(etiqueta, texto) {
    let etiquetaF = document.querySelector(etiqueta);
    etiquetaF.textContent = texto;
    return;
}

document.addEventListener('DOMContentLoaded', function () {
    agregarNombresAmigos();
    document.getElementById('sortearAmigo').addEventListener('click', sortearAmigo);
});

function agregarNombresAmigos() {
    const anadirAmigo = document.getElementById('anadirAmigo');
    asignarTextoElemento('h2', `Ingresa ${nombresMax} amigos para iniciar el sorteo`);

    anadirAmigo.addEventListener('click', function () {
        const nombreAmigo = document.getElementById('amigo').value.trim();

        // Validar si el campo está vacío
        if (nombreAmigo === "") {
            alert('El campo está vacío. Por favor, ingresa un nombre.');
            return;
        }

        // Validar si el nombre ya existe en la lista
        if (listaNombresSecretos.includes(nombreAmigo)) {
            alert('El nombre de amigo ya existe. Por favor, ingresa un nombre diferente.');
            limpiarCaja();
            return;
        }

        // Validar si se ha alcanzado el límite de nombres
        if (listaNombresSecretos.length >= nombresMax) {
            alert(`Ya has ingresado ${nombresMax} amigos. No puedes agregar más.`);
            return;
        }

        // Agregar el nombre a la lista
        listaNombresSecretos.push(nombreAmigo);
        limpiarCaja();

        // Mostrar mensaje de éxito
        asignarTextoElemento('h2', `Nombre agregado: ${nombreAmigo}`);

        // Deshabilitar campos si se alcanza el límite
        if (listaNombresSecretos.length === nombresMax) {
            document.querySelector('#amigo').setAttribute('disabled', true);
            document.querySelector('#anadirAmigo').setAttribute('disabled', true);
            asignarTextoElemento('h2', `¡Has ingresado ${nombresMax} amigos! Ahora puedes iniciar el sorteo.`);
        }
    });
}

function sortearAmigo() {
    const sortearAmigoBtn = document.getElementById('sortearAmigo');

    // Si no hay amigos, reiniciar el juego
    if (listaNombresSecretos.length === 0) {
        reiniciarJuego();
        return;
    }

    // Generar un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * listaNombresSecretos.length);

    // Obtener el nombre sorteado
    const amigoSorteado = listaNombresSecretos[indiceAleatorio];

    // Mostrar el resultado
    asignarTextoElemento('h2', `Amigo sorteado: ${amigoSorteado}`);

    // Eliminar el amigo sorteado de la lista
    listaNombresSecretos.splice(indiceAleatorio, 1);

    // Si ya no quedan amigos, cambiar el botón a "Reiniciar Juego" con el ícono de reiniciar
    if (listaNombresSecretos.length === 0) {
        sortearAmigoBtn.innerHTML = `
            <i class="fas fa-redo"></i> <!-- Ícono de reiniciar de FontAwesome -->
            Reiniciar Juego
        `;
    }
}

function reiniciarJuego() {
    // Limpiar la lista de nombres
    listaNombresSecretos = [];

    // Habilitar los campos
    document.querySelector('#amigo').removeAttribute('disabled');
    document.querySelector('#anadirAmigo').removeAttribute('disabled');

    // Cambiar el texto del botón de sortear a "Sortear Amigo" y restaurar el ícono de play
    const sortearAmigoBtn = document.getElementById('sortearAmigo');
    sortearAmigoBtn.innerHTML = `
        <i class="fas fa-play"></i> <!-- Ícono de play de FontAwesome -->
        Sortear Amigo
    `;

    // Limpiar la caja de texto
    limpiarCaja();

    // Mostrar mensaje inicial
    asignarTextoElemento('h2', `Ingresa ${nombresMax} amigos para iniciar el sorteo`);
}

function limpiarCaja() {
    document.querySelector('#amigo').value = '';
}