<template>
  <div class="card">
    <div class="card-body">
      <h3 :class="{ taskComplete: task.is_complete }">{{ task.title }}</h3>
      <p :class="{ taskComplete: task.is_complete }">
        {{ task.description }}
      </p>
      <div class="d-flex gap-2 justify-content-center">
        <button class="btn btn-warning w-100 btn-query" @click="updateToggle">
          Edit
        </button>
        <button class="btn btn-success w-100 btn-query" @click="toggleComplete">
          Complete
        </button>
        <button class="btn btn-danger w-100 btn-query" @click="deleteTask">
          Delete
        </button>
      </div>
      <div class="d-flex flex-column gap-3 mt-3 fade-in" v-if="inputUpdate">
        <input
          class="input-field"
          type="text"
          v-model="name"
          placeholder="Update Task Title"
        />
        <textarea
          class="input-field"
          style="height: 6rem"
          type="text"
          v-model="description"
          placeholder="Update Task Description"
        >
        </textarea>
        <button class="button btn btn-primary" @click="updateTask">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar SweetAlert2 para mostrar alertas y el hook 'ref' de Vue 3 para crear variables reactivas
import Swal from "sweetalert2";
import { ref, defineProps } from "vue";
import { useTaskStore } from "../stores/task";

// Obtener la instancia de la tienda de tareas usando el hook useTaskStore
const taskStore = useTaskStore();

// Variables reactivas para manejar el nombre y descripción de la tarea y la visibilidad de los campos de actualización
const name = ref("");
const description = ref("");
const inputUpdate = ref(false);

// Props que se reciben de la instancia padre (este componente es un subcomponente)
const props = defineProps({
  task: Object, // Objeto de la tarea que se muestra en este componente
});

// Función para borrar la tarea utilizando SweetAlert2
const deleteTask = async () => {
  // Configurar la apariencia de los botones de confirmación y cancelación
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  // Mostrar una alerta de confirmación antes de borrar la tarea
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la eliminación, llamar a la función deleteTask de la tienda de tareas
        taskStore.deleteTask(props.task.id);

        // Mostrar una alerta de éxito después de borrar la tarea
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your task has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si se cancela la eliminación, mostrar una alerta de cancelación
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your task is safe :)",
          "error"
        );
      }
    });
};

// Función para cambiar la visibilidad de los campos de actualización
const updateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
};

// Función para actualizar la tarea utilizando la función updateTask de la tienda de tareas
const updateTask = () => {
  // Obtener los valores de nombre y descripción, si no están definidos, mantener los valores actuales de la tarea
  const titleParam = name.value ? name.value : props.task.title;
  const descriptionParam = description.value
    ? description.value
    : props.task.description;

  // Llamar a la función updateTask de la tienda de tareas para realizar la actualización
  taskStore.updateTask(props.task.id, titleParam, descriptionParam);

  // Limpiar los campos de nombre y descripción después de la actualización
  name.value = "";
  description.value = "";

  // Cambiar la visibilidad de los campos de actualización a su estado original (ocultos)
  updateToggle();
};

// Función para cambiar el estado de completitud de la tarea utilizando la función completeTask de la tienda de tareas
const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};

</script>

<style></style>
