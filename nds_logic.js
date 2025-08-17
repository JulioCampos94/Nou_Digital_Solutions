// Mensaje al cargar la página
console.log("Nou Digital Solutions – página cargada correctamente.");

// Inicializa EmailJS
emailjs.init("NodGXAGZagwbOp8lV");

const form = document.getElementById('diagnosticoForm');
const openBtn = document.getElementById('openForm');
const modal = document.getElementById('formularioModal');
const closeBtn = document.querySelector('.close-modal');

const exitoModal = document.getElementById('exitoModal');
const cerrarExito = document.getElementById('cerrarExito');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // ✅ Verificar que el captcha fue completado
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert("Por favor, verifica que no eres un robot.");
    return;
  }

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

  console.log('📨 Enviando datos:', {
    intereses: interesesCombined,
    barreras: barrerasCombined
  });

  // Enviar con EmailJS
  emailjs.sendForm("service_ze32riq", "template_dloic2p", form, "NodGXAGZagwbOp8lV")
    .then(() => {
      console.log('✅ Correo enviado correctamente');

      // Cerrar el modal del formulario
      modal.style.display = 'none';

      // Abrir el modal de éxito
      exitoModal.style.display = 'flex';

      // Limpiar formulario
      form.reset();

      // Resetear reCAPTCHA
      grecaptcha.reset();
    })
    .catch((error) => {
      console.error('❌ Error al enviar el correo:', error);
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

// Abrir modal de formulario
openBtn.addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'flex';
});

// Cerrar modal formulario
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal éxito
cerrarExito.addEventListener('click', () => {
  exitoModal.style.display = 'none';
});

// Cerrar si clic fuera del contenido (formulario)
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
  if (e.target === exitoModal) {
    exitoModal.style.display = 'none';
  }
});
