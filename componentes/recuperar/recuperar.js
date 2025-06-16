import { crearLogin } from '../login/login.js';
import * as api from '../../api.js';

export function crearRecuperar(navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('recuperar-container');

  const formulario = document.createElement('div');
  formulario.classList.add('formulario');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Recuperar Contraseña';

  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'Correo electrónico';

  const mensaje = document.createElement('p');
  mensaje.classList.add('mensaje');

  const btnEnviar = document.createElement('button');
  btnEnviar.textContent = 'Enviar enlace';

  btnEnviar.addEventListener('click', async () => {
    const correo = inputCorreo.value.trim();

    if (!correo) {
      mensaje.textContent = 'Ingrese un correo válido';
      return;
    }

    try {
      await api.recuperarPassword(correo);
      mensaje.textContent = 'Enlace enviado al correo';
      mensaje.style.color = '#27ae60';
    } catch (error) {
      mensaje.textContent = error.message;
    }
  });

  const volver = document.createElement('p');
  volver.textContent = 'Volver al inicio';
  volver.classList.add('link');
  volver.style.cursor = 'pointer';
  volver.addEventListener('click', () => {
    if (typeof navegarA === 'function') {
      navegarA(crearLogin());
    } else {
      alert('Función de navegación no disponible');
    }
  });

  formulario.append(titulo, inputCorreo, btnEnviar, mensaje, volver);
  contenedor.appendChild(formulario);
  return contenedor;
}
