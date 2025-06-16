import './grados.css';

export function renderVistaGrado(container) {
  const section = document.createElement('section');
  section.className = 'vista-grado';

  const title = document.createElement('h2');
  title.textContent = 'Listado de alumnos';

  const alumnos = [
    { nombre: 'Katia Maldonado', uniforme: true, puntual: true, conducta: true },
    { nombre: 'Victor Juárez', uniforme: true, puntual: false, conducta: false },
    { nombre: 'Dario Calderón', uniforme: false, puntual: true, conducta: true },
    { nombre: 'Kenia Lima', uniforme: false, puntual: false, conducta: true }
  ];

  alumnos.forEach(a => {
    const item = document.createElement('div');
    item.className = 'alumno';

    const nombre = document.createElement('p');
    nombre.textContent = a.nombre;

    const estados = document.createElement('div');
    estados.className = 'estados';

    ['uniforme', 'puntual', 'conducta'].forEach(key => {
      const estado = document.createElement('span');
      estado.className = a[key] ? 'verde' : 'rojo';
      estados.appendChild(estado);
    });

    item.append(nombre, estados);
    section.appendChild(item);
  });

  container.appendChild(title);
  container.appendChild(section);
}
