<template>
  <div class="wrapper">
    <Nav />
    <div class="content">
      <p>La fecha actual es: {{ fechaFormateada }}</p>
      <h3>Your account:</h3>
      <router-link to="/account">Account</router-link>
    </div>
    <NewTask />
    <h1>Tasks:</h1>
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from "../stores/task";
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import { format } from 'date-fns';

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasksArr);
// console.log("taskComputed:", tasks.value);

const fechaFormateada = ref('');

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


<style></style>