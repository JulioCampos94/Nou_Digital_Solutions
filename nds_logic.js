// Mensaje al cargar la página
console.log("Nou Digital Solutions – página cargada correctamente.");

// Enviar formulario
const form = document.getElementById('diagnosticoForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('¡Gracias por enviar tu diagnóstico! Nos pondremos en contacto contigo pronto.');
  form.reset();
});

// Toggle menú hamburguesa
document.getElementById('navbar-toggle').addEventListener('click', function () {
  document.getElementById('navbar-list').classList.toggle('show');
});
