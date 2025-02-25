const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  cargarAsignaturas();
  cargarCarreras();
  cargarRegistros();
  inicializarEventos();
});

function inicializarEventos() {
  // FORM Nuevo Registro
  const form = document.getElementById('registroForm');
  const selectUnidades = document.getElementById('selectUnidades');
  selectUnidades.addEventListener('change', generarCamposUnidades);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarRegistro();
  });

  // Cerrar modal
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modalDetalles').style.display = 'none';
  });

  // FORM Agregar Maestro
  const formMaestro = document.getElementById('formMaestro');
  formMaestro.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarMaestro();
  });

  // FORM Agregar Asignatura
  const formAsignatura = document.getElementById('formAsignatura');
  formAsignatura.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarAsignatura();
  });

  // FORM Agregar Carrera
  const formCarrera = document.getElementById('formCarrera');
  formCarrera.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarCarrera();
  });
}

/* -------------------- MOSTRAR/OCULTAR SECCIONES -------------------- */
function mostrarSeccion(seccionId) {
  
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => sec.style.display = 'none');

 
  const target = document.getElementById(seccionId);
  if (target) {
    target.style.display = 'block';
  
    if (seccionId === 'agregarAsignaturaSection') {
      cargarProfesores(); 
    }
  }
}

/* -------------------- CARGAR DATOS PARA FORM NUEVO REGISTRO -------------------- */
async function cargarAsignaturas() {
  try {
    const response = await fetch(`${API_BASE}/asignaturas`);
    if (!response.ok) throw new Error('Error al obtener asignaturas');
    const asignaturas = await response.json();

    const selectAsignatura = document.getElementById('selectAsignatura');
    selectAsignatura.innerHTML = '<option value="">Seleccione Asignatura</option>';
    asignaturas.forEach(asign => {
      const option = document.createElement('option');
      option.value = asign.id; 
      option.textContent = `${asign.nombre} (Duración: ${asign.duracionHoras}h)`;
      selectAsignatura.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

// Carga la lista de carreras en el select
async function cargarCarreras() {
  try {
    const response = await fetch(`${API_BASE}/carreras`);
    if (!response.ok) throw new Error('Error al obtener carreras');
    const carreras = await response.json();

    const selectCarrera = document.getElementById('selectCarrera');
    selectCarrera.innerHTML = '<option value="">Seleccione Carrera</option>';
    carreras.forEach(car => {
      const option = document.createElement('option');
      option.value = car.id;
      option.textContent = car.nombre;
      selectCarrera.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

// Generarcampos de unidades de aprendizaje
function generarCamposUnidades() {
  const unidadesContainer = document.getElementById('unidadesContainer');
  unidadesContainer.innerHTML = ''; // limpiar

  const numUnidades = parseInt(document.getElementById('selectUnidades').value);
  for (let i = 1; i <= numUnidades; i++) {
    const unidadDiv = document.createElement('div');
    unidadDiv.classList.add('unidad-block');

    unidadDiv.innerHTML = `
      <h3>Unidad de Aprendizaje #${i}</h3>
      <label>Competencia Específica:</label>
      <input type="text" name="competenciaEspecifica" required />

      <label>Número de Semanas:</label>
      <input type="number" name="numeroSemanas" min="1" required />

      <label>Resultado de Aprendizaje:</label>
      <input type="text" name="resultadoAprendizaje" required />

      <label>Porcentaje Saber (%):</label>
      <input type="number" name="porcentajeSaber" min="0" max="100" required />

      <label>Porcentaje Hacer-Ser (%):</label>
      <input type="number" name="porcentajeHacerSer" min="0" max="100" required />
    `;

    unidadesContainer.appendChild(unidadDiv);
  }
}

// Guardar registro 
async function guardarRegistro() {
  const asignaturaId = document.getElementById('selectAsignatura').value;
  const carreraId = document.getElementById('selectCarrera').value;
  const cuatrimestre = document.getElementById('selectCuatrimestre').value;
  const competencia = document.getElementById('textareaCompetencia').value;
  const objetivoGeneral = document.getElementById('textareaObjetivo').value;

 
  const unidadesContainer = document.getElementById('unidadesContainer');
  const unidadBlocks = unidadesContainer.getElementsByClassName('unidad-block');
  const unidades = [];

  for (let i = 0; i < unidadBlocks.length; i++) {
    const inputs = unidadBlocks[i].querySelectorAll('input');
    const competenciaEspecifica = inputs[0].value;
    const numeroSemanas = parseInt(inputs[1].value);
    const resultadoAprendizaje = inputs[2].value;
    const porcentajeSaber = parseInt(inputs[3].value);
    const porcentajeHacerSer = parseInt(inputs[4].value);

    if (porcentajeSaber + porcentajeHacerSer !== 100) {
      alert(`La suma de Saber y Hacer-Ser debe ser 100% en la UA #${i+1}`);
      return;
    }

    unidades.push({
      competenciaEspecifica,
      numeroSemanas,
      resultadoAprendizaje,
      porcentajeSaber,
      porcentajeHacerSer
    });
  }

  const bodyData = {
    cuatrimestre,
    competencia,
    objetivoGeneral,
    asignaturaId: parseInt(asignaturaId),
    carreraId: parseInt(carreraId),
    unidades
  };

  try {
    const response = await fetch(`${API_BASE}/registros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
    if (!response.ok) throw new Error('Error al crear registro');

    alert('Registro creado con éxito!');
    document.getElementById('registroForm').reset();
    document.getElementById('unidadesContainer').innerHTML = '';
    cargarRegistros(); // recargamos la tabla
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al crear el registro.');
  }
}


async function cargarRegistros() {
  try {
    const response = await fetch(`${API_BASE}/registros`);
    if (!response.ok) throw new Error('Error al obtener registros');
    const registros = await response.json();

    const tbody = document.querySelector('#tablaRegistros tbody');
    tbody.innerHTML = '';

    registros.forEach(reg => {
      const tr = document.createElement('tr');
      const totalSemanas = reg.unidades.reduce((acc, ua) => acc + ua.numeroSemanas, 0);

      tr.innerHTML = `
        <td>${reg.cuatrimestre}</td>
        <td>${reg.asignatura?.nombre || 'Sin nombre'}</td>
        <td>${reg.objetivoGeneral}</td>
        <td>${totalSemanas}</td>
        <td>
          <button onclick="verDetalles(${reg.id})">Ver Detalles</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}


async function verDetalles(registroId) {
  try {
    const response = await fetch(`${API_BASE}/registros/${registroId}`);
    if (!response.ok) throw new Error('Error al obtener el registro por ID');
    const reg = await response.json();

    let totalSemanas = 0;
    let totalSaber = 0;
    let totalHacerSer = 0;

    reg.unidades.forEach(ua => {
      totalSemanas += ua.numeroSemanas;
      totalSaber += ua.porcentajeSaber;
      totalHacerSer += ua.porcentajeHacerSer;
    });

    const profesorNombre = reg.asignatura?.profesor?.nombre || '---';
    const asignaturaNombre = reg.asignatura?.nombre || '---';
    const duracion = reg.asignatura?.duracionHoras || '---';
    const familia = reg.carrera?.nombre || '---';

    let html = `
      <table class="header-table">
        <tr>
          <td><strong>ASIGNATURA:</strong> ${asignaturaNombre}</td>
          <td><strong>FAMILIA:</strong> ${familia}</td>
          <td><strong>DURACIÓN:</strong> ${duracion} hrs.</td>
        </tr>
        <tr>
          <td><strong>CUATRIMESTRE:</strong> ${reg.cuatrimestre}</td>
          <td><strong>PROFESOR:</strong> ${profesorNombre}</td>
          <td></td>
        </tr>
      </table>

      <p><strong>COMPETENCIA:</strong> ${reg.competencia}</p>
      <p><strong>OBJETIVO GENERAL DE LA ASIGNATURA:</strong> ${reg.objetivoGeneral}</p>
      <br/>

      <table class="details-table">
        <thead>
          <tr>
            <th rowspan="2"># U.A.</th>
            <th rowspan="2">Competencia Específica por U.A.</th>
            <th rowspan="2">Núm. Semanas</th>
            <th rowspan="2">Resultado de Aprendizaje</th>
            <th colspan="2">Ponderación para EVALUACIÓN</th>
          </tr>
          <tr>
            <th>SABER (C)</th>
            <th>HACER-SER (D)</th>
          </tr>
        </thead>
        <tbody>
    `;

    reg.unidades.forEach((ua, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${ua.competenciaEspecifica}</td>
          <td>${ua.numeroSemanas}</td>
          <td>${ua.resultadoAprendizaje}</td>
          <td>${ua.porcentajeSaber}%</td>
          <td>${ua.porcentajeHacerSer}%</td>
        </tr>
      `;
    });

    html += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>TOTAL</strong></td>
            <td><strong>${totalSemanas}</strong></td>
            <td></td>
            <td><strong>${totalSaber}%</strong></td>
            <td><strong>${totalHacerSer}%</strong></td>
          </tr>
        </tfoot>
      </table>
    `;

    const detallesDiv = document.getElementById('detallesContenido');
    detallesDiv.innerHTML = html;
    document.getElementById('modalDetalles').style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('Error al cargar detalles del registro.');
  }
}

/* -------------------- FORM: AGREGAR MAESTRO -------------------- */

async function guardarMaestro() {
  const nombre = document.getElementById('maestroNombre').value.trim();
  if (!nombre) {
    alert('Debe ingresar un nombre de maestro');
    return;
  }
  try {
    const response = await fetch(`${API_BASE}/profesores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    });
    if (!response.ok) throw new Error('Error al crear maestro');
    alert('Maestro agregado con éxito');
    document.getElementById('formMaestro').reset();
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al crear el maestro.');
  }
}

/* -------------------- FORM: AGREGAR ASIGNATURA -------------------- */

async function cargarProfesores() {
  try {
    const response = await fetch(`${API_BASE}/profesores`);
    if (!response.ok) throw new Error('Error al obtener profesores');
    const profesores = await response.json();

    const selectProfesor = document.getElementById('selectProfesor');
    selectProfesor.innerHTML = '<option value="">Seleccione Profesor</option>';
    profesores.forEach(prof => {
      const option = document.createElement('option');
      option.value = prof.id;
      option.textContent = prof.nombre;
      selectProfesor.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}


async function guardarAsignatura() {
  const nombre = document.getElementById('asignaturaNombre').value.trim();
  const duracion = parseInt(document.getElementById('asignaturaDuracion').value);
  const profesorId = parseInt(document.getElementById('selectProfesor').value);

  if (!nombre || !duracion || !profesorId) {
    alert('Debe llenar todos los campos de la asignatura');
    return;
  }

  const bodyData = {
    nombre,
    duracionHoras: duracion,
    profesorId
  };

  try {
    const response = await fetch(`${API_BASE}/asignaturas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
    if (!response.ok) throw new Error('Error al crear asignatura');
    alert('Asignatura agregada con éxito');
    document.getElementById('formAsignatura').reset();
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al crear la asignatura.');
  }
}

/* -------------------- FORM: AGREGAR CARRERA -------------------- */

async function guardarCarrera() {
  const nombre = document.getElementById('carreraNombre').value.trim();
  if (!nombre) {
    alert('Debe ingresar el nombre de la carrera');
    return;
  }
  try {
    const response = await fetch(`${API_BASE}/carreras`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    });
    if (!response.ok) throw new Error('Error al crear carrera');
    alert('Carrera agregada con éxito');
    document.getElementById('formCarrera').reset();
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al crear la carrera.');
  }
}
