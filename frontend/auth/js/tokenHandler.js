// tokenHandler.js
const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario"));
const INACTIVITY_LIMIT = 60_000; // 1 minuto
let inactivityTimer;

// Función para cerrar sesión
function logout() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("token");
  alert("Sesión expirada");
  window.location.href = "http://localhost:4000/";
}

// Función para resetear timer de inactividad
function resetInactivity() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(logout, INACTIVITY_LIMIT);
}

// Detectar interacción del usuario
["mousemove", "keydown", "click"].forEach(evt =>
  document.addEventListener(evt, resetInactivity)
);

// Validar token al cargar la página
function validateToken() {
  if (!token || token.split('.').length !== 3) {
    logout();
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      logout();
    } else {
      // Token válido → iniciar timer de inactividad
      resetInactivity();
    }
  } catch (err) {
    console.error("Token inválido:", err);
    logout();
  }
}

// Ejecutar validación al cargar la página
validateToken();

