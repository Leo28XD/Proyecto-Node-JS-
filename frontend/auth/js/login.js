document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const UserName = document.getElementById("username").value;
  const Password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  try {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName, Password })
    });

    const data = await res.json();

    if (res.ok) {
      mensaje.textContent = data.mensaje;
      mensaje.style.color = "green";
      // Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      localStorage.setItem("token", data.token);
      // Redirigir al dashboard
      setTimeout(() => window.location.href = "/auth/pages/dashboard.html", 1000);
    } else {
      mensaje.textContent = data.mensaje;
      mensaje.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    mensaje.textContent = "Error al conectar con el servidor";
    mensaje.style.color = "red";
  }
});
