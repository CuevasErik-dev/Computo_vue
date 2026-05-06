<script setup>
import formAlumnos from "../Components/formAlumnos.vue";
import {
  deleteAlumnos,
  getAlumnos,
  postAlumnos,
  putAlumnos,
} from "../api/alumnos.services";
import { carreras } from "../assets/carrerasData";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

import tablaAlumnos from "../Components/tablaAlumnos.vue";
import NavBar from "../Components/NavBar.vue";

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

const imprimirAlumnos = async ({ carrera, datos }) => {
  const printWindow = window.open("", "_blank");

  const logoArriba = new URL(
    "../assets/images/ArribaIEncabezado.png",
    import.meta.url,
  ).href;
  const logoAbajo = new URL("../assets/images/Abajo.png", import.meta.url).href;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        @page {
          size: letter;
          margin: 15mm; 
        }

        body {
          font-family: Arial, sans-serif;
          color: #333;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* --- PIE DE PÁGINA FIJO AL FONDO DE LA HOJA --- */
        .footer-fixed {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }
        .footer-img { 
          width: 100%;
          height: 75px;
          object-fit: contain;
          display: block;
        }

        table { 
          width: 100%;
          border-collapse: collapse;
        }

        thead { display: table-header-group; }
        tfoot { display: table-footer-group; }
        tr { page-break-inside: avoid; }

        /* --- ESTILOS DEL ENCABEZADO --- */
        .header-cell {
          border: none !important;
          background-color: transparent !important;
          padding-bottom: 20px; 
        }
        .header-img { 
          width: 100%;
          height: 110px;
          object-fit: contain;
          display: block;
        }
        h1 { 
          color: #1e3a8a;
          text-align: center;
          margin-top: 15px;
          margin-bottom: 5px;
          font-size: 22px;
          text-transform: uppercase;
        }

        /* --- ESTILOS DE LA TABLA DE DATOS --- */
        .col-headers th { 
          background-color: #6366f1 !important;
          color: white !important;
          padding: 12px 8px;
          font-size: 13px;
          border: 1px solid #4f46e5;
        }

        tbody td { 
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
          font-size: 12px;
        }

        tbody tr:nth-child(even) { 
          background-color: #f9fafb !important; 
        }

        /* --- ESPACIADOR FANTASMA --- */
        /* Esta celda invisible evita que las filas se impriman sobre la imagen del footer fijo */
        .footer-space {
          height: 85px; /* Un poco más alto que el .footer-img para dejar margen */
          border: none !important;
          background-color: transparent !important;
        }
      </style>
    </head>
    <body>

      <div class="footer-fixed">
        <img src="${logoAbajo}" class="footer-img">
      </div>

      <table>
        <thead>
          <tr>
            <th colspan="4" class="header-cell">
              <img src="${logoArriba}" class="header-img">
              <h1>${carrera}</h1>
            </th>
          </tr>
          <tr class="col-headers">
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>

        <tbody>
          ${datos
            .map(
              (alumno) => `
            <tr>
              <td>${alumno.nombre || ""}</td>
              <td>${alumno.apellido || ""}</td>
              <td>${alumno.gmail || "N/A"}</td>
              <td>${alumno.telefono || ""}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>

        <tfoot>
          <tr>
            <td colspan="4" class="footer-space">&nbsp;</td>
          </tr>
        </tfoot>
      </table>

    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 800);
};
</script>

<template>
  <NavBar />
  <div class="container">
    <formAlumnos
      :alumno="nuevoAlumno"
      :esEditado="editado"
      @agregar="agregarAlumno"
      @limpiar="limpiarFormulario"
    />
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
