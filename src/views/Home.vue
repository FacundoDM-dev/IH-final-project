<template>
  <div class="wrapper">
    <NavBar />
    <div class="p-lg-5">
      <div
        v-if="isLoading"
        class="d-flex justify-content-center align-items-center container-ellipsis"
        style="height: 200px"
      >
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div v-else>
        <div class="d-flex flex-column align-items-center fade-in">
          <div class="text-center">
            <h3>Your <router-link to="/account">Account</router-link></h3>
            <p>Today's date is {{ fechaFormateada }}</p>
          </div>
          <NewTask />
        </div>
        <h1 class="text-center mt-5 mb-4">Tasks:</h1>
        <div class="d-flex flex-wrap justify-content-center gap-3 mb-5">
          <TaskItem
            class="task-item fade-in"
            v-for="task in tasks"
            :key="task.id"
            :task="task"
          />
        </div>
      </div>
    </div>
    <div class="fade-in" v-if="hidden">
      <FooterBar />
    </div>
  </div>
</template>

<script setup>
// Importar las funciones y componentes necesarios desde las librerías y archivos locales
import { ref, onMounted, computed } from "vue";
import { useTaskStore } from "../stores/task";
import NewTask from "../components/NewTask.vue";
import NavBar from "../components/Nav.vue";
import FooterBar from "../components/Footer.vue";
import TaskItem from "../components/TaskItem.vue";
import { format } from "date-fns";

// Obtener la instancia de la tienda de tareas usando el hook useTaskStore
const taskStore = useTaskStore();

// Variables reactivas para almacenar el estado de la vista
const isLoading = ref(true); // Para indicar si se está cargando información
const hidden = ref(false);   // Para controlar la visibilidad de ciertos elementos
const tasks = computed(() => taskStore.tasksArr); // Para obtener las tareas de la tienda
const fechaFormateada = ref(""); // Para almacenar la fecha actual formateada

// Acción que se ejecuta una vez que el componente ha sido montado en el DOM
onMounted(async () => {
  // Obtener las tareas desde la tienda de tareas
  await taskStore.fetchTasks();

  // Obtener la fecha actual
  const fecha = new Date();

  // Formatear la fecha en el formato deseado (por ejemplo, "8th July 2023")
  const formatoFecha = format(fecha, "do MMMM yyyy");

  // Asignar la fecha formateada a la variable fechaFormateada
  fechaFormateada.value = formatoFecha;

  // Simular una carga de 2 segundos antes de mostrar ciertos elementos
  setTimeout(() => {
    isLoading.value = false; // Indicar que la carga ha finalizado
    hidden.value = true;    // Ocultar ciertos elementos
  }, 2000);
});
</script>

<style></style>
