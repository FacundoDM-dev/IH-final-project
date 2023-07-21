<template>
  <div class="card">
    <div class="card-body">
      <h3 :class="{ taskComplete: task.is_complete }">{{ task.title }}</h3>
      <p :class="{ taskComplete: task.is_complete }">
        {{ task.description }}
      </p>
      <div class=" d-flex gap-2 justify-content-center">
        
        <button class="btn btn-warning w-100" @click="updateToggle">Edit</button>
        <button class="btn btn-success w-100" @click="toggleComplete">
          Complete
        </button>
        <button class="btn btn-danger w-100" @click="deleteTask">Delete</button>
        
      </div>
      <div class="d-flex flex-column gap-3 mt-3" v-if="inputUpdate">
        <input class="input-field" type="text" v-model="name" placeholder="Update Task Title" />
        <textarea class="input-field" style="height: 6rem" type="text"
          v-model="description"
          placeholder="Update Task Description">
          
        </textarea>
        <button class="button btn btn-primary" @click="updateTask">Update</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, watch } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();

const name = ref("");

const description = ref("");

const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

// variable inputUpdate la utilizo en false para luego utilizarla en el dom para mantener ocultos los inputs para hacer un update
const inputUpdate = ref(false);

// funcion basica para hacer un toggle a traves de un boton @click para cambiar la variable inputUpdate de false a true y con esto dejar ver en el DOM dichos inputs y el boton para hacerel update
const updateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
};

// funcion que llama a funcion de la store task.js que se encarga de hacer una actualizacion de los datos de la tarea.
const updateTask = () => {
  const titleParam = name.value ? name.value : props.task.title
  const descriptionParam = description.value ? description.value : props.task.description
  taskStore.updateTask(props.task.id, titleParam, descriptionParam);
  name.value = "";
  description.value = "";
  updateToggle();
};

const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};
</script>

<style>

</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
