// Scroll suave para navegación y cierre de menú móvil
document.querySelectorAll<HTMLAnchorElement>('nav a').forEach(link => {
  link.addEventListener('click', function (e: MouseEvent) {
    const href = (this as HTMLAnchorElement).getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Fijar el header y agregar sombra al hacer scroll
const header = document.querySelector<HTMLElement>('.header-fixed');
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Parallax efecto en portada
  const parallax = document.querySelector<HTMLImageElement>('.parallax img');
  if (parallax) {
    const scrolled = window.scrollY;
    parallax.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Validación de formulario de reservas (si existe en la página)
const reservationForm = document.getElementById('reservation-form') as HTMLFormElement | null;
if (reservationForm) {
  reservationForm.addEventListener('submit', function (event: Event) {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const time = (document.getElementById('time') as HTMLInputElement).value;
    const message = document.getElementById('confirmation-message') as HTMLElement;

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
    if (selectedDate < new Date(today.setHours(0, 0, 0, 0))) {
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
function setActiveMenu(): void {
  const sections = ['#inicio', '#historia', '#galeria', '#carta'];
  let current = sections[0];
  const scrollY = window.scrollY + 80;

  sections.forEach(s => {
    const el = document.querySelector<HTMLElement>(s);
    if (el && el.offsetTop <= scrollY) current = s;
  });

  document.querySelectorAll<HTMLAnchorElement>('nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === current);
  });
}

window.addEventListener('scroll', setActiveMenu);
window.addEventListener('load', setActiveMenu);
