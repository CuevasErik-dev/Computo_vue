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
        required: true,
    },
});

const emit = defineEmits(["agregar", "limpiar"]);

const enviarForm = () => {
    emit("agregar");
};
</script>

<template>
    <div class="container">
        <div class="card shadow p-4 mb-4 mt-4">
            <h2 class="text-center">Formulario de Alumnos</h2>
            <form @submit.prevent="enviarForm" class="form-grid">
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" id="nombre" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*"
                            v-model="alumno.nombre" class="form-control" placeholder="Juan Gomez" required />
                    </div>

                    <div class="form-group">
                        <label for="apellido" class="form-label">Apellidos</label>
                        <input type="text" id="apellido" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*"
                            v-model="alumno.apellido" class="form-control" placeholder="Cuevas Del Valle" required />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="carrera" class="form-label">Carrera</label>
                        <select id="carrera" v-model="alumno.carrera" required>
                            <option disabled value="">Selecione una carrera</option>
                            <option v-for="carrera in carreras">{{ carrera }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="telefono" class="form-label">Telefono</label>
                        <input type="tel" pattern="^\d{10}$" inputmode="numeric" id="telefono" v-model="alumno.telefono"
                            class="form-control" placeholder="9531308933" required />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="imagenurl" class="form-label">Imagen URL</label>
                        <input type="text" id="imagenurl" v-model="alumno.imagenurl" class="form-control" />
                    </div>

                    <div class="form-group">
                        <label for="correo" class="form-label">Correo</label>
                        <input type="email" id="correo" v-model="alumno.gmail" class="form-control"
                            placeholder="usuario@gmail.com" required />
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-submit">
                        <svg v-if="esEditado" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        {{ esEditado ? "Actualizar Alumno" : "Agregar Alumno" }}
                    </button>
                    <button type="danger" class="btn-danger" @click="emit('limpiar')">
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

.form-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.form-group input,
.form-group select {
    padding: 14px 16px;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    color: #1e293b;
    font-size: 0.95rem;
    transition: all 0.25s ease;
    outline: none;
}

.form-group input::placeholder {
    color: #94a3b8;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #1e3a8a;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group select {
    cursor: pointer;
}

.form-actions {
    margin-top: 8px;
}

.btn-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 280px;
    padding: 16px 24px;
    background: #1e3a8a;
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
}

.btn-submit svg {
    width: 20px;
    height: 20px;
}

.btn-submit:hover {
    background: #2563eb;
    transform: translateY(-2px);
}
</style>
