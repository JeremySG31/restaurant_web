// script.js

// Scroll suave para navegación y cierre de menú móvil
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Fijar el header y agregar sombra al hacer scroll
const header = document.querySelector('.header-fixed');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Parallax efecto en portada
    const parallax = document.querySelector('.parallax img');
    if (parallax) {
        const scrolled = window.scrollY;
        parallax.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Validación de formulario de reservas (si existe en la página)
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('confirmation-message');
        // Validación básica
        if (!name || !phone || !date || !time) {
            message.textContent = 'Por favor, completa todos los campos.';
            message.style.color = 'red';
            return;
        }
        // Validar teléfono (9 o más dígitos)
        if (!/^\d{9,}$/.test(phone)) {
            message.textContent = 'El teléfono debe tener al menos 9 dígitos.';
            message.style.color = 'red';
            return;
        }
        // Validar fecha (no pasada)
        const today = new Date();
        const selectedDate = new Date(date);
        if (selectedDate < today.setHours(0,0,0,0)) {
            message.textContent = 'La fecha debe ser igual o posterior a hoy.';
            message.style.color = 'red';
            return;
        }
        // Mostrar mensaje de confirmación
        message.textContent = `¡Reserva confirmada para ${name} el ${date} a las ${time}!`;
        message.style.color = 'green';
    });
}

// Accesibilidad: resalta el enlace activo en el menú
function setActiveMenu() {
    const sections = ['#inicio','#historia','#galeria','#carta'];
    let current = sections[0];
    const scrollY = window.scrollY + 80;
    sections.forEach(s => {
        const el = document.querySelector(s);
        if (el && el.offsetTop <= scrollY) current = s;
    });
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === current);
    });
}
window.addEventListener('scroll', setActiveMenu);
window.addEventListener('load', setActiveMenu);