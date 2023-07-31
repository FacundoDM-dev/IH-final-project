<template>
  <NavBar />
  <div
    class="container mt-5 d-flex justify-content-center align-items-center mb-5 gap-5 flex-column"
  >
    <div>
      <div v-if="isLoading" class="" style="height: 200px">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div v-else>
        <div
          class="d-flex justify-content-center align-items-center flex-wrap gap-5 fade-in"
        >
          <div class="avatar-container text-center">
            <img
              class="avatar mb-3"
              :src="avatar_url"
              v-if="avatar_url"
              alt="Profile picture"
            />
            <div>
              <input
                class="form-control mt-4"
                @change="fileManager"
                type="file"
              />
              <button class="button btn btn-primary w-100" @click="uploadFile">
                Upload File
              </button>
            </div>
          </div>

          <div class="text-container w-50 p-5">
            <h3>Profile:</h3>
            <h5 class="fw-lighter">
              Name:
              <h5>{{ username }}</h5>
            </h5>

            <h5 class="fw-lighter">
              Location:
              <h5>{{ location }}</h5>
            </h5>

            <h5 class="fw-lighter">
              Bio:
              <h5>{{ bio }}</h5>
            </h5>

            <h5 class="fw-lighter">
              <a style="text-decoration: none;" target="_blank" :href="website">Check my portfolio</a>
            </h5>
          </div>
        </div>

        <Profile @updateProfileEmit="hundleUpdateProfile" />
      </div>
    </div>
  </div>
  <div v-if="hidden">
    <FooterBar />
  </div>
</template>

<script setup>
// Importar las funciones y componentes necesarios desde las librerías y archivos locales
import { supabase } from "../supabase";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "../stores/user";
import NavBar from "../components/Nav.vue";
import FooterBar from "../components/Footer.vue";
import Profile from "../components/Profile.vue";

// Variables reactivas para el manejo de la imagen de avatar
const file = ref(); // Referencia a la imagen seleccionada por el usuario
const fileUrl = ref(); // Referencia a la URL de la imagen subida

// Función para manejar la selección de un archivo de imagen
const fileManager = (event) => {
  file.value = event.target.files[0];
};

// Función para manejar la actualización del perfil del usuario
const hundleUpdateProfile = (updatedProfileData) => {
  // Actualizar los campos de perfil con los datos recibidos
  username.value = updatedProfileData.full_name;
  website.value = updatedProfileData.website;
  location.value = updatedProfileData.location;
  bio.value = updatedProfileData.bio;
  // avatar_url.value = updatedProfileData.avatar_url;
};

// Función para subir la imagen de avatar al almacenamiento en la nube (Supabase Storage)
const uploadFile = async () => {
  // Verificar si hay un archivo seleccionado para subir
  if (!file.value) return;

  // Obtener la URL actual del avatar del usuario desde la tabla "profiles"
  const { data } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("user_id", supabase.auth.user().id);

  // Eliminar la URL anterior del avatar del usuario desde el almacenamiento en la nube
  const deleteUrl = data[0].avatar_url;
  const { error: urlDeleteError } = await supabase.storage
    .from("profile-img")
    .remove([deleteUrl]);

  // Si ocurre un error al eliminar la URL anterior, mostrarlo en la consola
  if (urlDeleteError) {
    console.error("Error deleting file:", urlDeleteError);
    return;
  }

  // Generar un nombre único para el archivo de imagen basado en la marca de tiempo
  const timestamp = Date.now();
  const filePath = `profiles/${timestamp}-${file.value.name}`;

  // Subir el archivo de imagen al almacenamiento en la nube
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file.value);

  // Si ocurre un error al subir la imagen, mostrarlo en la consola
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return;
  }

  // Obtener la URL pública de la imagen subida desde el almacenamiento en la nube
  const { data: urlData, error: urlError } = await supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);

  // Si ocurre un error al obtener la URL pública, mostrarlo en la consola
  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return;
  }

  // Actualizar la referencia a la URL de la imagen subida
  fileUrl.value = urlData.publicURL;

  // Actualizar la URL del avatar del usuario en la tabla "profiles"
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: fileUrl.value })
    .eq("user_id", supabase.auth.user().id);

  // Si ocurre un error al actualizar el perfil, mostrarlo en la consola
  if (updateError) {
    console.error("Error updating profile:", updateError);
    return;
  }

  console.log("Profile successfully updated.");

  // Volver a cargar el perfil del usuario después de la actualización
  await userStore.fetchUser();
};

// Obtener la instancia de la tienda de usuarios usando el hook useUserStore
const userStore = useUserStore();

// Variables reactivas para almacenar el estado de la vista
const isLoading = ref(true); // Para indicar si se está cargando información
const hidden = ref(false);   // Para controlar la visibilidad de ciertos elementos
const username = ref(null);  // Para almacenar el nombre de usuario
const website = ref(null);   // Para almacenar el sitio web del usuario
const avatar_url = ref(null); // Para almacenar la URL del avatar del usuario
const location = ref(null);  // Para almacenar la ubicación del usuario
const bio = ref(null);       // Para almacenar la biografía del usuario

// Función para obtener y cargar el perfil del usuario en la vista
async function getProfile() {
  // Obtener y cargar el perfil del usuario desde la tienda de usuarios
  await userStore.fetchUser();
  username.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
  location.value = userStore.profile.location;
  bio.value = userStore.profile.bio;
  avatar_url.value = userStore.profile.avatar_url;

  // Simular una carga de 2 segundos antes de mostrar ciertos elementos
  setTimeout(() => {
    isLoading.value = false; // Indicar que la carga ha finalizado
    hidden.value = true;    // Ocultar ciertos elementos
  }, 2000);
}

// Observar cambios en el perfil del usuario para actualizar la URL del avatar
watch(
  () => userStore.profile,
  (updatedProfileData) => {
    avatar_url.value = updatedProfileData.avatar_url;
  },
  { deep: true }
);

// Acción que se ejecuta una vez que el componente ha sido montado en el DOM
onMounted(() => {
  getProfile();
});
</script>

<style></style>
