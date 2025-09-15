// Verifica si hay token
const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!token) {
  window.location.href = "login.html";
}

// 🔎 Decodificar JWT para mostrar claims
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Mostrar información del usuario
const payload = parseJwt(token);
if (payload) {
  document.getElementById("userInfo").textContent =
    `Usuario: ${payload.username} | Rol: ${payload.role} | Expira: ${new Date(payload.exp * 1000).toLocaleTimeString()}`;
} else {
  document.getElementById("userInfo").textContent = "Token inválido.";
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Cerrar sesión
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
