<script setup>
import formAlumnos from "./Components/formAlumnos.vue";
import { deleteAlumnos, getAlumnos, postAlumnos, putAlumnos, } from "./api/alumnos.services";
import { carreras } from "./assets/carrerasData";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

import tablaAlumnos from "../src/Components/tablaAlumnos.vue";

const filtrarPorCarrera = (carrera) => {
  return alumnos.value.filter((alumno) => alumno.carrera === carrera);
};
const alumnos = ref([]);

const nuevoAlumno = ref({
  nombre: "",
  apellido: "",
  carrera: "",
  telefono: "",
  imagenurl: "",
  gmail: "",
});

const limpiarFormulario = () => {
  nuevoAlumno.value = {
    nombre: "",
    apellido: "",
    carrera: "",
    telefono: "",
    imagenurl: "",
    gmail: "",
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
    await deleteAlumnos(id);
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
  const response = await getAlumnos();
  alumnos.value = response.data;
};

const agregarAlumno = async () => {
  if (editado.value) {
    await putAlumnos(nuevoAlumno.value.id, nuevoAlumno.value);
    Swal.fire({
      icon: "success",
      title: "Alumno Actualizado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    editado.value = false;
  } else {
    await postAlumnos(nuevoAlumno.value);
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
    <formAlumnos
    :alumno="nuevoAlumno"
    :esEditado="editado"
    @agregar="agregarAlumno"
    @limpiar="limpiarFormulario"
    />
  </div>
  <div class="container">
    <tablaAlumnos v-for="carrera in carreras" :key="carrera" :carrera="carrera" :datos="filtrarPorCarrera(carrera)"
      @editar="editarAlumnos" @eliminar="eliminarAlumno" />
  </div>
</template>
