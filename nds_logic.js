// Mensaje al cargar la página
console.log("Nou Digital Solutions – página cargada correctamente.");

// Inicializa EmailJS con tu Public Key (User ID)
emailjs.init('NodGXAGZagwbOp8lV');  

const form = document.getElementById('diagnosticoForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Preparamos los campos combinados para checkboxes en el template
  // (Para que EmailJS reciba strings con los valores seleccionados)
  
  // Combinar intereses seleccionados
  const interesesChecked = [...form.querySelectorAll('input[name="intereses"]:checked')].map(el => el.value);
  const interesesOtra = form.querySelector('input[name="intereses_otra"]').value.trim();
  let interesesCombined = interesesChecked.join(', ');
  if (interesesOtra) {
    interesesCombined += (interesesCombined ? ', ' : '') + interesesOtra;
  }
  // Creamos un campo oculto temporal para enviarlo a EmailJS
  let interesesInput = form.querySelector('input[name="intereses_combined"]');
  if (!interesesInput) {
    interesesInput = document.createElement('input');
    interesesInput.type = 'hidden';
    interesesInput.name = 'intereses_combined';
    form.appendChild(interesesInput);
  }
  interesesInput.value = interesesCombined;

  // Combinar barreras seleccionadas
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

  // Envía el formulario a EmailJS
  emailjs.sendForm('service_ze32riq', 'template_f95s5sb', this)
    .then(() => {
      alert('¡Gracias por enviar tu diagnóstico! Nos pondremos en contacto contigo pronto.');
      form.reset();
    }, (error) => {
      console.error('Error enviando el formulario:', error);
      alert('Ocurrió un error al enviar el formulario. Intenta nuevamente más tarde.');
    });
});

// Toggle menú hamburguesa (si tienes menú hamburguesa)
const navToggle = document.getElementById('navbar-toggle');
if(navToggle) {
  navToggle.addEventListener('click', function () {
    document.getElementById('navbar-list').classList.toggle('show');
  });
}
