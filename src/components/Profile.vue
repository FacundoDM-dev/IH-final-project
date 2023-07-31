<template>
  <div class="container pb-5">
    <div class="d-flex flex-column justify-content-center align-items-center gap-4">
      <button class="button-edit button btn btn-warning w-100 mt-5" @click="editToggleProfile">
        Edit Profile
      </button>
      <form v-if="inputUpdate" class="d-flex flex-column gap-4 w-100 fade-in">
        <div>
          <label for="">Full name</label>
          <input
            class="input-field-new-task"
            v-model="profile.full_name"
            placeholder="Full name"
            type="text"
          />
        </div>

        <div>
          <label for="">Biography</label>
          <textarea
            class="input-field-new-task"
            rows="10"
            cols="50"
            v-model="profile.bio"
            placeholder="Biography"
            type="text-area"
          ></textarea>
        </div>

        <div>
          <label for="">Website</label>
          <input
            class="input-field-new-task"
            v-model="profile.website"
            placeholder="Website"
            type="text"
          />
        </div>

        <div>
          <label for="">Location</label>
          <input
            class="input-field-new-task"
            v-model="profile.location"
            placeholder="Location"
            type="text"
          />
        </div>

        <button
          class="button btn btn-primary w-100"
          type="button"
          @click="updateProfile"
        >
          Actualizar perfil
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
// Importar las funciones 'ref', 'onMounted', 'computed' y 'defineProps' de Vue 3 para crear variables reactivas y manejar propiedades
import { ref, onMounted, computed, defineProps, defineEmits } from "vue";

// Importar la tienda 'useUserStore' para interactuar con los datos del usuario
import { useUserStore } from "../stores/user";

// Importar la instancia de Supabase para interactuar con la base de datos
import { supabase } from "../supabase";

// Obtener la instancia de la tienda 'useUserStore'
const userStore = useUserStore();

// Definir la función 'emit' para manejar las emisiones de eventos
const emit = defineEmits(["updateProfileEmit"]);

// Definir las propiedades que se reciben de la instancia padre (este componente es un subcomponente)
const props = defineProps({
  profile: {
    type: Object,
  },
  inputUpdate: {
    type: Boolean,
  },
});

// Variable reactiva para controlar la visibilidad de los campos de actualización
const inputUpdate = ref(false);

// Función para alternar la visibilidad de los campos de actualización
const editToggleProfile = () => {
  inputUpdate.value = !inputUpdate.value;
};

// Variable reactiva para manejar el perfil del usuario desde la tienda
const profile = computed(() => (userStore.profile ? userStore.profile : {}));

// Función para actualizar el perfil del usuario en Supabase
const updateProfile = async () => {
  // Obtener los datos actualizados del perfil del usuario
  const updatedProfileData = {
    full_name: profile.value.full_name,
    bio: profile.value.bio,
    location: profile.value.location,
    website: profile.value.website,
  };

  // Realizar la actualización en la tabla 'profiles' de Supabase
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfileData)
    .eq("user_id", supabase.auth.user().id);

  // Alternar la visibilidad de los campos de actualización
  editToggleProfile();

  if (error) {
    // Si hay un error, mostrarlo en la consola
    console.error(error);
  } else {
    // Si la actualización es exitosa, emitir un evento para notificar a la instancia padre que el perfil ha sido actualizado
    console.log("Perfil actualizado correctamente");
    emit("updateProfileEmit", updatedProfileData);
  }
};

// Función que se ejecuta cuando el componente se ha montado
onMounted(async () => {
  // Llamar a la función 'fetchUser' de la tienda de usuarios para obtener la información del usuario actualizado
  await userStore.fetchUser();
});

</script>

<style scoped></style>
