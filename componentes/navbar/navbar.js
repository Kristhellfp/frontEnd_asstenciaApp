import { crearLogin } from '../login/login.js'; // Ajusta la ruta según tu estructura de carpetas

export function crearNavbar(navegarA) {
  const nav = document.createElement('nav');
  nav.classList.add('navbar');
  nav.innerHTML = `
    <div class="nav-content">
      <h1>AsistenciaApp</h1>
      <button id="cerrarSesion">Cerrar sesión</button>
    </div>
  `;
  
  nav.querySelector('#cerrarSesion').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      // Crear vista de login y navegar
      const vistaLogin = crearLogin(navegarA);
      navegarA(vistaLogin);
    }
  });
  
  return nav;
}