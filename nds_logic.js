// Ejemplo de comportamiento: mensaje en consola
console.log("Nou Digital Solutions – página cargada correctamente.");


const form = document.getElementById('diagnosticoForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('¡Gracias por enviar tu diagnóstico! Nos pondremos en contacto contigo pronto.');
  form.reset();
});
