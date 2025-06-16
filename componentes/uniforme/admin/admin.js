import { navegarA } from '../../app.js';

export function crearAdminDashboard() {
  const contenedor = document.createElement('section');
  contenedor.classList.add('admin-dashboard');

  // Header
  const header = document.createElement('header');
  header.innerHTML = `
    <h1>Panel de Administración</h1>
    <div class="admin-actions">
      <button id="btn-agregar-profesor">➕ Nuevo Profesor</button>
      <button id="btn-agregar-nivel">📊 Agregar Nivel/Grado</button>
    </div>
  `;
  contenedor.appendChild(header);

  // Estadísticas
  const statsContainer = document.createElement('div');
  statsContainer.classList.add('stats-grid');

  // Tarjeta de niveles
  const nivelesCard = document.createElement('div');
  nivelesCard.classList.add('stat-card');
  nivelesCard.innerHTML = `
    <h3>Asistencia por Nivel</h3>
    <div class="chart-container">
      <canvas id="nivelesChart"></canvas>
    </div>
  `;

  // Tarjeta de profesores
  const profesoresCard = document.createElement('div');
  profesoresCard.classList.add('stat-card');
  profesoresCard.innerHTML = `
    <h3>Rendimiento de Profesores</h3>
    <div class="profesores-list" id="profesores-list"></div>
  `;

  statsContainer.append(nivelesCard, profesoresCard);
  contenedor.appendChild(statsContainer);

  // Event Listeners
  contenedor.querySelector('#btn-agregar-profesor').addEventListener('click', () => {
    mostrarFormularioProfesor();
  });

  // Cargar datos iniciales
  cargarEstadisticas();

  return contenedor;
}

// Funciones auxiliares
async function cargarEstadisticas() {
  try {
    const [nivelesRes, profesoresRes] = await Promise.all([
      fetch('/api/admin/estadisticas/niveles'),
      fetch('/api/admin/profesores')
    ]);

    const nivelesData = await nivelesRes.json();
    const profesoresData = await profesoresRes.json();

    renderizarGraficaNiveles(nivelesData);
    renderizarListaProfesores(profesoresData);
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

function renderizarGraficaNiveles(data) {
  const ctx = document.getElementById('nivelesChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.nivel),
      datasets: [{
        label: '% Asistencia',
        data: data.map(item => item.porcentaje),
        backgroundColor: '#4e73df',
        borderColor: '#2e59d9',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}

function renderizarListaProfesores(profesores) {
  const container = document.getElementById('profesores-list');
  container.innerHTML = profesores.map(prof => `
    <div class="profesor-item">
      <span>${prof.nombre}</span>
      <div class="progress-bar">
        <div class="progress" style="width: ${prof.asistencia}%"></div>
      </div>
      <span>${prof.asistencia}%</span>
    </div>
  `).join('');
}

function mostrarFormularioProfesor() {
  const formulario = document.createElement('div');
  formulario.classList.add('formulario-flotante');
  formulario.innerHTML = `
    <h3>Registrar Nuevo Profesor</h3>
    <input type="text" placeholder="Nombre completo" id="profesor-nombre">
    <input type="email" placeholder="Correo electrónico" id="profesor-email">
    <input type="password" placeholder="Contraseña temporal" id="profesor-password">
    <div class="form-actions">
      <button id="btn-cancelar">Cancelar</button>
      <button id="btn-guardar">Guardar</button>
    </div>
  `;

  formulario.querySelector('#btn-guardar').addEventListener('click', async () => {
    // Lógica para guardar profesor
  });

  document.body.appendChild(formulario);
}