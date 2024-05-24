// Variables para elementos HTML
const html = document.querySelector('html');
const botones = document.querySelectorAll('.app__card-button');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const switchMusica = document.getElementById('alternar-musica');
const botonTemporizador = document.getElementById('start-pause');
const textoComenzarPausar = document.querySelector('#start-pause span');
const imagenComenzarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoDelTemporizador = document.getElementById('timer');

// Arreglos
const enfoque = ['enfoque', 'descanso-corto', 'descanso-largo'];
const imagenBanner = ['imagenes/enfoque.png', 'imagenes/descanso-corto.png', 'imagenes/descanso-largo.png'];
const textoTitulo = ['Optimiza tu productividad. <br><strong class="app__title-strong">sumérgete en lo que importa.</strong>', '¿Qué tal tomar un respiro? <br><strong class="app__title-strong">¡Haz una pausa corta!.</strong>', 'Hora de volver a la superficie <br><strong class="app__title-strong">Haz una pausa larga.</strong>'];
const tiemposDeTemporizadores = [1500, 300, 900]

// Variables
const musica = new Audio ('sonidos/luna-rise-part-one.mp3');
const sonidoPlay = new Audio ('sonidos/play.wav');
const sonidoPausa = new Audio ('sonidos/pause.mp3');
const sonidoTiempoTerminado = new Audio ('sonidos/beep.mp3');
let contador;
let temporizador = 1500;
let indice;



// Agregando la funcionalidad a los botones de enfoque
botones.forEach(function(boton , index) {
    boton.addEventListener('click', () => {
        botones.forEach(btn => btn.classList.remove('active'))
        html.setAttribute('data-contexto', enfoque[index]);
        banner.setAttribute('src', imagenBanner[index]);
        titulo.innerHTML = textoTitulo[index];
        temporizador = tiemposDeTemporizadores[index];
        mostrarTemporizador()
        indice = index
        boton.classList.add('active');
        clearInterval(contador);
        contador = null
        textoComenzarPausar.textContent = 'Comenzar'
        imagenComenzarPausar.setAttribute('src', '/imagenes/play_arrow.png')
    })
})

// Agregando la funcionalidad al botón de música
switchMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }
    
    else {
        musica.pause();
    }
})

musica.loop = true;

// Agregando la funcionalidad al temporizador
botonTemporizador.addEventListener('click', () => {
    if (contador) {
        sonidoPausa.play()
        textoComenzarPausar.textContent = 'Reanudar'
        imagenComenzarPausar.setAttribute('src', '/imagenes/play_arrow.png')
        clearInterval(contador);
        contador = null
        return;
    }
    else {
        sonidoPlay.play()
        textoComenzarPausar.textContent = 'Pausar'
        imagenComenzarPausar.setAttribute('src', '/imagenes/pause.png')
        clearInterval(contador);
        contador = setInterval(() => {
        temporizador -= 1;
        console.log(temporizador);
        mostrarTemporizador()
        if (temporizador < 1) {
            sonidoTiempoTerminado.play()
            textoComenzarPausar.textContent = 'Comenzar'
            imagenComenzarPausar.setAttribute('src', '/imagenes/play_arrow.png')
            clearInterval(contador)
            contador = null
            temporizador = tiemposDeTemporizadores[indice]
        }
        else if (temporizador == tiemposDeTemporizadores[indice]){
            textoComenzarPausar.textContent = 'Comenzar'
        }

        }, 1000);
    } 
})

// Agregando el temporizador
function mostrarTemporizador() {
    let tiempo = new Date(temporizador * 1000);
    let tiempoFormateado = tiempo.toLocaleTimeString('es-PA',{minute:'2-digit', second: '2-digit'});
    tiempoDelTemporizador.textContent = tiempoFormateado
}

mostrarTemporizador()

