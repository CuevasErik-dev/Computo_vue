<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const alumnos = ref([]);
const nuevoAlumno = ref({
  nombre: "",
  apellido: "",
  carrera: "",
  telefono: "",
  imagenurl: "",
});

const limpiarFormulario = () => {
  nuevoAlumno.value = {
    nombre: "",
    apellido: "",
    carrera: "",
    telefono: "",
    imagenurl: "",
  };
};

const editado = ref(false);

const eliminarAlumno = async (id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await eliminarAlumnoPorId(id);
    }
  });
  await cargarAlumnos();
};

const eliminarAlumnoPorId = async (id) => {
  try {
    await axios.delete(
      `http://32.192.25.35:8080/alumnos/eliminar-alumnos/${id}`,
    );
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "El alumno ha sido eliminado",
      showConfirmButton: false,
      timer: 1500,
    });
    cargarAlumnos();
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error al eliminar",
      text: "No se pudo eliminar el alumno",
      timer: 1500,
    });
  }
};

const cargarAlumnos = async () => {
  const response = await axios.get(
    "http://32.192.25.35:8080/alumnos/traer-alumnos",
  );
  alumnos.value = response.data;
  console.log(alumnos.value);
};

const agregarAlumno = async () => {
  if (editado.value) {
    await axios.put(
      `http://32.192.25.35:8080/alumnos/editar-alumnos/${nuevoAlumno.value.id}`,
      nuevoAlumno.value,
    );
    Swal.fire({
      icon: "success",
      title: "Alumno Actualizado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    editado.value = false;
  } else {
    await axios.post(
      "http://32.192.25.35:8080/alumnos/insertar-alumno",
      nuevoAlumno.value,
    );
    Swal.fire({
      icon: "success",
      title: "Alumno Agregado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  await cargarAlumnos();
  limpiarFormulario();
};

const editarAlumnos = (alumno) => {
  Swal.fire({
    title: "¿Estás seguro de editar este alumno?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, editar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Object.assign(nuevoAlumno.value, alumno);
      editado.value = true;
    }
  });
};

onMounted(cargarAlumnos);
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow p-4 mb-4 mt-4">
          <h2 class="text-center">Formulario de Alumnos</h2>
          <form @submit.prevent="agregarAlumno">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*"
                  v-model="nuevoAlumno.nombre"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="apellido" class="form-label">Apellidos</label>
                <input
                  type="text"
                  id="apellido"
                  pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*"
                  v-model="nuevoAlumno.apellido"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="carrera" class="form-label">Carrera</label>
                <select
                  class="form-select"
                  id="carrera"
                  v-model="nuevoAlumno.carrera"
                  required
                >
                  <option value="Ingeniería Civil">Ingeniería Civil</option>
                  <option value="Ingeniería Gestión Empresatial">
                    Ingeniería Gestión Empresatial
                  </option>
                  <option value="Ingeniería Industrial">
                    Ingeniería Industrial
                  </option>
                  <option value="Ingeniería Mecatronica">
                    Ingeniería Mecatronica
                  </option>
                  <option value="Ingeniería en Sistemas">
                    Ingeniería en Sistemas Computacionales
                  </option>
                  <option value="Licenciatura en Administración">
                    Licenciatura en Administración
                  </option>
                  <option value="Licenciatura en Arquitectura">
                    Licenciatura en Arquitectura
                  </option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label for="telefono" class="form-label">Telefono</label>
                <input
                  type="tel"
                  pattern="^\d{10}$"
                  inputmode="numeric"
                  id="telefono"
                  v-model="nuevoAlumno.telefono"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="imagenurl" class="form-label">Imagen URL</label>
                <input
                  type="text"
                  id="imagenurl"
                  v-model="nuevoAlumno.imagenurl"
                  class="form-control"
                  required
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary mt-3">
              {{ editado ? "Actualizar Alumno" : "Agregar Alumno" }}
            </button>
          </form>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card shadow mb-4">
          <div class="card-body mx-3">
            <h4 class="card-title mb-3">Tabla de Alumnos</h4>
            <table class="table table-hover align-middle mx-3">
              <thead class="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Carrera</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Imagen</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="alumno in alumnos" :key="alumno.id">
                  <td>{{ alumno.id }}</td>
                  <td>{{ alumno.nombre }}</td>
                  <td>{{ alumno.apellido }}</td>
                  <td>{{ alumno.carrera }}</td>
                  <td>{{ alumno.telefono }}</td>
                  <td>
                    <img
                      :src="alumno.imagenurl"
                      alt="Imagen del Alumno"
                      width="50"
                    />
                  </td>
                  <td>
                    <button
                      @click="eliminarAlumno(alumno.id)"
                      class="btn btn-danger mx-2"
                    >
                      <i class="bi bi-trash2-fill"></i>
                    </button>
                    <button
                      @click="editarAlumnos(alumno)"
                      class="btn btn-warning"
                    >
                      <i class="bi bi-pencil-fill"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input.form-control,
.form-select {
  border-radius: 10px;
  border: 2px solid #a78bfa;
  transition: 0.3s ease-in-out;
}
</style>
