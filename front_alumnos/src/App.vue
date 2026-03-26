<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import formulario from "./Components/formulario.vue";
import tablaAlumnos from "./Components/tablaAlumnos.vue";

const carreras = [
  "Ingenieria en Mecatronica",
  "Ingenieria en Gestion Empresarial",
  "Ingenieria Industrial",
  "Ingenieria Civil",
  "Ingenieria en Sistemas Computacionales",
  "Licenciatura en Administración",
  "Licenciatura en Arquitectura",
  "Licenciatura en Contador Público",
];
const filtrarPorCarrera = (carrera) => {
  return alumnos.value.filter((alumno) => alumno.carrera === carrera);
};
const alumnos = ref([]);
const nuevoAlumno = ref({
  nombre: "",
  apellido: "",
  carrera: "",
  telefono: "",
  imagenURL: "",
  email: "",
});

const limpiarFormulario = () => {
  nuevoAlumno.value = {
    nombre: "",
    apellido: "",
    carrera: "",
    telefono: "",
    imagenURL: "",
    email: "",
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
      Swal.fire("Eliminado!", "El alumno ha sido eliminado.", "success");
    }
  });
  await cargarAlumnos();
};

const eliminarAlumnoPorId = async (id) => {
  try {
    await axios.delete(
      `https://crud-alumnos-spring.uc.r.appspot.com/alumnos/eliminar-alumnos/${id}`,
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
    "https://crud-alumnos-spring.uc.r.appspot.com/alumnos/traer-alumnos",
    {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
  );
  alumnos.value = response.data;
  console.log(alumnos.value);
};

const agregarAlumno = async () => {
  if (editado.value) {
    await axios.put(
      `https://crud-alumnos-spring.uc.r.appspot.com/alumnos/editar-alumno/${nuevoAlumno.value.id}`,
      nuevoAlumno.value,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      },
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
      "https://crud-alumnos-spring.uc.r.appspot.com/alumnos/insertar-alumno",
      nuevoAlumno.value,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      },
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
              placeholder="Juan Gomez"
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
              placeholder="Cuevas Del Valle"
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
              placeholder="9531308933"
              required
            />
          </div>

          <div class="col-md-6 mb-3">
            <label for="imagenurl" class="form-label">Imagen URL</label>
            <input
              type="text"
              id="imagenurl"
              v-model="nuevoAlumno.imagenURL"
              class="form-control"
              required
            />
          </div>

          <div class="col-md-6 mb-3">
            <label for="correo" class="form-label">Correo</label>
            <input
              type="email"
              id="correo"
              v-model="nuevoAlumno.email"
              class="form-control"
              placeholder="usuario@gmail.com"
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
  <div class="container">
    <tablaAlumnos
      v-for="carrera in carreras"
      :key="carrera"
      :carrera="carrera"
      :datos="filtrarPorCarrera(carrera)"
      @editar="editarAlumnos"
      @eliminar="eliminarAlumno"
    />
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
