<template>
  <div class="wrapper">
    <NavBar />
    <div class="p-lg-5">
      <div class=" d-flex flex-column align-items-center">
        <div class=" d-flex flex-column align-items-center">
          <h3>Your <router-link to="/account">Account</router-link> </h3>
          <p>Today's date is {{ fechaFormateada }}</p>
        </div>
        <NewTask />
      </div>
      <h1 class="text-center mt-5 mb-4">Tasks:</h1>
      <div class="d-flex flex-wrap justify-content-around gap-3">
        <TaskItem class="task-item" v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTaskStore } from "../stores/task";
import NavBar from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import { format } from "date-fns";

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasksArr);
// console.log("taskComputed:", tasks.value);

const fechaFormateada = ref("");

onMounted(async () => {
  await taskStore.fetchTasks();
  // console.log("taskOnmouted:", tasks.value);

  // Obtener la fecha actual
  const fecha = new Date();

  // Formatear la fecha en el formato deseado (por ejemplo, "8th July 2023")
  const formatoFecha = format(fecha, "do MMMM yyyy");

  // Asignar la fecha formateada a la variable fechaFormateada
  fechaFormateada.value = formatoFecha;
});
</script>

<style>
.task-item{
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.07);
}
</style>
