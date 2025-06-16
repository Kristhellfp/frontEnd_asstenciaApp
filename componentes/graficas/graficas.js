export function crearGraficas(navegarA) {
  const contenedor = document.createElement('section');
  contenedor.classList.add('graficas-container');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Resumen de Asistencia por Grado';
  contenedor.appendChild(titulo);

  // 🌟 Contenedor bien espaciado y claro
  const graficaWrapper = document.createElement('div');
  graficaWrapper.style.overflowX = 'auto';
  graficaWrapper.style.margin = '40px 0';
  graficaWrapper.style.padding = '30px';
  graficaWrapper.style.backgroundColor = '#ffffff';
  graficaWrapper.style.border = '1px solid #e0e0e0';
  graficaWrapper.style.borderRadius = '12px';
  graficaWrapper.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';

  const canvas = document.createElement('canvas');
  canvas.id = 'graficaAsistencia';
  canvas.style.minWidth = '120px';
  canvas.style.height = '420px';

  graficaWrapper.appendChild(canvas);
  contenedor.appendChild(graficaWrapper);

  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Regresar';
  btnVolver.classList.add('boton-volver');
  btnVolver.addEventListener('click', () => {
    if (typeof window.navegarA === 'function') {
      console.log("Volviendo a grados...");
      window.navegarA('grados');
    }
  });
  contenedor.appendChild(btnVolver);

  const datos = Array.from({ length: 18 }, (_, i) => ({
    grado: `Grado ${i + 1}`,
    asistencia: Math.floor(Math.random() * 21) + 80
  }));

  setTimeout(() => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#3366cc');
    gradient.addColorStop(1, '#99ccff');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: datos.map(d => d.grado),
        datasets: [{
          label: '% Asistencia',
          data: datos.map(d => d.asistencia),
          backgroundColor: gradient,
          borderRadius: 8,
          barPercentage: 0.6,       // más delgado
          categoryPercentage: 0.7   
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: '#1f1f1f',
            titleColor: '#fff',
            bodyColor: '#f5f5f5',
            borderWidth: 1,
            borderColor: '#ccc',
            callbacks: {
              label: ctx => `${ctx.parsed.y}% asistencia`
            }
          },
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              font: { size: 10 },
              color: '#333',
              callback: val => `${val}%`
            },
            grid: { color: '#e6e6e6' }
          },
          x: {
            ticks: {
              font: { size: 12 },
              color: '#333',
              maxRotation: 45,
              minRotation: 30
            },
            grid: { display: false }
          }
        }
      }
    });
  }, 0);

  return contenedor;
}
