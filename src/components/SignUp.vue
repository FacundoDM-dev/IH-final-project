<template>
  <div class="container fade-in">

    <div class="row vh-100 justify-content-center align-items-center">
      <div class=" col-auto p-2 text-center ">
        <div class="header">
      <div class="header-description">
        <h4 >Welcome!</h4>
        <img class="mb-3" src="../../assets/img/POSTASK-LOGO-PARODIA-POST-IT.png" alt="" />
        <h5>Sign Up</h5>
      </div>
    </div>

    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <!-- <label class="input-field-label">E-mail</label> -->
          <input
            type="email"
            class="input-field w-100 mb-3"
            placeholder="E-mail"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <!-- <label class="input-field-label">Password</label> -->
          <input
            type="password"
            class="input-field w-100 mb-3"
            placeholder="Password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <div class="form-input">
          <!-- <label class="input-field-label">Confirm password</label> -->
          <input
            type="password"
            class="input-field w-100 mb-3"
            placeholder="Confirm password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button class="btn btn-success w-100 mb-5" type="submit">Sign Up</button>
        <p>
          Have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>

    <div v-show="errorMsg">{{errorMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style>
</style>
