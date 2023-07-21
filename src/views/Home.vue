<template>
  <div class="wrapper">
    <NavBar />
    <div class="p-lg-5">
      <div
        v-if="isLoading"
        class="d-flex justify-content-center align-items-center"
        style="height: 200px"
      >
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      <div v-else>
        <div class="d-flex flex-column align-items-center fade-in">
          <div class="d-flex flex-column align-items-center">
            <h3>Your <router-link to="/account">Account</router-link></h3>
            <p>Today's date is {{ fechaFormateada }}</p>
          </div>
          <NewTask />
        </div>
        <h1 class="text-center mt-5 mb-4">Tasks:</h1>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <TaskItem
            class="task-item fade-in"
            v-for="task in tasks"
            :key="task.id"
            :task="task"
          />
        </div>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTaskStore } from "../stores/task";
import NavBar from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import FooterBar from "../components/Footer.vue";
import TaskItem from "../components/TaskItem.vue";
import { format } from "date-fns";

const taskStore = useTaskStore();

const isLoading = ref(true);

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

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<style>

.task-item {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.07);
}

.fade-in {
  animation: fade-in 0.5s ease-in;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(247, 207, 87);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
