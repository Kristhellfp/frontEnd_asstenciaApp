import { navegarA } from '../../app.js';
import { crearGrados } from '../grados/grados.js';
import { crearListado } from '../listado/listado.js';
import { crearGraficas } from '../graficas/graficas.js';

export function crearLogin() {
  const contenedor = document.createElement('div');
  contenedor.classList.add('login-container');

  const formulario = document.createElement('div');
  formulario.classList.add('formulario');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Inicio de Sesión';

  const inputUsuario = document.createElement('input');
  inputUsuario.type = 'text';
  inputUsuario.placeholder = 'Usuario';

  const inputContrasena = document.createElement('input');
  inputContrasena.type = 'password';
  inputContrasena.placeholder = 'Contraseña';

  const btnIngresar = document.createElement('button');
  btnIngresar.textContent = 'Ingresar';

  // Usuarios de prueba con sus roles
  const usuarios = {
    profesor: 'prof123',
    coordinador: 'coord123',
    administrador: 'admin123',
  };

  btnIngresar.addEventListener('click', () => {
    const usuario = inputUsuario.value.trim();
    const contrasena = inputContrasena.value.trim();

    if (!usuario || !contrasena) {
      alert('Usuario o contraseña vacíos');
      return;
    }

    if (usuarios[usuario] && usuarios[usuario] === contrasena) {
      localStorage.setItem('rol', usuario); // guardamos rol

      // Según rol navegamos a la pantalla principal correspondiente
      if (usuario === 'profesor') {
        navegarA(crearGrados(navegarA));  // vista para profesor
      } else if (usuario === 'coordinador') {
        navegarA(crearGraficas(navegarA)); // vista para coordinador
      } else if (usuario === 'administrador') {
        navegarA(crearListado(navegarA));  // vista para admin
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });

  formulario.append(
    titulo,
    inputUsuario,
    inputContrasena,
    btnIngresar
  );

  contenedor.appendChild(formulario);
  return contenedor;
}
