<template>
  <div class="p-8 overflow-x-auto w-full">
    <h2>Nombre Proyecto: {{ proyectoActual?.nombre }}</h2>

    <div class="mt-4">
      <input v-model="nuevaTarea" type="text" placeholder="Agregar nueva tarea" 
      class="input input-bordered mr-2"/>
      <button @click="agregarTarea" class="btn btn-primary">Agregar</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Completada</th>
          <th>Tarea</th>
          <th>Fecha y hora de Registro</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarea, index) in proyectoActual?.tareas" :key="tarea.id">
          <td>{{ index + 1 }}</td>
          <td>
            <input
              type="checkbox"
              :checked="tarea.completada"
              @change="toggleTareaCompleta(tarea.id, $event.target.checked)"
            />
          </td>
          <td>{{ tarea.nombre }}</td>
          <td>{{ new Date().toLocaleString() }}</td>
          <td>
            <button class="btn btn-neutral" @click="iniciarEdicion(tarea)">Editar</button>
            <button class="btn btn-secondary" @click="eliminarTarea(tarea.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para Editar Tarea -->
    <div v-if="tareaEditando" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-md w-80">
        <h3 class="text-lg font-semibold mb-4">Editar Tarea</h3>
        <input
          v-model="nuevoNombreTarea"
          type="text"
          class="input input-bordered w-full mb-4"
          placeholder="Nuevo nombre de la tarea"
        />
        <div class="flex justify-end space-x-2">
          <button class="btn btn-secondary" @click="cancelarEdicion">Cancelar</button>
          <button class="btn btn-primary" @click="guardarEdicion(tareaEditando.id)">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProyectosStore } from '../store/store';

const proyectosStore = useProyectosStore();
const route = useRoute();

const nuevaTarea = ref('');
const tareaEditando = ref(null);
const nuevoNombreTarea = ref('');

const proyectoActual = computed(() =>
  proyectosStore.proyectos.find((proyecto) => proyecto.id === route.params.id)
);

const agregarTarea = () => {
  if (nuevaTarea.value.trim() !== '') {
    proyectosStore.agregarTarea(route.params.id, nuevaTarea.value.trim());
    nuevaTarea.value = '';
  }
};

const toggleTareaCompleta = (idTarea, completada) => {
  proyectosStore.marcarTarea(route.params.id, idTarea, completada);
};

const iniciarEdicion = (tarea) => {
  tareaEditando.value = { ...tarea };
  nuevoNombreTarea.value = tarea.nombre;
};

const guardarEdicion = (idTarea) => {
  if (tareaEditando.value) {
    proyectosStore.editar(route.params.id, idTarea, nuevoNombreTarea.value.trim());
    tareaEditando.value = null;
    nuevoNombreTarea.value = '';
  }
};

const cancelarEdicion = () => {
  tareaEditando.value = null;
  nuevoNombreTarea.value = '';
};

const eliminarTarea = (idTarea) => {
  proyectosStore.eliminar(route.params.id, idTarea);
};
</script>
