import { crearLogin } from '../login/login.js';

export function crearRegistro(navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('registro-container');

  const formulario = document.createElement('div');
  formulario.classList.add('formulario');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Crear cuenta';

  const inputUsuario = document.createElement('input');
  inputUsuario.type = 'text';
  inputUsuario.placeholder = 'Nombre de usuario';

  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'Correo electrónico';

  const inputContrasena = document.createElement('input');
  inputContrasena.type = 'password';
  inputContrasena.placeholder = 'Contraseña';

  const btnCrear = document.createElement('button');
  btnCrear.textContent = 'Crear cuenta';

  const volver = document.createElement('p');
  volver.textContent = 'Volver al inicio';
  volver.classList.add('link');
  volver.addEventListener('click', () => {
    navegarA(crearLogin(navegarA));
  });

  btnCrear.addEventListener('click', () => {
    const usuario = inputUsuario.value.trim();
    const correo = inputCorreo.value.trim();
    const contrasena = inputContrasena.value.trim();

    if (!usuario || !correo || !contrasena) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(correo)) {
      alert('El correo electrónico no es válido.');
      return;
    }

    const cuenta = { usuario, correo, contrasena };

    localStorage.setItem('usuarioRegistrado', JSON.stringify(cuenta));

    alert('Cuenta creada exitosamente!');
    navegarA(crearLogin(navegarA));
  });

  formulario.append(
    titulo,
    inputUsuario,
    inputCorreo,
    inputContrasena,
    btnCrear,
    volver
  );

  contenedor.appendChild(formulario);
  return contenedor;
}
