const API_URL = 'http://localhost:3000'; // Cambia a tu URL backend

let token = null;

export function setToken(t) {
  token = t;
}

export async function login(usuario, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
  });
  if (!res.ok) throw new Error('Usuario o contraseña incorrectos');
  const data = await res.json();
  setToken(data.token);
  return data;
}

export async function obtenerGrados() {
  const res = await fetch(`${API_URL}/grados`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error cargando grados');
  return await res.json();
}

export async function obtenerAlumnos(grado) {
  const res = await fetch(`${API_URL}/grados/${grado}/alumnos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error cargando alumnos');
  return await res.json();
}

export async function marcarAsistencia(alumnoId, estado) {
  const res = await fetch(`${API_URL}/alumnos/${alumnoId}/asistencia`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ estado })
  });
  return res.ok;
}

export async function agregarAlumno(grado, alumno) {
  const res = await fetch(`${API_URL}/grados/${grado}/alumnos`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(alumno)
  });
  return await res.json();
}

export async function eliminarAlumno(alumnoId, passwordConfirm) {
  const res = await fetch(`${API_URL}/alumnos/${alumnoId}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ password: passwordConfirm })
  });
  return res.ok;
}
