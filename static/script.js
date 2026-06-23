document.addEventListener("DOMContentLoaded", () => {
    // === LÓGICA DE LOOP DE VIDEO DE FONDO ===
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        // Asegurar autoplay en móviles (algunos navegadores requieren interacción previa, muted ayuda a bypassearlo)
        bgVideo.play().catch(error => console.log("Autoplay bloqueado hasta interacción del usuario", error));

        bgVideo.addEventListener('timeupdate', () => {
            // Si el video pasa del segundo 7.9, regresa al segundo 2
            if (bgVideo.currentTime >= 7.9) {
                bgVideo.currentTime = 2.0;
                bgVideo.play();
            }
        });
    }

    // === INTERSECTION OBSERVER (PARALLAX) ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => observer.observe(el));
});

// Lógica para abrir el sobre y redirigir
function abrirSobre(token) {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.add('open');
        setTimeout(() => {
            window.location.href = `/invitacion/${token}/ver`;
        }, 800);
    }
}

// Petición POST para confirmar asistencia
function confirmarAsistencia(token) {
    const btn = document.getElementById('btn-confirmar');
    btn.disabled = true;
    btn.innerText = "Confirmando...";

    fetch(`/api/confirmar/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            btn.className = "btn btn-success";
            btn.innerText = "✅ Asistencia Confirmada";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        btn.disabled = false;
        btn.innerText = "Error. Intenta de nuevo";
    });
}
// Lógica para abrir el sobre y redirigir
function abrirSobre(token) {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.add('open');
        // Espera a que termine la animación (800ms) para cambiar de página
        setTimeout(() => {
            window.location.href = `/invitacion/${token}/ver`;
        }, 800);
    }
}

// Intersection Observer para las animaciones Parallax al scrollear
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => observer.observe(el));
});

// Petición POST para confirmar asistencia [cite: 10, 11, 12]
function confirmarAsistencia(token) {
    const btn = document.getElementById('btn-confirmar');
    btn.disabled = true;
    btn.innerText = "Confirmando...";

    fetch(`/api/confirmar/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            btn.className = "btn btn-success";
            btn.innerText = "✅ Asistencia Confirmada";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        btn.disabled = false;
        btn.innerText = "Error. Intenta de nuevo";
    });
}