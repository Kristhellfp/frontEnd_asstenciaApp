export function crearNavbar() {
  const nav = document.createElement('nav');
  nav.classList.add('navbar');

  nav.innerHTML = `
    <div class="nav-content">
      <h1>AsistenciaApp</h1>
      <button id="cerrarSesion">Cerrar sesión</button>
    </div>
  `;

  nav.querySelector('#cerrarSesion').addEventListener('click', () => {
    localStorage.clear();
    window.navegarA(window.rutas.login());
  });

  return nav;
}

