export function crearListado(navegarA, gradoSeleccionado = '') {
  const contenedor = document.createElement('section');
  contenedor.classList.add('listado');

  const titulo = document.createElement('h2');
  titulo.textContent = gradoSeleccionado ? `Listado de Alumnos - ${gradoSeleccionado}` : 'Listado de Alumnos';
  contenedor.appendChild(titulo);

  // Botones globales
  const accionesGlobales = document.createElement('div');
  accionesGlobales.classList.add('acciones-globales');

  const btnMarcarTodosPresentes = document.createElement('button');
  btnMarcarTodosPresentes.textContent = 'Marcar todos presentes';

  const btnMarcarTodosAusentes = document.createElement('button');
  btnMarcarTodosAusentes.textContent = 'Marcar todos no presentes';

  accionesGlobales.append(btnMarcarTodosPresentes, btnMarcarTodosAusentes);
  contenedor.appendChild(accionesGlobales);

  // Contenedor de alumnos
  const listaAlumnos = document.createElement('div');
  listaAlumnos.classList.add('listado-container');
  contenedor.appendChild(listaAlumnos);

  // Datos de ejemplo
  let alumnos = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    nombre: `Alumno ${i + 1}`,
    asistencia: null,
    faltaUniforme: false
  }));

  function renderizar() {
    listaAlumnos.innerHTML = '';
    alumnos.forEach(alumno => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('alumno-box');

      const nombre = document.createElement('p');
      nombre.textContent = alumno.nombre;

      const estadoTexto = document.createElement('p');
      estadoTexto.classList.add('estado');
      estadoTexto.textContent = alumno.asistencia
        ? alumno.asistencia.charAt(0).toUpperCase() + alumno.asistencia.slice(1)
        : 'Sin marcar';

      tarjeta.classList.toggle('presente', alumno.asistencia === 'presente');
      tarjeta.classList.toggle('ausente', alumno.asistencia === 'ausente');
      tarjeta.classList.toggle('tarde', alumno.asistencia === 'tarde');
      tarjeta.classList.toggle('falta-uniforme', alumno.faltaUniforme);

      const controles = document.createElement('div');
      controles.classList.add('acciones');

      ['presente', 'ausente', 'tarde'].forEach(key => {
        const btn = document.createElement('button');
        btn.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        btn.addEventListener('click', () => {
          alumno.asistencia = key;
          renderizar();
        });
        controles.appendChild(btn);
      });

      const btnUniforme = document.createElement('button');
      btnUniforme.textContent = alumno.faltaUniforme ? 'Falta Uniforme' : 'Uniforme OK';
      btnUniforme.addEventListener('click', () => {
        alumno.faltaUniforme = !alumno.faltaUniforme;
        renderizar();
      });
      controles.appendChild(btnUniforme);

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => {
        const pwd = prompt('Ingresa contraseña para eliminar:');
        if (pwd === '1234') {
          alumnos = alumnos.filter(a => a.id !== alumno.id);
          renderizar();
        } else {
          alert('Contraseña incorrecta');
        }
      });
      controles.appendChild(btnEliminar);

      tarjeta.append(nombre, estadoTexto, controles);
      listaAlumnos.appendChild(tarjeta);
    });
  }

  btnMarcarTodosPresentes.addEventListener('click', () => {
    alumnos.forEach(a => a.asistencia = 'presente');
    renderizar();
  });

  btnMarcarTodosAusentes.addEventListener('click', () => {
    alumnos.forEach(a => a.asistencia = 'ausente');
    renderizar();
  });

  renderizar();

  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Regresar a grados';
  btnVolver.classList.add('boton-volver');
  btnVolver.addEventListener('click', () => navegarA('grados'));
  contenedor.appendChild(btnVolver);

  return contenedor;
}
