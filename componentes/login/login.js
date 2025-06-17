import { crearRecuperar } from '../recuperar/recuperar.js';
import { crearRegistro } from '../registro/registro.js';
import { crearGrados } from '../grados/grados.js';

export function crearLogin(navegarA) {
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

  const mensaje = document.createElement('p');
  mensaje.classList.add('mensaje');

  btnIngresar.addEventListener('click', () => {
    const usuario = inputUsuario.value.trim();
    const contrasena = inputContrasena.value.trim();

    if (!usuario || !contrasena) {
      mensaje.textContent = 'Usuario o contraseña vacíos';
      mensaje.style.color = 'red';
      return;
    }

    mensaje.textContent = 'Bienvenido, ' + usuario;
    mensaje.style.color = '#27ae60';

    setTimeout(() => {
      navegarA(crearGrados(navegarA));
    }, 1000);
  });

  const enlaces = document.createElement('div');
  enlaces.classList.add('login-enlaces');

  const linkRecuperar = document.createElement('p');
  linkRecuperar.textContent = '¿Olvidaste tu contraseña?';
  linkRecuperar.classList.add('link');
  linkRecuperar.style.cursor = 'pointer';
  linkRecuperar.addEventListener('click', () => {
    navegarA(crearRecuperar(navegarA));
  });

  const linkRegistro = document.createElement('p');
  linkRegistro.textContent = 'Crear cuenta nueva';
  linkRegistro.classList.add('link');
  linkRegistro.style.cursor = 'pointer';
  linkRegistro.addEventListener('click', () => {
    navegarA(crearRegistro(navegarA));
  });

  enlaces.append(linkRecuperar, linkRegistro);

  formulario.append(
    titulo,
    inputUsuario,
    inputContrasena,
    btnIngresar,
    mensaje,
    enlaces
  );

  contenedor.appendChild(formulario);
  return contenedor;
}
