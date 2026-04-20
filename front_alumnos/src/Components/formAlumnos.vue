<script setup>
import { carreras } from "../assets/carrerasData";
const props = defineProps({
    alumno: {
        type: Object,
        required: true,
    },
    esEditado: {
        type: Boolean,
        required: false,
    },
    cancelar: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["agregar", 'limpiar']);

const enviarForm = () => {
    emit("agregar");
};

</script>

<template>
    <div class="container">
        <div class="card shadow p-4 mb-4 mt-4">
            <h2 class="text-center">Formulario de Alumnos</h2>
            <form @submit.prevent="enviarForm">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" id="nombre" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*"
                            v-model="alumno.nombre" class="form-control" placeholder="Juan Gomez" required />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="apellido" class="form-label">Apellidos</label>
                        <input type="text" id="apellido" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*"
                            v-model="alumno.apellido" class="form-control" placeholder="Cuevas Del Valle" required />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="carrera" class="form-label">Carrera</label>
                        <select class="form-select" id="carrera" v-model="alumno.carrera" required>
                            <option disabled value="">Selecione una carrera</option>
                            <option v-for="carrera in carreras">{{ carrera }}</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="telefono" class="form-label">Telefono</label>
                        <input type="tel" pattern="^\d{10}$" inputmode="numeric" id="telefono" v-model="alumno.telefono"
                            class="form-control" placeholder="9531308933" required />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="imagenurl" class="form-label">Imagen URL</label>
                        <input type="text" id="imagenurl" v-model="alumno.imagenurl" class="form-control"/>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="correo" class="form-label">Correo</label>
                        <input type="email" id="correo" v-model="alumno.gmail" class="form-control"
                            placeholder="usuario@gmail.com" required />
                    </div>
                </div>

                <div>
                    <button type="submit" class="btn btn-primary mt-3">
                        {{ esEditado ? "Actualizar Alumno" : "Agregar Alumno" }}
                    </button>
                    <button type="danger" class="btn btn-danger mt-3 ms-3" @click="emit('limpiar')">
                        cancelar
                    </button>
                </div>
            </form>
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
