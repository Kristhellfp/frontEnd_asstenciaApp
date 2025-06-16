import { crearUniforme } from '../uniforme/uniforme.js';
import { crearReporte } from '../reporte/reporte.js';
import { crearGraficas } from '../graficas/graficas.js';

export function crearGrados(navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('grados-container');
  contenedor.dataset.view = 'grados';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Asistencia';
  contenedor.appendChild(titulo);

  const subTitulo = document.createElement('h3');
  subTitulo.textContent = 'Grados';
  contenedor.appendChild(subTitulo);

  const lista = document.createElement('div');
  lista.classList.add('asistencia-lista');

  // Array para manejar los grados dinámicamente
  let grados = [];
  for (let i = 1; i <= 18; i++) {
    grados.push(`Grado ${i}`);
  }

  function renderGrados() {
    lista.innerHTML = '';
    grados.forEach((grado, index) => {
      const contenedorGrado = document.createElement('div');
      contenedorGrado.classList.add('grado-item');
      contenedorGrado.style.display = 'flex';
      contenedorGrado.style.alignItems = 'center';
      contenedorGrado.style.justifyContent = 'space-between';
      contenedorGrado.style.marginBottom = '10px';
      contenedorGrado.style.gap = '12px';

      const btn = document.createElement('button');
      btn.classList.add('btn-grado');
      btn.textContent = grado;
      btn.style.flexGrow = '1';
      btn.addEventListener('click', () => {
        const vistaListado = mostrarListado(grado, navegarA);
        vistaListado.dataset.view = 'listado';
        navegarA(vistaListado);
      });

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = '✖';
      btnEliminar.title = `Eliminar ${grado}`;
      btnEliminar.style.backgroundColor = '#e74c3c';
      btnEliminar.style.color = '#fff';
      btnEliminar.style.border = 'none';
      btnEliminar.style.padding = '5px 10px';
      btnEliminar.style.borderRadius = '4px';
      btnEliminar.style.cursor = 'pointer';
      btnEliminar.addEventListener('click', () => {
        if (confirm(`¿Seguro que deseas eliminar ${grado}?`)) {
          grados.splice(index, 1);
          renderGrados();
        }
      });

      contenedorGrado.appendChild(btn);
      contenedorGrado.appendChild(btnEliminar);
      lista.appendChild(contenedorGrado);
    });
  }

  renderGrados();

  contenedor.appendChild(lista);

  const acciones = document.createElement('div');
  acciones.classList.add('acciones');

  const btnEnviar = document.createElement('button');
  btnEnviar.textContent = 'Enviar';

  const btnVer = document.createElement('button');
  btnVer.textContent = 'Ver gráficas';
  btnVer.addEventListener('click', () => {
    const vistaGraficas = crearGraficas(navegarA);
    navegarA(vistaGraficas);
  });

  const btnProfesores = document.createElement('button');
  btnProfesores.textContent = 'Profesores';
  btnProfesores.addEventListener('click', () => {
    const vistaProfesores = crearProfesores(navegarA);
    navegarA(vistaProfesores);
  });

  acciones.append(btnEnviar, btnVer, btnProfesores);
  contenedor.appendChild(acciones);

  return contenedor;
}

function mostrarListado(grado, navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('grados-container');
  contenedor.dataset.view = 'listado';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Asistencia';
  contenedor.appendChild(titulo);

  const subTitulo = document.createElement('h3');
  subTitulo.textContent = `Listado - ${grado}`;
  contenedor.appendChild(subTitulo);

  let alumnos = [
    { nombre: 'Alumno 1', asistencia: 'ausente', uniformeOk: true, justificado: false },
    { nombre: 'Alumno 2', asistencia: 'ausente', uniformeOk: true, justificado: false },
    { nombre: 'Alumno 3', asistencia: 'ausente', uniformeOk: true, justificado: false },
    { nombre: 'Alumno 4', asistencia: 'ausente', uniformeOk: true, justificado: false },
    { nombre: 'Alumno 5', asistencia: 'ausente', uniformeOk: true, justificado: false },
    { nombre: 'Alumno 6', asistencia: 'ausente', uniformeOk: true, justificado: false },
    { nombre: 'Alumno 7', asistencia: 'ausente', uniformeOk: true, justificado: false },
    { nombre: 'Alumno 8', asistencia: 'ausente', uniformeOk: true, justificado: false },
  ];

  const listaAlumnos = document.createElement('div');
  listaAlumnos.classList.add('lista-alumnos');

  function renderAlumnos() {
    listaAlumnos.innerHTML = '';
    alumnos.forEach((alumno, index) => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('alumno-box');
      tarjeta.style.border = '1px solid #ccc';
      tarjeta.style.padding = '10px';
      tarjeta.style.marginBottom = '10px';

      const nombre = document.createElement('p');
      nombre.textContent = alumno.nombre;
      tarjeta.appendChild(nombre);

      const selectAsistencia = document.createElement('select');
      const opciones = [
        { value: 'presente', text: 'Presente' },
        { value: 'ausente', text: 'Ausente' },
        { value: 'tarde', text: 'Llegada Tarde' },
      ];
      opciones.forEach(opcion => {
        const option = document.createElement('option');
        option.value = opcion.value;
        option.textContent = opcion.text;
        if (alumno.asistencia === opcion.value) option.selected = true;
        selectAsistencia.appendChild(option);
      });
      selectAsistencia.addEventListener('change', () => {
        alumno.asistencia = selectAsistencia.value;
        if (alumno.asistencia !== 'tarde') alumno.justificado = false;
        renderAlumnos();
      });
      tarjeta.appendChild(selectAsistencia);

      const botonesContenedor = document.createElement('div');
      botonesContenedor.style.display = 'flex';
      botonesContenedor.style.gap = '8px';
      botonesContenedor.style.marginTop = '8px';

      if (alumno.asistencia === 'tarde' && !alumno.justificado) {
        const btnJustificar = document.createElement('button');
        btnJustificar.textContent = 'Justificar';
        btnJustificar.style.backgroundColor = 'blue';
        btnJustificar.style.color = 'white';
        btnJustificar.addEventListener('click', () => {
          alumno.justificado = true;
          alumno.asistencia = 'presente';
          renderAlumnos();
        });
        botonesContenedor.appendChild(btnJustificar);
      }

      const btnUniforme = document.createElement('button');
      btnUniforme.textContent = alumno.uniformeOk ? 'Uniforme' : 'Falta Uniforme';
      btnUniforme.style.backgroundColor = alumno.uniformeOk ? 'green' : 'red';
      btnUniforme.style.color = 'white';
      btnUniforme.addEventListener('click', () => {
        navegarA(crearUniforme(navegarA));
      });
      botonesContenedor.appendChild(btnUniforme);

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar Alumno';
      btnEliminar.style.backgroundColor = '#e74c3c';
      btnEliminar.style.color = '#fff';
      btnEliminar.style.border = 'none';
      btnEliminar.style.padding = '5px 10px';
      btnEliminar.style.borderRadius = '4px';
      btnEliminar.style.cursor = 'pointer';
      btnEliminar.addEventListener('click', () => {
        if (confirm(`¿Seguro que deseas eliminar a ${alumno.nombre}?`)) {
          alumnos.splice(index, 1);
          renderAlumnos();
        }
      });
      botonesContenedor.appendChild(btnEliminar);

      const btnReporte = document.createElement('button');
      btnReporte.textContent = 'Reporte';
      btnReporte.style.backgroundColor = '#007bff';
      btnReporte.style.color = 'white';
      btnReporte.style.border = 'none';
      btnReporte.style.padding = '5px 10px';
      btnReporte.style.borderRadius = '4px';
      btnReporte.style.cursor = 'pointer';
      btnReporte.addEventListener('click', () => {
        const vistaReporte = crearReporte(alumno, navegarA);
        navegarA(vistaReporte);
      });
      botonesContenedor.appendChild(btnReporte);

      tarjeta.appendChild(botonesContenedor);
      listaAlumnos.appendChild(tarjeta);
    });
  }

  renderAlumnos();
  contenedor.appendChild(listaAlumnos);

  // Formulario para agregar alumno nuevo
  const formAgregar = document.createElement('div');
  formAgregar.classList.add('form-agregar-alumno');
  formAgregar.style.marginTop = '20px';

  const inputNombre = document.createElement('input');
  inputNombre.placeholder = 'Nombre del nuevo alumno';
  inputNombre.style.marginRight = '10px';

  const btnAgregar = document.createElement('button');
  btnAgregar.textContent = 'Agregar Alumno';
  btnAgregar.addEventListener('click', () => {
    const nombreNuevo = inputNombre.value.trim();
    if (nombreNuevo === '') {
      alert('Ingrese un nombre válido');
      return;
    }
    alumnos.push({ nombre: nombreNuevo, asistencia: 'ausente', uniformeOk: true, justificado: false });
    inputNombre.value = '';
    renderAlumnos();
  });

  formAgregar.appendChild(inputNombre);
  formAgregar.appendChild(btnAgregar);
  contenedor.appendChild(formAgregar);

  // Botón para volver a grados
  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Regresar a grados';
  btnVolver.classList.add('boton-volver');
  btnVolver.style.marginTop = '20px';
  btnVolver.addEventListener('click', () => {
    navegarA(crearGrados(navegarA));
  });
  contenedor.appendChild(btnVolver);

  return contenedor;
}

function crearProfesores(navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('profesores-container');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Profesores';
  contenedor.appendChild(titulo);

  // Lista de profesores con planificación y estado de asistencia
  let profesores = [
    {
      nombre: 'Profesor Juan',
      planificaciones: ['Planificación 1', 'Planificación 2'],
      asistencia: 'inasistencia', // valores: 'presente', 'inasistencia', 'tarde'
      justificado: false,
    },
    {
      nombre: 'Profesora María',
      planificaciones: ['Planificación A'],
      asistencia: 'presente',
      justificado: false,
    },
  ];

  const listaProfesores = document.createElement('div');
  listaProfesores.classList.add('lista-profesores');

  function renderProfesores() {
    listaProfesores.innerHTML = '';

    profesores.forEach((profesor, index) => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('profesor-box');
      tarjeta.style.border = '1px solid #ccc';
      tarjeta.style.padding = '10px';
      tarjeta.style.marginBottom = '10px';

      // Nombre
      const nombre = document.createElement('h3');
      nombre.textContent = profesor.nombre;
      tarjeta.appendChild(nombre);

      // Planificaciones
      const planificacionesTitulo = document.createElement('strong');
      planificacionesTitulo.textContent = 'Planificaciones:';
      tarjeta.appendChild(planificacionesTitulo);

      const listaPlanificaciones = document.createElement('ul');
      profesor.planificaciones.forEach(plan => {
        const li = document.createElement('li');
        li.textContent = plan;
        listaPlanificaciones.appendChild(li);
      });
      tarjeta.appendChild(listaPlanificaciones);

      // Selector asistencia
      const labelAsistencia = document.createElement('label');
      labelAsistencia.textContent = 'Estado de asistencia: ';
      labelAsistencia.style.display = 'block';
      labelAsistencia.style.marginTop = '8px';

      const selectAsistencia = document.createElement('select');
      ['presente', 'inasistencia', 'tarde'].forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);
        if (profesor.asistencia === estado) option.selected = true;
        selectAsistencia.appendChild(option);
      });

      selectAsistencia.addEventListener('change', () => {
        profesor.asistencia = selectAsistencia.value;
        if (profesor.asistencia !== 'tarde') {
          profesor.justificado = false;
        }
        renderProfesores();
      });

      labelAsistencia.appendChild(selectAsistencia);
      tarjeta.appendChild(labelAsistencia);

      // Botón justificar (solo si tarde y no justificado)
      if (profesor.asistencia === 'tarde' && !profesor.justificado) {
        const btnJustificar = document.createElement('button');
        btnJustificar.textContent = 'Justificar Llegada Tarde';
        btnJustificar.style.marginTop = '8px';
        btnJustificar.style.backgroundColor = 'blue';
        btnJustificar.style.color = 'white';
        btnJustificar.style.border = 'none';
        btnJustificar.style.padding = '5px 10px';
        btnJustificar.style.borderRadius = '4px';
        btnJustificar.style.cursor = 'pointer';

        btnJustificar.addEventListener('click', () => {
          profesor.justificado = true;
          profesor.asistencia = 'presente';
          renderProfesores();
        });

        tarjeta.appendChild(btnJustificar);
      }

      // Botón eliminar profesor
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar Profesor';
      btnEliminar.style.marginTop = '10px';
      btnEliminar.style.backgroundColor = '#e74c3c';
      btnEliminar.style.color = '#fff';
      btnEliminar.style.border = 'none';
      btnEliminar.style.padding = '5px 10px';
      btnEliminar.style.borderRadius = '4px';
      btnEliminar.style.cursor = 'pointer';

      btnEliminar.addEventListener('click', () => {
        if (confirm(`¿Seguro que deseas eliminar a ${profesor.nombre}?`)) {
          profesores.splice(index, 1);
          renderProfesores();
        }
      });

      tarjeta.appendChild(btnEliminar);

      listaProfesores.appendChild(tarjeta);
    });
  }

  renderProfesores();
  contenedor.appendChild(listaProfesores);

  // Formulario agregar profesor nuevo
  const formAgregar = document.createElement('div');
  formAgregar.style.marginTop = '20px';

  const inputNombre = document.createElement('input');
  inputNombre.placeholder = 'Nombre del nuevo profesor';
  inputNombre.style.marginRight = '10px';

  const btnAgregar = document.createElement('button');
  btnAgregar.textContent = 'Agregar Profesor';
  btnAgregar.addEventListener('click', () => {
    const nombreNuevo = inputNombre.value.trim();
    if (nombreNuevo === '') {
      alert('Ingrese un nombre válido');
      return;
    }
    profesores.push({
      nombre: nombreNuevo,
      planificaciones: [],
      asistencia: 'inasistencia',
      justificado: false,
    });
    inputNombre.value = '';
    renderProfesores();
  });

  formAgregar.appendChild(inputNombre);
  formAgregar.appendChild(btnAgregar);
  contenedor.appendChild(formAgregar);

  // Botón para regresar a grados
  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Regresar a grados';
  btnVolver.style.marginTop = '20px';
  btnVolver.style.padding = '8px 12px';
  btnVolver.style.borderRadius = '6px';
  btnVolver.style.border = 'none';
  btnVolver.style.cursor = 'pointer';
  btnVolver.addEventListener('click', () => {
    navegarA(crearGrados(navegarA));
  });
  contenedor.appendChild(btnVolver);

  return contenedor;
}
