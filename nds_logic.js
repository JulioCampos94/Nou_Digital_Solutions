// Mensaje al cargar la página
console.log("Nou Digital Solutions – página cargada correctamente.");

// Inicializa EmailJS
emailjs.init("NodGXAGZagwbOp8lV");

const form = document.getElementById('diagnosticoForm');
const mensajeExito = document.getElementById('mensaje-exito');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Combinar intereses
  const interesesChecked = [...form.querySelectorAll('input[name="intereses"]:checked')].map(el => el.value);
  const interesesOtra = form.querySelector('input[name="intereses_otra"]').value.trim();
  let interesesCombined = interesesChecked.join(', ');
  if (interesesOtra) {
    interesesCombined += (interesesCombined ? ', ' : '') + interesesOtra;
  }

  let interesesInput = form.querySelector('input[name="intereses_combined"]');
  if (!interesesInput) {
    interesesInput = document.createElement('input');
    interesesInput.type = 'hidden';
    interesesInput.name = 'intereses_combined';
    form.appendChild(interesesInput);
  }
  interesesInput.value = interesesCombined;

  // Combinar barreras
  const barrerasChecked = [...form.querySelectorAll('input[name="barreras"]:checked')].map(el => el.value);
  const barrerasOtra = form.querySelector('input[name="barreras_otra"]').value.trim();
  let barrerasCombined = barrerasChecked.join(', ');
  if (barrerasOtra) {
    barrerasCombined += (barrerasCombined ? ', ' : '') + barrerasOtra;
  }

  let barrerasInput = form.querySelector('input[name="barreras_combined"]');
  if (!barrerasInput) {
    barrerasInput = document.createElement('input');
    barrerasInput.type = 'hidden';
    barrerasInput.name = 'barreras_combined';
    form.appendChild(barrerasInput);
  }
  barrerasInput.value = barrerasCombined;

  // Enviar con EmailJS
  emailjs.sendForm("service_ze32riq", "template_dloic2p", this)
    .then(() => {
      form.reset();
      mostrarMensajeExito();
    }, (error) => {
      console.error('Error enviando el formulario:', error);
      alert('Ocurrió un error al enviar el formulario. Intenta nuevamente más tarde.');
    });
});

// Toggle menú hamburguesa
const navToggle = document.getElementById('navbar-toggle');
if (navToggle) {
  navToggle.addEventListener('click', function () {
    document.getElementById('navbar-list').classList.toggle('show');
  });
}

// Mostrar mensaje visual de éxito
function mostrarMensajeExito() {
  if (!mensajeExito) return;

  mensajeExito.style.display = 'block';
  mensajeExito.scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    mensajeExito.style.display = 'none';
  }, 4000);
}
