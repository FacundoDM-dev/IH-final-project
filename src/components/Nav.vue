<template>
  <nav class="navbar navbar-expand-lg bg-warning">
    <div class="container-fluid">
      <img class="navbar-brand" src="../../assets/img/POSTASK-NAV.png"/>
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
        </ul>
        <div class="d-flex align-items-center" role="search">
          <p class="me-2 mb-2 mb-lg-0 ">Welcome, {{ userEmail }}</p>
          <button @click="signOut" class="btn btn-danger">Log out</button>
        </div>
      </div>
    </div>
  </nav>

  
  <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";

const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue

// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });

    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};
</script>

<style>

</style>
