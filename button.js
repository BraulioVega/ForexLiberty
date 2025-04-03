const video = document.getElementById('video');
const boton = document.getElementById('button-aparecer');
const boton2 = document.getElementById('button-aparecer-2');
const texto_video = document.getElementById('textoPausa');
const texto_video_muted = document.getElementById('textoMuted');
const progress = document.getElementById("progress");
const segundosAntes = 26; // Ajusta cuántos segundos antes quieres que aparezca el botón
const fullscreenBtn = document.getElementById("fullscreenBtn");
const videoContainer = document.getElementById("videoContainer");
const displaysigueviendo = document.getElementById("sigueviendo");
const buttonseguirviendo = document.getElementById("button-seguir-viendo");
const buttonverprincipio = document.getElementById("button-ver-principio");
const textoFinal = document.getElementById("PFinal");
let continueTime;
let hideTimeout; 

video.addEventListener('timeupdate', () => {
    if (video.duration - video.currentTime <= segundosAntes) {
        boton.style.display = 'flex'; // Mostrar el botón
        boton2.style.display = 'flex'; // Mostrar el botón2
        textoFinal.style.display = 'none'; // Deja de mostrar texto final

    }

    const duration = video.duration;
    const currentTime = video.currentTime;

    // Factor de desaceleración: La barra avanza más lento conforme se acerca al final
    const speedFactor = 1 - (currentTime / duration); // Se hace menor con el tiempo

        // Ajustamos el ancho de la barra con el factor de velocidad
    const progressWidth = (currentTime / duration) * 100 * speedFactor;
    progress.style.width = `${progressWidth}%`;
});

video.addEventListener("mouseenter", () => {
        fullscreenBtn.style.opacity = "1";
});

video.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
        fullscreenBtn.style.opacity = "0";
    }, 2000); // Se oculta después de 2 segundos
});

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().then(() => {
            video.style.width = "100vw"; // Ocupa toda la pantalla
            video.style.height = "100vh"; // Ocupa toda la altura
            texto_video.style.width = "100vw"; // Ocupa toda la pantalla
            texto_video.style.height = "100vh"; // Ocupa toda la altura
        });
    } else {
        document.exitFullscreen().then(() => {
            video.style.width = ""; // Restablece el tamaño original
            video.style.height = "";
            texto_video.style.width = ""
            texto_video.style.height = ""
        });
    }
});

texto_video_muted.addEventListener("click", () => {
    if (video.muted == true) {
        video.currentTime = 0;  // Reinicia el video
        video.muted = false;    // Quita el mute
        video.play();
        texto_video_muted.style.display = "none";
    } 
});


video.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        texto_video.style.display = "none"; // Ocultar el texto
    } else {
        video.pause();
        texto_video.style.display = "flex"; // Mostrar el texto
    }

    
});

texto_video.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        texto_video.style.display = "none"; // Ocultar el texto
    } else {
        video.pause();
        texto_video.style.display = "flex"; // Mostrar el texto
    }
});

// Asegura que al iniciar también muestre el texto si el video está en pausa
video.addEventListener("pause", () => {
    texto_video.style.display = "flex";
});

video.addEventListener("play", () => {
    texto_video.style.display = "none";
});

// Guardar tiempo cuando el usuario salga de la página
window.addEventListener("beforeunload", () => {
    localStorage.setItem("videoTime", video.currentTime);
});

// Restaurar tiempo cuando el usuario regrese
window.addEventListener("load", () => {
    const savedTime = localStorage.getItem("videoTime");
    if (savedTime) {
        video.currentTime = parseFloat(savedTime);
        texto_video_muted.style.display = "none";
        displaysigueviendo.style.display = "flex";
        video.muted = true;
        for (var i = 0; i < 1; i++) {
            continueTime = savedTime;
        }
    }
});

buttonseguirviendo.addEventListener("click", () => {
        displaysigueviendo.style.display = "none"; // Ocultar el texto
        video.currentTime = parseFloat(continueTime-5);
        video.muted = false;
});

buttonverprincipio.addEventListener("click", () => {
        displaysigueviendo.style.display = "none"; // Ocultar el texto
        video.currentTime = parseFloat(0);
        video.muted = false;
});
