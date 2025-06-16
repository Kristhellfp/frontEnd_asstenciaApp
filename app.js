// app.js
import { crearLogin } from './componentes/login/login.js';
import { crearGrados } from './componentes/grados/grados.js';
import { crearGraficas } from './componentes/graficas/graficas.js';
import { crearListado } from './componentes/listado/listado.js';
import { crearNavbar } from './componentes/navbar/navbar.js';

const root = document.getElementById('root');

export function navegarA(pantalla) {
  if (!pantalla) {
    console.error('Vista no definida');
    return;
  }

  root.innerHTML = '';

  const rol = localStorage.getItem('rol');

  // Navbar visible solo si hay rol y no es login
  if (rol && pantalla.dataset?.view !== 'login') {
    root.appendChild(crearNavbar(navegarA, rol));
  }

  root.appendChild(pantalla);
}

const rutasPorRol = {
  profesor: {
    login: () => {
      const pantalla = crearLogin();
      pantalla.dataset.view = 'login';
      return pantalla;
    },
    grados: () => {
      const pantalla = crearGrados();
      pantalla.dataset.view = 'grados';
      return pantalla;
    },
  },
  coordinador: {
    login: () => {
      const pantalla = crearLogin();
      pantalla.dataset.view = 'login';
      return pantalla;
    },
    graficas: () => {
      const pantalla = crearGraficas();
      pantalla.dataset.view = 'graficas';
      return pantalla;
    },
  },
  administrador: {
    login: () => {
      const pantalla = crearLogin();
      pantalla.dataset.view = 'login';
      return pantalla;
    },
    listado: () => {
      const pantalla = crearListado();
      pantalla.dataset.view = 'listado';
      return pantalla;
    },
  },
};

window.navegarA = (ruta) => {
  const rol = localStorage.getItem('rol') || 'profesor';
  const rutas = rutasPorRol[rol];

  if (!rutas) return console.error('Rol no válido');

  if (typeof ruta === 'string') {
    if (rutas[ruta]) navegarA(rutas[ruta]());
    else console.error(`Ruta no válida: ${ruta}`);
  } else {
    navegarA(ruta);
  }
};

navegarA(rutasPorRol['profesor'].login());