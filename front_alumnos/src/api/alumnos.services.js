import axiosInstancia from "./axios";

export const getAlumnos = () => axiosInstancia.get("/alumnos/traer-alumnos");
export const postAlumnos = (alumno) =>
    axiosInstancia.post("/alumnos/insertar-alumno", alumno);
export const putAlumnos = (id, editado) =>
    axiosInstancia.put(`/alumnos/editar-alumnos/${id}`, editado);
export const deleteAlumnos = (id) =>
    axiosInstancia.delete(`/alumnos/eliminar-alumnos/${id}`);
