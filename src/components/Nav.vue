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
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const getUser = useUserStore().user;
const userEmail = getUser.email;
const userName = userEmail.split("@")[0];
const redirect = useRouter();

// Función asíncrona que llama al método signOut desde useUserStore y empuja al usuario de vuelta a la vista Auth.
const signOut = async () => {
  try {
    // llama al useUserStore y envia la informacion del usuario al backend para cerrar sesion
    await useUserStore().signOut();
    // y despues te redirige a la vista del inicio de sesion
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
