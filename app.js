// app.js
import { crearLogin } from './componentes/login/login.js';
import { crearGrados } from './componentes/grados/grados.js';
import { crearNavbar } from './componentes/navbar/navbar.js';

const root = document.getElementById('root');

// Función universal para cambiar de pantalla
export function navegarA(pantalla) {
  if (!pantalla) {
    console.error('Vista no definida');
    return;
  }

  // Limpia todo lo que está en el root
  root.innerHTML = '';

  // Si la pantalla NO es login, muestra el navbar
  if (pantalla.dataset?.view !== 'login') {
    root.appendChild(crearNavbar(navegarA));
  }

  // Muestra la pantalla
  root.appendChild(pantalla);
}

// Objeto de rutas sencillas sin roles
const rutas = {
  login: () => {
    const pantalla = crearLogin(navegarA);
    pantalla.dataset.view = 'login';
    return pantalla;zz
  },
  grados: () => {
    const pantalla = crearGrados(navegarA);
    pantalla.dataset.view = 'grados';
    return pantalla;
  },
};

// Hacer que navegarA también funcione desde botones con strings
window.navegarA = (ruta) => {
  if (typeof ruta === 'string') {
    if (rutas[ruta]) {
      navegarA(rutas[ruta]());
    } else {
      console.error(`Ruta no válida: ${ruta}`);
    }
  } else {
    navegarA(ruta);
  }
};

// Cargar login al iniciar
navegarA(rutas.login());
