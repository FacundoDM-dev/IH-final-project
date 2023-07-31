<template>
  <h1 class="text-center">Add a new Task to organize your life</h1>
  <h3></h3>

  <div v-if="showErrorMessage">
    <p class="text text-danger" :class="{ 'fade-in': showErrorMessage }">
      {{ errorMessage }}
    </p>
  </div>

  <div class="input-container text-center">
    <div>
      <input
        class="input-field-new-task"
        type="text"
        placeholder="Add a Task Title"
        v-model="name"
      />
    </div>
    <div>
      <textarea
        class="input-field-new-task"
        type="text"
        placeholder="Add a Task Description"
        v-model="description"
        style="height: 10rem"
      >
      </textarea>
    </div>
    <div>
      <button @click="addTask" class="button btn btn-primary add-button">
        Add
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

// Obtener la instancia de la tienda 'useTaskStore'
const taskStore = useTaskStore();

// Variables reactivas para los valores de los campos de entrada
const name = ref("");
const description = ref("");

// Variable reactiva para controlar la visibilidad del mensaje de error
const showErrorMessage = ref(false);

// Variable reactiva para almacenar el mensaje de error
const errorMessage = ref(null);

// Función para crear tareas
const addTask = () => {
  // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al usuario.
  if (name.value.length === 0 || description.value.length === 0) {
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Si los campos no están vacíos, mandamos los valores a la tienda para crear la nueva tarea.
    taskStore.addTask(name.value, description.value);
    name.value = ""; // Limpiamos el campo del nombre de la tarea
    description.value = ""; // Limpiamos el campo de la descripción de la tarea
  }
};

</script>

<style></style>
