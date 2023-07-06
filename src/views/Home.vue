<template>
  <div class="wrapper">
    <Nav />
    <div class="content">
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

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasksArr);
console.log("taskComputed:", tasks.value);

onMounted(async () => {
  await taskStore.fetchTasks();
  console.log("taskOnmouted:", tasks.value);
});


</script>


<style></style>