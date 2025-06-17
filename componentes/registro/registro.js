import { crearLogin } from '../login/login.js';

export function crearRegistro(navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('registro-container');

  const formulario = document.createElement('div');
  formulario.classList.add('formulario');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Crear Cuenta Nueva';

  const inputUsuario = document.createElement('input');
  inputUsuario.type = 'text';
  inputUsuario.placeholder = 'Nuevo Usuario';

  const inputContrasena = document.createElement('input');
  inputContrasena.type = 'password';
  inputContrasena.placeholder = 'Nueva Contraseña';

  const btnRegistrar = document.createElement('button');
  btnRegistrar.textContent = 'Registrar';

  const mensaje = document.createElement('p');
  mensaje.classList.add('mensaje');

  btnRegistrar.addEventListener('click', () => {
    const usuario = inputUsuario.value.trim();
    const contrasena = inputContrasena.value.trim();

    if (!usuario || !contrasena) {
      mensaje.textContent = 'Usuario o contraseña vacíos';
      mensaje.style.color = 'red';
      return;
    }

    mensaje.textContent = 'Usuario registrado con éxito';
    mensaje.style.color = '#27ae60';

    setTimeout(() => {
      navegarA(crearLogin(navegarA));
    }, 1000);
  });

  const volver = document.createElement('p');
  volver.textContent = 'Volver al inicio';
  volver.classList.add('link');
  volver.style.cursor = 'pointer';
  volver.addEventListener('click', () => {
    navegarA(crearLogin(navegarA));
  });

  formulario.append(titulo, inputUsuario, inputContrasena, btnRegistrar, mensaje, volver);
  contenedor.appendChild(formulario);
  return contenedor;
}
