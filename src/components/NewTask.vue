<template>
    <h1>Add a new Task to organize your life</h1>
    <h3></h3>

    <div v-if="showErrorMessage">
        <p class=" text text-danger" :class="{ 'fade-in': showErrorMessage }">{{ errorMessage }}</p>
    </div>
    <div class="input-container">
        <div>
            <input class="input-field-new-task" type="text" placeholder="Add a Task Title" v-model="name">
        </div>
        <div>
            <textarea
            class="input-field-new-task" type="text" placeholder="Add a Task Description" v-model="description" style="height: 10rem;">

            </textarea>
        </div>
        <button @click="addTask" class="button btn btn-primary add-button">Add</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = () => {
if(name.value.length === 0 || description.value.length === 0){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    taskStore.addTask(name.value, description.value);
    name.value = '';
    description.value = '';
}
};

</script>

<style>



</style>
  