export function crearAsistencia() {
  const section = document.createElement('section');
  section.classList.add('asistencia');

  const h2 = document.createElement('h2');
  h2.textContent = 'Asistencia – Grados';
  section.append(h2);

  const contGrades = document.createElement('div');
  contGrades.classList.add('botones-grados');
  ['Grado 1','Grado 2','Grado 3','Grado 4','Grado 5'].forEach(texto => {
    const btn = document.createElement('button');
    btn.textContent = texto;
    contGrades.append(btn);
  });
  section.append(contGrades);

  const contAcc = document.createElement('div');
  contAcc.classList.add('acciones');
  ['Enviar','Ver gráficas'].forEach(txt => {
    const btn = document.createElement('button');
    btn.textContent = txt;
    contAcc.append(btn);
  });
  section.append(contAcc);

  const btnAnt = document.createElement('button');
  btnAnt.textContent = 'Anterior';
  btnAnt.classList.add('btn-anterior');
  const btnSig = document.createElement('button');
  btnSig.textContent = 'Siguiente';
  btnSig.classList.add('btn-siguiente');
  section.append(btnAnt, btnSig);

  return section;
}
