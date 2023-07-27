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

const taskStore = useTaskStore();

// variables para los valores de los inputs
const name = ref("");
const description = ref("");

// constante para guardar una variable que contiene un valor booleano falso inicial para el contenedor de mensaje de error que se muestra condicionalmente dependiendo de si el campo de entrada está vacío
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// funcion para crear tareas.
const addTask = () => {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.
  if (name.value.length === 0 || description.value.length === 0) {
    
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva tarea.
    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
  }
};
</script>

<style></style>
