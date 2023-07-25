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
import Swal from "sweetalert2";
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();
const name = ref("");
const description = ref("");
const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

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
        taskStore.deleteTask(props.task.id);

        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your task has been deleted.",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your task is safe :)",
          "error"
        );
      }
    });
};

// variable inputUpdate la utilizo en false para luego utilizarla en el dom para mantener ocultos los inputs para hacer un update
const inputUpdate = ref(false);

// funcion basica para hacer un toggle a traves de un boton @click para cambiar la variable inputUpdate de false a true y con esto dejar ver en el DOM dichos inputs y el boton para hacerel update
const updateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
};

// funcion que llama a funcion de la store task.js que se encarga de hacer una actualizacion de los datos de la tarea.
const updateTask = () => {
  const titleParam = name.value ? name.value : props.task.title;
  const descriptionParam = description.value
    ? description.value
    : props.task.description;
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

<style></style>
