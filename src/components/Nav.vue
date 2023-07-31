<template>
  <nav class="navbar navbar-expand-lg bg-warning">
    <div class="container-fluid">
      <img class="navbar-brand" src="../../assets/img/POSTASK-NAV.png" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/"> Home </router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/">Task Manager</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/account"
              >Your Account</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/weather"
              >Weather & Time</router-link
            >
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <p class="me-2 mb-2 mb-lg-0">Welcome, {{ userName }}</p>
          <button @click="signOut" class="btn btn-danger">Log out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Importar la tienda 'useUserStore' para interactuar con los datos del usuario
import { useUserStore } from "../stores/user";

// Importar el hook 'useRouter' de Vue Router para manejar las rutas
import { useRouter } from "vue-router";

// Obtener el usuario actual desde la tienda 'useUserStore'
const getUser = useUserStore().user;

// Obtener el correo electrónico del usuario
const userEmail = getUser.email;

// Obtener el nombre de usuario a partir del correo electrónico (antes del símbolo @)
const userName = userEmail.split("@")[0];

// Obtener la instancia de Vue Router para manejar la redirección
const redirect = useRouter();

// Función asíncrona para cerrar sesión del usuario
const signOut = async () => {
  try {
    // Llamar a la función 'signOut' de la tienda de usuarios para cerrar sesión
    await useUserStore().signOut();

    // Redirigir al usuario a la vista de inicio de sesión (Auth)
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // En caso de error, mostrarlo en la consola
    console.log(error);
  }
};

</script>

<style></style>
